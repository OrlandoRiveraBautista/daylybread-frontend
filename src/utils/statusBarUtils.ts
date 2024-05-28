import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

// Display content under transparent status bar (Android only)
if (Capacitor.isNativePlatform()) {
  StatusBar.setOverlaysWebView({ overlay: true });
}

const setStatusBarStyleDark = async () => {
  if (Capacitor.isNativePlatform()) {
    await StatusBar.setStyle({ style: Style.Dark });
  }
};

const setStatusBarStyleLight = async () => {
  if (Capacitor.isNativePlatform()) {
    await StatusBar.setStyle({ style: Style.Light });
  }
};

export const useSetStatusBarColor = async () => {
  if (!Capacitor.isNativePlatform()) return;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  try {
    const { style: currentStyle } = await StatusBar.getInfo();

    if (prefersDark.matches) {
      // The user prefers dark mode
      if (currentStyle !== "DARK") {
        await setStatusBarStyleDark();
      }
    } else {
      // The user prefers light mode
      if (currentStyle !== "LIGHT") {
        await setStatusBarStyleLight();
      }
    }
  } catch (error) {
    console.error("Error setting status bar style:", error);
  }
};
