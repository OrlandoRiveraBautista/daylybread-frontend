import { useEffect } from "react";
import { useHaptic } from "./useHaptic";

/**
 * Sets up minimal haptics for all IonModal open/close events app-wide.
 */
export default function useGlobalModalHaptics(): void {
  const { triggerNavigationHaptic } = useHaptic();

  useEffect(() => {
    const handleDidPresent = () => triggerNavigationHaptic();
    const handleDidDismiss = () => triggerNavigationHaptic();

    document.addEventListener(
      "ionModalDidPresent",
      handleDidPresent as EventListener
    );
    document.addEventListener(
      "ionModalDidDismiss",
      handleDidDismiss as EventListener
    );

    return () => {
      document.removeEventListener(
        "ionModalDidPresent",
        handleDidPresent as EventListener
      );
      document.removeEventListener(
        "ionModalDidDismiss",
        handleDidDismiss as EventListener
      );
    };
  }, [triggerNavigationHaptic]);
}
