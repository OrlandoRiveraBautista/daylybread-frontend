import React, { useEffect, useState } from "react";
import {
  IonText,
  // IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  // IonRow,
  // IonCol,
  IonSkeletonText,
} from "@ionic/react";
// import {
//   bookOutline,
//   bookmarkOutline,
//   heartOutline,
//   trendingUpOutline,
//   calendarOutline,
// } from "ionicons/icons";

/* Context */
import { useAppContext } from "../../../context/context";

/* Hooks */
import { useUserBibleHistory } from "../../../hooks/UserHooks";
import { useMoodHistory } from "../../../hooks/useMoodApi";

/* Styles */
import "./PersonalizedDashboard.scss";

interface UserStats {
  totalReadingSessions: number;
  totalBookmarks: number;
  currentStreak: number;
  favoriteBook: string;
  recentMoodCheckins: number;
  memberSince: string;
}

const PersonalizedDashboard: React.FC = () => {
  const { userInfo, bookmarksResponse } = useAppContext();
  const { data: bibleHistoryData, loading: historyLoading } =
    useUserBibleHistory();
  const { moodHistory, loading: moodLoading } = useMoodHistory();

  const [userStats, setUserStats] = useState<UserStats>({
    totalReadingSessions: 0,
    totalBookmarks: 0,
    currentStreak: 0,
    favoriteBook: "Genesis",
    recentMoodCheckins: 0,
    memberSince: "",
  });

  const [timeOfDay, setTimeOfDay] = useState<string>("");

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay("Good morning");
    } else if (hour < 17) {
      setTimeOfDay("Good afternoon");
    } else {
      setTimeOfDay("Good evening");
    }
  }, []);

  useEffect(() => {
    if (!bibleHistoryData || !bookmarksResponse || !userInfo) return;

    // Calculate user statistics
    const calculateStats = () => {
      const bibleHistory = bibleHistoryData.me?.user?.bibleHistory?.find(
        (history) => history.current
      );

      const totalSessions = bibleHistory?.history?.length || 0;
      const totalBookmarks =
        bookmarksResponse.getMyBookmarks?.results?.length || 0;

      // Calculate favorite book (most read)
      const bookCounts: { [key: string]: number } = {};
      bibleHistory?.history?.forEach((entry) => {
        if (entry.bookId) {
          bookCounts[entry.bookId] = (bookCounts[entry.bookId] || 0) + 1;
        }
      });

      let favoriteBook = "Genesis";
      if (Object.keys(bookCounts).length > 0) {
        favoriteBook = Object.keys(bookCounts).reduce((a, b) =>
          bookCounts[a] > bookCounts[b] ? a : b
        );
      }

      // Calculate reading streak (consecutive days)
      let streak = 0;
      if (bibleHistory?.history?.length) {
        const sortedHistory = [...bibleHistory.history].sort(
          (a, b) =>
            new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
        );

        let currentDate = new Date();
        for (const entry of sortedHistory) {
          const entryDate = new Date(entry.viewedAt);
          const daysDiff = Math.floor(
            (currentDate.getTime() - entryDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          if (daysDiff <= 1) {
            streak++;
            currentDate = entryDate;
          } else {
            break;
          }
        }
      }

      // Count recent mood check-ins (last 7 days)
      const recentMoodCheckins =
        moodHistory?.filter((mood) => {
          const moodDate = new Date(mood.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return moodDate >= weekAgo;
        }).length || 0;

      // Format member since date
      let memberSince = "";
      if (userInfo.createdAt) {
        // Handle both string and number timestamps
        const timestamp =
          typeof userInfo.createdAt === "string"
            ? parseInt(userInfo.createdAt)
            : userInfo.createdAt;

        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          memberSince = date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });
        }
      }

      setUserStats({
        totalReadingSessions: totalSessions,
        totalBookmarks,
        currentStreak: streak,
        favoriteBook,
        recentMoodCheckins,
        memberSince,
      });
    };

    calculateStats();
  }, [bibleHistoryData, bookmarksResponse, userInfo, moodHistory]);

  const getPersonalizedGreeting = () => {
    const firstName = userInfo?.firstName;
    if (firstName) {
      return `${timeOfDay}, ${firstName}!`;
    }
    return `${timeOfDay}!`;
  };

  const getMotivationalMessage = () => {
    if (userStats.currentStreak > 7) {
      return `Amazing ${userStats.currentStreak}-day reading streak! 🔥`;
    } else if (userStats.currentStreak > 0) {
      return `Keep up your ${userStats.currentStreak}-day streak! 💪`;
    } else if (userStats.totalReadingSessions > 10) {
      return "Ready to start a new reading streak?";
    } else {
      return "Your spiritual journey continues...";
    }
  };

  if (historyLoading || moodLoading) {
    return (
      <div className="personalized-dashboard">
        <IonCard className="welcome-card">
          <IonCardContent>
            <IonSkeletonText animated style={{ width: "60%" }} />
            <IonSkeletonText animated style={{ width: "40%" }} />
          </IonCardContent>
        </IonCard>
        {/* <IonGrid>
          <IonRow>
            {[1, 2, 3].map((i) => (
              <IonCol size="4" key={i}>
                <IonCard className="stat-card">
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: "100%" }} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid> */}
      </div>
    );
  }

  return (
    <div className="personalized-dashboard">
      {/* Personalized Welcome */}
      <IonCard className="welcome-card">
        <IonCardContent>
          <IonText>
            <h2 className="greeting">{getPersonalizedGreeting()}</h2>
            <p className="motivational-message">{getMotivationalMessage()}</p>
          </IonText>
        </IonCardContent>
      </IonCard>

      {/* Quick Stats Grid */}
      <IonGrid className="stats-grid">
        {/* <IonRow className="stats-row">
          <IonCol size="6" sizeMd="3">
            <IonCard className="stat-card reading-sessions">
              <IonCardContent>
                <div className="stat-icon">
                  <IonIcon icon={bookOutline} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {userStats.totalReadingSessions}
                  </div>
                  <div className="stat-label">Reading Sessions</div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="6" sizeMd="3">
            <IonCard className="stat-card bookmarks">
              <IonCardContent>
                <div className="stat-icon">
                  <IonIcon icon={bookmarkOutline} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{userStats.totalBookmarks}</div>
                  <div className="stat-label">Bookmarks</div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="6" sizeMd="3">
            <IonCard className="stat-card streak">
              <IonCardContent>
                <div className="stat-icon">
                  <IonIcon icon={trendingUpOutline} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{userStats.currentStreak}</div>
                  <div className="stat-label">Day Streak</div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="6" sizeMd="3">
            <IonCard className="stat-card mood-checkins">
              <IonCardContent>
                <div className="stat-icon">
                  <IonIcon icon={heartOutline} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {userStats.recentMoodCheckins}
                  </div>
                  <div className="stat-label">Mood Check-ins</div>
                  <div className="stat-sublabel">This week</div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow> */}

        {/* Additional Info Row */}
        {/* <IonRow className="stats-row">
          <IonCol size="12" sizeMd="6">
            <IonCard className="info-card favorite-book">
              <IonCardContent>
                <div className="info-header">
                  <IonIcon icon={bookOutline} />
                  <span>Favorite Book</span>
                </div>
                <div className="info-content">{userStats.favoriteBook}</div>
              </IonCardContent>
            </IonCard>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonCard className="info-card member-since">
              <IonCardContent>
                <div className="info-header">
                  <IonIcon icon={calendarOutline} />
                  <span>Member Since</span>
                </div>
                <div className="info-content">{userStats.memberSince}</div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow> */}
      </IonGrid>
    </div>
  );
};

export default PersonalizedDashboard;
