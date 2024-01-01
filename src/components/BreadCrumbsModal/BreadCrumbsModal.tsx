import React, { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonModal,
  IonGrid,
  IonCol,
  IonRow,
  IonText,
  IonCheckbox,
} from "@ionic/react";
import {
  IonModalCustomEvent,
  ModalBreakpointChangeEventDetail,
} from "@ionic/core";

/** Components */
import BreadCrumbsChat from "./BreadCrumbsChat/BreadCrumbsChat";
import SelectedTextQuickActions from "./SelectedTextQuickActions/SelectedTextQuickActions";

/* Context */
import { useAppContext } from "../../context/context";

/* Query Hooks */
import { useOpenAI, useOpenAIResponseStream } from "../../hooks/OpenAIHooks";

/* Styles */
import "../BibleNavModal/BibleNavModal.scss";
import "./BreadCrumbsModal.scss";

/* Utils */
import { getCitationVerbage } from "../../utils/support";

/* Interfaces */
import {
  IBreadCrumbsModal,
  IMessagesObject,
} from "../../interfaces/BreadCrumbsModalInterfaces";

/**
 * BreadCrumbs Modal is a modal that contains actions for the bible assistant
 * @param {IBreadCrumbsModal} { isOpen: boolean, onDismiss: () => void }
 * @returns
 */
const BreadCrumbsModal: React.FC<IBreadCrumbsModal> = ({
  isOpen,
  onDismiss,
  selectedText,
  initialBreakpoint,
}: IBreadCrumbsModal) => {
  // state
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [messages, setMessages] = useState<IMessagesObject[]>([]);
  const [chosenTextVerbage, setChosenTextVerbage] = useState<string>();
  const [useChosenTextVerbage, setUseChosenTextVerbage] =
    useState<boolean>(false);

  // reference
  const breadCrumbsModalGrid = useRef<HTMLIonGridElement>(null);

  // context values
  const { chosenChapter, chosenBook, selectedVerseList } = useAppContext();
  const openAIResponse = useOpenAI(inputPrompt);
  const { data: openAIReponseStream } = useOpenAIResponseStream();

  useEffect(() => {
    // exit function if there are no selected verses
    if (!selectedVerseList || !chosenBook || !chosenChapter) return;
    if (selectedVerseList.length < 1) {
      setChosenTextVerbage(undefined);
      return;
    }

    const text = getCitationVerbage(
      selectedVerseList,
      chosenBook,
      chosenChapter
    );

    setChosenTextVerbage(text);
    //for some reason selectedText needs to be watched to timely modify
  }, [selectedVerseList, selectedText]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (openAIResponse.loading) return;
    if (!openAIResponse.data?.getOpen) return;
    const openAIMessage = openAIResponse.data.getOpen;

    messages[messages.length - 1].message = openAIMessage;

    setMessages(messages);
    setInputPrompt("");
  }, [openAIResponse]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (openAIReponseStream?.aiChatReponseUpdated === undefined) return;
    const streamResponse = openAIReponseStream?.aiChatReponseUpdated;

    if (!messages.length) return;

    if (
      messages[messages.length - 1] &&
      messages[messages.length - 1].sender === "You"
    ) {
      const messageObject: IMessagesObject = {
        message: streamResponse,
        sender: "BreadCrumbs",
      };
      setMessages((prevMessage) => [...prevMessage, messageObject]);
      return;
    }
    const temp = [...messages];

    temp[temp.length - 1].message += streamResponse;

    setMessages(temp);
  }, [openAIReponseStream]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (value: string) => {
    let inputValue = value;
    if (useChosenTextVerbage) {
      inputValue += chosenTextVerbage;
    }
    setInputPrompt(inputValue);
    const messageObject: IMessagesObject = {
      message: inputValue,
      sender: "You",
    };

    setMessages((prevMessage) => [...prevMessage, messageObject]);
  };

  /**
   *  Function will check for modal breakpoint change and set the inner grid accordingly
   * @param e: IonModalCustomEvent<ModalBreakpointChangeEventDetail>
   * @returns void
   */
  const handleBreakpointChange = (
    e: IonModalCustomEvent<ModalBreakpointChangeEventDetail>
  ) => {
    // get modal
    const target = breadCrumbsModalGrid.current;
    if (!target) return; // if no modal end function

    // check for breakpoint being less than or equal to .75 and if full-height is set
    if (e.detail.breakpoint >= 0.7) {
      target.style.height = `${e.detail.breakpoint * 100}%`;
    }
  };

  const getBreakpoints = () => {
    if (navigator.userAgent.includes("iPhone")) {
      return [0, 0.25, 0.75, 0.97];
    }
    return [0, 0.25, 0.75, 1];
  };

  return (
    <IonModal
      initialBreakpoint={initialBreakpoint || 0.25}
      breakpoints={getBreakpoints()}
      className="nav-modal"
      isOpen={isOpen}
      onDidDismiss={() => (isOpen ? onDismiss() : null)}
      id="bread-crumbs-modal"
      onIonBreakpointDidChange={(e) => handleBreakpointChange(e)}
      backdropDismiss={false}
      backdropBreakpoint={0.5}
    >
      <IonContent className="ion-padding ">
        <IonGrid ref={breadCrumbsModalGrid}>
          {chosenTextVerbage ? (
            <IonRow>
              <IonCol className="selected-indicator">
                {/* Row is for quick actions on the selected text, it is always on the selected text */}
                <IonRow>
                  <SelectedTextQuickActions />
                </IonRow>
                <IonRow>
                  <IonText>
                    <sub>Selected Text</sub>
                  </IonText>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonCheckbox
                      className="selected-text-checkbox"
                      checked={useChosenTextVerbage}
                      onIonChange={() =>
                        setUseChosenTextVerbage(!useChosenTextVerbage)
                      }
                    >
                      <IonText>{chosenTextVerbage}</IonText>
                    </IonCheckbox>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
          ) : null}
          <div
            className={`chat-container ${
              chosenTextVerbage ? "max-height" : ""
            }`}
          >
            <BreadCrumbsChat
              onSubmit={handleSubmit}
              messages={messages}
              useChosenTextVerbage={useChosenTextVerbage}
            />
          </div>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default BreadCrumbsModal;
