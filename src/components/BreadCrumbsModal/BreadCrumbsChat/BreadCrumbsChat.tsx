import {
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonChip,
  IonTextarea,
  IonButton,
  IonSpinner,
  IonIcon,
  IonText,
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
  const [animatedMessages, setAnimatedMessages] = useState<Set<number>>(
    new Set()
  );

  // references
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
    setLoadingChatResponse(true);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (!messagesContainer.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    messagesContainer.current.scrollIntoView({
      block: "end",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
    const last = messages[messages.length - 1];
    if (messages.length > 0 && last.sender !== "You" && last.message) {
      setLoadingChatResponse(false);
    }
  }, [messages]);

  // Subtle arrival highlight for new AI responses
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessageIndex = messages.length - 1;
      const lastMessage = messages[lastMessageIndex];

      if (lastMessage.sender !== "You") {
        setAnimatedMessages((prev) => {
          const newSet = new Set(prev);
          newSet.add(lastMessageIndex);
          return newSet;
        });

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

  const hasMessages = messages.length > 0;
  const canSend = !!value?.trim() && !loadingChatResponse;

  return (
    <>
      {/* Messages container */}
      <div className="messages-container">
        {hasMessages ? (
          messages.map(({ message, sender }, index) => (
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
                  {sender !== "You" && (
                    <IonText className="chat-sender-label">{sender}</IonText>
                  )}
                  <Markdown className="chat-message">{message}</Markdown>
                </IonCardContent>
              </IonCard>
            </IonRow>
          ))
        ) : (
          <div className="chat-empty-state">
            <div className="chat-empty-icon" aria-hidden="true">
              ✦
            </div>
            <IonText className="chat-empty-title">Ask BreadCrumbs</IonText>
            <IonText className="chat-empty-subtitle">
              Theology, history, prayer, or everyday life — ask anything.
            </IonText>
          </div>
        )}
        <div ref={messagesContainer} />
      </div>

      <div className="breadcrumbs-chat-input-and-suggestions-container">
        {/* Suggestions based on chosen text */}
        {useChosenTextVerbage ? (
          <div className="breadcrumbs-suggestions-row">
            <div className="breadcrumbs-suggestions-col">
              {Object.entries(breadCrumbsSuggestions).map(([key, value]) => (
                <IonChip
                  onClick={() => handleSubmit(value)}
                  color="secondary"
                  key={key}
                >
                  {key}
                </IonChip>
              ))}
            </div>
          </div>
        ) : null}

        {/* Chat Input — focus ring via :focus-within (instant, no React lag) */}
        <IonRow className="chat-input-row">
          <IonCol>
            <IonTextarea
              className="chat-input-textarea"
              color="primary"
              placeholder="Ask anything…"
              autoGrow={true}
              fill="solid"
              rows={1}
              value={value}
              onIonInput={(e) => setValue(e.target.value)}
              aria-label="Message BreadCrumbs"
            />
          </IonCol>
          <IonCol size="auto" className="textarea-send-button-container">
            <IonButton
              fill="clear"
              className="textarea-send-button"
              color={canSend ? "primary" : "medium"}
              onClick={() => (canSend ? handleSubmit(value!) : null)}
              disabled={!canSend}
              aria-label="Send message"
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
