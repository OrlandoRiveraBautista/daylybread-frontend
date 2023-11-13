import React, { useEffect, useState } from "react";
import {
  IonRow,
  IonCol,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";

/* Components */
import Skeleton from "../Loading/Skeleton";

/* Context */
import { useAppContext } from "../../context/context";

/** Hooks */
import {
  useGetBooks,
  useGetBooksById,
  useGetChapterById,
} from "../../hooks/BibleHooks";

export const BooksPicker: React.FC = () => {
  const { chosenTranslation, setBook, chosenBook } = useAppContext();
  const [bookId, setBookId] = useState<string>(
    chosenBook ? chosenBook.bibleId : ""
  );

  /* Queries */
  // getting books for displaying in the book selector
  const { loading: booksLoading, data: booksData } = useGetBooks(
    chosenTranslation?._id!
  );

  // api call for chosen book id
  const { data: bookData } = useGetBooksById(bookId!);

  useEffect(() => {
    const element = document.getElementById(chosenBook?.bibleId!);

    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useEffect(() => {
    if (!bookData) return;
    if (bookData.getBookById === chosenBook) return; // only update if the chapter has changed

    // set chosen book data to global state
    setBook(bookData.getBookById);
  }, [bookData]); //watch book api data

  /**
   * Function to render loading skeleton animation
   * @augments -
   * @returns JSX.Element[]
   */
  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push(
        <React.Fragment key={i}>
          <IonCol size="6" size-md="4" size-lg="4" key={i}>
            <Skeleton height="120px" width="100%" shape="square" />
          </IonCol>
        </React.Fragment>
      );
    }

    return items;
  };

  return (
    <div className="nav-selection">
      <IonRow>
        {booksLoading ? (
          <>
            <Skeleton height="24px" width="100%" shape="square" />
            {renderSkeleton()}
          </>
        ) : (
          // looping through options
          booksData?.getBooks.map((book, index) => (
            <React.Fragment key={index}>
              {/* old testament title */}
              {index === 0 ? (
                <IonCol size="12">
                  <IonTitle>Old Testament</IonTitle>
                </IonCol>
              ) : null}

              {/* new testament title */}
              {index + 1 === 40 ? (
                <IonCol size="12">
                  <IonTitle>New Testament</IonTitle>
                </IonCol>
              ) : null}

              {/* options rendering */}
              <IonCol size="6" size-md="4" size-lg="4" key={book.bibleId}>
                <IonCard
                  id={book.bibleId}
                  button
                  className={`outlined-card ${
                    book.bibleId === bookId ? "selected" : ""
                  }`}
                  onClick={() => setBookId(book.bibleId)}
                >
                  <IonCardContent>
                    <div className="book-number">{index + 1}</div>
                  </IonCardContent>
                  <IonCardHeader>
                    <IonCardTitle>{book.bookName}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </React.Fragment>
          ))
        )}
      </IonRow>
    </div>
  );
};

export const ChapterPicker: React.FC = () => {
  const [chapterId, setChapterId] = useState<string>();
  const { chosenBook, setChapter, chosenChapter } = useAppContext();

  // getting chapters
  const { data: chapterData } = useGetChapterById(chapterId!);

  useEffect(() => {
    if (!chapterData) return;

    setChapter(chapterData.getChapter);
  }, [chapterData]);

  useEffect(() => {
    const element = document.getElementById(chosenChapter?.bibleId!);

    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  /**
   * Function to render loading skeleton animation
   * @augments -
   * @returns JSX.Element[]
   */
  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 16; i++) {
      items.push(
        <>
          <IonCol size="6" size-md="4" size-lg="4" key={i}>
            <Skeleton height="66px" width="100%" shape="square" />
          </IonCol>
        </>
      );
    }

    return items;
  };

  return (
    <div className="nav-selection">
      <IonRow>
        {!chosenBook
          ? renderSkeleton()
          : // looping through options
            chosenBook.chapters.map((chapter, index) => (
              <React.Fragment key={index}>
                {/* options rendering */}
                <IonCol size="6" size-md="4" size-lg="4" key={chapter.bibleId}>
                  <IonCard
                    id={chapter.bibleId}
                    button
                    className={`outlined-card ${
                      chosenChapter?.bibleId === chapter.bibleId
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => setChapterId(chapter.bibleId)}
                  >
                    <IonCardContent>
                      <div className="book-number">{chapter.chapterName}</div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </React.Fragment>
            ))}
      </IonRow>
    </div>
  );
};
