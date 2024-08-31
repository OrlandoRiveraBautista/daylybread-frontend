import React from "react";
import { IonImg } from "@ionic/react";

/* Context */
import { useAppContext } from "../../../context/context";

/* Styles */
import "./Copyright.scss";

const Copyright: React.FC = () => {
  const { chosenBibleCopyright, chosenBible } = useAppContext();
  return (
    <div className="copyright">
      {chosenBibleCopyright?.copyright?.copyright}
      {chosenBibleCopyright?.copyright?.organizations![0].logos?.length ? (
        <IonImg
          src={
            chosenBibleCopyright?.copyright?.organizations![0].logos![0].url!
          }
          alt={chosenBible?.abbr + "copyright"}
          className="copyright-image"
        />
      ) : null}
    </div>
  );
};

export default Copyright;
