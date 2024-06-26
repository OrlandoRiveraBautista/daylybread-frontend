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

/* Styles */
import "./BookmarkAssetList.scss";

/* Images */
import CommentIcon from "../../assets/icons/comment-icon.svg";

/* Utility */
import {
  getVerseVerbageByNewVerses,
  getVerseVerbageByVerses,
} from "../../utils/support";

/* Interfaces */
import { Bookmark } from "../../__generated__/graphql";

/* Context */
import { useAppContext } from "../../context/context";

const BookmarkAssetList: React.FC = () => {
  // global context state
  const {
    addUserAssetToList,
    removeUserAssetFromList,
    selectedUserAssets,
    isUserAssetInList,
    handleGetBookmarks,
    bookmarksResponse,
  } = useAppContext();

  // local state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark>();

  const timerRef = useRef<any>();

  useEffect(() => {
    handleGetBookmarks();
    //upon mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onDismiss = () => {
    setSelectedBookmark(undefined);
    setIsOpen(false);
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    handleGetBookmarks();
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
        {!bookmarksResponse?.getMyBookmarks.results ? (
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
              {bookmarksResponse.getMyBookmarks.results.map(
                (bookmarkEntry, index) => (
                  <IonCard
                    button
                    className={`outlined-card ${
                      isUserAssetInList(bookmarkEntry as any)
                        ? "selected"
                        : null
                    }`}
                    key={index}
                    onClick={() => handleSelection(bookmarkEntry as any)}
                    onMouseDown={() => handleOnMouseDown(bookmarkEntry as any)}
                    onMouseUp={() => handleOnMouseUp()}
                    onTouchStart={() =>
                      handleOnTouchStart(bookmarkEntry as any)
                    }
                    onTouchEnd={() => handleOnTouchEnd()}
                  >
                    <IonCardContent>
                      <IonText className="bookmark-card-verse">
                        {bookmarkEntry.verses[0]
                          ? bookmarkEntry.verses.map((verse) => verse.text)
                          : bookmarkEntry.newVerses?.map(
                              (verse) => verse.verseText
                            )}
                      </IonText>
                      <IonText className="bookmark-card-citation">
                        {bookmarkEntry.verses[0]
                          ? getVerseVerbageByVerses(bookmarkEntry.verses!)
                          : getVerseVerbageByNewVerses(
                              bookmarkEntry.newVerses!,
                              bookmarkEntry.bibleId!
                            )}
                      </IonText>
                      {bookmarkEntry.note ? (
                        <IonIcon icon={CommentIcon} />
                      ) : null}
                    </IonCardContent>
                  </IonCard>
                )
              )}
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
