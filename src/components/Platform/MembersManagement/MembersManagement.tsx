import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { personAdd } from "ionicons/icons";
import "./MembersManagement.scss";

export const MembersManagement: React.FC = () => {
  return (
    <div className="members-container">
      <div className="members-header">
        <h1>Members</h1>
        <p>Manage your organization members</p>
      </div>

      <IonCard className="coming-soon-card">
        <IonCardHeader>
          <IonCardTitle>Member Management Coming Soon</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="coming-soon-content">
            <IonIcon icon={personAdd} className="coming-soon-icon" />
            <IonText color="medium">
              <p>
                We're building a comprehensive member management system for your
                organization.
              </p>
              <div className="features-list">
                <h3>Upcoming Features:</h3>
                <ul>
                  <li>Add and manage member profiles</li>
                  <li>Track attendance and participation</li>
                  <li>Send communications to members</li>
                  <li>Member registration forms</li>
                  <li>Directory and contact management</li>
                  <li>Role and permission management</li>
                </ul>
              </div>
              <p>
                In the meantime, you can use the Member Registration Link in
                your NFC configuration to collect new member information.
              </p>
            </IonText>
            <IonButton expand="block" size="large" disabled>
              Coming Soon
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
