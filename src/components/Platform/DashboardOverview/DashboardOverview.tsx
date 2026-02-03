import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
} from "@ionic/react";
import { card, document } from "ionicons/icons";
import { DashboardSection } from "../DashboardLayout";
import { useGetSermons } from "../../../hooks/SermonHooks";
import "./DashboardOverview.scss";

interface DashboardOverviewProps {
  organizationName?: string;
  onNavigate: (section: DashboardSection) => void;
  nfcDeviceCount?: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  organizationName,
  onNavigate,
  nfcDeviceCount = 0,
}) => {
  // Fetch sermons to get the real count
  const { data: sermonsData, loading: sermonsLoading } = useGetSermons();
  const sermonCount = sermonsData?.getSermons?.results?.length || 0;

  const stats = [
    {
      title: "Active NFC Devices",
      value: nfcDeviceCount.toString(),
      icon: card,
      color: "primary",
      section: "nfc" as DashboardSection,
    },
    {
      title: "Total Sermons",
      value: sermonsLoading ? "..." : sermonCount.toString(),
      icon: document,
      color: "secondary",
      section: "sermons" as DashboardSection,
    },
    // Coming in future releases
    // {
    //   title: "Monthly Engagement",
    //   value: "Coming Soon",
    //   icon: statsChart,
    //   color: "tertiary",
    //   section: "analytics" as DashboardSection,
    // },
    // {
    //   title: "Active Events",
    //   value: "Coming Soon",
    //   icon: pulse,
    //   color: "success",
    //   section: "analytics" as DashboardSection,
    // },
  ];

  const quickActions = [
    {
      title: "Manage NFC Devices",
      description: "Configure and manage your NFC devices",
      action: () => onNavigate("nfc" as DashboardSection),
    },
    {
      title: "Add Sermon",
      description: "Upload and manage your sermon library",
      action: () => onNavigate("sermons" as DashboardSection),
    },
    // Coming in future releases
    // {
    //   title: "Create Event",
    //   description: "Schedule and manage events on your calendar",
    //   action: () => onNavigate("calendar" as DashboardSection),
    // },
    // {
    //   title: "Organization Settings",
    //   description: "Manage your church or organization details",
    //   action: () => onNavigate("organization" as DashboardSection),
    // },
  ];

  return (
    <div className="dashboard-overview-container">
      <div className="dashboard-welcome">
        <h1>Welcome to {organizationName || "Your Dashboard"}</h1>
        <p>Manage your church or organization from one central place</p>
      </div>

      <IonGrid>
        <IonRow>
          {stats.map((stat, index) => (
            <IonCol size="12" sizeMd="6" sizeLg="3" key={index}>
              <IonCard
                className="stat-card"
                button
                onClick={() => onNavigate(stat.section)}
              >
                <IonCardContent>
                  <div className="stat-card-content">
                    <div className={`stat-icon stat-icon-${stat.color}`}>
                      <IonIcon icon={stat.icon} />
                    </div>
                    <div className="stat-info">
                      <IonText color="medium" className="stat-title">
                        {stat.title}
                      </IonText>
                      <div className="stat-value">{stat.value}</div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      <IonCard className="quick-actions-card">
        <IonCardHeader>
          <IonCardTitle>Quick Actions</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="quick-actions-list">
            {quickActions.map((action, index) => (
              <div key={index} className="quick-action-item">
                <div className="quick-action-text">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
                <IonButton fill="outline" onClick={action.action}>
                  Go
                </IonButton>
              </div>
            ))}
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
