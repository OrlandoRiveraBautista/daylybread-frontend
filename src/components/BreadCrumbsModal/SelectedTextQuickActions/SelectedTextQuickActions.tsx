import React, { useState } from "react";
import { IonChip } from "@ionic/react";
import { Share } from "@capacitor/share";

/* Context */
import { useAppContext } from "../../../context/context";

/* Utils */
import { getSelectedText } from "../../../utils/support";

/* Components */
import BookmarkModal from "../../Modals/BookmarkModals/BookmarkModal";

const SendTextQuickActions: React.FC = () => {
  //global state
  const { selectedVerseList, chosenBook, chosenChapter } = useAppContext();

  // local state
  const [bookMarkModalIsOpen, setBookMarkModalIsOpen] =
    useState<boolean>(false);

  /**
   * Quick actions object for selected text
   */
  const selectedTextQuickActions = {
    // copy quick action
    copy: () => {
      const text = getSelectedText(
        selectedVerseList,
        chosenBook!,
        chosenChapter!
      );
      if (!text) {
        window.alert("No text selected, please select a text.");
        return;
      }

      navigator.clipboard.writeText(text); //join by space
    },
    // share quick action
    share: async () => {
      const text = getSelectedText(
        selectedVerseList,
        chosenBook!,
        chosenChapter!
      );
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
    // bookmarking quick action
    bookmark: () => {
      setBookMarkModalIsOpen(true);
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

      {/* Modals */}
      <BookmarkModal
        isOpen={bookMarkModalIsOpen}
        onDismiss={() => setBookMarkModalIsOpen(!bookMarkModalIsOpen)}
      />
    </>
  );
};

export default SendTextQuickActions;
