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

/* Services */
import { hapticService } from "../../services/hapticService";

const BookmarkAssetList: React.FC = () => {
  const {
    addUserAssetToList,
    removeUserAssetFromList,
    selectedUserAssets,
    isUserAssetInList,
    handleGetBookmarks,
    bookmarksResponse,
  } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark>();

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const selectionMode = selectedUserAssets.length > 0;

  useEffect(() => {
    handleGetBookmarks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the open bookmark in sync after list refetch (e.g. after note save).
  useEffect(() => {
    if (!selectedBookmark?._id) return;
    const fresh = bookmarksResponse?.getMyBookmarks?.results?.find(
      (bookmark) => bookmark._id === selectedBookmark._id
    );
    if (fresh) {
      setSelectedBookmark(fresh as Bookmark);
    }
  }, [bookmarksResponse]); // eslint-disable-line react-hooks/exhaustive-deps

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
      if (!isUserAssetInList(bookmarkEntry)) {
        addUserAssetToList(bookmarkEntry);
        void hapticService.triggerCustomHaptic({ intensity: "medium" });
      }
    }, 420);
  };

  const clearPressTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleSelection = (bookmarkEntry: Bookmark) => {
    if (selectionMode) {
      if (isUserAssetInList(bookmarkEntry)) {
        removeUserAssetFromList(bookmarkEntry);
      } else {
        addUserAssetToList(bookmarkEntry);
      }
      void hapticService.triggerNavigationHaptic();
      return;
    }

    setSelectedBookmark(bookmarkEntry);
    setIsOpen(true);
  };

  const bookmarks = bookmarksResponse?.getMyBookmarks?.results;
  const isEmpty = !bookmarks || bookmarks.length === 0;

  return (
    <div
      className={`bookmark-list-container ${
        selectionMode ? "is-selecting" : ""
      }`}
    >
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      {isEmpty ? (
        <div id="empty-text-container" className="bookmark-empty-state">
          <div className="bookmark-empty-icon" aria-hidden="true">
            <span className="material-icons-round">bookmark_border</span>
          </div>
          <IonText className="main-text">No bookmarks yet</IonText>
          <IonText className="sub-text">
            Select a verse while reading to save it here.
          </IonText>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
        >
          <Masonry columnsCount={2} gutter="12px">
            {bookmarks.map((bookmarkEntry, index) => {
              const selected = isUserAssetInList(bookmarkEntry as Bookmark);
              return (
                <IonCard
                  button
                  className={`outlined-card bookmark-card ${
                    selected ? "selected" : ""
                  }`}
                  key={bookmarkEntry._id || index}
                  onClick={() => handleSelection(bookmarkEntry as Bookmark)}
                  onMouseDown={() =>
                    startPressTimer(bookmarkEntry as Bookmark)
                  }
                  onMouseUp={clearPressTimer}
                  onMouseLeave={clearPressTimer}
                  onTouchStart={() =>
                    startPressTimer(bookmarkEntry as Bookmark)
                  }
                  onTouchEnd={clearPressTimer}
                  onTouchCancel={clearPressTimer}
                >
                  <IonCardContent>
                    <div
                      className={`bookmark-select-indicator ${
                        selected ? "is-on" : selectionMode ? "is-ready" : ""
                      }`}
                      aria-hidden="true"
                    >
                      {selected ? (
                        <span className="material-icons-round">check</span>
                      ) : null}
                    </div>

                    <IonText className="bookmark-card-verse">
                      {bookmarkEntry.verses[0]
                        ? bookmarkEntry.verses.map((verse) => verse.text)
                        : bookmarkEntry.newVerses?.map(
                            (verse) => verse.verseText
                          )}
                    </IonText>
                    <div className="bookmark-card-footer">
                      <IonText className="bookmark-card-citation">
                        {bookmarkEntry.verses[0]
                          ? getVerseVerbageByVerses(bookmarkEntry.verses!)
                          : getVerseVerbageByNewVerses(
                              bookmarkEntry.newVerses!,
                              bookmarkEntry.bibleId!
                            )}
                      </IonText>
                      {bookmarkEntry.note ? (
                        <IonIcon icon={CommentIcon} aria-label="Has note" />
                      ) : null}
                    </div>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}

      <SelectedBookmarkModal
        isOpen={isOpen}
        onDismiss={onDismiss}
        selectedBookmark={selectedBookmark!}
      />
    </div>
  );
};

export default BookmarkAssetList;
