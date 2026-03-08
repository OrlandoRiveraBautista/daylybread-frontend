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
  IonFooter,
} from "@ionic/react";
import { useHistory } from "react-router";
import { card, home, document as documentIcon, shield, musicalNotes, logOutOutline } from "ionicons/icons";
import { useApolloClient } from "@apollo/client";
import { useSignout } from "../../../hooks/AuthHooks";
import { NotificationCenter } from "../NotificationCenter";
import SmallWordLogo from "../../../assets/images/small-word-logo.svg";
import SmallWordLogoDark from "../../../assets/images/small-word-logo-dark.svg";
import "./DashboardLayout.scss";

export type DashboardSection =
  | "overview"
  | "nfc"
  | "sermons"
  | "worship"
  | "calendar"
  | "organization"
  | "analytics"
  | "members"
  | "sudo-admin";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
  organizationName?: string;
  isSudoAdmin?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeSection,
  onSectionChange,
  organizationName,
  isSudoAdmin = false,
}) => {
  const history = useHistory();
  const client = useApolloClient();
  const { signout } = useSignout();

  const handleLogout = async () => {
    await signout();
    await client.clearStore();
    history.push("/login");
  };

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
      icon: documentIcon,
      label: "Sermons",
      path: "/sermons",
    },
    {
      section: "worship" as DashboardSection,
      icon: musicalNotes,
      label: "Worship Teams",
      path: "/worship",
    },
    // Sudo Admin Manager - only visible to admin users
    ...(isSudoAdmin
      ? [
          {
            section: "sudo-admin" as DashboardSection,
            icon: shield,
            label: "Sudo Admin Manager",
            path: "/sudo-admin",
          },
        ]
      : []),
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
        <IonFooter className="ion-no-border dashboard-menu-footer">
          <IonMenuToggle autoHide={false}>
            <IonItem
              button
              lines="none"
              onClick={handleLogout}
              className="dashboard-logout-item"
            >
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonFooter>
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
            <IonButtons slot="end">
              <NotificationCenter />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding dashboard-content">
          {children}
        </IonContent>
      </div>
    </>
  );
};
