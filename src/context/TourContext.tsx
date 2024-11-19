import React, { createContext, useContext, useState, ReactNode } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";
import StorageService from "./localStorage";

interface TourContextProps {
  startTour: () => void;
  addSteps: (newSteps: Step[]) => void;
  nextStep: () => void;
}

interface ITourProvider {
  children: ReactNode;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const TourProvider: React.FC<ITourProvider> = ({
  children,
}: ITourProvider) => {
  const [steps, setSteps] = useState<Step[]>([
    {
      target: ".tour-step-1",
      content: "Click to pick a bible",
      spotlightClicks: true,
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
    },
    {
      target: ".tour-step-2",
      content: "Click to pick a language",
      // disableBeacon: true,
      disableOverlayClose: true,
      spotlightClicks: true,
      placement: "top",
    },
    {
      target: ".tour-step-3",
      content: "Search for a language",
      // disableBeacon: true,
      disableOverlayClose: true,
      spotlightClicks: true,
      placement: "top",
    },
  ]);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const startTour = () => setRun(true);

  const addSteps = (newSteps: Step[]) => {
    setSteps((prevSteps) => [...prevSteps, ...newSteps]);
  };

  const handleCallback = async (data: CallBackProps) => {
    const { status } = data;

    if (status === "finished" || status === "skipped") {
      setRun(false); // End the tour

      const localStorage = await StorageService.getInstance();
      await localStorage.set("session", { session: true, firstTime: false }); // set the local storage session
      console.log("herer");
    }
  };

  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  return (
    <TourContext.Provider value={{ startTour, addSteps, nextStep }}>
      {children}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        stepIndex={stepIndex}
        callback={handleCallback}
        styles={{
          options: { zIndex: 1000 },
        }}
        debug
      />
    </TourContext.Provider>
  );
};

export const useTour = (): TourContextProps => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
