import React, { useState } from "react";
import { IonChip } from "@ionic/react";
import { Share } from "@capacitor/share";

/* Context */
import { useAppContext } from "../../../context/context";

/* Utils */
import {
  getSelectedText,
  generateVerseDeepLink,
  generateShareText,
} from "../../../utils/support";

/* Components */
import { BookmarkModal } from "../../Modals";

const SendTextQuickActions: React.FC = () => {
  //global state
  const {
    selectedVerseList,
    chosenBible,
    chosenBook,
    chosenChapterNumber,
    chosenLanguage,
  } = useAppContext();

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
        chosenBible!,
        chosenBook!,
        chosenChapterNumber!
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
        chosenBible!,
        chosenBook!,
        chosenChapterNumber!
      );
      if (!text) {
        window.alert("No text selected, please select a text.");
        return;
      }

      // Generate deep link to the specific Bible passage
      const deepLink = generateVerseDeepLink(
        chosenLanguage?.id,
        chosenBible?.abbr || undefined,
        chosenBook?.bookId || undefined,
        chosenChapterNumber
      );

      // Generate share text with the deep link included
      const shareText = generateShareText(
        selectedVerseList.map((v) => v.verseText).join(" "),
        text.split(" ").slice(-2).join(" "), // Get the citation part (e.g., "John 3:16 NIV")
        deepLink
      );

      await Share.share({
        title: "Share a verse from Daylybread",
        text: shareText,
        url: deepLink,
        dialogTitle: "Share this verse!",
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
