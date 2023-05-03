import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonModal,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonButton,
  IonText,
  IonTextarea,
  IonIcon,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { send } from "ionicons/icons";

/** Components */

/* Context */
import { useAppContext } from "../../context/context";

/* Query Hooks */
import { useOpenAI } from "../../hooks/OpenAIHooks";

/* Styles */
import "./BibleNavModal.scss";

/**
 * Interface for the BreadCrumbs modal
 * @property {(value: string) => void} prompt
 */
interface IBreadCrumbsChatl {
  onSubmit: (value: string) => void;
  messages: IMessagesObject[];
}

/**
 * @property {string} message
 * @property {string} sender
 */
interface IMessagesObject {
  message: string;
  sender: string;
}

const BreadCrumbsChat: React.FC<IBreadCrumbsChatl> = ({
  onSubmit,
  messages,
}: IBreadCrumbsChatl) => {
  const [value, setValue] = useState<string | undefined | null>();
  return (
    <IonGrid>
      <IonRow className="breadcrumbs-header">
        <IonCol>
          <IonText className="product-sans">BreadCrumbs Chat</IonText>
        </IonCol>
      </IonRow>

      {messages.length
        ? messages.map(({ message, sender }) => (
            <IonRow
              className={sender === "You" ? "right-align-self" : "chat-respond"}
            >
              <IonCard
                mode="md"
                className={sender === "You" ? "right-align-text" : ""}
              >
                <IonCardContent>
                  <IonCardTitle>{sender}</IonCardTitle>
                  {message}
                </IonCardContent>
              </IonCard>
            </IonRow>
          ))
        : null}
      <IonRow className="chat-input-row">
        <IonCol>
          <IonTextarea
            labelPlacement="floating"
            color="primary"
            placeholder="Ask me anything!"
            autoGrow={true}
            fill="solid"
            value={value}
            onIonInput={(e) => setValue(e.target.value)}
          ></IonTextarea>
        </IonCol>
        <IonCol size="auto" className="textarea-send-button-container">
          <IonButton
            fill="clear"
            className="textarea-send-button"
            color="dark"
            onClick={() => (value ? onSubmit(value) : null)}
          >
            <IonIcon icon={send} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

/**
 * Interface for the BreadCrumbs modal
 * @property {boolean} isOpen
 * @property {() => void} onDismiss
 * @property {string[]} selectedText
 */
interface IBreadCrumbsModal {
  isOpen: boolean;
  onDismiss: () => void;
  selectedText?: string[];
}

/**
 * BreadCrumbs Modal is a modal that contains actions for the bible assistant
 * @param {IBreadCrumbsModal} { isOpen: boolean, onDismiss: () => void }
 * @returns
 */
const BreadCrumbsModal: React.FC<IBreadCrumbsModal> = ({
  isOpen,
  onDismiss,
  selectedText,
}: IBreadCrumbsModal) => {
  // state
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [messages, setMessages] = useState<IMessagesObject[]>([]);

  // const chatPromptResponse = useOpenAI(inputPrompt);

  // context values
  const { chosenChapter, chosenBook } = useAppContext();
  const openAIResponse = useOpenAI(inputPrompt);

  useEffect(() => {
    console.log(selectedText);
    console.log(chosenChapter);
    console.log(chosenBook?.bookName);
    const text = `${chosenBook?.bookName}: ${chosenChapter?.chapterNumber}`;
    console.log(text);
  }, [selectedText]);

  useEffect(() => {
    if (openAIResponse.loading) return;
    if (!openAIResponse.data?.getOpen) return;
    const openAIMessage = openAIResponse.data.getOpen;

    const messageObject: IMessagesObject = {
      message: openAIMessage,
      sender: "BreadCrumbs",
    };

    setMessages((prevMessage) => [...prevMessage, messageObject]);
    setInputPrompt("");
  }, [openAIResponse]);

  const handleSubmit = (value: string) => {
    setInputPrompt(value);
    const messageObject: IMessagesObject = {
      message: value,
      sender: "You",
    };

    setMessages((prevMessage) => [...prevMessage, messageObject]);
  };
  return (
    <IonModal
      initialBreakpoint={0.5}
      breakpoints={[0, 1]}
      className="nav-modal"
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      id="bread-crumbs-modal"
    >
      <IonContent className="ion-padding nav-container">
        <IonGrid>
          <IonRow>
            <IonCol className="selected-indicator">
              <IonRow>
                <IonText>
                  <sub>Selected Text</sub>
                </IonText>
              </IonRow>
              <IonRow>
                <IonText>Selected Text</IonText>
              </IonRow>
            </IonCol>
          </IonRow>
          <div className="chat-container">
            <BreadCrumbsChat onSubmit={handleSubmit} messages={messages} />
          </div>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default BreadCrumbsModal;
