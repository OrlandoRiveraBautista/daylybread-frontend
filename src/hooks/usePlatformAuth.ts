import { useState, useEffect } from "react";

export interface UsePlatformAuthResult {
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Custom hook to manage platform authentication state.
 * Handles checking user authentication with retry logic.
 */
export const usePlatformAuth = (userInfo: any): UsePlatformAuthResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let tries = 0;
    const maxTries = 3;

    const checkAuth = () => {
      const hasUserInfo = !!userInfo;

      if (tries > maxTries) {
        setIsAuthenticated(hasUserInfo);
        setIsLoading(false);
        return;
      }

      if (hasUserInfo) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      tries++;
    };

    const timer = setTimeout(() => {
      checkAuth();
    }, 1500);

    return () => clearTimeout(timer);
  }, [userInfo]);

  return {
    isLoading,
    isAuthenticated,
  };
};
