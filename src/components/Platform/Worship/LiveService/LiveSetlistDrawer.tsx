import React from "react";
import { IonBadge } from "@ionic/react";

interface LiveSetlistDrawerProps {
  items: any[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

export const LiveSetlistDrawer: React.FC<LiveSetlistDrawerProps> = ({
  items,
  currentIndex,
  onNavigate,
  onClose,
}) => (
  <div className="live-service__setlist-overlay" onClick={onClose}>
    <div
      className="live-service__setlist-drawer"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Setlist</h3>
      <div className="live-service__setlist-items">
        {items.map((item: any, idx: number) => (
          <button
            key={item._id}
            className={`live-service__setlist-item ${idx === currentIndex ? "active" : ""}`}
            onClick={() => onNavigate(idx)}
          >
            <span className="live-service__setlist-num">{idx + 1}</span>
            <div className="live-service__setlist-info">
              <span className="live-service__setlist-title">
                {item.song?.title}
              </span>
              <span className="live-service__setlist-meta">
                {item.key && <IonBadge color="tertiary">{item.key}</IonBadge>}
                {item.song?.artist && <span>{item.song.artist}</span>}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
);
