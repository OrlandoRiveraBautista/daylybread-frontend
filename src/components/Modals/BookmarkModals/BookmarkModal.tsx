import React, { useEffect, useRef, useState } from "react";
import {
  IonModal,
  IonContent,
  IonHeader,
  IonTitle,
  IonText,
  IonButton,
  IonSpinner,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import { IonTextareaCustomEvent, TextareaInputEventDetail } from "@ionic/core";
import { useHistory } from "react-router";

/* Context */
import { useAppContext } from "../../../context/context";

/* Styles */
import "./BookmarkModal.scss";

/* Graphql API/Hooks */
import { useCreateBookmarks } from "../../../hooks/UserHooks";

/* Services */
import { hapticService } from "../../../services/hapticService";

interface IBookmarkModal {
  isOpen: boolean;
  onDismiss: () => void;
}

const BookmarkModal: React.FC<IBookmarkModal> = ({
  isOpen,
  onDismiss,
}: IBookmarkModal) => {
  const history = useHistory();
  const { selectedVerseList, selectedVersesCitation, userInfo, chosenBible } =
    useAppContext();

  const { setBookmarks, data, error, loading } = useCreateBookmarks();
  const [note, setNote] = useState("");
  const modal = useRef<HTMLIonModalElement>(null);

  const handleBookmarkNoteInput = (
    e: IonTextareaCustomEvent<TextareaInputEventDetail>
  ) => {
    const text = e.target.value;
    setNote(typeof text === "string" ? text : "");
  };

  const handleSubmit = () => {
    const jsonifiedVerses = selectedVerseList.map((obj) => JSON.stringify(obj));

    setBookmarks({
      variables: {
        options: {
          bibleId: chosenBible?.abbr,
          verses: jsonifiedVerses,
          note: note,
        },
      },
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setNote("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!data) return;

    void hapticService.triggerSuccessHaptic();
    const timer = setTimeout(() => {
      modal.current?.dismiss();
    }, 700);

    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    if (!error) return;
    void hapticService.triggerErrorHaptic();
  }, [error]);

  return (
    <IonModal
      trigger="openBookmarkModal"
      id="openBookmarkModal"
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      handle={true}
      ref={modal}
    >
      <IonHeader className="ion-no-border bookmark-modal-header">
        <IonToolbar>
          <IonTitle className="bookmark-modal-title">Bookmark</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding bookmark-modal">
        <div className="bookmark-sheet-body">
          {userInfo ? (
            <div className="bookmark-form">
              <section className="bookmark-section" aria-label="Selected text">
                <p className="bookmark-label">Selected text</p>
                <div className="bookmark-panel">
                  <IonText>
                    <p className="bookmark-citation">
                      {selectedVersesCitation}
                    </p>
                  </IonText>
                </div>
              </section>

              <section className="bookmark-section" aria-label="Note">
                <p className="bookmark-label">Note</p>
                <div className="bookmark-field">
                  <IonTextarea
                    className="bookmark-textarea"
                    color="primary"
                    placeholder="Add a note…"
                    autoGrow={true}
                    rows={3}
                    value={note}
                    onIonInput={handleBookmarkNoteInput}
                  />
                </div>
              </section>

              <div className="bookmark-actions">
                <IonButton
                  shape="round"
                  expand="block"
                  disabled={loading}
                  fill={
                    !loading && !data
                      ? "solid"
                      : error
                        ? "clear"
                        : loading
                          ? "default"
                          : "outline"
                  }
                  onClick={handleSubmit}
                  color={
                    !loading && !data
                      ? "primary"
                      : error
                        ? "danger"
                        : loading
                          ? "warning"
                          : "success"
                  }
                >
                  {!loading && !data ? (
                    "Save"
                  ) : loading ? (
                    <IonSpinner name="crescent" />
                  ) : error ? (
                    "Try again"
                  ) : (
                    "Saved"
                  )}
                </IonButton>
              </div>
            </div>
          ) : (
            <div className="bookmark-signin">
              <h2 className="bookmark-signin-title">Sign in to bookmark</h2>
              <p className="bookmark-signin-copy">
                Save verses and notes to your profile so you can return to them
                anytime.
              </p>
              <div className="bookmark-actions">
                <IonButton
                  shape="round"
                  expand="block"
                  onClick={(e) => {
                    e.preventDefault();
                    void hapticService.triggerNavigationHaptic();
                    history.push("/login");
                  }}
                >
                  Sign in
                </IonButton>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default BookmarkModal;
