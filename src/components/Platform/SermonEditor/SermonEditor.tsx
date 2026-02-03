import React, { useEffect, useCallback, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { Markdown } from "tiptap-markdown";
import { IonContent, IonPage } from "@ionic/react";
import { SermonAIPromptType } from "../../../hooks/SermonHooks";
import "./SermonEditor.scss";
import { SermonEditorProps } from "./types";
import { SUGGESTION_TO_PROMPT_TYPE } from "./constants";
import { EditorHeader } from "./components/EditorHeader";
import { MenuBar } from "./components/MenuBar";
import { AIBreadcrumbsBar } from "./components/AIBreadcrumbsBar";
import { StaticAIPromptBar } from "./components/StaticAIPromptBar";
import { FloatingAddToAIButton } from "./components/FloatingAddToAIButton";
import { useAIGeneration } from "./hooks/useAIGeneration";
import { useFloatingBar } from "./hooks/useFloatingBar";

export const SermonEditor: React.FC<SermonEditorProps> = ({
  initialTitle = "",
  initialContent = "",
  onSave,
  onBack,
  isSaving = false,
  isNew = true,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAIBarExpanded, setIsAIBarExpanded] = useState(!initialContent);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const staticInputRef = useRef<HTMLInputElement>(null);

  // Static prompt state
  const [staticPrompt, setStaticPrompt] = useState("");
  const [selectedTextForStatic, setSelectedTextForStatic] = useState("");

  // Parse initial content - it may be JSON or HTML
  const getInitialContent = () => {
    if (!initialContent) return "";
    try {
      // Try to parse as JSON (Tiptap format)
      const parsed = JSON.parse(initialContent);
      return parsed;
    } catch {
      // If not JSON, treat as HTML or plain text
      return initialContent;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your sermon...",
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "ai-selection-highlight",
        },
      }),
      Markdown,
    ],
    content: getInitialContent(),
    onUpdate: () => {
      setHasChanges(true);
    },
  });

  // Get selected/highlighted text from editor
  const getSelectedText = useCallback(() => {
    if (!editor) return "";
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, " ");
  }, [editor]);

  // Initialize AI generation hook
  const {
    isGenerating,
    isManipulatingHighlightRef,
    setHighlightedText,
    handleGenerateContent,
    handleInlineEdit,
    handleStopGeneration,
  } = useAIGeneration(editor, title, getSelectedText, () => setHasChanges(true));

  // Track text selection for AI context
  const {
    aiContextRange,
    floatingButtonPos,
    showFloatingButton,
    addToAIContext,
    clearAIContext,
  } = useFloatingBar(editor, isGenerating, isManipulatingHighlightRef);

  // Update selected text for static bar when AI context range changes
  useEffect(() => {
    if (editor && aiContextRange) {
      const text = editor.state.doc.textBetween(
        aiContextRange.from,
        aiContextRange.to,
        " "
      );
      setSelectedTextForStatic(text);
    } else {
      setSelectedTextForStatic("");
    }
  }, [editor, aiContextRange]);

  // Don't mark as changed when manipulating highlights
  useEffect(() => {
    if (editor) {
      editor.on("update", () => {
        if (!isManipulatingHighlightRef.current) {
          setHasChanges(true);
        }
      });
    }
  }, [editor, isManipulatingHighlightRef]);

  // Update editor content when initialContent changes
  useEffect(() => {
    if (editor && initialContent) {
      const content = getInitialContent();
      editor.commands.setContent(content);
      setHasChanges(false);
    }
  }, [initialContent]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update title when initialTitle changes
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  // Auto-focus title input for new sermons
  useEffect(() => {
    if (isNew && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isNew]);

  const handleSave = useCallback(async () => {
    if (!editor) return;

    const content = JSON.stringify(editor.getJSON());
    await onSave(title || "Untitled Sermon", content);
    setHasChanges(false);
    setLastSaved(new Date());
  }, [editor, title, onSave]);

  // Auto-save every 30 seconds if there are changes
  useEffect(() => {
    if (!hasChanges) return;

    const autoSaveTimeout = setTimeout(() => {
      handleSave();
    }, 30000);

    return () => clearTimeout(autoSaveTimeout);
  }, [hasChanges, handleSave]);


  // Handle suggestion chip click
  const handleSuggestionClick = (suggestion: string) => {
    const promptType = SUGGESTION_TO_PROMPT_TYPE[suggestion];
    if (promptType) {
      setHighlightedText(getSelectedText());
      handleGenerateContent(promptType);
    }
  };

  // Handle clearing the AI context
  const handleClearSelection = useCallback(() => {
    clearAIContext();
    setSelectedTextForStatic("");
    setStaticPrompt("");
  }, [clearAIContext]);

  // Handle static prompt bar submission
  const handleStaticPromptSubmit = useCallback(async () => {
    if (staticPrompt.trim() && !isGenerating && editor) {
      const selected = selectedTextForStatic;

      // If there's AI context text, use inline edit mode
      if (selected && aiContextRange) {
        const promptText = staticPrompt;
        setStaticPrompt("");
        await handleInlineEdit(promptText, selected, aiContextRange);
        // Clear AI context after editing
        handleClearSelection();
      } else {
        // No AI context - add new content at cursor position
        setHighlightedText("");
        handleGenerateContent(SermonAIPromptType.CUSTOM, staticPrompt);
        setStaticPrompt("");
      }
    }
  }, [
    staticPrompt,
    isGenerating,
    editor,
    selectedTextForStatic,
    aiContextRange,
    handleGenerateContent,
    handleInlineEdit,
    setHighlightedText,
    handleClearSelection,
  ]);

  return (
    <IonPage className="sermon-editor-page">
      <EditorHeader
        isNew={isNew}
        hasChanges={hasChanges}
        lastSaved={lastSaved}
        isSaving={isSaving}
        onBack={onBack}
        onSave={handleSave}
      />

      <IonContent className="sermon-editor-content">
        <div className="editor-container">
          <div className="title-input-container">
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              placeholder="Untitled Sermon"
              onChange={(e) => {
                setTitle(e.target.value);
                setHasChanges(true);
              }}
              className="title-input"
              maxLength={200}
            />
          </div>

          <AIBreadcrumbsBar
            isExpanded={isAIBarExpanded}
            isGenerating={isGenerating}
            onToggle={() => setIsAIBarExpanded(!isAIBarExpanded)}
            onSuggestionClick={handleSuggestionClick}
            onStopGeneration={handleStopGeneration}
          />

          <MenuBar editor={editor} />

          <div className="editor-wrapper">
            <EditorContent editor={editor} className="tiptap-editor" />
            
            <FloatingAddToAIButton
              show={showFloatingButton}
              position={floatingButtonPos}
              onAddToAI={addToAIContext}
            />
          </div>

          <StaticAIPromptBar
            prompt={staticPrompt}
            isGenerating={isGenerating}
            onPromptChange={setStaticPrompt}
            onSubmit={handleStaticPromptSubmit}
            inputRef={staticInputRef}
            selectedText={selectedTextForStatic}
            onClearSelection={handleClearSelection}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};
