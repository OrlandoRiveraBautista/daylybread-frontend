# SermonEditor - Modular Architecture

## Overview
The SermonEditor has been refactored from a single 1,110-line file into a clean, modular architecture with 291 lines in the main component (73% reduction).

## Directory Structure

```
SermonEditor/
├── SermonEditor.tsx              # Main component (291 lines)
├── SermonEditorPage.tsx          # Page wrapper
├── SermonEditor.scss             # Styles
├── index.ts                      # Public exports
├── types.ts                      # TypeScript interfaces
├── constants.ts                  # Constants and mappings
├── components/
│   ├── index.ts
│   ├── EditorHeader.tsx          # Header with navigation and save
│   ├── MenuBar.tsx               # Text formatting toolbar
│   ├── AIBreadcrumbsBar.tsx      # AI suggestions panel
│   ├── FloatingAIBar.tsx         # Floating prompt on text selection
│   └── StaticAIPromptBar.tsx     # Static prompt bar at bottom
└── hooks/
    ├── index.ts
    ├── useAIGeneration.ts        # AI content generation logic
    └── useFloatingBar.ts         # Text selection and floating bar logic
```

## Components

### Main Component (`SermonEditor.tsx`)
- Orchestrates all sub-components
- Manages editor instance and state
- Handles save operations and auto-save

### UI Components

#### `EditorHeader`
- Back navigation button
- Save button with loading state
- Save status indicator
- Title display

**Props:**
- `isNew`: boolean
- `hasChanges`: boolean
- `lastSaved`: Date | null
- `isSaving`: boolean
- `onBack`: () => void
- `onSave`: () => void

#### `MenuBar`
- Text formatting buttons (bold, italic, strikethrough)
- Heading level buttons (H1, H2, H3)
- List buttons (bullet, numbered)
- Additional formatting (blockquote, horizontal rule)

**Props:**
- `editor`: Editor | null

#### `AIBreadcrumbsBar`
- Collapsible AI suggestions panel
- Categorized prompts (Structure, Scripture, Illustrations, Application)
- Stop generation button when active

**Props:**
- `isExpanded`: boolean
- `isGenerating`: boolean
- `onToggle`: () => void
- `onSuggestionClick`: (suggestion: string) => void
- `onStopGeneration`: () => void

#### `FloatingAIBar`
- Appears above selected text
- Inline editing with AI
- Auto-focuses on appearance

**Props:**
- `show`: boolean
- `position`: { x: number; y: number }
- `prompt`: string
- `isGenerating`: boolean
- `onPromptChange`: (prompt: string) => void
- `onSubmit`: () => void
- `inputRef`: React.RefObject<HTMLInputElement>

#### `StaticAIPromptBar`
- Fixed prompt bar at bottom of editor
- Works for both new content and inline editing
- Context-aware (uses selection if available)

**Props:**
- `prompt`: string
- `isGenerating`: boolean
- `onPromptChange`: (prompt: string) => void
- `onSubmit`: () => void
- `inputRef`: React.RefObject<HTMLInputElement>

### Custom Hooks

#### `useAIGeneration`
Manages all AI content generation logic including:
- Streaming content from backend
- Token-by-token insertion
- Markdown chunk rendering
- Inline editing mode
- Error handling
- Stop generation

**Parameters:**
- `editor`: Editor | null
- `title`: string
- `getSelectedText`: () => string
- `onHasChanges`: () => void

**Returns:**
- `isGenerating`: boolean
- `isManipulatingHighlightRef`: MutableRefObject<boolean>
- `highlightedText`: string
- `setHighlightedText`: (text: string) => void
- `handleGenerateContent`: (type, prompt?) => Promise<void>
- `handleInlineEdit`: (prompt, text, range) => Promise<void>
- `handleStopGeneration`: () => void

#### `useFloatingBar`
Manages floating AI bar behavior:
- Text selection detection
- Highlighting selected text
- Positioning floating bar
- Cleanup on click outside

**Parameters:**
- `editor`: Editor | null
- `isGenerating`: boolean
- `isManipulatingHighlightRef`: MutableRefObject<boolean>

**Returns:**
- `showFloatingBar`: boolean
- `floatingBarPos`: { x: number; y: number }
- `highlightedRange`: HighlightRange | null
- `setShowFloatingBar`: (show: boolean) => void
- `closeFloatingBar`: () => void

## Types (`types.ts`)

All TypeScript interfaces for components, props, and data structures.

## Constants (`constants.ts`)

- `SUGGESTION_TO_PROMPT_TYPE`: Maps UI suggestions to backend prompt types
- `AI_PROMPT_CATEGORIES`: Categorized AI prompt suggestions
- `generateSessionId()`: Generates unique session IDs for streaming

## Benefits of Modular Architecture

1. **Maintainability**: Each component has a single responsibility
2. **Testability**: Components and hooks can be tested independently
3. **Reusability**: Components can be used in other parts of the application
4. **Readability**: Smaller, focused files are easier to understand
5. **Collaboration**: Multiple developers can work on different components
6. **Performance**: Easier to optimize and memo individual components
7. **Type Safety**: Better TypeScript inference with smaller scopes

## Usage Example

```tsx
import { SermonEditor } from "./SermonEditor";

<SermonEditor
  initialTitle="My Sermon"
  initialContent={content}
  onSave={handleSave}
  onBack={handleBack}
  isSaving={false}
  isNew={false}
/>
```

## Future Improvements

- Add unit tests for hooks
- Add component tests with React Testing Library
- Extract TipTap editor configuration to a separate hook
- Consider lazy loading components for better initial load
- Add error boundaries around component groups
