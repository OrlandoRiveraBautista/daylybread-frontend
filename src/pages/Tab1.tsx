import React from "react";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonText,
  // IonHeader,
  // IonToolbar,
  // IonTitle,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";

/* Components */
import SEOHead from "../components/SEO/SEOHead";
import QuickActions from "../components/Home/QuickActions";
import AppFeatures from "../components/Home/AppFeatures";
import MoodCheckIn from "../components/Home/MoodCheckIn";
import PersonalizedDashboard from "../components/Home/PersonalizedDashboard";

/* Context */
import { useAppContext } from "../context/context";

/* Hooks */
import { generateMoodCheckInSEO } from "../hooks/useSEO";

/* Styles */
import "./Tab1.scss";

const Tab1: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { chosenBible, chosenBook, chosenChapterNumber, userInfo } =
    useAppContext();

  const handleQuickRead = () => {
    if (chosenBible && chosenBook && chosenChapterNumber) {
      history.push(
        `/read/${chosenBible.languageId}/${chosenBible.abbr}/${chosenBook.bookId}/${chosenChapterNumber}`
      );
    } else {
      history.push("/read");
    }
  };

  // Check if this is a mood check-in page
  const urlParams = new URLSearchParams(location.search);
  const isMoodCheckin = urlParams.get("mood") === "checkin";
  const currentMood = urlParams.get("feeling");

  // Generate URLs
  const canonicalUrl = window.location.origin + window.location.pathname;

  // Generate personalized metadata
  const userName = userInfo
    ? `${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim()
    : "";

  // Generate SEO based on page type
  let seoConfig;
  if (isMoodCheckin) {
    seoConfig = generateMoodCheckInSEO(currentMood || undefined);
  } else {
    const personalizedTitle = userName
      ? `Welcome back, ${userInfo?.firstName}! - Daylybread: Smart Bible with AI`
      : "Home - Daylybread: Smart Bible with AI | Feeds your spirit";

    const personalizedDescription = userName
      ? `Welcome back, ${userInfo?.firstName}! Continue your spiritual journey with Daylybread - your personalized Bible reading companion with AI assistance, multiple translations, and daily devotionals.`
      : "Welcome to Daylybread - your smart Bible reading companion with AI assistance, multiple translations, mood-based verses, and personalized spiritual growth features.";

    seoConfig = {
      title: personalizedTitle,
      description: personalizedDescription,
      keywords:
        "Bible app, smart Bible, AI Bible assistant, Bible reading, Christian app, spiritual growth, Bible study, devotionals, mood verses, multiple translations, Bible companion, free Bible app, daily bread, biblical AI, Christian technology, faith app",
      url: "https://bible.daylybread.com/",
      canonicalUrl: canonicalUrl,
      type: "website",
      section: "Home",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Daylybread",
        description:
          "Smart Bible reading companion with AI assistance, multiple translations, and personalized spiritual growth features",
        url: canonicalUrl,
        applicationCategory: "Religion & Spirituality",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "Daylybread",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "2500",
        },
        featureList: [
          "AI-powered Bible assistance",
          "Multiple Bible translations",
          "Mood-based verse suggestions",
          "Personalized dashboard",
          "Audio Bible reading",
          "Bookmark management",
          "Daily devotionals",
        ],
      },
    };
  }

  return (
    <IonPage>
      {/* Enhanced SEO Head */}
      <SEOHead {...seoConfig} />

      <IonContent className="home-content">
        {/* Personalized Dashboard */}
        <PersonalizedDashboard />

        <IonGrid className="home-grid">
          {/* Mood Check-In */}
          <MoodCheckIn />

          {/* Quick Actions */}
          <QuickActions />

          {/* App Features */}
          <AppFeatures />

          {/* Call to Action */}
          <IonRow>
            <IonCol size="12">
              <div className="cta-section">
                <IonText>
                  <h3>Ready to dive deeper?</h3>
                  <p>
                    Explore the Bible with our advanced reading tools and AI
                    assistance.
                  </p>
                </IonText>
                <IonButton
                  expand="block"
                  shape="round"
                  color="primary"
                  size="large"
                  onClick={handleQuickRead}
                >
                  Start Reading
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
