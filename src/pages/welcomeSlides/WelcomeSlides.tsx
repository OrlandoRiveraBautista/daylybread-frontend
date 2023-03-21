import React, { useState } from "react";
import {
  IonSlides,
  IonSlide,
  IonContent,
  IonImg,
  IonText,
  IonButton,
} from "@ionic/react";

/** Styles */
import "./WelcomeSlides.scss";

/** Images */
import PinkLogo from "../../assets/images/daylybread-logo-pink.svg";
import WelcomeImage2 from "../../assets/images/welcome-slide-img-2.svg";
import WelcomeImage3 from "../../assets/images/welcome-slide-img-3.svg";

const slideOpts = {
  initalSlide: 1,
  speed: 400,
};

interface IWelcomeSlides {
  onFinish: () => any;
}
const WelcomeSlides: React.FC<IWelcomeSlides> = ({
  onFinish,
}: IWelcomeSlides) => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const lastSlides = () => {
    if (showButton) return;

    setTimeout(() => {
      setShowButton(true);
    }, 2000);
  };

  return (
    <IonContent>
      <IonSlides
        pager={true}
        options={slideOpts}
        onIonSlideReachEnd={() => lastSlides()}
      >
        <IonSlide className="slide1">
          <IonImg className="logo" src={PinkLogo}></IonImg>
          <IonText>
            <h2>Welcome to Daylybread!</h2>
          </IonText>
          <IonText>
            <p>
              We are excited to have you join our community of people who are
              passionate about exploring the scriptures. Our app is designed to
              make it easy for you to read and engage with the Bible wherever
              you are. With a variety of translations, reading plans, and study
              tools available, we hope you'll find the app to be a valuable
              resource on your spiritual journey.
            </p>
          </IonText>
        </IonSlide>
        <IonSlide className="slide2">
          <IonImg className="logo" src={WelcomeImage2}></IonImg>
          <IonText>
            <h2>Discover the Bible in a new way</h2>
          </IonText>
          <IonText>
            <p>
              Our app is designed to help you engage with the Bible in a way
              that feels fresh and inspiring. Whether you're new to the Bible or
              have been studying it for years, you'll find something new to
              discover every time you open the app. With features like audio
              readings, daily devotionals, and community discussions, you'll
              have the opportunity to connect with the text on a deeper level.
            </p>
          </IonText>
        </IonSlide>
        <IonSlide className="slide3">
          <IonImg className="logo" src={WelcomeImage3}></IonImg>
          <IonText>
            <h2>Grow your faith with our app</h2>
          </IonText>
          <IonText>
            <p>
              Our goal is to help you grow in your faith and deepen your
              relationship with God through the study of scripture. By providing
              you with access to a variety of translations, commentaries, and
              study tools, we hope to equip you to better understand the Bible
              and apply its teachings to your life. We believe that the Bible
              has the power to transform lives, and we're excited to be a part
              of your journey as you explore its pages.
            </p>
          </IonText>
          {showButton ? (
            <IonButton mode="md" shape="round" onClick={onFinish}>
              Enter
            </IonButton>
          ) : null}
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
};

export default WelcomeSlides;
