import { useState } from "react";

interface ToastOptions {
  message: string;
  duration?: number;
  position?: "top" | "bottom" | "middle";
}

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOptions, setToastOptions] = useState<ToastOptions>({
    message: "",
    duration: 3000,
    position: "bottom",
  });

  const show = (message: string, options?: Partial<ToastOptions>) => {
    setToastMessage(message);
    setToastOptions((prev) => ({ ...prev, ...options }));
    setShowToast(true);
  };

  const hide = () => setShowToast(false);

  return {
    showToast,
    toastMessage,
    toastOptions,
    show,
    hide,
  };
};
