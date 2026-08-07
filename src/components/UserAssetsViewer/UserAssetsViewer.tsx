import React from "react";

/* Components */
import BookmarkAssetList from "./BookmarkAssetList";

/* Styles */
import "./UserAssetsViewer.scss";

interface UserAssetsViewerProps {
  bookmarkCount?: number;
}

const UserAssetsViewer: React.FC<UserAssetsViewerProps> = ({
  bookmarkCount = 0,
}) => {
  return (
    <div className="user-assets-viewer-container">
      <header className="assets-section-header">
        <div className="assets-section-title-row">
          <h2 className="assets-section-title">Bookmarks</h2>
          {bookmarkCount > 0 ? (
            <span
              className="assets-section-count"
              aria-label={`${bookmarkCount} bookmarks`}
            >
              {bookmarkCount}
            </span>
          ) : null}
        </div>
        {bookmarkCount > 0 ? (
          <p className="assets-section-subtitle">
            Long-press a card to select and manage
          </p>
        ) : null}
      </header>
      <BookmarkAssetList />
    </div>
  );
};

export default UserAssetsViewer;
