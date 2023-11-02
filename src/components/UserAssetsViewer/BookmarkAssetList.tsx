import React, { useEffect, useRef, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonText,
  RefresherEventDetail,
} from "@ionic/react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

/* Components */
import { SelectedBookmarkModal } from "../Modals";

/* Graphql API/Hooks */
import { useLazyGetBookmarks } from "../../hooks/UserHooks";

/* Styles */
import "./BookmarkAssetList.scss";

/* Images */
import CommentIcon from "../../assets/icons/comment-icon.svg";

/* Utility */
import { getVerseVerbageByVerses } from "../../utils/support";

/* Interfaces */
import { Bookmark } from "../../__generated__/graphql";

/* Context */
import { useAppContext } from "../../context/context";

const BookmarkAssetList: React.FC = () => {
  // graphql
  const { getLazyBookmarks, data: bookmarks } = useLazyGetBookmarks();

  // global context state
  const {
    addUserAssetToList,
    removeUserAssetFromList,
    selectedUserAssets,
    isUserAssetInList,
  } = useAppContext();

  // local state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark>();

  const timerRef = useRef<any>();

  useEffect(() => {
    getLazyBookmarks();
  }, []); //upon mount

  const onDismiss = () => {
    setSelectedBookmark(undefined);
    setIsOpen(false);
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    getLazyBookmarks();
    event.detail.complete();
  };

  const startPressTimer = (bookmarkEntry: Bookmark) => {
    timerRef.current = setTimeout(() => {
      addUserAssetToList(bookmarkEntry);
    }, 500);
  };

  const handleSelection = (bookmarkEntry: Bookmark) => {
    // check if there are any user assets selected
    if (selectedUserAssets.length) {
      // check if the asset is in the list
      if (isUserAssetInList(bookmarkEntry)) {
        removeUserAssetFromList(bookmarkEntry);
      } else {
        addUserAssetToList(bookmarkEntry);
      }
    } else {
      // view asset if selection mode is not engaged
      setSelectedBookmark(bookmarkEntry);
      setIsOpen(true);
    }
  };

  const handleOnMouseDown = (bookmarkEntry: Bookmark) => {
    startPressTimer(bookmarkEntry);
  };

  const handleOnMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  const handleOnTouchStart = (bookmarkEntry: Bookmark) => {
    startPressTimer(bookmarkEntry);
  };

  const handleOnTouchEnd = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <div className="bookmark-list-container">
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <>
        {!bookmarks?.getMyBookmarks.results ? (
          <div id="empty-text-container">
            <IonText className="main-text">No Bookmarks</IonText>
            <IonText className="sub-text">
              You can make bookmarks by selecting a text in the bible.
            </IonText>
          </div>
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
          >
            <Masonry columnsCount={2} gutter="16px">
              {bookmarks.getMyBookmarks.results.map((bookmarkEntry, index) => (
                <IonCard
                  button
                  className="outlined-card"
                  key={index}
                  onClick={() => handleSelection(bookmarkEntry as any)}
                  onMouseDown={() => handleOnMouseDown(bookmarkEntry as any)}
                  onMouseUp={() => handleOnMouseUp()}
                  onTouchStart={() => handleOnTouchStart(bookmarkEntry as any)}
                  onTouchEnd={() => handleOnTouchEnd()}
                >
                  <IonCardContent>
                    <IonText className="bookmark-card-verse">
                      {bookmarkEntry.verses.map((verse) => verse.text)}
                    </IonText>
                    <IonText className="bookmark-card-citation">
                      {getVerseVerbageByVerses(bookmarkEntry.verses!)}
                    </IonText>
                    {bookmarkEntry.note ? <IonIcon icon={CommentIcon} /> : null}
                  </IonCardContent>
                </IonCard>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </>

      <SelectedBookmarkModal
        isOpen={isOpen}
        onDismiss={onDismiss}
        selectedBookmark={selectedBookmark!}
      />
    </div>
  );
};

export default BookmarkAssetList;
