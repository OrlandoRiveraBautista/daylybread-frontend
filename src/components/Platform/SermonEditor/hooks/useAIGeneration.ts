import { useState, useRef, useEffect, useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
  useStreamSermonContent,
  useSermonAIStream,
  SermonAIPromptType,
} from "../../../../hooks/SermonHooks";
import { generateSessionId } from "../constants";
import { HighlightRange } from "../types";

export const useAIGeneration = (
  editor: Editor | null,
  title: string,
  getSelectedText: () => string,
  onHasChanges: () => void,
) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [streamingStartPosition, setStreamingStartPosition] = useState<
    number | null
  >(null);
  const [highlightedText, setHighlightedText] = useState("");
  const [inlineEditRange, setInlineEditRange] = useState<HighlightRange | null>(
    null,
  );

  const streamedContentRef = useRef<string>("");
  const fullContentRef = useRef<string>("");
  const localAccumulatedRef = useRef<string>("");
  const chunkStartPosRef = useRef<number | null>(null);
  const streamingEndPositionRef = useRef<number | null>(null);
  const isManipulatingHighlightRef = useRef<boolean>(false);

  const [streamContent] = useStreamSermonContent();
  const { data: streamData } = useSermonAIStream(
    sessionId,
    !isGenerating || !sessionId,
  );

  // Helper function to render a markdown chunk
  const renderMarkdownChunk = useCallback(() => {
    if (
      !editor ||
      chunkStartPosRef.current === null ||
      !streamedContentRef.current
    )
      return;

    const currentPos = editor.state.selection.to;
    const chunkContent = streamedContentRef.current;

    // Delete the raw text for this chunk
    editor
      .chain()
      .focus()
      .deleteRange({ from: chunkStartPosRef.current, to: currentPos })
      .run();

    // Insert the chunk as formatted markdown
    editor.chain().focus().insertContent(chunkContent).run();

    // After inserting, check if we're inside a list or nested structure
    const { $from } = editor.state.selection;
    const isInList =
      $from.node($from.depth - 1)?.type.name === "listItem" ||
      $from.node($from.depth - 2)?.type.name === "bulletList" ||
      $from.node($from.depth - 2)?.type.name === "orderedList";
    const isInBlockquote =
      $from.node($from.depth - 1)?.type.name === "blockquote";

    if (isInList || isInBlockquote) {
      editor
        .chain()
        .focus()
        .setTextSelection(editor.state.doc.content.size - 1)
        .createParagraphNear()
        .run();
    }

    chunkStartPosRef.current = editor.state.selection.to;
    streamingEndPositionRef.current = editor.state.selection.to;
    streamedContentRef.current = "";
  }, [editor]);

  // Handle streaming data
  useEffect(() => {
    if (!streamData?.sermonAIStream || !editor || !isGenerating) return;

    const token = streamData.sermonAIStream;
    const isInlineEdit = inlineEditRange !== null;

    // Check for full content from backend
    if (token.startsWith("[FULL]")) {
      fullContentRef.current = token.substring(6);
      return;
    }

    // Check for completion signal
    if (token === "[DONE]") {
      if (isInlineEdit && inlineEditRange) {
        // For inline edits, replace with full content if available, otherwise use streamed content
        const contentToInsert = fullContentRef.current || streamedContentRef.current;
        
        if (contentToInsert) {
          isManipulatingHighlightRef.current = true;
          editor
            .chain()
            .focus()
            .setTextSelection(inlineEditRange)
            .unsetHighlight()
            .run();
          isManipulatingHighlightRef.current = false;

          editor
            .chain()
            .focus()
            .setTextSelection(inlineEditRange)
            .deleteSelection()
            .insertContent(contentToInsert)
            .run();
        }

        setInlineEditRange(null);
      } else if (streamingStartPosition !== null) {
        // For regular streaming, always replace with full content to ensure accuracy
        const contentToInsert = fullContentRef.current || localAccumulatedRef.current;
        
        if (contentToInsert) {
          // Use tracked end position, or calculate based on current position
          const endPos = streamingEndPositionRef.current !== null 
            ? streamingEndPositionRef.current 
            : editor.state.selection.to;

          editor
            .chain()
            .focus()
            .deleteRange({ from: streamingStartPosition, to: endPos })
            .run();

          editor.chain().focus().insertContent(contentToInsert).run();
        }
      }

      // Reset streaming state
      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";
      chunkStartPosRef.current = null;
      streamingEndPositionRef.current = null;
      setIsGenerating(false);
      setSessionId("");
      setStreamingStartPosition(null);
      onHasChanges();
      return;
    }

    if (token.startsWith("[ERROR]")) {
      console.error("AI Stream Error:", token);
      if (isInlineEdit && inlineEditRange) {
        isManipulatingHighlightRef.current = true;
        editor
          .chain()
          .setTextSelection(inlineEditRange)
          .unsetHighlight()
          .run();
        setTimeout(() => {
          isManipulatingHighlightRef.current = false;
        }, 0);
      }
      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";
      chunkStartPosRef.current = null;
      streamingEndPositionRef.current = null;
      setIsGenerating(false);
      setSessionId("");
      setStreamingStartPosition(null);
      setInlineEditRange(null);
      return;
    }

    // For inline edit, just accumulate
    if (isInlineEdit) {
      streamedContentRef.current += token;
      return;
    }

    // Accumulate the token for chunk rendering
    streamedContentRef.current += token;
    localAccumulatedRef.current += token;

    // Insert the token as plain text for real-time display
    editor
      .chain()
      .focus()
      .insertContent({
        type: "text",
        text: token,
      })
      .run();

    // Track the end position after insertion
    streamingEndPositionRef.current = editor.state.selection.to;

    // Check if we have a complete markdown block
    if (streamedContentRef.current.endsWith("\n\n")) {
      renderMarkdownChunk();
    }
  }, [
    streamData,
    editor,
    isGenerating,
    streamingStartPosition,
    inlineEditRange,
    renderMarkdownChunk,
    onHasChanges,
  ]);

  // Handle AI content generation
  const handleGenerateContent = useCallback(
    async (promptType: SermonAIPromptType, customPromptText?: string) => {
      if (!editor || isGenerating) return;

      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setIsGenerating(true);

      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";
      chunkStartPosRef.current = null;
      streamingEndPositionRef.current = null;

      // Ensure we're in a safe position for streaming
      const { $from } = editor.state.selection;
      const isInList =
        $from.node($from.depth - 1)?.type.name === "listItem" ||
        $from.node($from.depth - 2)?.type.name === "bulletList" ||
        $from.node($from.depth - 2)?.type.name === "orderedList";

      if (isInList) {
        editor
          .chain()
          .focus()
          .liftListItem("listItem")
          .insertContent("\n\n")
          .run();
      } else {
        editor.chain().focus().insertContent("\n\n").run();
      }

      const streamStartPos = editor.state.selection.to;
      setStreamingStartPosition(streamStartPos);
      chunkStartPosRef.current = streamStartPos;

      try {
        const selectedText = getSelectedText();
        const sermonContent = editor.getText();

        await streamContent({
          variables: {
            input: {
              promptType,
              customPrompt: customPromptText,
              sermonTitle: title || undefined,
              sermonContent: sermonContent || undefined,
              highlightedText: selectedText || highlightedText || undefined,
              sessionId: newSessionId,
            },
          },
        });
      } catch (error) {
        console.error("Error starting stream:", error);
        streamedContentRef.current = "";
        fullContentRef.current = "";
        localAccumulatedRef.current = "";
        chunkStartPosRef.current = null;
        streamingEndPositionRef.current = null;
        setIsGenerating(false);
        setSessionId("");
        setStreamingStartPosition(null);
      }
    },
    [
      editor,
      isGenerating,
      getSelectedText,
      highlightedText,
      title,
      streamContent,
    ],
  );

  // Handle inline edit
  const handleInlineEdit = useCallback(
    async (
      promptText: string,
      selectedText: string,
      range: HighlightRange,
    ) => {
      if (!editor || isGenerating) return;

      setInlineEditRange(range);

      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setIsGenerating(true);

      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";

      try {
        await streamContent({
          variables: {
            input: {
              promptType: SermonAIPromptType.INLINE_EDIT,
              customPrompt: promptText,
              highlightedText: selectedText,
              sermonTitle: title || undefined,
              sessionId: newSessionId,
            },
          },
        });
      } catch (error) {
        console.error("Error starting inline edit stream:", error);
        if (editor && range) {
          isManipulatingHighlightRef.current = true;
          editor.chain().setTextSelection(range).unsetHighlight().run();
          setTimeout(() => {
            isManipulatingHighlightRef.current = false;
          }, 0);
        }
        setInlineEditRange(null);
        setIsGenerating(false);
        setSessionId("");
      }
    },
    [editor, isGenerating, title, streamContent],
  );

  // Stop generation
  const handleStopGeneration = useCallback(() => {
    if (
      editor &&
      streamingStartPosition !== null &&
      localAccumulatedRef.current
    ) {
      // Use tracked end position, or calculate based on current position
      const endPos = streamingEndPositionRef.current !== null 
        ? streamingEndPositionRef.current 
        : editor.state.selection.to;

      editor
        .chain()
        .focus()
        .deleteRange({ from: streamingStartPosition, to: endPos })
        .run();

      editor.chain().focus().insertContent(localAccumulatedRef.current).run();
    }

    streamedContentRef.current = "";
    fullContentRef.current = "";
    localAccumulatedRef.current = "";
    chunkStartPosRef.current = null;
    streamingEndPositionRef.current = null;
    setIsGenerating(false);
    setSessionId("");
    setStreamingStartPosition(null);
    onHasChanges();
  }, [editor, streamingStartPosition, onHasChanges]);

  return {
    isGenerating,
    isManipulatingHighlightRef,
    highlightedText,
    setHighlightedText,
    handleGenerateContent,
    handleInlineEdit,
    handleStopGeneration,
  };
};
