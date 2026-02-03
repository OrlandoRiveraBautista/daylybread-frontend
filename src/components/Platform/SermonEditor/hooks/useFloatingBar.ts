import { useState, useEffect, useCallback } from "react";
import { Editor } from "@tiptap/react";
import { HighlightRange } from "../types";

export const useFloatingBar = (
  editor: Editor | null,
  isGenerating: boolean,
  isManipulatingHighlightRef: React.MutableRefObject<boolean>,
) => {
  const [selectedRange, setSelectedRange] = useState<HighlightRange | null>(
    null,
  );
  const [aiContextRange, setAiContextRange] = useState<HighlightRange | null>(
    null,
  );
  const [floatingButtonPos, setFloatingButtonPos] = useState({ x: 0, y: 0 });
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const addToAIContext = useCallback(() => {
    if (!editor || !selectedRange) return;

    // Apply highlight to the selected text
    isManipulatingHighlightRef.current = true;
    editor.chain().setTextSelection(selectedRange).setHighlight().run();
    setTimeout(() => {
      isManipulatingHighlightRef.current = false;
    }, 0);

    // Set the AI context range
    setAiContextRange(selectedRange);
    setShowFloatingButton(false);
    setSelectedRange(null);
  }, [editor, selectedRange, isManipulatingHighlightRef]);

  const clearAIContext = useCallback(() => {
    if (editor && aiContextRange) {
      // Remove highlight
      isManipulatingHighlightRef.current = true;
      editor.chain().setTextSelection(aiContextRange).unsetHighlight().run();
      setTimeout(() => {
        isManipulatingHighlightRef.current = false;
      }, 0);
    }
    setAiContextRange(null);
    setShowFloatingButton(false);
  }, [editor, aiContextRange, isManipulatingHighlightRef]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (!editor || isGenerating) return;

      const { from, to } = editor.state.selection;
      const selected = editor.state.doc.textBetween(from, to, " ");

      if (selected && selected.length > 0) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          setFloatingButtonPos({
            x: rect.left + rect.width / 2,
            y: rect.bottom + 4,
          });
          setSelectedRange({ from, to });
          setShowFloatingButton(true);
        }
      } else {
        setSelectedRange(null);
        setShowFloatingButton(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".floating-add-to-ai-btn") &&
        !target.closest(".ProseMirror")
      ) {
        setShowFloatingButton(false);
        setSelectedRange(null);
      }
    };

    document.addEventListener("mouseup", handleSelectionChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleSelectionChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editor, isGenerating]);

  return {
    aiContextRange,
    floatingButtonPos,
    showFloatingButton,
    addToAIContext,
    clearAIContext,
  };
};
