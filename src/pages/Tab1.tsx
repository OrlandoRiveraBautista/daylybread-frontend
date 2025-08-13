import React from "react";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

/* Components */
import QuickActions from "../components/Home/QuickActions";
import AppFeatures from "../components/Home/AppFeatures";
import MoodCheckIn from "../components/Home/MoodCheckIn";
import PersonalizedDashboard from "../components/Home/PersonalizedDashboard";

/* Context */
import { useAppContext } from "../context/context";

/* Styles */
import "./Tab1.scss";

const Tab1: React.FC = () => {
  const history = useHistory();
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

  // Generate personalized metadata
  const userName = userInfo
    ? `${userInfo.firstName || ""} ${userInfo.lastName || ""}`.trim()
    : "";
  const personalizedTitle = userName
    ? `Welcome back, ${userInfo?.firstName}! - Daylybread: Smart Bible with AI`
    : "Home - Daylybread: Smart Bible with AI | Feeds your spirit";

  const personalizedDescription = userName
    ? `Welcome back, ${userInfo?.firstName}! Continue your spiritual journey with Daylybread - your personalized Bible reading companion with AI assistance, multiple translations, and daily devotionals.`
    : "Welcome to Daylybread - your smart Bible reading companion with AI assistance, multiple translations, mood-based verses, and personalized spiritual growth features.";

  const currentUrl = window.location.href;
  const canonicalUrl = window.location.origin + window.location.pathname;

  return (
    <IonPage>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{personalizedTitle}</title>
        <meta name="title" content={personalizedTitle} />
        <meta name="description" content={personalizedDescription} />
        <meta
          name="keywords"
          content="Bible app, AI Bible assistant, Bible reading, Christian app, spiritual growth, Bible study, devotionals, mood verses, multiple translations, Bible companion"
        />
        <meta name="author" content="Daylybread" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={personalizedTitle} />
        <meta property="og:description" content={personalizedDescription} />
        <meta
          property="og:image"
          content={`${window.location.origin}/assets/icon/Daylybread Icon.png`}
        />
        <meta
          property="og:image:alt"
          content="Daylybread - Smart Bible with AI"
        />
        <meta property="og:site_name" content="Daylybread" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={personalizedTitle} />
        <meta
          property="twitter:description"
          content={personalizedDescription}
        />
        <meta
          property="twitter:image"
          content={`${window.location.origin}/assets/icon/Daylybread Icon.png`}
        />
        <meta
          property="twitter:image:alt"
          content="Daylybread - Smart Bible with AI"
        />

        {/* App-specific metadata */}
        <meta name="application-name" content="Daylybread" />
        <meta name="apple-mobile-web-app-title" content="Daylybread" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Additional SEO */}
        <meta name="category" content="Religion & Spirituality" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
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
          })}
        </script>
      </Helmet>

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
