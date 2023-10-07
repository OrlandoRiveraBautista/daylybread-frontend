import React, { useEffect, useState } from "react";
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

const BookmarkAssetList: React.FC = () => {
  // graphql
  const { getLazyBookmarks, data: bookmarks } = useLazyGetBookmarks();

  // local state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark>();

  useEffect(() => {
    getLazyBookmarks();
  }, []); //upon mount

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    getLazyBookmarks();
    event.detail.complete();
  };

  const handleSelection = (bookmarkEntry: Bookmark) => {
    setSelectedBookmark(bookmarkEntry);
    setIsOpen(true);
  };

  const onDismiss = () => {
    setSelectedBookmark(undefined);
    setIsOpen(false);
  };

  return (
    <div className="bookmark-list-container">
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}>
        <Masonry columnsCount={2} gutter="16px">
          {!bookmarks?.getMyBookmarks.results ? (
            <div id="empty-text-container">
              <IonText className="main-text">No Bookmarks</IonText>
              <IonText className="sub-text">
                You can make bookmarks by selecting a text in the bible.
              </IonText>
            </div>
          ) : (
            bookmarks.getMyBookmarks.results.map((bookmarkEntry, index) => (
              <IonCard
                button
                className="outlined-card"
                key={index}
                onClick={() => handleSelection(bookmarkEntry as any)}
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
            ))
          )}
        </Masonry>
      </ResponsiveMasonry>

      <SelectedBookmarkModal
        isOpen={isOpen}
        onDismiss={onDismiss}
        selectedBookmark={selectedBookmark!}
      />
    </div>
  );
};

export default BookmarkAssetList;
