import {
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonChip,
  IonTextarea,
  IonButton,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
/* Icons */
import { send } from "ionicons/icons";

/* Utils */
import breadCrumbsSuggestions from "../../../assets/ts/breadCrumbsSuggestions";

/* Interfaces */
import { IBreadCrumbsChat } from "../../../interfaces/BreadCrumbsModalInterfaces";

const BreadCrumbsChat: React.FC<IBreadCrumbsChat> = ({
  onSubmit,
  messages,
  useChosenTextVerbage,
}: IBreadCrumbsChat) => {
  // state
  const [value, setValue] = useState<string | undefined | null>();
  const [loadingChatResponse, setLoadingChatResponse] =
    useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [animatedMessages, setAnimatedMessages] = useState<Set<number>>(
    new Set()
  );

  // references
  const messagesContainer = useRef<HTMLInputElement>(null);
  const inputRowRef = useRef<HTMLIonRowElement>(null);

  /**
   * Function to handle submitting a message
   * it should call the function passed in the props and delete the current message state
   * This function can also be used for the chip suggestions and useChosenTextVerbage
   * which will direct the handler function in the parent
   */
  const handleSubmit = (value: string) => {
    onSubmit(value);
    setValue(""); // reset value
    setLoadingChatResponse(true);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (!messagesContainer.current) return;

    messagesContainer.current.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });

    // // Add offset after scrolling
    // window.scrollBy(0, 1000); // Adjust -100 to your desired offset in pixels
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length > 0 && messages[messages.length - 1].sender !== "You") {
      setLoadingChatResponse(false);
    }
  }, [messages]);

  // Trigger shadow effect for new messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessageIndex = messages.length - 1;
      const lastMessage = messages[lastMessageIndex];

      // Only animate AI responses, not user messages
      if (lastMessage.sender !== "You") {
        setAnimatedMessages((prev) => {
          const newSet = new Set(prev);
          newSet.add(lastMessageIndex);
          return newSet;
        });

        // Remove animation after 2 seconds
        const timer = setTimeout(() => {
          setAnimatedMessages((prev) => {
            const newSet = new Set(prev);
            newSet.delete(lastMessageIndex);
            return newSet;
          });
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [messages]);

  // Handle click outside to remove focus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRowRef.current &&
        !inputRowRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };

    if (isInputFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isInputFocused]);

  return (
    <>
      {/* Chat header */}
      <IonRow className="breadcrumbs-header">
        <IonCol>
          <IonText className="product-sans">BreadCrumbs Chat</IonText>
        </IonCol>
      </IonRow>

      {/* Messages container */}
      <div className="messages-container">
        {messages.length
          ? messages.map(({ message, sender }, index) => (
              <IonRow
                className={
                  sender === "You"
                    ? "right-align-self"
                    : `chat-respond ${
                        animatedMessages.has(index) ? "message-animated" : ""
                      }`
                }
                key={index}
              >
                <IonCard
                  mode="md"
                  className={sender === "You" ? "right-align-text" : ""}
                >
                  <IonCardContent>
                    <IonCardTitle>{sender}</IonCardTitle>
                    <Markdown className="chat-message">{message}</Markdown>
                  </IonCardContent>
                </IonCard>
              </IonRow>
            ))
          : null}
        {/* Div to move the panel down when a new message is created */}
        <div ref={messagesContainer} />
      </div>

      <div className="breadcrumbs-chat-input-and-suggestions-container">
        {/* Suggestions based on chosen text */}
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
        <IonRow
          ref={inputRowRef}
          className={`chat-input-row ${isInputFocused ? "focused" : ""}`}
          onClick={handleInputFocus}
        >
          {/* Text area input container */}
          <IonCol>
            <IonTextarea
              labelPlacement="floating"
              color="primary"
              placeholder="Ask me anything!"
              autoGrow={true}
              fill="outline"
              value={value}
              onIonInput={(e) => setValue(e.target.value)}
              onIonFocus={handleInputFocus}
              onIonBlur={handleInputBlur}
            ></IonTextarea>
          </IonCol>
          {/* Submit/Send button container */}
          <IonCol size="auto" className="textarea-send-button-container">
            <IonButton
              fill="clear"
              className="textarea-send-button"
              color="dark"
              onClick={() => (value ? handleSubmit(value) : null)}
              disabled={loadingChatResponse}
            >
              {loadingChatResponse ? (
                <IonSpinner color="dark" />
              ) : (
                <IonIcon icon={send} />
              )}
            </IonButton>
          </IonCol>
        </IonRow>
      </div>
    </>
  );
};

export default BreadCrumbsChat;
