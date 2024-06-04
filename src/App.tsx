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

/* Utils */
import { useSetStatusBarColor } from "./utils/statusBarUtils";

setupIonicReact({ mode: "md" });

const App: React.FC = () => {
  const { localStorage, init } = Storage();
  const { setUser, setDevice } = useAppContext();
  const [hasSession, setHasSession] = useState<boolean>(true);
  const [firstTimeFlag, setFirstTimeFlag] = useState<boolean>(false);

  /** Hooks declaration */
  const { getMe, data: userData } = useMe();
  useSetStatusBarColor(); // hook to set the status bar color

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
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * calls to
   * initiate localStorage service
   * get the signed in user
   * once upon start up
   */
  useEffect(() => {
    init();
    getSignInUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    // watch localStorage and hasSession
  }, [localStorage, hasSession, firstTimeFlag]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function sets the user session for when the user has been on the site for a while
   * This function will only be called on the first time a user has come to the site
   */
  const setSession = () => {
    const deviceId = crypto.randomUUID();
    localStorage.set("session", {
      session: true,
      firstTime: true,
      deviceId: deviceId,
    }); // set the local storage session
    setDevice({ id: deviceId });
    setHasSession(true); // set hasSession to true
  };

  /**
   * Function to get session
   */
  const getSession = async () => {
    // look for a session
    const val = await localStorage.get("session");
    // check if there is a session
    if (!val) {
      setHasSession(false);
      setFirstTimeFlag(true);
    }
    /**
     * ! This will be deleted later, for now we need to check if the deviceId has been set so that the ai works properly
     */
    if (!val.deviceId) {
      val.deviceId = crypto.randomUUID();
      localStorage.set("session", val);
    }
    setHasSession(val.session); // set hasSession depending on the response
    setFirstTimeFlag(val.firstTime);
    setDevice({ id: val.deviceId });
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
              {/* App Router */}
              <IonRouterOutlet animated={false}>
                {/* Switch needs to wrap all the routes */}
                {/* 
                  Anything inside of the switch can be used with the
                  useHistory hook, anything outside will now.
                 */}
                <Switch>
                  {/* Default route */}
                  <Route exact path="/">
                    <Redirect to="/read" />
                  </Route>

                  {/* Tab Routes */}
                  {/* <Route exact path="/home">
                    <Tab1 />
                  </Route> */}
                  <Route exact path="/read">
                    <Tab2 />
                  </Route>
                  <Route
                    exact
                    path="/read/:currentLanguage?/:currentBibleId?/:currentBookId?/:currentChapterNumber?"
                  >
                    <Tab2 />
                  </Route>
                  <Route path="/me">
                    <Tab3 />
                  </Route>

                  {/* Auth routes */}
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

              {/* Tab Bar UI */}
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
