import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { book, chevronForward, happy } from "ionicons/icons";
import { useHistory } from "react-router";

import { useAppContext } from "../../../context/context";

/* Styles */
import "./QuickActions.scss";

const QuickActions: React.FC = () => {
  const history = useHistory();
  const { chosenBible, chosenBook, chosenChapterNumber, userInfo } =
    useAppContext();

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

  const featuredActions = [
    {
      title: "Continue Reading",
      description: chosenBook
        ? `${chosenBook.name} ${chosenChapterNumber}`
        : "Pick up where you left off",
      icon: book,
      color: "primary",
      action: handleQuickRead,
    },
    {
      title: "My Profile",
      description: userInfo?.firstName
        ? `Welcome back, ${userInfo.firstName}`
        : "View your reading progress",
      icon: happy,
      color: "secondary",
      action: handleViewProfile,
    },
  ];

  return (
    <IonGrid className="quick-actions-grid">
      <IonRow>
        <IonCol size="12">
          <IonText>
            <h2>Quick Actions</h2>
          </IonText>
        </IonCol>
      </IonRow>

      {featuredActions.map((action, index) => (
        <IonRow key={index}>
          <IonCol size="12">
            <IonCard className="action-card" button onClick={action.action}>
              <IonCardContent>
                <div className="card-content">
                  <div className="card-icon">
                    <IonIcon icon={action.icon} color={action.color} />
                  </div>
                  <div className="card-text">
                    <IonCardTitle>{action.title}</IonCardTitle>
                    <IonText>
                      <p>{action.description}</p>
                    </IonText>
                  </div>
                  <div className="card-arrow">
                    <IonIcon icon={chevronForward} />
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default QuickActions;
