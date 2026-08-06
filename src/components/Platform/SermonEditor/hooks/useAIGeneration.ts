import { useState, useRef, useCallback, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { DOMParser as ProseMirrorDOMParser } from "@tiptap/pm/model";
import {
  useStreamSermonContent,
  useSermonAIStream,
  SermonAIPromptType,
} from "../../../../hooks/SermonHooks";
import { generateSessionId } from "../constants";
import { HighlightRange } from "../types";

/**
 * Insert block markdown into the editor.
 * tiptap-markdown's insertContent/insertContentAt always parse strings as
 * *inline* markdown, which merges headings with following text and leaves
 * literal \\n in nodes — so we parse as block HTML and replace via PM.
 */
function replaceRangeWithMarkdown(
  editor: Editor,
  from: number,
  to: number,
  markdown: string,
) {
  const parser = (editor.storage as any)?.markdown?.parser;
  if (!parser || typeof markdown !== "string" || !markdown.trim()) {
    return false;
  }

  const html: string = parser.parse(markdown); // block parse (no inline:true)
  const dom = document.createElement("div");
  dom.innerHTML = html;
  const slice = ProseMirrorDOMParser.fromSchema(editor.schema).parseSlice(dom);

  const safeFrom = Math.max(1, Math.min(from, editor.state.doc.content.size));
  const safeTo = Math.max(
    safeFrom,
    Math.min(to, editor.state.doc.content.size),
  );

  const tr = editor.state.tr.replaceRange(safeFrom, safeTo, slice);
  editor.view.dispatch(tr);
  return true;
}

function insertMarkdownAt(
  editor: Editor,
  pos: number,
  markdown: string,
) {
  return replaceRangeWithMarkdown(editor, pos, pos, markdown);
}

/**
 * Soft-close unfinished markdown so live preview doesn't look broken mid-stream
 * (unclosed **, `, or ``` fences) — same idea as ChatGPT's progressive render.
 */
function stabilizeStreamingMarkdown(markdown: string): string {
  let text = markdown;

  // Close an open fenced code block
  const fenceCount = (text.match(/^```/gm) || []).length;
  if (fenceCount % 2 === 1) {
    text += "\n```";
  }

  // Close odd inline code backticks (ignore fences)
  const withoutFences = text.replace(/```[\s\S]*?```/g, "");
  const tickCount = (withoutFences.match(/`/g) || []).length;
  if (tickCount % 2 === 1) {
    text += "`";
  }

  // Close unclosed bold/italic markers (** or *)
  const boldCount = (text.match(/\*\*/g) || []).length;
  if (boldCount % 2 === 1) {
    text += "**";
  } else {
    // Only auto-close single * when not part of **
    const stripped = text.replace(/\*\*/g, "");
    const italicCount = (stripped.match(/\*/g) || []).length;
    if (italicCount % 2 === 1) {
      text += "*";
    }
  }

  return text;
}

export const useAIGeneration = (
  editor: Editor | null,
  title: string,
  getSelectedText: () => string,
  onHasChanges: () => void,
) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState("");

  const streamedContentRef = useRef<string>("");
  const fullContentRef = useRef<string>("");
  const localAccumulatedRef = useRef<string>("");
  const streamingEndPositionRef = useRef<number | null>(null);
  const streamingStartPositionRef = useRef<number | null>(null);
  const inlineEditRangeRef = useRef<HighlightRange | null>(null);
  const isGeneratingRef = useRef(false);
  const activeSessionRef = useRef<string>("");
  const isManipulatingHighlightRef = useRef<boolean>(false);
  const editorRef = useRef<Editor | null>(editor);
  editorRef.current = editor;
  const liveRenderRafRef = useRef<number | null>(null);
  const liveRenderPendingRef = useRef(false);

  /** Resolves once the WS subscription for the current session should be live. */
  const subscriptionReadyResolveRef = useRef<(() => void) | null>(null);

  const [streamContent] = useStreamSermonContent();

  const resetStreamState = useCallback(() => {
    if (liveRenderRafRef.current != null) {
      cancelAnimationFrame(liveRenderRafRef.current);
      liveRenderRafRef.current = null;
    }
    liveRenderPendingRef.current = false;
    streamedContentRef.current = "";
    fullContentRef.current = "";
    localAccumulatedRef.current = "";
    streamingEndPositionRef.current = null;
    streamingStartPositionRef.current = null;
    inlineEditRangeRef.current = null;
    isGeneratingRef.current = false;
    activeSessionRef.current = "";
    subscriptionReadyResolveRef.current = null;
    setIsGenerating(false);
    setSessionId("");
  }, []);

  /** Re-render the full accumulated markdown buffer into the stream range (block parse). */
  const renderLiveMarkdown = useCallback(() => {
    liveRenderPendingRef.current = false;
    liveRenderRafRef.current = null;

    const activeEditor = editorRef.current;
    const streamStart = streamingStartPositionRef.current;
    const markdown = localAccumulatedRef.current;

    if (
      !activeEditor ||
      !isGeneratingRef.current ||
      streamStart === null ||
      !markdown
    ) {
      return;
    }

    // Skip live block render for inline edits — only swap on finalize.
    if (inlineEditRangeRef.current) return;

    const docEnd = activeEditor.state.doc.content.size;
    const endPos = Math.min(
      Math.max(streamingEndPositionRef.current ?? streamStart, streamStart),
      docEnd,
    );

    const preview = stabilizeStreamingMarkdown(markdown);
    const sizeBefore = activeEditor.state.doc.content.size;
    const ok = replaceRangeWithMarkdown(
      activeEditor,
      streamStart,
      endPos,
      preview,
    );
    if (!ok) return;

    const sizeAfter = activeEditor.state.doc.content.size;
    streamingEndPositionRef.current = endPos + (sizeAfter - sizeBefore);

    // Keep caret at the end of the streamed region for a ChatGPT-like feel.
    const caret = Math.min(
      streamingEndPositionRef.current,
      activeEditor.state.doc.content.size,
    );
    activeEditor.commands.setTextSelection(caret);
  }, []);

  const scheduleLiveMarkdownRender = useCallback(() => {
    liveRenderPendingRef.current = true;
    if (liveRenderRafRef.current != null) return;
    liveRenderRafRef.current = requestAnimationFrame(() => {
      // Coalesce bursts: one more frame so multiple tokens in the same tick merge.
      liveRenderRafRef.current = requestAnimationFrame(() => {
        if (liveRenderPendingRef.current) {
          renderLiveMarkdown();
        } else {
          liveRenderRafRef.current = null;
        }
      });
    });
  }, [renderLiveMarkdown]);

  const finalizeStream = useCallback(() => {
    if (liveRenderRafRef.current != null) {
      cancelAnimationFrame(liveRenderRafRef.current);
      liveRenderRafRef.current = null;
    }
    liveRenderPendingRef.current = false;

    const activeEditor = editorRef.current;
    const isInlineEdit = inlineEditRangeRef.current !== null;
    const inlineRange = inlineEditRangeRef.current;
    const streamStart = streamingStartPositionRef.current;

    if (!activeEditor) {
      resetStreamState();
      onHasChanges();
      return;
    }

    // Prefer the authoritative full payload from the server.
    const contentToInsert =
      fullContentRef.current ||
      localAccumulatedRef.current ||
      streamedContentRef.current;

    if (isInlineEdit && inlineRange) {
      if (contentToInsert) {
        isManipulatingHighlightRef.current = true;
        activeEditor
          .chain()
          .focus()
          .setTextSelection(inlineRange)
          .unsetHighlight()
          .run();
        isManipulatingHighlightRef.current = false;

        const replaced = replaceRangeWithMarkdown(
          activeEditor,
          inlineRange.from,
          inlineRange.to,
          contentToInsert,
        );
        if (!replaced) {
          // Fallback: plain insert (may be inline-parsed)
          activeEditor
            .chain()
            .focus()
            .setTextSelection(inlineRange)
            .deleteSelection()
            .insertContent(contentToInsert)
            .run();
        }
      }
    } else if (streamStart !== null && contentToInsert) {
      const docEnd = activeEditor.state.doc.content.size;
      const endPos = Math.min(
        Math.max(streamingEndPositionRef.current ?? docEnd, streamStart),
        docEnd,
      );

      const replaced = replaceRangeWithMarkdown(
        activeEditor,
        streamStart,
        endPos,
        contentToInsert,
      );

      if (!replaced) {
        if (endPos > streamStart) {
          activeEditor
            .chain()
            .focus()
            .deleteRange({ from: streamStart, to: endPos })
            .run();
        }
        insertMarkdownAt(activeEditor, streamStart, contentToInsert);
      }
    }

    resetStreamState();
    onHasChanges();
  }, [onHasChanges, resetStreamState]);

  const handleStreamToken = useCallback(
    (token: string) => {
      const activeEditor = editorRef.current;
      if (!activeEditor || !isGeneratingRef.current) return;

      if (token.startsWith("[FULL]")) {
        fullContentRef.current = token.substring(6);
        return;
      }

      if (token === "[DONE]") {
        // Flush any pending live frame, then finalize with authoritative FULL text.
        if (liveRenderRafRef.current != null) {
          cancelAnimationFrame(liveRenderRafRef.current);
          liveRenderRafRef.current = null;
        }
        liveRenderPendingRef.current = false;
        finalizeStream();
        return;
      }

      if (token.startsWith("[ERROR]")) {
        console.error("AI Stream Error:", token);
        const inlineRange = inlineEditRangeRef.current;
        if (inlineRange) {
          isManipulatingHighlightRef.current = true;
          activeEditor
            .chain()
            .setTextSelection(inlineRange)
            .unsetHighlight()
            .run();
          setTimeout(() => {
            isManipulatingHighlightRef.current = false;
          }, 0);
        }
        resetStreamState();
        return;
      }

      // Accumulate markdown; re-render the whole buffer as formatted blocks (throttled).
      streamedContentRef.current += token;
      localAccumulatedRef.current += token;

      if (inlineEditRangeRef.current) {
        // Inline edit: keep highlight until finalize (no live flicker in selection).
        return;
      }

      scheduleLiveMarkdownRender();
    },
    [finalizeStream, resetStreamState, scheduleLiveMarkdownRender],
  );

  // Stable callback identity so Apollo doesn't tear down the subscription.
  const handleStreamTokenRef = useRef(handleStreamToken);
  handleStreamTokenRef.current = handleStreamToken;
  const onStreamToken = useCallback((token: string) => {
    handleStreamTokenRef.current(token);
  }, []);

  useSermonAIStream(
    sessionId,
    !isGenerating || !sessionId,
    onStreamToken,
  );

  // After sessionId is set and subscription is enabled, allow the mutation to start.
  useEffect(() => {
    if (!isGenerating || !sessionId) return;
    const resolve = subscriptionReadyResolveRef.current;
    if (!resolve) return;
    subscriptionReadyResolveRef.current = null;
    // Give graphql-ws a beat to send Subscribe before tokens are published.
    const t = window.setTimeout(resolve, 120);
    return () => window.clearTimeout(t);
  }, [isGenerating, sessionId]);

  const waitForSubscription = useCallback((nextSessionId: string) => {
    return new Promise<void>((resolve) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      subscriptionReadyResolveRef.current = done;
      // Safety: never block generation forever if effect doesn't run.
      window.setTimeout(done, 400);
      // If state already matches (re-entry), resolve on next macrotask.
      if (activeSessionRef.current === nextSessionId && isGeneratingRef.current) {
        window.setTimeout(done, 120);
      }
    });
  }, []);

  // Handle AI content generation
  const handleGenerateContent = useCallback(
    async (promptType: SermonAIPromptType, customPromptText?: string) => {
      if (!editor || isGenerating) return;

      const newSessionId = generateSessionId();
      activeSessionRef.current = newSessionId;
      setSessionId(newSessionId);
      setIsGenerating(true);
      isGeneratingRef.current = true;

      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";
      streamingEndPositionRef.current = null;
      inlineEditRangeRef.current = null;

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
      streamingStartPositionRef.current = streamStartPos;

      try {
        await waitForSubscription(newSessionId);

        // Bail if user stopped while waiting.
        if (
          !isGeneratingRef.current ||
          activeSessionRef.current !== newSessionId
        ) {
          return;
        }

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

        // Mutation finished — if [DONE] never arrived (missed WS events), finalize/reset.
        if (
          isGeneratingRef.current &&
          activeSessionRef.current === newSessionId
        ) {
          window.setTimeout(() => {
            if (
              isGeneratingRef.current &&
              activeSessionRef.current === newSessionId
            ) {
              if (
                fullContentRef.current ||
                localAccumulatedRef.current
              ) {
                finalizeStream();
              } else {
                resetStreamState();
              }
            }
          }, 600);
        }
      } catch (error) {
        console.error("Error starting stream:", error);
        resetStreamState();
      }
    },
    [
      editor,
      isGenerating,
      getSelectedText,
      highlightedText,
      title,
      streamContent,
      resetStreamState,
      waitForSubscription,
      finalizeStream,
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

      inlineEditRangeRef.current = range;

      const newSessionId = generateSessionId();
      activeSessionRef.current = newSessionId;
      setSessionId(newSessionId);
      setIsGenerating(true);
      isGeneratingRef.current = true;

      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";
      streamingStartPositionRef.current = null;

      try {
        await waitForSubscription(newSessionId);

        if (
          !isGeneratingRef.current ||
          activeSessionRef.current !== newSessionId
        ) {
          return;
        }

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

        if (
          isGeneratingRef.current &&
          activeSessionRef.current === newSessionId
        ) {
          window.setTimeout(() => {
            if (
              isGeneratingRef.current &&
              activeSessionRef.current === newSessionId
            ) {
              if (
                fullContentRef.current ||
                localAccumulatedRef.current
              ) {
                finalizeStream();
              } else {
                if (range) {
                  isManipulatingHighlightRef.current = true;
                  editor
                    .chain()
                    .setTextSelection(range)
                    .unsetHighlight()
                    .run();
                  setTimeout(() => {
                    isManipulatingHighlightRef.current = false;
                  }, 0);
                }
                resetStreamState();
              }
            }
          }, 600);
        }
      } catch (error) {
        console.error("Error starting inline edit stream:", error);
        if (editor && range) {
          isManipulatingHighlightRef.current = true;
          editor.chain().setTextSelection(range).unsetHighlight().run();
          setTimeout(() => {
            isManipulatingHighlightRef.current = false;
          }, 0);
        }
        resetStreamState();
      }
    },
    [
      editor,
      isGenerating,
      title,
      streamContent,
      resetStreamState,
      waitForSubscription,
      finalizeStream,
    ],
  );

  // Stop generation
  const handleStopGeneration = useCallback(() => {
    const activeEditor = editorRef.current;
    const streamStart = streamingStartPositionRef.current;
    const accumulated = localAccumulatedRef.current;

    if (activeEditor && streamStart !== null && accumulated) {
      const docEnd = activeEditor.state.doc.content.size;
      const endPos = Math.min(
        Math.max(streamingEndPositionRef.current ?? docEnd, streamStart),
        docEnd,
      );
      replaceRangeWithMarkdown(activeEditor, streamStart, endPos, accumulated);
    } else if (inlineEditRangeRef.current && activeEditor) {
      isManipulatingHighlightRef.current = true;
      activeEditor
        .chain()
        .setTextSelection(inlineEditRangeRef.current)
        .unsetHighlight()
        .run();
      setTimeout(() => {
        isManipulatingHighlightRef.current = false;
      }, 0);
    }

    resetStreamState();
    onHasChanges();
  }, [onHasChanges, resetStreamState]);

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
