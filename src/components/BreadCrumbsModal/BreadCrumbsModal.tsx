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
import "./BreadCrumbsModal.scss";

/* Interfaces */
import {
  IBreadCrumbsModal,
  IMessagesObject,
} from "../../interfaces/BreadCrumbsModalInterfaces";

/**
 * BreadCrumbs Modal — AI bible assistant sheet
 */
const BreadCrumbsModal: React.FC<IBreadCrumbsModal> = ({
  isOpen,
  onDismiss,
  initialBreakpoint,
}: IBreadCrumbsModal) => {
  const [messages, setMessages] = useState<IMessagesObject[]>([]);
  const [useChosenTextVerbage, setUseChosenTextVerbage] =
    useState<boolean>(false);

  const { selectedVersesCitation, deviceInfo } = useAppContext();
  const { getChatGpt, data } = useLazyOpenAI();
  const { streamBuffer: openAIReponseStream } = useOpenAIResponseStream(
    deviceInfo?.id || ""
  );
  const { triggerSuccessHaptic, triggerNavigationHaptic } = useHaptic();

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

  useEffect(() => {
    if (!openAIReponseStream || !messages.length) return;

    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];

      if (lastMessage.sender === "You") {
        return [
          ...prevMessages,
          {
            message: openAIReponseStream,
            sender: "BreadCrumbs",
          },
        ];
      }

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

    triggerSuccessHaptic();

    getChatGpt({
      variables: {
        options: {
          promptText: inputValue,
          deviceId: deviceInfo!.id,
        },
      },
    });
  };

  const handleCitationToggle = () => {
    triggerNavigationHaptic();
    setUseChosenTextVerbage((prev) => !prev);
  };

  /**
   * Keep the modal wrapper height in sync with sheet breakpoints
   */
  const handleBreakpointChange = (
    e: IonModalCustomEvent<ModalBreakpointChangeEventDetail | void>
  ) => {
    const target = document.getElementById("ion-react-wrapper");
    if (!target) return;

    if (!e.detail) {
      target.style.height = `75%`;
      return;
    }

    if (e.detail.breakpoint >= 0.7) {
      target.style.height = `${e.detail.breakpoint * 100}%`;
    }
  };

  return (
    <IonModal
      initialBreakpoint={initialBreakpoint || 0.25}
      breakpoints={[0, 0.25, 0.75, 1]}
      handle={true}
      className="breadcrumbs-modal"
      isOpen={isOpen}
      onDidDismiss={() => (isOpen ? onDismiss() : null)}
      id="bread-crumbs-modal"
      onIonBreakpointDidChange={(e) => handleBreakpointChange(e)}
      backdropBreakpoint={0.5}
      onDidPresent={(e) => handleBreakpointChange(e)}
    >
      <IonHeader className="ion-no-border breadcrumbs-modal-header">
        <IonToolbar>
          <IonTitle>BreadCrumbs</IonTitle>
        </IonToolbar>
        {selectedVersesCitation ? (
          <div className="selected-indicator-container">
            <div className="selected-indicator">
              <div className="selected-indicator-top">
                <IonText className="selected-indicator-label">
                  Selected text
                </IonText>
                <div className="selected-indicator-actions">
                  <SelectedTextQuickActions />
                </div>
              </div>

              <button
                type="button"
                className={`citation-toggle ${
                  useChosenTextVerbage ? "citation-toggle--on" : ""
                }`}
                onClick={handleCitationToggle}
                aria-pressed={useChosenTextVerbage}
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
                <div
                  className={`citation-pill ${
                    useChosenTextVerbage ? "citation-pill--on" : ""
                  }`}
                >
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
              isActive={isOpen}
            />
          </div>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default BreadCrumbsModal;
