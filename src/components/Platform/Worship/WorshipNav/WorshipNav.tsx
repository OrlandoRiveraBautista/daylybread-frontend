import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  gridOutline,
  peopleOutline,
  calendarOutline,
  musicalNotesOutline,
  albumsOutline,
} from "ionicons/icons";
import "./WorshipNav.scss";

const NAV_ITEMS = [
  { path: "/worship", label: "Dashboard", icon: gridOutline, exact: true },
  { path: "/worship/teams", label: "Teams", icon: peopleOutline },
  { path: "/worship/services", label: "Services", icon: calendarOutline },
  { path: "/worship/songs", label: "Songs", icon: musicalNotesOutline },
  { path: "/worship/rehearsals", label: "Rehearsals", icon: albumsOutline },
];

export const WorshipNav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <nav className="worship-nav">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.path}
          className={`worship-nav__item ${isActive(item) ? "active" : ""}`}
          onClick={() => history.push(item.path)}
        >
          <IonIcon icon={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
