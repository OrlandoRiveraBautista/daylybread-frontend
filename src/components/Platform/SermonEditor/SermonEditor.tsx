import React, { useEffect, useCallback, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import {
  IonButton,
  IonIcon,
  IonSpinner,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonPage,
  IonChip,
  IonTextarea,
} from "@ionic/react";
import {
  arrowBack,
  save,
  cloudDone,
  text,
  sparkles,
  listOutline,
  bookOutline,
  bulbOutline,
  peopleOutline,
  chevronDown,
  chevronUp,
  sendOutline,
  stopCircleOutline,
} from "ionicons/icons";
import "./SermonEditor.scss";
import {
  useStreamSermonContent,
  useSermonAIStream,
  SermonAIPromptType,
} from "../../../hooks/SermonHooks";

interface SermonEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => Promise<void>;
  onBack: () => void;
  isSaving?: boolean;
  isNew?: boolean;
}

// Map UI suggestions to backend prompt types
const SUGGESTION_TO_PROMPT_TYPE: Record<string, SermonAIPromptType> = {
  // Structure
  "Start with an engaging opening story": SermonAIPromptType.OPENING_STORY,
  "Develop 3 main points": SermonAIPromptType.MAIN_POINTS,
  "Add a clear call to action": SermonAIPromptType.CALL_TO_ACTION,
  "Create smooth transitions": SermonAIPromptType.TRANSITIONS,
  // Scripture
  "Add relevant Bible verses": SermonAIPromptType.RELEVANT_VERSES,
  "Explain the historical context": SermonAIPromptType.HISTORICAL_CONTEXT,
  "Connect Old and New Testament": SermonAIPromptType.TESTAMENT_CONNECTION,
  "Use cross-references": SermonAIPromptType.CROSS_REFERENCES,
  // Illustrations
  "Include a personal testimony": SermonAIPromptType.PERSONAL_TESTIMONY,
  "Add a modern-day example": SermonAIPromptType.MODERN_EXAMPLE,
  "Use analogies from daily life": SermonAIPromptType.DAILY_LIFE_ANALOGY,
  "Reference current events": SermonAIPromptType.CURRENT_EVENTS,
  // Application
  "Make it practical for daily life": SermonAIPromptType.PRACTICAL_APPLICATION,
  "Address common challenges": SermonAIPromptType.ADDRESS_CHALLENGES,
  "Provide actionable steps": SermonAIPromptType.ACTIONABLE_STEPS,
  "Encourage reflection questions": SermonAIPromptType.REFLECTION_QUESTIONS,
};

