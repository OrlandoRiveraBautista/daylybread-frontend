import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
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
  IonSpinner,
} from "@ionic/react";
import { card, document, calendar, playCircle } from "ionicons/icons";
import { DashboardSection } from "../DashboardLayout";
import { useGetSermons } from "../../../hooks/SermonHooks";
import { useGetWorshipServices } from "../../../hooks/WorshipServiceHooks";
import { parseServiceDate } from "../../../utils/serviceDate";
import { PageHeader } from "../PageHeader";
import "./DashboardOverview.scss";

/** Service date is stored in UTC (ISO or ms); check if it falls on today (local date). */
function isServiceToday(service: { date: string }) {
  const d = parseServiceDate(service.date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

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
  const history = useHistory();
  // Fetch sermons to get the real count
  const { data: sermonsData, loading: sermonsLoading } = useGetSermons();
  const sermonCount = sermonsData?.getSermons?.results?.length || 0;

  const { data: servicesData, loading: servicesLoading } = useGetWorshipServices();
  const todaysServices = useMemo(() => {
    const all = servicesData?.getWorshipServices?.results || [];
    return all.filter((s: { date: string }) => isServiceToday(s));
  }, [servicesData?.getWorshipServices?.results]);
  const primaryTodaysService = todaysServices[0];

  const stats = [
    {
      title: "Home Screens",
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
      title: "Home Screens & NFC",
      description: "Create home screens and manage NFC devices",
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
        <PageHeader
          title={`Welcome to ${organizationName || "Your Dashboard"}`}
          subtitle="Manage your church or organization from one central place"
        />
      </div>

      {/* Today's service — front and center */}
      <div className="todays-service-section">
        {servicesLoading ? (
          <IonCard className="todays-service-card todays-service-card--loading">
            <IonCardContent>
              <IonSpinner name="crescent" />
              <IonText color="medium">Loading today&apos;s service...</IonText>
            </IonCardContent>
          </IonCard>
        ) : primaryTodaysService ? (
          <IonCard className="todays-service-card todays-service-card--active">
            <IonCardContent>
              <div className="todays-service-badge">Today&apos;s service</div>
              <h2 className="todays-service-name">{primaryTodaysService.name}</h2>
              <div className="todays-service-meta">
                <IonIcon icon={calendar} />
                <span>
                  {parseServiceDate(primaryTodaysService.date).toLocaleString(
                    "en-US",
                    { dateStyle: "short", timeStyle: "short" },
                  )}
                  {primaryTodaysService.team?.name && (
                    <> · {primaryTodaysService.team.name}</>
                  )}
                </span>
              </div>
              <div className="todays-service-actions">
                <IonButton
                  fill="solid"
                  color="primary"
                  onClick={() =>
                    history.push(`/worship/services/${primaryTodaysService._id}/live`)
                  }
                  className="todays-service-btn-primary"
                >
                  <IonIcon icon={playCircle} slot="start" />
                  Go live
                </IonButton>
                <IonButton
                  fill="outline"
                  color="primary"
                  onClick={() =>
                    history.push(`/worship/services/${primaryTodaysService._id}`)
                  }
                >
                  View service
                </IonButton>
              </div>
              {todaysServices.length > 1 && (
                <IonText color="medium" className="todays-service-more">
                  +{todaysServices.length - 1} more today
                </IonText>
              )}
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard className="todays-service-card todays-service-card--empty">
            <IonCardContent>
              <IonIcon icon={calendar} className="todays-service-empty-icon" />
              <IonText color="medium">No service scheduled for today</IonText>
              <IonButton
                fill="clear"
                size="small"
                onClick={() => onNavigate("worship" as DashboardSection)}
              >
                View worship services
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
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
                <IonButton
                  fill="outline"
                  onClick={action.action}
                  shape="round"
                  color="primary"
                >
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
