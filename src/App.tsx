import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import SplashScreen from "./pages/splash/SplashScreen";
import WelcomeSlides from "./pages/welcomeSlides/WelcomeSlides";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

/* Context */
import { useLocalStorage as Storage } from "./context/localStorage";
import { useEffect, useState } from "react";

setupIonicReact({
  mode: "md",
});

const App: React.FC = () => {
  const { localStorage, init } = Storage();
  const [hasSession, setHasSession] = useState<boolean>(true);
  const [firstTimeFlag, setFirstTimeFlag] = useState<boolean>(false);

  // calls to initiate localStorage service
  useEffect(() => {
    init();
  }, []);

  // watches for localStorage and hasSession
  useEffect(() => {
    if (!localStorage) return; // exit function if localStorage is not present

    // get session
    getSession();

    // check to see if there is a session, if not wait 2.5s and set the session
    if (!hasSession) {
      setTimeout(() => {
        setSession();
      }, 3000);
    }
  }, [localStorage, hasSession, firstTimeFlag]); // watch localStorage and hasSession

  // function to set the user session
  const setSession = () => {
    localStorage.set("session", { session: true, firstTime: true }); // set the local storage session
    setHasSession(true); // set hasSession to true
  };

  // function to get a session
  const getSession = async () => {
    // look for a session
    const val = await localStorage.get("session");
    if (!val) {
      setHasSession(false);
      setFirstTimeFlag(true);
    }
    setHasSession(val.session); // set hasSession depending on the response
    setFirstTimeFlag(val.firstTime);
    return val; // return the same just in case
  };

  const removeWelcome = () => {
    localStorage.set("session", { session: true, firstTime: false }); // set the local storage session
    setFirstTimeFlag(false);
  };

  return (
    <IonApp>
      <IonReactRouter>
        {localStorage && hasSession ? (
          !firstTimeFlag ? (
            <IonTabs>
              {/* Tabs Router */}
              <IonRouterOutlet>
                {/* <Route exact path="/home">
                <Tab1 />
              </Route> */}
                <Route exact path="/read">
                  <Tab2 />
                </Route>
                {/* <Route path="/you">
                <Tab3 />
              </Route> */}
                <Route exact path="/">
                  <Redirect to="/read" />
                </Route>
              </IonRouterOutlet>
              {/* Tabs UI */}
              <IonTabBar slot="bottom">
                {/* <IonTabButton tab="tab1" href="/home">
                <IonIcon icon={ellipse} />
                <IonLabel>Home</IonLabel>
              </IonTabButton> */}
                <IonTabButton tab="tab2" href="/read">
                  <IonIcon icon={triangle} />
                  <IonLabel>Read</IonLabel>
                </IonTabButton>
                {/* <IonTabButton tab="tab3" href="/you">
                <IonIcon icon={square} />
                <IonLabel>You</IonLabel>
              </IonTabButton> */}
              </IonTabBar>
            </IonTabs>
          ) : (
            <WelcomeSlides onFinish={removeWelcome} />
          )
        ) : (
          <SplashScreen />
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
