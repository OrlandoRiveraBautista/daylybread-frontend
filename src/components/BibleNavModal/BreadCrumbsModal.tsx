import React, { useEffect, useRef, useState } from "react";
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
  IonCheckbox,
  IonChip,
} from "@ionic/react";
import {
  IonModalCustomEvent,
  ModalBreakpointChangeEventDetail,
} from "@ionic/core";
import { send } from "ionicons/icons";

/** Components */

/* Context */
import { useAppContext } from "../../context/context";

/* Query Hooks */
import { useOpenAI } from "../../hooks/OpenAIHooks";

/* Styles */
import "./BibleNavModal.scss";

/* Utils */
import { clusterNumbers } from "../../utils/support";
import breadCrumbsSuggestions from "../../assets/ts/breadCrumbsSuggestions";

/**
 * Interface for the BreadCrumbs modal
 * @property {(value: string) => void} prompt
 */
interface IBreadCrumbsChatl {
  onSubmit: (value: string) => void;
  messages: IMessagesObject[];
  useChosenTextVerbage: boolean;
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
  useChosenTextVerbage,
}: IBreadCrumbsChatl) => {
  const [value, setValue] = useState<string | undefined | null>();
  const messagesContainer = useRef<HTMLInputElement>(null);
  /**
   * Function to handle submitting a message
   * it should call the function passed in the props and delete the current message state
   * This function can also be used for the chip suggestions and useChosenTextVerbage
   * which will direct the handler function in the parent
   */
  const handleSubmit = (value: string) => {
    onSubmit(value);
    setValue(""); // reset value
  };

  const scrollToBottom = () => {
    if (!messagesContainer.current) return;

    messagesContainer.current.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <IonGrid>
      <IonRow className="breadcrumbs-header">
        <IonCol>
          <IonText className="product-sans">BreadCrumbs Chat</IonText>
        </IonCol>
      </IonRow>

      <div className="messages-container">
        {messages.length
          ? messages.map(({ message, sender }, index) => (
              <IonRow
                className={
                  sender === "You" ? "right-align-self" : "chat-respond"
                }
                key={index}
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
        {/* Div to move the panel down when a new message is created */}
        <div ref={messagesContainer} />
      </div>

      {useChosenTextVerbage ? (
        <div className="breadcrumbs-suggestions-row">
          <div className="breadcrumbs-suggestions-col">
            {Object.entries(breadCrumbsSuggestions).map(([key, value]) => {
              return (
                <IonChip
                  onClick={() => handleSubmit(value)}
                  color="secondary"
                  key={key}
                >
                  {key}
                </IonChip>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Chat Input */}
      <IonRow className="chat-input-row">
        <IonCol>
          <IonTextarea
            labelPlacement="floating"
            color="primary"
            placeholder="Ask me anything!"
            autoGrow={true}
            fill="outline"
            value={value}
            onIonInput={(e) => setValue(e.target.value)}
          ></IonTextarea>
        </IonCol>
        <IonCol size="auto" className="textarea-send-button-container">
          <IonButton
            fill="clear"
            className="textarea-send-button"
            color="dark"
            onClick={() => (value ? handleSubmit(value) : null)}
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
  const [chosenTextVerbage, setChosenTextVerbage] = useState<string>();
  const [useChosenTextVerbage, setUseChosenTextVerbage] =
    useState<boolean>(false);

  // reference
  const breadCrumbsModalGrid = useRef<HTMLIonGridElement>(null);

  // const chatPromptResponse = useOpenAI(inputPrompt);

  // context values
  const { chosenChapter, chosenBook } = useAppContext();
  const openAIResponse = useOpenAI(inputPrompt);

  useEffect(() => {
    // exit function if there are no selected verses
    if (!selectedText || !selectedText.length) return;

    // sort the verse numbers in the array in ascenting order
    const sortedNumbersAsc = selectedText
      .map(Number)
      .slice()
      .sort((a, b) => a - b);

    // cluster the verses that are close together to diminish token usage on openai
    const clusterVerses = clusterNumbers(sortedNumbersAsc);
    // temp variable for verbage of clustered verses
    let clusterVersesVerb = "";

    // loop through each cluster
    clusterVerses.forEach((verseList, index) => {
      // add proper verbage
      clusterVersesVerb += `${
        index !== 0 //check for the first value
          ? index >= 1 && index < clusterVerses.length - 1 //check if the index is not the last
            ? "," // use comma on the not last clusters
            : " and " //use and for the last cluster
          : "" //if first value, requires no prefix
      }${verseList[0]} ${
        verseList[0] !== verseList[verseList.length - 1]
          ? "- " + verseList[verseList.length - 1]
          : ""
      }`;
    });

    // put all the chosen data together in a string
    const text = `${chosenBook?.bookName} ${
      chosenChapter?.chapterNumber
    }:${clusterVersesVerb} ${chosenBook?.translation.abbreviation.replace(
      /\s/g,
      ""
    )}`;

    setChosenTextVerbage(text);
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
    if (
      e.detail.breakpoint <= 0.75 &&
      target.classList.contains("full-height")
    ) {
      // remove full-height
      target.classList.remove("full-height");
    } else {
      // else set full-height
      target.classList.add("full-height");
    }
  };
  return (
    <IonModal
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75, 1]}
      className="nav-modal"
      isOpen={isOpen}
      onDidDismiss={onDismiss}
      id="bread-crumbs-modal"
      onIonBreakpointDidChange={(e) => handleBreakpointChange(e)}
    >
      <IonContent className="ion-padding ">
        <IonGrid ref={breadCrumbsModalGrid}>
          {chosenTextVerbage ? (
            <IonRow>
              <IonCol className="selected-indicator">
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
