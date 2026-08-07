import React, { useEffect, useState } from "react";
import {
  IonText,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSkeletonText,
} from "@ionic/react";
import {
  bookOutline,
  bookmarkOutline,
  heartOutline,
  trendingUpOutline,
  flameOutline,
} from "ionicons/icons";

/* Context */
import { useAppContext } from "../../../context/context";

/* Hooks */
import { useUserBibleHistory, useGetBookmarks } from "../../../hooks/UserHooks";
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
  const { userInfo } = useAppContext();
  const { data: bibleHistoryData, loading: historyLoading } =
    useUserBibleHistory();
  const { data: bookmarksData, loading: bookmarksLoading } = useGetBookmarks();
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
    if (!bibleHistoryData || !userInfo) return;

    const bibleHistory = bibleHistoryData.me?.user?.bibleHistory?.find(
      (history) => history.current
    );

    const totalSessions = bibleHistory?.history?.length || 0;
    const totalBookmarks =
      bookmarksData?.getMyBookmarks?.results?.length || 0;

    // Streak: count unique consecutive calendar days (most recent first),
    // allowing today or yesterday as the starting point.
    let streak = 0;
    if (bibleHistory?.history?.length) {
      const toDateKey = (d: Date) =>
        `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

      // Deduplicate to one entry per calendar day
      const seenDays = new Set<string>();
      const uniqueDays: Date[] = [];
      for (const entry of bibleHistory.history) {
        const d = new Date(entry.viewedAt);
        if (isNaN(d.getTime())) continue;
        const key = toDateKey(d);
        if (!seenDays.has(key)) {
          seenDays.add(key);
          uniqueDays.push(d);
        }
      }

      // Sort descending (most recent first)
      uniqueDays.sort((a, b) => b.getTime() - a.getTime());

      const today = new Date();
      const todayKey = toDateKey(today);
      const yesterdayDate = new Date(today);
      yesterdayDate.setDate(today.getDate() - 1);
      const yesterdayKey = toDateKey(yesterdayDate);

      // Streak must start from today or yesterday
      if (
        uniqueDays.length > 0 &&
        (toDateKey(uniqueDays[0]) === todayKey ||
          toDateKey(uniqueDays[0]) === yesterdayKey)
      ) {
        streak = 1;
        for (let i = 1; i < uniqueDays.length; i++) {
          const prev = uniqueDays[i - 1];
          const curr = uniqueDays[i];
          const diffDays = Math.round(
            (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }
      }
    }

    // Count recent mood check-ins (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentMoodCheckins =
      moodHistory?.filter((mood) => {
        const moodDate = new Date(mood.createdAt);
        return !isNaN(moodDate.getTime()) && moodDate >= weekAgo;
      }).length || 0;

    setUserStats((prev) => ({
      ...prev,
      totalReadingSessions: totalSessions,
      totalBookmarks,
      currentStreak: streak,
      recentMoodCheckins,
    }));
  }, [bibleHistoryData, bookmarksData, userInfo, moodHistory]);

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

  if (historyLoading || moodLoading || bookmarksLoading) {
    return (
      <div className="personalized-dashboard">
        <IonCard className="welcome-card">
          <IonCardContent>
            <IonSkeletonText animated style={{ width: "60%" }} />
            <IonSkeletonText animated style={{ width: "40%" }} />
          </IonCardContent>
        </IonCard>
        <IonGrid>
          <IonRow>
            {[1, 2, 3, 4].map((i) => (
              <IonCol size="6" key={i}>
                <IonCard className="stat-card">
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: "100%" }} />
                    <IonSkeletonText
                      animated
                      style={{ width: "60%", marginTop: "6px" }}
                    />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
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
      {userInfo && (
        <IonGrid className="stats-grid">
          <IonRow className="stats-row">
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
                    <div className="stat-label">Sessions</div>
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
                    <div className="stat-number">
                      {userStats.totalBookmarks}
                    </div>
                    <div className="stat-label">Bookmarks</div>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6" sizeMd="3">
              <IonCard
                className={`stat-card streak ${userStats.currentStreak > 0 ? "streak-active" : ""}`}
              >
                <IonCardContent>
                  <div className="stat-icon">
                    <IonIcon
                      icon={
                        userStats.currentStreak > 0
                          ? flameOutline
                          : trendingUpOutline
                      }
                    />
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">
                      {userStats.currentStreak}
                    </div>
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
          </IonRow>
        </IonGrid>
      )}
    </div>
  );
};

export default PersonalizedDashboard;
