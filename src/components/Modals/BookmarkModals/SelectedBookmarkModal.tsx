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
  const { setBookmarkUpdate, data, loading, error, reset } =
    useUpdateBookmark();

  const [inputActive, setInputActive] = useState(false);
  const [noteCopy, setNoteCopy] = useState<string | null | undefined>();
  const [displayedNote, setDisplayedNote] = useState<
    string | null | undefined
  >();
  const [saveSucceeded, setSaveSucceeded] = useState(false);

  // Sync local note state whenever a bookmark is opened.
  useEffect(() => {
    if (!isOpen || !selectedBookmark) return;

    setNoteCopy(selectedBookmark.note);
    setDisplayedNote(selectedBookmark.note);
    setInputActive(false);
    setSaveSucceeded(false);
    reset();
  }, [isOpen, selectedBookmark?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!data?.updateBookmark?.results) return;

    const savedNote = data.updateBookmark.results.note;
    setDisplayedNote(savedNote);
    setNoteCopy(savedNote);
    setSaveSucceeded(true);

    const timer = setTimeout(() => {
      setInputActive(false);
      setSaveSucceeded(false);
      reset();
    }, 900);

    return () => clearTimeout(timer);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    setSaveSucceeded(false);
    setBookmarkUpdate({
      variables: {
        updateBookmarkId: selectedBookmark._id,
        options: {
          note: noteCopy,
        },
      },
    });
  };

  const handleCancelEdit = () => {
    setNoteCopy(displayedNote);
    setInputActive(false);
    setSaveSucceeded(false);
    reset();
  };

  const hasLegacyVerses = Boolean(selectedBookmark?.verses?.[0]);

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
        <div className="modal-content-container">
          <IonTitle className="ion-text-center">Bookmark</IonTitle>

          {selectedBookmark ? (
            <div className="selected-bookmark-content">
              <div className="text-container">
                <div className="verse-container">
                  <IonRow>
                    <IonText>
                      <sub>Text:</sub>
                    </IonText>
                  </IonRow>
                  {hasLegacyVerses
                    ? selectedBookmark.verses
                        .slice()
                        .sort((a, b) => Number(a.verse) - Number(b.verse))
                        .map((verse) => {
                          return (
                            <IonRow key={verse._id || verse.bibleId}>
                              <IonCol>
                                <IonText>{Number(verse.verse)}.</IonText>
                                <IonText>{verse.text}</IonText>
                              </IonCol>
                            </IonRow>
                          );
                        })
                    : selectedBookmark.newVerses
                        ?.slice()
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
                <IonRow className="ion-justify-content-end">
                  <IonText>
                    {hasLegacyVerses
                      ? getVerseVerbageByVerses(selectedBookmark.verses!)
                      : getVerseVerbageByNewVerses(
                          selectedBookmark.newVerses!,
                          selectedBookmark.bibleId!
                        )}
                  </IonText>
                </IonRow>

                {displayedNote && !inputActive ? (
                  <>
                    <IonRow>
                      <IonText>
                        <sub>Note:</sub>
                      </IonText>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonText>{displayedNote}</IonText>
                      </IonCol>
                    </IonRow>
                  </>
                ) : inputActive ? (
                  <IonTextarea
                    labelPlacement="floating"
                    color="primary"
                    value={noteCopy ?? ""}
                    fill="outline"
                    autoGrow={true}
                    onIonInput={(e) => setNoteCopy(e.target.value)}
                  />
                ) : null}
              </div>

              <IonRow className="action-buttons">
                {!displayedNote && !inputActive ? (
                  <IonButton
                    shape="round"
                    fill="solid"
                    color="secondary"
                    className="flat"
                    onClick={() => setInputActive(true)}
                    disabled={loading}
                    expand="block"
                  >
                    Add a note
                  </IonButton>
                ) : displayedNote && !inputActive ? (
                  <IonButton
                    shape="round"
                    fill="solid"
                    color="secondary"
                    className="flat"
                    onClick={() => {
                      setNoteCopy(displayedNote);
                      setInputActive(true);
                    }}
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
                      onClick={handleCancelEdit}
                      disabled={loading}
                    >
                      Cancel
                    </IonButton>
                    <IonButton
                      shape="round"
                      disabled={loading || (!displayedNote && !noteCopy)}
                      fill={
                        saveSucceeded
                          ? "outline"
                          : error
                          ? "clear"
                          : loading
                          ? "default"
                          : "solid"
                      }
                      onClick={handleSubmit}
                      color={
                        saveSucceeded
                          ? "success"
                          : error
                          ? "danger"
                          : loading
                          ? "warning"
                          : "primary"
                      }
                    >
                      {loading ? (
                        <IonSpinner />
                      ) : error ? (
                        "Something went wrong"
                      ) : saveSucceeded ? (
                        "Success"
                      ) : (
                        "Save"
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
