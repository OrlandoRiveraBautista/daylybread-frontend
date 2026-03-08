import React from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonSpinner,
} from "@ionic/react";
import {
  people,
  calendar,
  musicalNotes,
  list,
  notifications,
} from "ionicons/icons";
import { useGetWorshipTeams } from "../../../../hooks/WorshipTeamHooks";
import { useGetWorshipServices } from "../../../../hooks/WorshipServiceHooks";
import { useGetSongs } from "../../../../hooks/SongHooks";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import "./WorshipDashboard.scss";

export const WorshipDashboard: React.FC = () => {
  const history = useHistory();
  const { data: teamsData, loading: teamsLoading } = useGetWorshipTeams();
  const { data: servicesData, loading: servicesLoading } = useGetWorshipServices();
  const { data: songsData, loading: songsLoading } = useGetSongs();

  const teams = teamsData?.getWorshipTeams?.results || [];
  const services = servicesData?.getWorshipServices?.results || [];
  const songs = songsData?.getSongs?.results || [];

  const isLoading = teamsLoading || servicesLoading || songsLoading;

  // Get upcoming services (future dates)
  const upcomingServices = services
    .filter((s: any) => new Date(Number(s.date)) >= new Date())
    .slice(0, 3);

  const totalMembers = teams.reduce(
    (acc: number, t: any) => acc + (t.members?.length || 0),
    0
  );

  const stats = [
    {
      icon: people,
      label: "Teams",
      value: teams.length,
      path: "/worship/teams",
      color: "var(--ion-color-primary)",
    },
    {
      icon: calendar,
      label: "Services",
      value: services.length,
      path: "/worship/services",
      color: "var(--ion-color-tertiary)",
    },
    {
      icon: musicalNotes,
      label: "Songs",
      value: songs.length,
      path: "/worship/songs",
      color: "var(--ion-color-success)",
    },
    {
      icon: notifications,
      label: "Members",
      value: totalMembers,
      path: "/worship/teams",
      color: "var(--ion-color-secondary)",
    },
  ];

  if (isLoading) {
    return (
      <div className="worship-dashboard">
        <div className="worship-dashboard__header">
          <h1>Worship Team Manager</h1>
          <p>Organize your worship teams, services, and setlists</p>
        </div>
        <div className="loading-state">
          <IonSpinner name="crescent" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="worship-dashboard">
      <WorshipNav />
      <div className="worship-dashboard__header">
        <h1>Worship Team Manager</h1>
        <p>Organize your worship teams, services, and setlists</p>
      </div>

      <div className="worship-dashboard__stats">
        {stats.map((stat) => (
          <IonCard
            key={stat.label}
            className="stat-card"
            button
            onClick={() => history.push(stat.path)}
          >
            <IonCardContent>
              <div className="stat-card__icon" style={{ color: stat.color }}>
                <IonIcon icon={stat.icon} />
              </div>
              <div className="stat-card__info">
                <span className="stat-card__value">{stat.value}</span>
                <span className="stat-card__label">{stat.label}</span>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </div>

      {upcomingServices.length > 0 && (
        <div className="worship-dashboard__section">
          <div className="section-header">
            <h2>Upcoming Services</h2>
            <IonText
              color="primary"
              className="section-link"
              onClick={() => history.push("/worship/services")}
            >
              View All
            </IonText>
          </div>
          <div className="upcoming-list">
            {upcomingServices.map((service: any) => (
              <IonCard
                key={service._id}
                className="upcoming-card"
                button
                onClick={() => history.push(`/worship/services/${service._id}`)}
              >
                <IonCardContent>
                  <div className="upcoming-card__date">
                    <span className="upcoming-card__day">
                      {new Date(Number(service.date)).toLocaleDateString("en-US", { day: "numeric" })}
                    </span>
                    <span className="upcoming-card__month">
                      {new Date(Number(service.date)).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                  </div>
                  <div className="upcoming-card__info">
                    <h3>{service.name}</h3>
                    <div className="upcoming-card__meta">
                      <IonIcon icon={people} />
                      <span>{service.team?.name}</span>
                    </div>
                    <div className="upcoming-card__meta">
                      <IonIcon icon={list} />
                      <span>{service.assignments?.length || 0} assigned</span>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>
      )}

      {teams.length > 0 && (
        <div className="worship-dashboard__section">
          <div className="section-header">
            <h2>Your Teams</h2>
            <IonText
              color="primary"
              className="section-link"
              onClick={() => history.push("/worship/teams")}
            >
              View All
            </IonText>
          </div>
          <div className="teams-preview">
            {teams.slice(0, 4).map((team: any) => (
              <IonCard
                key={team._id}
                className="team-preview-card"
                button
                onClick={() => history.push(`/worship/teams/${team._id}`)}
              >
                <IonCardContent>
                  <IonIcon icon={people} className="team-preview-card__icon" />
                  <h3>{team.name}</h3>
                  <IonText color="medium">
                    <p>{team.members?.length || 0} members</p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>
      )}

      {teams.length === 0 && services.length === 0 && (
        <div className="worship-dashboard__empty">
          <IonCard className="empty-welcome-card">
            <IonCardContent>
              <div className="empty-welcome">
                <IonIcon icon={musicalNotes} className="empty-welcome__icon" />
                <h2>Welcome to Worship Team Manager</h2>
                <p>
                  Start by creating a worship team, then add members and schedule services.
                </p>
                <div className="empty-welcome__actions">
                  <IonText
                    color="primary"
                    className="action-link"
                    onClick={() => history.push("/worship/teams")}
                  >
                    Create a Team
                  </IonText>
                  <IonText
                    color="primary"
                    className="action-link"
                    onClick={() => history.push("/worship/songs")}
                  >
                    Add Songs
                  </IonText>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      )}
    </div>
  );
};
