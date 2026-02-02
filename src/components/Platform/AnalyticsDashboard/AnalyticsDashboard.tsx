import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { trendingUp, eye, download, shareSocial } from "ionicons/icons";
import "./AnalyticsDashboard.scss";

export const AnalyticsDashboard: React.FC = () => {
  const metrics = [
    {
      title: "NFC Taps",
      value: "Coming Soon",
      change: "+0%",
      icon: download,
      color: "primary",
    },
    {
      title: "Page Views",
      value: "Coming Soon",
      change: "+0%",
      icon: eye,
      color: "secondary",
    },
    {
      title: "Social Shares",
      value: "Coming Soon",
      change: "+0%",
      icon: shareSocial,
      color: "tertiary",
    },
    {
      title: "Engagement Rate",
      value: "Coming Soon",
      change: "+0%",
      icon: trendingUp,
      color: "success",
    },
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Track your organization's engagement and reach</p>
      </div>

      <IonGrid>
        <IonRow>
          {metrics.map((metric, index) => (
            <IonCol size="12" sizeMd="6" sizeLg="3" key={index}>
              <IonCard className="metric-card">
                <IonCardContent>
                  <div className="metric-card-content">
                    <div className={`metric-icon metric-icon-${metric.color}`}>
                      <IonIcon icon={metric.icon} />
                    </div>
                    <div className="metric-info">
                      <IonText color="medium" className="metric-title">
                        {metric.title}
                      </IonText>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-change">{metric.change}</div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      <IonCard className="coming-soon-card">
        <IonCardHeader>
          <IonCardTitle>Analytics Coming Soon</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText color="medium">
            <p>
              We're working on bringing you detailed analytics including:
            </p>
            <ul>
              <li>Real-time NFC tap tracking</li>
              <li>Geographic distribution of engagement</li>
              <li>Time-based engagement patterns</li>
              <li>Conversion tracking for your links</li>
              <li>Custom date range reports</li>
              <li>Export data capabilities</li>
            </ul>
            <p>Stay tuned for updates!</p>
          </IonText>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
