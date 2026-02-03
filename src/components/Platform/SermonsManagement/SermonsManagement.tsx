import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonModal,
  IonContent,
  IonBadge,
  IonSpinner,
  IonSearchbar,
} from "@ionic/react";
import { add, create, trash, document, time } from "ionicons/icons";
import { useGetSermons, useDeleteSermon } from "../../../hooks/SermonHooks";
import { SermonStatus } from "../../../__generated__/graphql";
import "./SermonsManagement.scss";

interface SermonData {
  _id: string;
  title: string;
  content: string;
  status: SermonStatus;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    firstName?: string | null;
    lastName?: string | null;
  };
}

export const SermonsManagement: React.FC = () => {
  const history = useHistory();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  // API hooks
  const { data, loading, error, refetch } = useGetSermons();
  const [deleteSermon, { loading: isDeleting }] = useDeleteSermon();

  const sermons: SermonData[] = data?.getSermons?.results || [];

  // Filter sermons based on search
  const filteredSermons = sermons.filter((sermon) =>
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateNew = () => {
    history.push("/sermons/new");
  };

  const handleEditSermon = (sermon: SermonData) => {
    history.push(`/sermons/${sermon._id}`);
  };

  const handleDeleteSermon = async (sermonId: string) => {
    try {
      await deleteSermon({
        variables: { id: sermonId },
      });
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting sermon:", err);
    }
  };

  const getStatusColor = (status: SermonStatus) => {
    switch (status) {
      case SermonStatus.Published:
        return "success";
      case SermonStatus.Draft:
        return "medium";
      default:
        return "medium";
    }
  };

  return (
    <div className="sermons-container">
      <div className="sermons-header">
        <div>
          <h1>Sermons</h1>
          <p>Create and manage your sermon notes</p>
        </div>
        <IonButton
          size="large"
          fill="solid"
          shape="round"
          color="primary"
          onClick={handleCreateNew}
        >
          <IonIcon slot="start" icon={add} />
          New Sermon
        </IonButton>
      </div>

      <div className="sermons-search">
        <IonSearchbar
          value={searchQuery}
          onIonInput={(e) => setSearchQuery(e.detail.value || "")}
          placeholder="Search sermons..."
          debounce={300}
        />
      </div>

      {loading && (
        <div className="loading-state">
          <IonSpinner name="crescent" />
          <p>Loading sermons...</p>
        </div>
      )}

      {error && (
        <IonCard className="error-card">
          <IonCardContent>
            <p>Error loading sermons. Please try again.</p>
            <IonButton onClick={() => refetch()}>Retry</IonButton>
          </IonCardContent>
        </IonCard>
      )}

      {!loading && !error && filteredSermons.length === 0 && (
        <div className="empty-state-container">
          <IonCard className="empty-state-card">
            <IonCardContent>
              <div className="empty-state">
                <div className="empty-state-icon-wrapper">
                  <IonIcon icon={document} className="empty-state-icon" />
                </div>
                <h2>No Sermons Yet</h2>
                <p className="empty-state-description">
                  Create your first sermon to get started.
                </p>

                <IonButton
                  size="large"
                  fill="solid"
                  shape="round"
                  color="primary"
                  onClick={handleCreateNew}
                  className="empty-state-button"
                >
                  <IonIcon slot="start" icon={add} />
                  Create Sermon
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      )}

      {!loading && !error && filteredSermons.length > 0 && (
        <div className="sermons-grid">
          {/* New Sermon Card */}
          <IonCard
            className="sermon-card new-sermon-card"
            onClick={handleCreateNew}
            button
          >
            <IonCardContent>
              <div className="new-sermon-content">
                <IonIcon icon={add} className="add-icon" />
                <span>New Sermon</span>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Existing Sermons */}
          {filteredSermons.map((sermon) => (
            <IonCard
              key={sermon._id}
              className="sermon-card"
              onClick={() => handleEditSermon(sermon)}
              button
            >
              <IonCardContent>
                <div className="sermon-card-header">
                  <IonIcon icon={document} className="doc-icon" />
                  <IonBadge color={getStatusColor(sermon.status)}>
                    {sermon.status}
                  </IonBadge>
                </div>

                <h3 className="sermon-title">{sermon.title}</h3>

                <div className="sermon-meta">
                  <IonIcon icon={time} />
                  <IonText color="medium">
                    Edited{" "}
                    {new Date(Number(sermon.updatedAt)).toLocaleDateString()}
                  </IonText>
                </div>

                <div
                  className="sermon-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IonButton
                    fill="clear"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSermon(sermon);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={create} />
                  </IonButton>
                  <IonButton
                    fill="clear"
                    size="small"
                    color="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(sermon._id);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <IonModal
        isOpen={!!showDeleteConfirm}
        onDidDismiss={() => setShowDeleteConfirm(null)}
        breakpoints={[0, 0.5, 0.75]}
        initialBreakpoint={0.5}
        className="delete-sermon-modal"
      >
        <IonContent className="ion-padding">
          <div className="delete-confirmation">
            <IonIcon icon={trash} className="warning-icon" />
            <h2>Delete Sermon?</h2>
            <p>
              Are you sure you want to delete this sermon? This action cannot be
              undone.
            </p>
            <div className="button-group">
              <IonButton
                shape="round"
                expand="block"
                fill="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </IonButton>
              <IonButton
                shape="round"
                expand="block"
                fill="solid"
                color="danger"
                onClick={() => handleDeleteSermon(showDeleteConfirm!)}
                disabled={isDeleting}
              >
                {isDeleting ? <IonSpinner name="crescent" /> : "Delete"}
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
