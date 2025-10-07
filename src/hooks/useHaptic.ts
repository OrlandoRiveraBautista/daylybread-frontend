import { useState, useEffect } from "react";
import { hapticService } from "../services/hapticService";

export const useHaptic = () => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isPWA, setIsPWA] = useState<boolean>(false);

  useEffect(() => {
    // Check if running as PWA
    const checkPWA = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const isIOSPWA = (window.navigator as any).standalone === true;
      const isAndroidPWA =
        window.matchMedia("(display-mode: standalone)").matches &&
        !window.navigator.userAgent.includes("Chrome");

      return isStandalone || isIOSPWA || isAndroidPWA;
    };

    setIsPWA(checkPWA());

    // Check haptic availability
    const checkAvailability = async () => {
      const available = await hapticService.isHapticAvailable();
      setIsAvailable(available);
    };

    checkAvailability();
  }, []);

  const triggerChatHaptic = async () => {
    if (isAvailable) {
      await hapticService.triggerChatHaptic();
    }
  };

  const triggerChatCompleteHaptic = async () => {
    if (isAvailable) {
      await hapticService.triggerChatCompleteHaptic();
    }
  };

  const triggerSlideHaptic = async () => {
    if (isAvailable) {
      await hapticService.triggerSlideHaptic();
    }
  };

  const triggerNavigationHaptic = async () => {
    if (isAvailable) {
      await hapticService.triggerNavigationHaptic();
    }
  };

  const triggerSuccessHaptic = async () => {
    if (isAvailable) {
      await hapticService.triggerSuccessHaptic();
    }
  };

  const triggerErrorHaptic = async () => {
    if (isAvailable) {
      await hapticService.triggerErrorHaptic();
    }
  };

  return {
    isAvailable,
    isPWA,
    triggerChatHaptic,
    triggerChatCompleteHaptic,
    triggerSlideHaptic,
    triggerNavigationHaptic,
    triggerSuccessHaptic,
    triggerErrorHaptic,
  };
};
