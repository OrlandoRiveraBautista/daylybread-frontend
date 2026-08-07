import React, { useEffect, useCallback } from "react";
import {
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";

/* Components */
import Skeleton from "../Loading/Skeleton";

/* Context */
import { useAppContext } from "../../context/context";

/* Types */
import { BbBook } from "../../__generated__/graphql";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll an element into view on mount and expose a manual scroll helper.
 */
const useScrollIntoView = (
  selectedId: string | number | undefined,
  prefix: string
) => {
  const scrollToElement = useCallback(
    (id: string | number) => {
      const element = document.getElementById(`${prefix}-${id}`);
      element?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
    },
    [prefix]
  );

  useEffect(() => {
    if (selectedId === undefined) return;
    // Double rAF so the sheet content is painted before scrolling
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToElement(selectedId);
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return scrollToElement;
};

interface BooksPickerProps {
  onBookSelected?: () => void;
}

export const BooksPicker: React.FC<BooksPickerProps> = ({ onBookSelected }) => {
  const {
    setBook,
    chosenBook,
    setChapterNumber,
    chosenChapterNumber,
    chosenBibleBooks,
    setLocalChapters,
    setIsProgrammaticSlide,
  } = useAppContext();

  const scrollToBook = useScrollIntoView(
    chosenBook?.bookId ?? undefined,
    "book"
  );

  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push(
        <React.Fragment key={i}>
          <IonCol size="6" size-md="4" size-lg="4">
            <Skeleton height="72px" width="100%" shape="square" />
          </IonCol>
        </React.Fragment>
      );
    }
    return items;
  };

  const handleSettingBook = (book: BbBook) => {
    if (book.bookId !== chosenBook?.bookId) setBook(book);
    if (chosenChapterNumber !== 1 || book.bookId !== chosenBook?.bookId) {
      setLocalChapters([]);
      setChapterNumber(1);
    }
    scrollToBook(book.bookId!);
    setIsProgrammaticSlide({ value: true });
    onBookSelected?.();
  };

  return (
    <div className="nav-selection">
      <IonRow>
        {!chosenBibleBooks ? (
          <>
            <IonCol size="12">
              <Skeleton height="24px" width="40%" shape="square" />
            </IonCol>
            {renderSkeleton()}
          </>
        ) : (
          chosenBibleBooks.map((book, index) => (
            <IonCol size="6" size-md="4" size-lg="4" key={book.bookId}>
              <IonCard
                id={`book-${book.bookId}`}
                button
                className={`outlined-card book-card ${
                  book.bookId === chosenBook?.bookId ? "selected" : ""
                }`}
                onClick={() => handleSettingBook(book)}
              >
                <IonCardContent className="book-card-content">
                  <div className="book-number">{index + 1}</div>
                  <div className="book-info">
                    <IonCardTitle className="book-title">
                      {book.name}
                    </IonCardTitle>
                    <IonCardSubtitle className="book-group">
                      {book.bookGroup}
                    </IonCardSubtitle>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))
        )}
      </IonRow>
    </div>
  );
};

interface ChapterPickerProps {
  onChapterSelected?: () => void;
}

export const ChapterPicker: React.FC<ChapterPickerProps> = ({
  onChapterSelected,
}) => {
  const {
    chosenBook,
    setChapterNumber,
    chosenChapterNumber,
    setLocalChapters,
    setIsProgrammaticSlide,
  } = useAppContext();

  const scrollToChapter = useScrollIntoView(chosenChapterNumber, "chapter");

  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push(
        <div key={i} className="chapter-cell chapter-cell--skeleton" />
      );
    }
    return items;
  };

  const handleSettingChapter = (chapter: number) => {
    if (chapter !== chosenChapterNumber) {
      setLocalChapters([]);
      setChapterNumber(chapter);
    }
    scrollToChapter(chapter);
    setIsProgrammaticSlide({ value: true });
    onChapterSelected?.();
  };

  return (
    <div className="nav-selection chapter-grid">
      {!chosenBook
        ? renderSkeleton()
        : chosenBook.chapters?.map((chapter) => (
            <button
              type="button"
              key={chapter}
              id={`chapter-${chapter}`}
              className={`chapter-cell ${
                chosenChapterNumber === chapter
                  ? "chapter-cell--selected"
                  : ""
              }`}
              onClick={() => handleSettingChapter(chapter!)}
              aria-pressed={chosenChapterNumber === chapter}
            >
              {chapter}
            </button>
          ))}
    </div>
  );
};
