import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonModal,
  IonRow,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
} from "@ionic/react";

/* Utils */
import {
  getVerseVerbageByNewVerses,
  getVerseVerbageByVerses,
} from "../../../utils/support";

/* GraphQL API/Hook */
import { useUpdateBookmark } from "../../../hooks/UserHooks";

/* Interfaces */
import { Bookmark } from "../../../__generated__/graphql";
interface ISelectedBookmarkModal {
  isOpen: boolean;
  onDismiss: () => void;
  selectedBookmark: Bookmark;
}
const SelectedBookmarkModal: React.FC<ISelectedBookmarkModal> = ({
  isOpen,
  onDismiss,
  selectedBookmark,
}: ISelectedBookmarkModal) => {
  // hook
  const { setBookmarkUpdate, data, loading, error } = useUpdateBookmark();

  // local storage
  const [inputActive, setInputActive] = useState<boolean>(false);
  const [noteCopy, setNoteCopy] = useState(
    selectedBookmark ? selectedBookmark.note : undefined
  );

  useEffect(() => {
    if (!data) return;

    setInputActive(!inputActive);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    setBookmarkUpdate({
      variables: {
        updateBookmarkId: selectedBookmark._id,
        options: {
          note: noteCopy,
        },
      },
    });
  };

  return (
    <IonModal
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      id="openBookmarkModal"
      isOpen={isOpen}
      onDidDismiss={onDismiss}
    >
      <IonContent
        className="ion-padding bookmark-modal"
        id="selectedBookmarkModal"
      >
        {/* Modal content container */}
        <div className="modal-content-container">
          {/* Title */}
          <IonTitle className="ion-text-center">Bookmark</IonTitle>

          {/* Content */}
          {selectedBookmark ? (
            <div className="selected-bookmark-content">
              {/* Verses, section label, and note input container */}
              <div className="text-container">
                {/* Verse and label */}
                <div className="verse-container">
                  <IonRow>
                    <IonText>
                      <sub>Text:</sub>
                    </IonText>
                  </IonRow>
                  {selectedBookmark.verses[0]
                    ? selectedBookmark.verses
                        .slice()
                        .sort((a, b) => Number(a.verse) - Number(b.verse))
                        .map((verse) => {
                          return (
                            <IonRow key={verse.bibleId}>
                              <IonCol>
                                <IonText>{Number(verse.verse)}.</IonText>
                                <IonText>{verse.text}</IonText>
                              </IonCol>
                            </IonRow>
                          );
                        })
                    : selectedBookmark
                        .newVerses!.slice()
                        .sort(
                          (a, b) => Number(a.verseStart) - Number(b.verseStart)
                        )
                        .map((verse) => {
                          return (
                            <IonRow
                              key={
                                selectedBookmark.bibleId! +
                                verse.bookId! +
                                verse.chapter! +
                                verse.verseStart!
                              }
                            >
                              <IonCol>
                                <IonText>{Number(verse.verseStart)}.</IonText>
                                <IonText>{verse.verseText}</IonText>
                              </IonCol>
                            </IonRow>
                          );
                        })}
                </div>
                {/* Verse verbage */}
                <IonRow className="ion-justify-content-end">
                  <IonText>
                    <a
                      href={`/read/${selectedBookmark.languageId}/${
                        selectedBookmark.bibleId
                      }/${selectedBookmark.newVerses![0].bookId}/${
                        selectedBookmark.newVerses![0].chapter
                      }`}
                    >
                      {selectedBookmark.verses[0]
                        ? getVerseVerbageByVerses(selectedBookmark.verses!)
                        : getVerseVerbageByNewVerses(
                            selectedBookmark.newVerses!,
                            selectedBookmark.bibleId!
                          )}
                    </a>
                  </IonText>
                </IonRow>

                {/* Note or input field to add note */}
                {selectedBookmark.note && !inputActive ? (
                  <>
                    <IonRow>
                      <IonText>
                        <sub>Note:</sub>
                      </IonText>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonText>{selectedBookmark.note}</IonText>
                      </IonCol>
                    </IonRow>
                  </>
                ) : inputActive ? (
                  <IonTextarea
                    labelPlacement="floating"
                    color="primary"
                    value={noteCopy}
                    fill="outline"
                    autoGrow={true}
                    onIonInput={(e) => setNoteCopy(e.target.value)}
                  />
                ) : null}
              </div>

              {/* Set of buttons for action */}
              <IonRow className="action-buttons">
                {!selectedBookmark.note && !inputActive ? (
                  <IonButton
                    shape="round"
                    fill="solid"
                    color="secondary"
                    className="flat"
                    onClick={() => setInputActive(!inputActive)}
                    disabled={loading}
                    expand="block"
                  >
                    Add a note
                  </IonButton>
                ) : selectedBookmark.note && !inputActive ? (
                  <IonButton
                    shape="round"
                    fill="solid"
                    color="secondary"
                    className="flat"
                    onClick={() => setInputActive(!inputActive)}
                    disabled={loading}
                  >
                    Edit note
                  </IonButton>
                ) : (
                  <>
                    <IonButton
                      shape="round"
                      fill="clear"
                      color="medium"
                      className="flat"
                      onClick={() => setInputActive(!inputActive)}
                      disabled={loading}
                    >
                      Cancel
                    </IonButton>
                    <IonButton
                      shape="round"
                      disabled={
                        loading || (!selectedBookmark.note && !noteCopy)
                          ? true
                          : false
                      }
                      fill={
                        !loading && !data
                          ? "solid"
                          : error
                          ? "clear"
                          : loading && !data
                          ? "default"
                          : "outline"
                      }
                      onClick={handleSubmit}
                      color={
                        !loading && !data
                          ? "primary"
                          : error
                          ? "danger"
                          : loading && !data
                          ? "warning"
                          : "success"
                      }
                    >
                      {!loading && !data ? (
                        "Save"
                      ) : loading && !data ? (
                        <IonSpinner />
                      ) : error ? (
                        "Something went wrong"
                      ) : (
                        "Success"
                      )}
                    </IonButton>
                  </>
                )}
              </IonRow>
            </div>
          ) : null}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SelectedBookmarkModal;
