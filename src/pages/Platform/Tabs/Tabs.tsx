import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import React from "react";
import "./Tabs.scss";

export interface Tab {
  icon: string;
  label: string;
  value: string;
  onClick: () => void;
}

interface ITabsProps {
  tabs: Tab[];
}
const Tabs: React.FC<ITabsProps> = ({ tabs }: ITabsProps) => {
  const renderTabs = () => {
    return tabs.map((tab) => (
      <IonButton
        className="tabs-segment"
        key={tab.value}
        onClick={tab.onClick}
        shape="round"
        color="light"
      >
        <div className="tabs-segment-icon">
          <IonIcon icon={tab.icon} />
          <IonLabel>{tab.label}</IonLabel>
        </div>
      </IonButton>
    ));
  };

  return <div className="tabs-container">{renderTabs()}</div>;
};

export default Tabs;
