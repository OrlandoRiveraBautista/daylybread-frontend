import React, { useEffect, useState } from "react";
import { IonRow, IonCol, IonTitle, IonCard, IonCardHeader } from "@ionic/react";

/* Context */
import { useAppContext } from "../../context/context";

/** Hooks */
import {
  useGetBooks,
  useGetBooksById,
  useGetChapterById,
} from "../../hooks/BibleHooks";

export const BooksPicker: React.FC = () => {
  const [bookId, setBookId] = useState<string>();
  const { chosenTranslation, setBook } = useAppContext();

  /* Queries */
  // getting books
  const { loading: booksLoading, data: booksData } = useGetBooks(
    chosenTranslation?._id!
  );

  const { data: bookData } = useGetBooksById(bookId!);

  useEffect(() => {
    if (!bookData) return;

    setBook(bookData.getBookById);
  }, [bookData]);

  return (
    <div className="nav-selection">
      <IonRow>
        {booksLoading
          ? "loading..."
          : // looping through options
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
                <IonCol size="6" size-md="4" size-lg="2" key={book.bibleId}>
                  <IonCard
                    button
                    className="outlined-card"
                    onClick={() => setBookId(book.bibleId)}
                  >
                    <IonCardHeader>{book.bookName}</IonCardHeader>
                  </IonCard>
                </IonCol>
              </React.Fragment>
            ))}
      </IonRow>
    </div>
  );
};

export const ChapterPicker: React.FC = () => {
  const [chapterId, setChapterId] = useState<string>();
  const { chosenBook, setChapter } = useAppContext();

  // getting chapters
  const { data: chapterData } = useGetChapterById(chapterId!);

  useEffect(() => {
    if (!chapterData) return;

    setChapter(chapterData.getChapter);
  }, [chapterData]);

  return (
    <div className="nav-selection">
      <IonRow>
        {!chosenBook
          ? "Please pick a book to begin"
          : // looping through options
            chosenBook.chapters.map((chapter, index) => (
              <React.Fragment key={index}>
                {/* options rendering */}
                <IonCol size="6" size-md="4" size-lg="2" key={chapter.bibleId}>
                  <IonCard
                    button
                    className="outlined-card"
                    onClick={() => setChapterId(chapter.bibleId)}
                  >
                    <IonCardHeader>{chapter.chapterName}</IonCardHeader>
                  </IonCard>
                </IonCol>
              </React.Fragment>
            ))}
      </IonRow>
    </div>
  );
};
