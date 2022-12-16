import React, { useEffect } from "react";
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

const BibleNavModal: React.FC = () => {
  // context values
  const { chosenTranslation, setChapter } = useAppContext();

  // getting books
  const { loading: booksLoading, data: booksData } = useGetBooksById(
    chosenTranslation?._id!
  );

  const { data: chapterData } = useGetChapterById(
    chosenTranslation?.books[0].bibleId + "001"
  );

  useEffect(() => {
    if (!chosenTranslation || !chapterData?.getChapter) return;

    setChapter(chapterData.getChapter);
  });

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
                <IonButton>1</IonButton>
              </IonCol>
              <IonCol>
                <IonButton>2</IonButton>
              </IonCol>
              <IonCol>
                <IonButton>3</IonButton>
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
                          <IonCard button className="outlined-card">
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
