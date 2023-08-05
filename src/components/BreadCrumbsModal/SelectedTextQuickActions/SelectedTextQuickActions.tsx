import React from "react";
import { IonChip } from "@ionic/react";
import { Share } from "@capacitor/share";

/* Context */
import { useAppContext } from "../../../context/context";

/* Utils */
import { getCitationVerbage } from "../../../utils/support";

const SendTextQuickActions: React.FC = () => {
  //global state
  const { selectedVerseList, chosenBook, chosenChapter } = useAppContext();

  const getSelectedText = () => {
    // check if the verse is selected
    if (!selectedVerseList || !chosenBook || !chosenChapter) return;
    const chosenTextVerbage = getCitationVerbage(
      selectedVerseList,
      chosenBook,
      chosenChapter
    );

    const copyText = selectedVerseList
      .sort((a, b) => Number(a.verse) - Number(b.verse)) //sort the selected verses
      .map((verseObj) => verseObj.text); //only return the text
    copyText.push(chosenTextVerbage!); //push the chose text verbage at the end of the list
    return copyText.join(" ");
  };

  /**
   * Quick actions object for selected text
   */
  const selectedTextQuickActions = {
    // copy quick action
    copy: () => {
      const text = getSelectedText();
      if (!text) {
        window.alert("No text selected, please select a text.");
        return;
      }

      navigator.clipboard.writeText(text); //join by space
    },
    // share quick action
    share: async () => {
      const text = getSelectedText();
      if (!text) {
        window.alert("No text selected, please select a text.");
        return;
      }

      await Share.share({
        title: "Share a text with someone",
        text: text,
        // url: "http://ionicframework.com/", // add this back in a later itteration
        dialogTitle: "Share with everyone!",
      });
    },
  };

  return (
    <>
      {Object.entries(selectedTextQuickActions).map(([key, value]) => {
        return (
          <IonChip
            color="secondary"
            key={key}
            onClick={value}
            className="quick-action-chip"
          >
            {key}
          </IonChip>
        );
      })}
    </>
  );
};

export default SendTextQuickActions;
