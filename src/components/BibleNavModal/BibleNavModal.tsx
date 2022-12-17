import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonModal,
  IonGrid,
  IonCol,
  IonRow,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonButton,
} from "@ionic/react";

/* Context */
import { useAppContext } from "../../context/context";

/* Styles */
import "./BibleNavModal.css";
import { useGetChapterById, useGetBooksById } from "../../hooks/BibleHooks";

type bibleNavOptions = "book" | "chapter" | "verse";

const BibleNavModal: React.FC = () => {
  // state
  const [navTab, setNavTab] = useState<bibleNavOptions>("book");

  // context values
  const { chosenTranslation, setChapter, setBook, chosenBook } =
    useAppContext();

  /* Queries */
  // getting books
  const { loading: booksLoading, data: booksData } = useGetBooksById(
    chosenTranslation?._id!
  );
  // getting chapters
  const { data: chapterData } = useGetChapterById(
    chosenTranslation?.books[0].bibleId + "001"
  );

  useEffect(() => {
    // check for already chosen book
    if (!booksData) return;

    setBook(booksData.getBooks[0]);
  }, [booksData]);

  useEffect(() => {
    if (!chosenTranslation || !chapterData?.getChapter) return;

    setChapter(chapterData.getChapter);
    console.log("hello");
  }, [chapterData]);

  return (
    <IonModal
      trigger="open-bible-nav-modal"
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      className="nav-modal"
    >
      <IonContent className="ion-padding nav-container">
        <div className="nav-selection-container">
          <IonGrid>
            {/* Navigation Toolbar */}
            <IonRow className="nav-toolbar">
              <IonCol>
                <IonCard button onClick={() => setNavTab("book")}>
                  <IonTitle className="chosen-bible-option">
                    {chosenBook?.bookName.slice(0, 3)}
                  </IonTitle>
                  <p>Book</p>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard button onClick={() => setNavTab("chapter")}>
                  <IonTitle className="chosen-bible-option">2</IonTitle>
                  <p>Chapter</p>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard button onClick={() => setNavTab("verse")}>
                  <IonTitle className="chosen-bible-option">3</IonTitle>
                  <p>Verse</p>
                </IonCard>
              </IonCol>
            </IonRow>

            {/* Options */}
            <div className="nav-selection">
              <IonRow>
                {booksLoading
                  ? "loading..."
                  : // looping through options
                    booksData?.getBooks.map((book, index) => (
                      <>
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
                        <IonCol
                          size="6"
                          size-md="4"
                          size-lg="2"
                          key={book.bibleId}
                        >
                          <IonCard
                            button
                            className="outlined-card"
                            onClick={() => setBook(book)}
                          >
                            <IonCardHeader>{book.bookName}</IonCardHeader>
                          </IonCard>
                        </IonCol>
                      </>
                    ))}
              </IonRow>
            </div>
          </IonGrid>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default BibleNavModal;
