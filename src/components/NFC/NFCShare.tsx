import React from "react";
import { IonIcon } from "@ionic/react";
import {
  //   logoTwitter,
  logoFacebook,
  //   logoPinterest,
  //   logoLinkedin,
} from "ionicons/icons";
import "./NFCShare.scss";
import { GetNfcConfigQuery } from "../../__generated__/graphql";

const socials = [
  //   { name: "Twitter", icon: logoTwitter, className: "twitter" },
  { name: "Facebook", icon: logoFacebook, className: "facebook" },
  //   { name: "Pinterest", icon: logoPinterest, className: "pinterest" },
  //   { name: "LinkedIn", icon: logoLinkedin, className: "linkedin" },
];

interface NFCShareProps {
  nfcConfig: GetNfcConfigQuery["getNFCConfig"]["results"];
}

export const NFCShare: React.FC<NFCShareProps> = ({ nfcConfig }) => {
  // This component is deprecated as social media sharing is now handled by tiles
  // Kept for backward compatibility but will not render
  return null;
};
