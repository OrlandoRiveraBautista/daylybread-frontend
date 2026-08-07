import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

/* Utils */
import {
  getVerseVerbageByNewVerses,
  getVerseVerbageByVerses,
} from "../../../utils/support";

/* GraphQL API/Hook */
import { useUpdateBookmark } from "../../../hooks/UserHooks";

/* Services */
import { hapticService } from "../../../services/hapticService";

/* Styles */
import "./BookmarkModal.scss";

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
  const [noteCopy, setNoteCopy] = useState("");
  const [displayedNote, setDisplayedNote] = useState<
    string | null | undefined
  >();
  const [saveSucceeded, setSaveSucceeded] = useState(false);

  useEffect(() => {
    if (!isOpen || !selectedBookmark) return;

    setNoteCopy(selectedBookmark.note ?? "");
    setDisplayedNote(selectedBookmark.note);
    setInputActive(false);
    setSaveSucceeded(false);
    reset();
  }, [isOpen, selectedBookmark?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!data?.updateBookmark?.results) return;

    const savedNote = data.updateBookmark.results.note;
    setDisplayedNote(savedNote);
    setNoteCopy(savedNote ?? "");
    setSaveSucceeded(true);
    void hapticService.triggerSuccessHaptic();

    const timer = setTimeout(() => {
      setInputActive(false);
      setSaveSucceeded(false);
      reset();
    }, 900);

    return () => clearTimeout(timer);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!error) return;
    void hapticService.triggerErrorHaptic();
  }, [error]);

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
    setNoteCopy(displayedNote ?? "");
    setInputActive(false);
    setSaveSucceeded(false);
    reset();
    void hapticService.triggerNavigationHaptic();
  };

  const handleBeginEdit = () => {
    setNoteCopy(displayedNote ?? "");
    setInputActive(true);
    void hapticService.triggerNavigationHaptic();
  };

  const hasLegacyVerses = Boolean(selectedBookmark?.verses?.[0]);
  const citation = !selectedBookmark
    ? ""
    : hasLegacyVerses
      ? getVerseVerbageByVerses(selectedBookmark.verses!)
      : getVerseVerbageByNewVerses(
          selectedBookmark.newVerses!,
          selectedBookmark.bibleId!
        );

  return (
    <IonModal
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      handle={true}
      id="openBookmarkModal"
      isOpen={isOpen}
      onDidDismiss={onDismiss}
    >
      <IonHeader className="ion-no-border bookmark-modal-header">
        <IonToolbar>
          <IonTitle className="bookmark-modal-title">Bookmark</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding bookmark-modal">
        <div className="bookmark-sheet-body">
          {selectedBookmark ? (
            <div className="selected-bookmark-content">
              <section className="bookmark-section" aria-label="Verse">
                <p className="bookmark-label">Verse</p>
                <div className="bookmark-panel">
                  <div className="bookmark-verse-list">
                    {hasLegacyVerses
                      ? selectedBookmark.verses
                          .slice()
                          .sort((a, b) => Number(a.verse) - Number(b.verse))
                          .map((verse) => (
                            <div
                              className="bookmark-verse-line"
                              key={verse._id || verse.bibleId}
                            >
                              <span className="bookmark-verse-number">
                                {Number(verse.verse)}.
                              </span>
                              <IonText>
                                <p className="bookmark-verse-text">
                                  {verse.text}
                                </p>
                              </IonText>
                            </div>
                          ))
                      : selectedBookmark.newVerses
                          ?.slice()
                          .sort(
                            (a, b) =>
                              Number(a.verseStart) - Number(b.verseStart)
                          )
                          .map((verse) => (
                            <div
                              className="bookmark-verse-line"
                              key={
                                selectedBookmark.bibleId! +
                                verse.bookId! +
                                verse.chapter! +
                                verse.verseStart!
                              }
                            >
                              <span className="bookmark-verse-number">
                                {Number(verse.verseStart)}.
                              </span>
                              <IonText>
                                <p className="bookmark-verse-text">
                                  {verse.verseText}
                                </p>
                              </IonText>
                            </div>
                          ))}
                  </div>
                  <IonText>
                    <p className="bookmark-citation bookmark-citation--meta">
                      {citation}
                    </p>
                  </IonText>
                </div>
              </section>

              <section className="bookmark-section" aria-label="Note">
                <p className="bookmark-label">Note</p>

                {displayedNote && !inputActive ? (
                  <button
                    type="button"
                    className="bookmark-panel bookmark-note-button"
                    onClick={handleBeginEdit}
                    aria-label="Edit note"
                  >
                    <IonText>
                      <p className="bookmark-note-text">{displayedNote}</p>
                    </IonText>
                  </button>
                ) : inputActive ? (
                  <div className="bookmark-field">
                    <IonTextarea
                      className="bookmark-textarea"
                      color="primary"
                      value={noteCopy}
                      autoGrow={true}
                      rows={3}
                      placeholder="Add a note…"
                      onIonInput={(e) =>
                        setNoteCopy(
                          typeof e.target.value === "string"
                            ? e.target.value
                            : ""
                        )
                      }
                    />
                  </div>
                ) : (
                  <p className="bookmark-note-hint">No note yet</p>
                )}
              </section>

              <div className="bookmark-actions">
                {!displayedNote && !inputActive ? (
                  <IonButton
                    shape="round"
                    fill="solid"
                    color="primary"
                    onClick={handleBeginEdit}
                    disabled={loading}
                    expand="block"
                  >
                    Add a note
                  </IonButton>
                ) : displayedNote && !inputActive ? (
                  <IonButton
                    shape="round"
                    fill="outline"
                    color="primary"
                    onClick={handleBeginEdit}
                    disabled={loading}
                    expand="block"
                  >
                    Edit note
                  </IonButton>
                ) : (
                  <>
                    <IonButton
                      shape="round"
                      fill="clear"
                      color="medium"
                      className="bookmark-action--ghost"
                      onClick={handleCancelEdit}
                      disabled={loading}
                    >
                      Cancel
                    </IonButton>
                    <IonButton
                      shape="round"
                      expand="block"
                      disabled={loading || !noteCopy.trim()}
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
                        <IonSpinner name="crescent" />
                      ) : error ? (
                        "Try again"
                      ) : saveSucceeded ? (
                        "Saved"
                      ) : (
                        "Save"
                      )}
                    </IonButton>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SelectedBookmarkModal;
