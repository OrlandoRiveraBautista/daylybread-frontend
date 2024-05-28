import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({ overlay: true });

const setStatusBarStyleDark = async () => {
  await StatusBar.setStyle({ style: Style.Dark });
};

const setStatusBarStyleLight = async () => {
  await StatusBar.setStyle({ style: Style.Light });
};

// const hideStatusBar = async () => {
//   await StatusBar.hide();
// };

// const showStatusBar = async () => {
//   await StatusBar.show();
// };

export const useSetStatusBarColor = async () => {
  if (!Capacitor.isNativePlatform()) return;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const { style: currentStyle } = await StatusBar.getInfo();

  if (prefersDark.matches) {
    // The user prefers dark mode
    if (currentStyle === "DARK") return;

    await setStatusBarStyleDark();
  } else {
    // The user prefers light mode
    if (currentStyle === "LIGHT") return;
    await setStatusBarStyleLight();
  }
};
