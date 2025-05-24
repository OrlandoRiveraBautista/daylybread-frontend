import React from "react";
import { IonIcon } from "@ionic/react";
import {
  logoTwitter,
  logoFacebook,
  logoPinterest,
  logoLinkedin,
} from "ionicons/icons";
import "./NFCShare.css";
import { GetNfcConfigQuery } from "../../__generated__/graphql";

const socials = [
  //   { name: "Twitter", icon: logoTwitter, className: "twitter" },
  { name: "Facebook", icon: logoFacebook, className: "facebook" },
  //   { name: "Pinterest", icon: logoPinterest, className: "pinterest" },
  //   { name: "LinkedIn", icon: logoLinkedin, className: "linkedin" },
];

interface NFCShareProps {
  nfcConfig: GetNfcConfigQuery["getNFCConfig"];
}

export const NFCShare: React.FC<NFCShareProps> = ({ nfcConfig }) => {
  const getMetadata = () => {
    return {
      title: nfcConfig.title,
      description: nfcConfig.description,
      url: nfcConfig.url || "https://bible.daylybread.com",
    };
  };

  React.useEffect(() => {
    const metadata = getMetadata();

    // Update meta tags
    document.title = metadata.title;

    const metaTags = {
      description: metadata.description,
      "og:title": metadata.title,
      "og:description": metadata.description,
      "og:url": metadata.url,
      "twitter:card": "summary_large_image",
      "twitter:title": metadata.title,
      "twitter:description": metadata.description,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let element =
        document.querySelector(`meta[property="${name}"]`) ||
        document.querySelector(`meta[name="${name}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(
          name.startsWith("og:") ? "property" : "name",
          name
        );
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });
  }, [nfcConfig.url]);

  const shareOnFacebook = () => {
    const shareUrl = encodeURIComponent(
      nfcConfig.url || "https://bible.daylybread.com"
    ); // or your deep link
    const quote = encodeURIComponent(nfcConfig.title);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`,
      "_blank"
    );
  };
  return (
    <div className="nfc-share-container">
      <span className="nfc-share-label">Share</span>
      <div className="nfc-share-icons">
        {socials.map(
          (social) =>
            nfcConfig?.socialMedia?.[
              social.className as keyof typeof nfcConfig.socialMedia
            ] && (
              <button
                key={social.name}
                className={`nfc-share-btn ${social.className}`}
                onClick={() => {
                  /* Add share logic here */
                  if (social.className === "facebook") {
                    shareOnFacebook();
                  }
                }}
                aria-label={`Share on ${social.name}`}
                type="button"
              >
                <IonIcon icon={social.icon} />
              </button>
            )
        )}
      </div>
    </div>
  );
};
