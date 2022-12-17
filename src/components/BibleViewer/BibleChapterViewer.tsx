import React, { useEffect } from "react";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleChapterViewer.css";

const BibleChapterViewer: React.FC = () => {
  const { chosenChapter } = useAppContext();

  return (
    <div id="chapter-viewer">
      <strong className="chapter-number">{chosenChapter?.chapterNumber}</strong>
      {chosenChapter
        ? chosenChapter.verses.map((verse) => (
            <span key={verse.bibleId}>
              <b>{verse.verse}:</b> {verse.text}
            </span>
          ))
        : null}
    </div>
  );
};

export default BibleChapterViewer;
