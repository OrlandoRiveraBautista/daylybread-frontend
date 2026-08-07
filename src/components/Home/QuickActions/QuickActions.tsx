import React from "react";
import { IonText, IonIcon } from "@ionic/react";
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
    <section className="quick-actions" aria-label="Quick actions">
      <div className="home-section-header">
        <IonText>
          <h2 className="home-section-title">Quick Actions</h2>
        </IonText>
        <p className="home-section-subtitle">Jump back into your day</p>
      </div>

      <div className="quick-actions-list">
        <button
          type="button"
          className="home-list-card"
          onClick={handleQuickRead}
        >
          <div className="home-list-icon home-list-icon--primary" aria-hidden="true">
            <IonIcon icon={book} />
          </div>
          <div className="home-list-text">
            <span className="home-list-title">Continue Reading</span>
            <span className="home-list-description">{readDescription}</span>
            {readTimestamp ? (
              <span className="home-list-meta">{readTimestamp}</span>
            ) : null}
          </div>
          <IonIcon className="home-list-chevron" icon={chevronForward} />
        </button>

        <button
          type="button"
          className="home-list-card"
          onClick={handleViewProfile}
        >
          <div
            className="home-list-icon home-list-icon--secondary"
            aria-hidden="true"
          >
            <IonIcon icon={personCircleOutline} />
          </div>
          <div className="home-list-text">
            <span className="home-list-title">My Profile</span>
            <span className="home-list-description">
              {userInfo?.firstName
                ? `${userInfo.firstName}'s journey`
                : "View your reading progress"}
            </span>
          </div>
          <IonIcon className="home-list-chevron" icon={chevronForward} />
        </button>
      </div>
    </section>
  );
};

export default QuickActions;
