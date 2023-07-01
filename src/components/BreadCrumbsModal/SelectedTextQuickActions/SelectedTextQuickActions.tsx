import React from "react";
import { IonChip } from "@ionic/react";

/* Context */
import { useAppContext } from "../../../context/context";

/* Utils */
import { getCitationVerbage } from "../../../utils/support";

const SendTextQuickActions: React.FC = () => {
  //global state
  const { selectedVerseList, chosenBook, chosenChapter } = useAppContext();

  /**
   * Quick actions object for selected text
   */
  const selectedTextQuickActions = {
    // copy quick action
    copy: () => {
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
      navigator.clipboard.writeText(copyText.join(" ")); //join by space
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
