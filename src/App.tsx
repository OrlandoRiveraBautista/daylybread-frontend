import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
import { square, triangle } from "ionicons/icons";

/* Pages */
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import SplashScreen from "./pages/splash/SplashScreen";
import WelcomeSlides from "./pages/welcomeSlides/WelcomeSlides";
import Auth from "./pages/Auth/Auth"; // this should be moved to a page does not belong in components

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "./App.scss";

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
import "./theme/components/index.scss";

/* Context */
import { useLocalStorage as Storage } from "./context/localStorage";
import { useAppContext } from "./context/context";

/** Graphql API Hooks */
import { useMe } from "./hooks/UserHooks";

setupIonicReact({
  mode: "md",
});

const App: React.FC = () => {
  const { localStorage, init } = Storage();
  const { setUser } = useAppContext();
  const [hasSession, setHasSession] = useState<boolean>(true);
  const [firstTimeFlag, setFirstTimeFlag] = useState<boolean>(false);

  /** Hooks declaration */
  const { getMe, data: userData } = useMe();

  /**
   * Function to get and set the user if signed in
   */
  const getSignInUser = () => {
    getMe();
  };

  /**
   * Calls to set the user data into the global context
   */
  useEffect(() => {
    if (!userData?.me?.user) return;
    setUser(userData.me.user);
  }, [userData]);

  /**
   * calls to
   * initiate localStorage service
   * get the signed in user
   * once upon start up
   */
  useEffect(() => {
    init();
    getSignInUser();
  }, []);

  /**
   * Use Effect function to watch for localStorage and hasSession
   */
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

  /**
   * Function sets the user session for when the user has been on the site for a while
   * This function will only be called on the first time a user has come to the site
   */
  const setSession = () => {
    localStorage.set("session", { session: true, firstTime: true }); // set the local storage session
    setHasSession(true); // set hasSession to true
  };

  /**
   * Function to get session
   */
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
                <Route exact path="/">
                  <Redirect to="/read" />
                </Route>
                {/* <Route exact path="/home">
                    <Tab1 />
                  </Route> */}
                <Route exact path="/read">
                  <Tab2 />
                </Route>
                <Switch>
                  <Route path="/me">
                    <Tab3 />
                  </Route>
                  <Route path="/login">
                    <Auth />
                  </Route>
                  <Route path="/signup">
                    <Auth />
                  </Route>
                  <Route path="/signupupdateuser">
                    <Auth />
                  </Route>
                </Switch>
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
                <IonTabButton tab="tab3" href="/me">
                  <IonIcon icon={square} />
                  <IonLabel>Me</IonLabel>
                </IonTabButton>
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
