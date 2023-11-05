import React, { useEffect, useRef, useState } from "react";
import {
  IonModal,
  IonContent,
  IonTitle,
  IonRow,
  IonText,
  IonCol,
  IonButton,
  IonSpinner,
  IonTextarea,
} from "@ionic/react";
import { IonTextareaCustomEvent, TextareaInputEventDetail } from "@ionic/core";
import { useHistory } from "react-router";

/* Support */
import { getCitationVerbage } from "../../../utils/support";

/* Context */
import { useAppContext } from "../../../context/context";

/* Styles */
import "./BookmarkModal.scss";

/* Graphql API/Hooks */
import { useCreateBookmarks } from "../../../hooks/UserHooks";

/* Interfaces */
interface IBookmarkModal {
  isOpen: boolean;
  onDismiss: () => void;
}
const BookmarkModal: React.FC<IBookmarkModal> = ({
  isOpen,
  onDismiss,
}: IBookmarkModal) => {
  const history = useHistory();
  // global state
  const { selectedVerseList, chosenBook, chosenChapter, userInfo } =
    useAppContext();

  // graphql hooks
  const { setBookmarks, data, error, loading } = useCreateBookmarks();

  // local state
  const [note, setNote] = useState<string | undefined>();

  const modal = useRef<HTMLIonModalElement>(null);

  const handleBookmarkNoteInput = (
    e: IonTextareaCustomEvent<TextareaInputEventDetail>
  ) => {
    const text = e.target.value;
    if (!text || typeof text === "number") return;
    setNote(text);
  };

  const handleSubmit = () => {
    setBookmarks({
      variables: {
        options: {
          note: note,
          verses: selectedVerseList.map((v) => v.bibleId),
        },
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      modal.current?.dismiss();
    }, 1000);
  }, [data]);

  return (
    <IonModal
      trigger="openBookmarkModal"
      id="openBookmarkModal"
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      ref={modal}
    >
      <IonContent className="ion-padding bookmark-modal">
        <div className="modal-content-container">
          <IonTitle className="ion-text-center">Bookmark</IonTitle>
          {userInfo ? (
            <>
              <div>
                <IonRow>
                  <IonText>
                    <sub>Selected Text</sub>
                  </IonText>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonText>
                      {getCitationVerbage(
                        selectedVerseList,
                        chosenBook!,
                        chosenChapter!
                      )}
                    </IonText>
                  </IonCol>
                </IonRow>
              </div>
              <div className="bookmark-form">
                <IonRow>
                  <IonCol>
                    <IonTextarea
                      labelPlacement="floating"
                      color="primary"
                      placeholder="Leave a note!"
                      autoGrow={true}
                      fill="outline"
                      value={note}
                      onIonInput={(event) => handleBookmarkNoteInput(event)}
                    ></IonTextarea>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonButton
                      shape="round"
                      expand="block"
                      disabled={loading ? true : false}
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
                  </IonCol>
                </IonRow>
              </div>
            </>
          ) : (
            <div className="bookmark-form">
              <IonTitle className="ion-text-center">
                Sign in to create a bookmark
              </IonTitle>
              <IonRow>
                <IonCol>
                  <IonButton
                    shape="round"
                    expand="block"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/login");
                    }}
                  >
                    Sign in
                  </IonButton>
                </IonCol>
              </IonRow>
            </div>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default BookmarkModal;
