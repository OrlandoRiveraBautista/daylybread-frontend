import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonText,
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
import {
  useLazyOpenAI,
  useOpenAIResponseStream,
} from "../../hooks/OpenAIHooks";

/* Hooks */
import { useHaptic } from "../../hooks/useHaptic";

/* Styles */
import "../BibleNavModal/BibleNavModal.scss";
import "./BreadCrumbsModal.scss";

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
  // selectedText,
  initialBreakpoint,
}: IBreadCrumbsModal) => {
  // state
  const [messages, setMessages] = useState<IMessagesObject[]>([]);
  const [useChosenTextVerbage, setUseChosenTextVerbage] =
    useState<boolean>(false);

  // context values
  const { selectedVersesCitation, deviceInfo } = useAppContext();
  const { getChatGpt, data } = useLazyOpenAI();
  const { streamBuffer: openAIReponseStream } = useOpenAIResponseStream(
    deviceInfo?.id || ""
  );
  const { triggerSuccessHaptic } = useHaptic();

  // useEffect(() => {
  //   console.log("getting messages", JSON.stringify(messages));
  // }, [messages]);

  useEffect(() => {
    if (!data) return;
    if (!data?.getOpen) return;
    const temp = [...messages];
    const openAIMessage = data.getOpen;

    if (temp[temp.length - 1].sender === "You") {
      temp.push({
        message: openAIMessage,
        sender: "BreadCrumbs",
      });
    } else {
      temp[temp.length - 1].message = openAIMessage;
    }

    setMessages(temp);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // use effect for the stream of response
  useEffect(() => {
    if (!openAIReponseStream || !messages.length) return;

    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];

      // If the last message is from the user, create a new AI message
      if (lastMessage.sender === "You") {
        return [
          ...prevMessages,
          {
            message: openAIReponseStream,
            sender: "BreadCrumbs",
          },
        ];
      }

      // If the last message is from BreadCrumbs and it doesn't already contain this response
      if (
        lastMessage.sender === "BreadCrumbs" &&
        !lastMessage.message.includes(openAIReponseStream)
      ) {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...lastMessage,
          message: openAIReponseStream,
        };
        return updatedMessages;
      }

      return prevMessages;
    });
  }, [openAIReponseStream]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (value: string) => {
    let inputValue = value;
    if (useChosenTextVerbage) {
      inputValue += selectedVersesCitation;
    }
    const messageObject: IMessagesObject = {
      message: inputValue,
      sender: "You",
    };
    setMessages((prevMessage) => [...prevMessage, messageObject]);

    // Trigger haptic feedback when user submits a message
    triggerSuccessHaptic();

    getChatGpt({
      variables: {
        options: {
          promptText: inputValue,
          deviceId: deviceInfo!.id,
        },
      },
    });

    return;
  };

  /**
   *  Function will check for modal breakpoint change and set the inner grid accordingly
   * @param e: IonModalCustomEvent<ModalBreakpointChangeEventDetail>
   * @returns void
   */
  const handleBreakpointChange = (
    e: IonModalCustomEvent<ModalBreakpointChangeEventDetail | void>
  ) => {
    // get modal
    const target = document.getElementById("ion-react-wrapper");

    if (!target) return; // if no modal end function

    // when the modal opens up
    if (!e.detail) {
      target.style.height = `75%`;
      return;
    }

    // check for breakpoint being less than or equal to .75 and if full-height is set
    if (e.detail.breakpoint >= 0.7) {
      target.style.height = `${e.detail.breakpoint * 100}%`;
    }
  };

  const getBreakpoints = () => {
    // if (navigator.userAgent.includes("iPhone")) {
    //   return [0, 0.25, 0.75, 0.97];
    // }
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
      backdropBreakpoint={0.5}
      onDidPresent={(e) => handleBreakpointChange(e)}
    >
      <IonHeader className="ion-no-border breadcrumbs-modal-header">
        <IonToolbar>
          <IonTitle className="product-sans">BreadCrumbs Chat</IonTitle>
        </IonToolbar>
        {selectedVersesCitation ? (
          <div className="selected-indicator-container">
            <div className="selected-indicator">
              {/* Label row */}
              <div className="selected-indicator-top">
                <IonText className="selected-indicator-label">
                  Selected text
                </IonText>
                <div className="selected-indicator-actions">
                  <SelectedTextQuickActions />
                </div>
              </div>

              {/* Citation + include toggle — single tappable row */}
              <button
                className={`citation-toggle ${useChosenTextVerbage ? "citation-toggle--on" : ""}`}
                onClick={() => setUseChosenTextVerbage(!useChosenTextVerbage)}
              >
                <div className="citation-toggle-text">
                  <IonText className="selected-citation">
                    {selectedVersesCitation}
                  </IonText>
                  <IonText className="selected-indicator-hint">
                    {useChosenTextVerbage
                      ? "Included with your next message"
                      : "Tap to include with next message"}
                  </IonText>
                </div>
                <div className={`citation-pill ${useChosenTextVerbage ? "citation-pill--on" : ""}`}>
                  <span>{useChosenTextVerbage ? "On" : "Off"}</span>
                </div>
              </button>
            </div>
          </div>
        ) : null}
      </IonHeader>
      <IonContent className="ion-padding bread-crumbs-modal-content">
        <IonGrid>
          <div className="chat-container">
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
