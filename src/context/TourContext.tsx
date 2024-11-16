import React, { createContext, useContext, useState, ReactNode } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";

interface TourContextProps {
  startTour: () => void;
  addSteps: (newSteps: Step[]) => void;
}

interface ITourProvider {
  children: ReactNode;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const TourProvider: React.FC<ITourProvider> = ({
  children,
}: ITourProvider) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [run, setRun] = useState(false);

  const startTour = () => setRun(true);

  const addSteps = (newSteps: Step[]) => {
    setSteps((prevSteps) => [...prevSteps, ...newSteps]);
  };

  const handleCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === "finished" || status === "skipped") {
      setRun(false); // End the tour
    }
  };

  return (
    <TourContext.Provider value={{ startTour, addSteps }}>
      {children}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        callback={handleCallback}
        styles={{
          options: { zIndex: 1000 },
        }}
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
