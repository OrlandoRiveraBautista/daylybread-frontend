import React, { useMemo } from "react";
import {
  IonText,
  IonIcon,
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
  recentMoodCheckins: number;
}

const EMPTY_STATS: UserStats = {
  totalReadingSessions: 0,
  totalBookmarks: 0,
  currentStreak: 0,
  recentMoodCheckins: 0,
};

const getTimeOfDayGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const PersonalizedDashboard: React.FC = () => {
  const { userInfo } = useAppContext();
  const { data: bibleHistoryData, loading: historyLoading } =
    useUserBibleHistory();
  const { data: bookmarksData, loading: bookmarksLoading } = useGetBookmarks();
  const { moodHistory, loading: moodLoading } = useMoodHistory();

  const timeOfDay = getTimeOfDayGreeting();

  const userStats = useMemo<UserStats>(() => {
    if (!bibleHistoryData || !userInfo) return EMPTY_STATS;

    const bibleHistory = bibleHistoryData.me?.user?.bibleHistory?.find(
      (history) => history.current
    );

    const totalSessions = bibleHistory?.history?.length || 0;
    const totalBookmarks =
      bookmarksData?.getMyBookmarks?.results?.length || 0;

    let streak = 0;
    if (bibleHistory?.history?.length) {
      const toDateKey = (d: Date) =>
        `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

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

      uniqueDays.sort((a, b) => b.getTime() - a.getTime());

      const today = new Date();
      const todayKey = toDateKey(today);
      const yesterdayDate = new Date(today);
      yesterdayDate.setDate(today.getDate() - 1);
      const yesterdayKey = toDateKey(yesterdayDate);

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

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentMoodCheckins = moodHistory.filter((mood) => {
      const moodDate = new Date(mood.createdAt);
      return !isNaN(moodDate.getTime()) && moodDate >= weekAgo;
    }).length;

    return {
      totalReadingSessions: totalSessions,
      totalBookmarks,
      currentStreak: streak,
      recentMoodCheckins,
    };
  }, [bibleHistoryData, bookmarksData, userInfo, moodHistory]);

  const getPersonalizedGreeting = () => {
    const firstName = userInfo?.firstName;
    if (firstName) {
      return `${timeOfDay}, ${firstName}`;
    }
    return timeOfDay || "Welcome";
  };

  const getMotivationalMessage = () => {
    if (userStats.currentStreak > 7) {
      return `Amazing ${userStats.currentStreak}-day reading streak`;
    }
    if (userStats.currentStreak > 0) {
      return `Keep up your ${userStats.currentStreak}-day streak`;
    }
    if (userStats.totalReadingSessions > 10) {
      return "Ready to start a new reading streak?";
    }
    return "Your spiritual journey continues";
  };

  const stats = [
    {
      key: "sessions",
      label: "Sessions",
      value: userStats.totalReadingSessions,
      icon: bookOutline,
      tone: "sessions",
    },
    {
      key: "bookmarks",
      label: "Bookmarks",
      value: userStats.totalBookmarks,
      icon: bookmarkOutline,
      tone: "bookmarks",
    },
    {
      key: "streak",
      label: "Day Streak",
      value: userStats.currentStreak,
      icon: userStats.currentStreak > 0 ? flameOutline : trendingUpOutline,
      tone: userStats.currentStreak > 0 ? "streak-active" : "streak",
    },
    {
      key: "moods",
      label: "This week",
      value: userStats.recentMoodCheckins,
      icon: heartOutline,
      tone: "moods",
      sublabel: "Moods",
    },
  ];

  if (historyLoading || moodLoading || bookmarksLoading) {
    return (
      <section className="personalized-dashboard" aria-busy="true">
        <div className="home-identity">
          <IonSkeletonText
            animated
            className="home-greeting-skeleton"
            style={{ width: "58%" }}
          />
          <IonSkeletonText
            animated
            className="home-message-skeleton"
            style={{ width: "42%" }}
          />
        </div>
        <div className="home-stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div className="home-stat-card" key={i}>
              <IonSkeletonText animated style={{ width: "40%" }} />
              <IonSkeletonText
                animated
                style={{ width: "55%", marginTop: "8px" }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="personalized-dashboard" aria-label="Your dashboard">
      <div className="home-identity">
        <IonText>
          <h1 className="home-greeting">{getPersonalizedGreeting()}</h1>
        </IonText>
        <p className="home-message">{getMotivationalMessage()}</p>
      </div>

      {userInfo && (
        <div className="home-stats-grid">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className={`home-stat-card home-stat-card--${stat.tone}`}
            >
              <div className="home-stat-icon" aria-hidden="true">
                <IonIcon icon={stat.icon} />
              </div>
              <div className="home-stat-content">
                <span className="home-stat-number">{stat.value}</span>
                <span className="home-stat-label">
                  {stat.sublabel || stat.label}
                </span>
                {stat.sublabel ? (
                  <span className="home-stat-sublabel">{stat.label}</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PersonalizedDashboard;
