import React from "react";
import { IonIcon } from "@ionic/react";
import {
  logoTwitter,
  logoFacebook,
  logoPinterest,
  logoLinkedin,
} from "ionicons/icons";
import "./NFCShare.css";

const socials = [
  { name: "Twitter", icon: logoTwitter, className: "twitter" },
  { name: "Facebook", icon: logoFacebook, className: "facebook" },
  //   { name: "Pinterest", icon: logoPinterest, className: "pinterest" },
  //   { name: "LinkedIn", icon: logoLinkedin, className: "linkedin" },
];

export const NFCShare: React.FC = () => {
  return (
    <div className="nfc-share-container">
      <span className="nfc-share-label">Share</span>
      <div className="nfc-share-icons">
        {socials.map((social) => (
          <button
            key={social.name}
            className={`nfc-share-btn ${social.className}`}
            onClick={() => {
              /* Add share logic here */
            }}
            aria-label={`Share on ${social.name}`}
            type="button"
          >
            <IonIcon icon={social.icon} />
          </button>
        ))}
      </div>
    </div>
  );
};
