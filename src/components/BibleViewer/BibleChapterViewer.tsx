import React, { useEffect } from "react";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleChapterViewer.css";

const BibleChapterViewer: React.FC = () => {
  const { chosenChapter } = useAppContext();

  useEffect(() => {
    console.log(chosenChapter);
  });

  return (
    <div id="chapter-viewer">
      <strong className="chapter-number">{chosenChapter?.chapterNumber}</strong>
      {chosenChapter
        ? chosenChapter.verses.map((verse) => (
            <span>
              <b>{verse.verse}:</b> {verse.text}
            </span>
          ))
        : null}
    </div>
  );
};

export default BibleChapterViewer;