// Generate a unique session ID for streaming
const generateSessionId = () => `sermon-ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

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
  const [isAIBarExpanded, setIsAIBarExpanded] = useState(true);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // AI-related state
  const [customPrompt, setCustomPrompt] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [streamingStartPosition, setStreamingStartPosition] = useState<number | null>(null);
  const streamedContentRef = useRef<string>(""); // Accumulates current chunk for markdown rendering
  const fullContentRef = useRef<string>(""); // Stores full content from backend [FULL] message
  const localAccumulatedRef = useRef<string>(""); // Accumulates locally for early stop case
  const chunkStartPosRef = useRef<number | null>(null); // Tracks where the current raw text chunk starts
  
  // AI streaming hooks
  const [streamContent] = useStreamSermonContent();
  const { data: streamData } = useSermonAIStream(sessionId, !isGenerating || !sessionId);

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
      Markdown,
    ],
    content: getInitialContent(),
    onUpdate: () => {
      setHasChanges(true);
    },
  });

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

  // Get selected/highlighted text from editor
  const getSelectedText = useCallback(() => {
    if (!editor) return "";
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, " ");
  }, [editor]);

  // Helper function to render a markdown chunk
  const renderMarkdownChunk = useCallback(() => {
    if (!editor || chunkStartPosRef.current === null || !streamedContentRef.current) return;
    
    const currentPos = editor.state.selection.to;
    const chunkContent = streamedContentRef.current;
    
    // Delete the raw text for this chunk
    editor.chain()
      .focus()
      .deleteRange({ from: chunkStartPosRef.current, to: currentPos })
      .run();
    
    // Insert the chunk as formatted markdown
    editor.chain()
      .focus()
      .insertContent(chunkContent)
      .run();
    
    // After inserting, check if we're inside a list or nested structure
    // and exit it to prevent indentation issues with subsequent chunks
    const { $from } = editor.state.selection;
    const isInList = $from.node($from.depth - 1)?.type.name === 'listItem' || 
                     $from.node($from.depth - 2)?.type.name === 'bulletList' ||
                     $from.node($from.depth - 2)?.type.name === 'orderedList';
    const isInBlockquote = $from.node($from.depth - 1)?.type.name === 'blockquote';
    
    if (isInList || isInBlockquote) {
      // Move to end of document and create a new paragraph outside the structure
      editor.chain()
        .focus()
        .setTextSelection(editor.state.doc.content.size - 1)
        .createParagraphNear()
        .run();
    }
    
    // Update chunk start position for next chunk
    chunkStartPosRef.current = editor.state.selection.to;
    
    // Clear the accumulated chunk
    streamedContentRef.current = "";
  }, [editor]);

  // Handle streaming data - insert tokens directly into editor
  useEffect(() => {
    if (!streamData?.sermonAIStream || !editor || !isGenerating) return;

    const token = streamData.sermonAIStream;

    // Check for full content from backend (sent before [DONE])
    if (token.startsWith("[FULL]")) {
      // Store the full content from the backend for final replacement
      fullContentRef.current = token.substring(6); // Remove "[FULL]" prefix
      return;
    }

    // Check for completion signal
    if (token === "[DONE]") {
      // Replace all streamed content with the full content from the backend
      // This ensures nothing is missing
      if (streamingStartPosition !== null && fullContentRef.current) {
        const currentPos = editor.state.selection.to;
        
        // Delete everything that was streamed (including rendered chunks)
        editor.chain()
          .focus()
          .deleteRange({ from: streamingStartPosition, to: currentPos })
          .run();
        
        // Insert the full content as markdown
        editor.chain()
          .focus()
          .insertContent(fullContentRef.current)
          .run();
      }
      
      // Reset streaming state
      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";
      chunkStartPosRef.current = null;
      setIsGenerating(false);
      setSessionId("");
      setStreamingStartPosition(null);
      setHasChanges(true);
      setCustomPrompt(""); // Clear custom prompt after completion
      return;
    }

    if (token.startsWith("[ERROR]")) {
      console.error("AI Stream Error:", token);
      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";
      chunkStartPosRef.current = null;
      setIsGenerating(false);
      setSessionId("");
      setStreamingStartPosition(null);
      return;
    }

    // Accumulate the token for chunk rendering and local fallback
    streamedContentRef.current += token;
    localAccumulatedRef.current += token; // Keep local copy for early stop case

    // Insert the token as plain text for real-time display
    editor.chain().focus().insertContent({
      type: 'text',
      text: token,
    }).run();

    // Check if we have a complete markdown block (ends with double newline)
    // This indicates a paragraph/section break - render the chunk as markdown
    if (streamedContentRef.current.endsWith("\n\n")) {
      renderMarkdownChunk();
    }
  }, [streamData, editor, isGenerating, streamingStartPosition, renderMarkdownChunk]);

  // Handle AI content generation with streaming
  const handleGenerateContent = useCallback(
    async (promptType: SermonAIPromptType, customPromptText?: string) => {
      if (!editor || isGenerating) return;

      // Generate a new session ID
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setIsGenerating(true);
      
      // Reset the accumulated content and chunk tracking
      streamedContentRef.current = "";
      fullContentRef.current = "";
      localAccumulatedRef.current = "";
      chunkStartPosRef.current = null;

      // Ensure we're in a safe position for streaming (not inside a list item)
      // Check if we're in a list and exit it if needed
      const { $from } = editor.state.selection;
      const isInList = $from.node($from.depth - 1)?.type.name === 'listItem' || 
                       $from.node($from.depth - 2)?.type.name === 'bulletList' ||
                       $from.node($from.depth - 2)?.type.name === 'orderedList';
      
      if (isInList) {
        // Exit the list and create a new paragraph
        editor.chain().focus().liftListItem('listItem').insertContent("\n\n").run();
      } else {
        // Add a newline before streaming
        editor.chain().focus().insertContent("\n\n").run();
      }
      
      // Store the position AFTER adding newlines - this is where streamed content starts
      const streamStartPos = editor.state.selection.to;
      setStreamingStartPosition(streamStartPos);
      chunkStartPosRef.current = streamStartPos; // Also start chunk tracking from here

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
        setIsGenerating(false);
        setSessionId("");
        setStreamingStartPosition(null);
      }
    },
    [editor, isGenerating, getSelectedText, highlightedText, title, streamContent]
  );

  // Stop generation
  const handleStopGeneration = useCallback(() => {
    // Replace all streamed content with the locally accumulated text
    // (since [FULL] from backend won't be received on early stop)
    if (editor && streamingStartPosition !== null && localAccumulatedRef.current) {
      const currentPos = editor.state.selection.to;
      
      // Delete everything that was streamed
      editor.chain()
        .focus()
        .deleteRange({ from: streamingStartPosition, to: currentPos })
        .run();
      
      // Insert the locally accumulated content as markdown
      editor.chain()
        .focus()
        .insertContent(localAccumulatedRef.current)
        .run();
    }
    
    streamedContentRef.current = "";
    fullContentRef.current = "";
    localAccumulatedRef.current = "";
    chunkStartPosRef.current = null;
    setIsGenerating(false);
    setSessionId("");
    setStreamingStartPosition(null);
    setHasChanges(true);
  }, [editor, streamingStartPosition]);

  // Handle suggestion chip click
  const handleSuggestionClick = (suggestion: string) => {
    const promptType = SUGGESTION_TO_PROMPT_TYPE[suggestion];
    if (promptType) {
      // Capture highlighted text before generating
      setHighlightedText(getSelectedText());
      handleGenerateContent(promptType);
    }
  };

  // Handle custom prompt submission
  const handleCustomPromptSubmit = () => {
    if (customPrompt.trim() && !isGenerating) {
      setHighlightedText(getSelectedText());
      handleGenerateContent(SermonAIPromptType.CUSTOM, customPrompt);
    }
  };

  const AIBreadcrumbsBar = () => {
    const prompts = [
      {
        category: "Structure",
        icon: listOutline,
        suggestions: [
          "Start with an engaging opening story",
          "Develop 3 main points",
          "Add a clear call to action",
          "Create smooth transitions",
        ],
      },
      {
        category: "Scripture",
        icon: bookOutline,
        suggestions: [
          "Add relevant Bible verses",
          "Explain the historical context",
          "Connect Old and New Testament",
          "Use cross-references",
        ],
      },
      {
        category: "Illustrations",
        icon: bulbOutline,
        suggestions: [
          "Include a personal testimony",
          "Add a modern-day example",
          "Use analogies from daily life",
          "Reference current events",
        ],
      },
      {
        category: "Application",
        icon: peopleOutline,
        suggestions: [
          "Make it practical for daily life",
          "Address common challenges",
          "Provide actionable steps",
          "Encourage reflection questions",
        ],
      },
    ];

    return (
      <div className={`ai-breadcrumbs-bar ${isAIBarExpanded ? 'expanded' : 'collapsed'} ${isGenerating ? 'generating' : ''}`}>
        <div className="ai-bar-header" onClick={() => !isGenerating && setIsAIBarExpanded(!isAIBarExpanded)}>
          <div className="ai-bar-title">
            <IonIcon icon={sparkles} />
            <span>AI Writing Assistant</span>
            {isGenerating && (
              <>
                <IonSpinner name="dots" className="ai-spinner" />
                <span className="generating-text">Writing...</span>
              </>
            )}
          </div>
          {isGenerating ? (
            <IonButton
              fill="clear"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleStopGeneration();
              }}
              className="stop-button"
            >
              <IonIcon icon={stopCircleOutline} />
              <span>Stop</span>
            </IonButton>
          ) : (
            <IonIcon icon={isAIBarExpanded ? chevronUp : chevronDown} className="toggle-icon" />
          )}
        </div>
        
        {isAIBarExpanded && !isGenerating && (
          <div className="ai-bar-content">
            {/* Custom Prompt Input */}
            <div className="custom-prompt-section">
              <div className="custom-prompt-input">
                <IonTextarea
                  placeholder="Ask BreadCrumbs anything... (e.g., 'Help me explain grace to new believers' or 'Suggest illustrations for forgiveness')"
                  value={customPrompt}
                  onIonInput={(e) => setCustomPrompt(e.detail.value || "")}
                  rows={2}
                  className="prompt-textarea"
                  disabled={isGenerating}
                />
                <IonButton
                  fill="solid"
                  size="small"
                  onClick={handleCustomPromptSubmit}
                  disabled={!customPrompt.trim() || isGenerating}
                  className="send-button"
                >
                  <IonIcon icon={sendOutline} />
                </IonButton>
              </div>
              {getSelectedText() && (
                <div className="highlighted-text-indicator">
                  <IonIcon icon={text} />
                  <span>Selected text will be included: "{getSelectedText().substring(0, 50)}..."</span>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="quick-suggestions-label">Quick suggestions:</div>
            {prompts.map((category) => (
              <div key={category.category} className="ai-category">
                <div className="category-header">
                  <IonIcon icon={category.icon} />
                  <span>{category.category}</span>
                </div>
                <div className="category-suggestions">
                  {category.suggestions.map((suggestion, index) => (
                    <IonChip
                      key={index}
                      className="suggestion-chip"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </IonChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const MenuBar = () => {
    if (!editor) return null;

    return (
      <div className="menu-bar">
        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        <div className="menu-divider" />

        <div className="menu-group">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
            title="Heading 3"
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "is-active" : ""}
            title="Paragraph"
          >
            <IonIcon icon={text} />
          </button>
        </div>

        <div className="menu-divider" />

        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
            title="Bullet List"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
            title="Numbered List"
          >
            1.
          </button>
        </div>

        <div className="menu-divider" />

        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
            title="Quote"
          >
            "
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            —
          </button>
        </div>
      </div>
    );
  };

  return (
    <IonPage className="sermon-editor-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onBack}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>
            {isNew ? "New Sermon" : "Edit Sermon"}
          </IonTitle>
          <IonButtons slot="end">
            {lastSaved && !hasChanges && (
              <div className="save-status saved">
                <IonIcon icon={cloudDone} />
                <span>All changes saved</span>
              </div>
            )}
            {hasChanges && !isSaving && (
              <div className="save-status unsaved">
                <span>Unsaved changes</span>
              </div>
            )}
            <IonButton
              onClick={handleSave}
              disabled={isSaving || (!hasChanges && !isNew)}
              fill="solid"
              shape="round"
              color="primary"
              className="save-button"
            >
              {isSaving ? (
                <>
                  <IonSpinner name="crescent" className="button-spinner" />
                  Saving...
                </>
              ) : (
                <>
                  <IonIcon slot="start" icon={save} className="button-icon" />
                  Save
                </>
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

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

          <AIBreadcrumbsBar />

          <MenuBar />

          <div className="editor-wrapper">
            <EditorContent editor={editor} className="tiptap-editor" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
