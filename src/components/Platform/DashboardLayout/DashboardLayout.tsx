import React from "react";
import {
  IonIcon,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonButtons,
  IonMenuButton,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router";
import { card, home, document } from "ionicons/icons";
import SmallWordLogo from "../../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../../assets/images/small-word-logo-dark.svg";
import "./DashboardLayout.scss";

export type DashboardSection =
  | "overview"
  | "nfc"
  | "sermons"
  | "calendar"
  | "organization"
  | "analytics"
  | "members";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
  organizationName?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeSection,
  onSectionChange,
  organizationName,
}) => {
  const history = useHistory();

  const menuItems = [
    {
      section: "overview" as DashboardSection,
      icon: home,
      label: "Overview",
      path: "/",
    },
    {
      section: "nfc" as DashboardSection,
      icon: card,
      label: "Home Screens & NFC",
      path: "/nfc",
    },
    {
      section: "sermons" as DashboardSection,
      icon: document,
      label: "Sermons",
      path: "/sermons",
    },
    // Coming in future releases
    // {
    //   section: "calendar" as DashboardSection,
    //   icon: calendar,
    //   label: "Calendar",
    //   path: "/calendar",
    // },
    // {
    //   section: "organization" as DashboardSection,
    //   icon: settings,
    //   label: "Organization",
    //   path: "/organization",
    // },
    // {
    //   section: "analytics" as DashboardSection,
    //   icon: statsChart,
    //   label: "Analytics",
    //   path: "/analytics",
    // },
    // {
    //   section: "members" as DashboardSection,
    //   icon: people,
    //   label: "Members",
    //   path: "/members",
    // },
  ];

  const handleNavigation = (section: DashboardSection, path: string) => {
    history.push(path);
    onSectionChange(section);
  };

  return (
    <>
      <IonMenu
        contentId="main-content"
        type="overlay"
        className="dashboard-menu"
      >
        <IonHeader className="ion-no-border dashboard-menu-header-container">
          <IonToolbar className="dashboard-menu-toolbar">
            <div className="dashboard-menu-header">
              <IonImg
                src={
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? SmallWordLogoDark
                    : SmallWordLogo
                }
                alt="DaylyBread Logo"
                className="dashboard-menu-logo"
              />
              {organizationName && (
                <div className="dashboard-org-name">{organizationName}</div>
              )}
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="dashboard-menu-content">
          <IonList className="dashboard-menu-list">
            {menuItems.map((item) => (
              <IonMenuToggle key={item.section} autoHide={false}>
                <IonItem
                  button
                  onClick={() => handleNavigation(item.section, item.path)}
                  className={
                    activeSection === item.section
                      ? "dashboard-menu-item-active"
                      : ""
                  }
                  lines="none"
                >
                  <IonIcon slot="start" icon={item.icon} />
                  <IonLabel>{item.label}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>

      <div className="ion-page" id="main-content">
        <IonHeader className="ion-no-border dashboard-header">
          <IonToolbar className="dashboard-toolbar">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>
              {menuItems.find((item) => item.section === activeSection)?.label}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding dashboard-content">
          {children}
        </IonContent>
      </div>
    </>
  );
};
