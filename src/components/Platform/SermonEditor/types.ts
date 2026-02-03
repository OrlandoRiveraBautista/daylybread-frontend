import { Editor } from "@tiptap/react";
import { SermonAIPromptType } from "../../../hooks/SermonHooks";

export interface SermonEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => Promise<void>;
  onBack: () => void;
  isSaving?: boolean;
  isNew?: boolean;
}

export interface EditorHeaderProps {
  isNew: boolean;
  hasChanges: boolean;
  lastSaved: Date | null;
  isSaving: boolean;
  onBack: () => void;
  onSave: () => void;
}

export interface MenuBarProps {
  editor: Editor | null;
}

export interface AIBreadcrumbsBarProps {
  isExpanded: boolean;
  isGenerating: boolean;
  onToggle: () => void;
  onSuggestionClick: (suggestion: string) => void;
  onStopGeneration: () => void;
}

export interface FloatingAIBarProps {
  show: boolean;
  position: { x: number; y: number };
  prompt: string;
  isGenerating: boolean;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export interface StaticAIPromptBarProps {
  prompt: string;
  isGenerating: boolean;
  onPromptChange: (prompt: string) => void;
  onSubmit: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  selectedText?: string;
  onClearSelection?: () => void;
}

export interface AICategory {
  category: string;
  icon: string;
  suggestions: string[];
}

export interface HighlightRange {
  from: number;
  to: number;
}
