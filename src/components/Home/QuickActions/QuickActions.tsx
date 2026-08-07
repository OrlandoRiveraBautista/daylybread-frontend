import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { book, chevronForward, personCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router";

import { useAppContext } from "../../../context/context";
import { useUserBibleHistory } from "../../../hooks/UserHooks";

/* Styles */
import "./QuickActions.scss";

const formatRelativeTime = (dateStr: string | undefined): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const QuickActions: React.FC = () => {
  const history = useHistory();
  const { chosenBible, chosenBook, chosenChapterNumber, userInfo } =
    useAppContext();
  const { data: bibleHistoryData } = useUserBibleHistory();

  const lastReadAt = (() => {
    const currentHistory = bibleHistoryData?.me?.user?.bibleHistory?.find(
      (h) => h.current
    );
    return currentHistory?.history?.[0]?.viewedAt;
  })();

  const handleQuickRead = () => {
    if (chosenBible && chosenBook && chosenChapterNumber) {
      history.push(
        `/read/${chosenBible.languageId}/${chosenBible.abbr}/${chosenBook.bookId}/${chosenChapterNumber}`
      );
    } else {
      history.push("/read");
    }
  };

  const handleViewProfile = () => {
    history.push("/me");
  };

  const readDescription = chosenBook
    ? `${chosenBook.name} ${chosenChapterNumber}`
    : "Pick up where you left off";

  const readTimestamp = formatRelativeTime(lastReadAt);

  return (
    <IonGrid className="quick-actions-grid">
      <IonRow>
        <IonCol size="12">
          <IonText>
            <h2>Quick Actions</h2>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12" sizeMd="6">
          <IonCard className="action-card" button onClick={handleQuickRead}>
            <IonCardContent>
              <div className="card-content">
                <div className="card-icon primary-icon">
                  <IonIcon icon={book} color="primary" />
                </div>
                <div className="card-text">
                  <p className="card-title">Continue Reading</p>
                  <p className="card-description">{readDescription}</p>
                  {readTimestamp && (
                    <p className="card-timestamp">{readTimestamp}</p>
                  )}
                </div>
                <div className="card-arrow">
                  <IonIcon icon={chevronForward} />
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </IonCol>

        <IonCol size="12" sizeMd="6">
          <IonCard className="action-card" button onClick={handleViewProfile}>
            <IonCardContent>
              <div className="card-content">
                <div className="card-icon secondary-icon">
                  <IonIcon icon={personCircleOutline} color="secondary" />
                </div>
                <div className="card-text">
                  <p className="card-title">My Profile</p>
                  <p className="card-description">
                    {userInfo?.firstName
                      ? `${userInfo.firstName}'s journey`
                      : "View your reading progress"}
                  </p>
                </div>
                <div className="card-arrow">
                  <IonIcon icon={chevronForward} />
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default QuickActions;
