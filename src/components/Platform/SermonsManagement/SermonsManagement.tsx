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
  IonSpinner,
  IonSearchbar,
} from "@ionic/react";
import { add, document, time, trash } from "ionicons/icons";
import { useGetSermons, useDeleteSermon } from "../../../hooks/SermonHooks";
import { AddCard } from "../AddCard";
import { ItemCard } from "../ItemCard";
import { SermonStatus } from "../../../__generated__/graphql";
import EmptyState from "../../EmptyState/EmptyState";
import { PageHeader } from "../PageHeader";
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
  const [deletingSermonId, setDeletingSermonId] = useState<string | null>(null);

  // API hooks
  const { data, loading, error, refetch } = useGetSermons();
  const [deleteSermon, { loading: isDeleting }] = useDeleteSermon();

  const sermons: SermonData[] = data?.getSermons?.results || [];

  // Filter sermons based on search, but keep deleting sermon visible for animation
  const filteredSermons = sermons.filter((sermon) => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isDeleting = deletingSermonId === sermon._id;
    return matchesSearch || isDeleting;
  });

  const handleCreateNew = () => {
    history.push("/sermons/new");
  };

  const handleEditSermon = (sermon: SermonData) => {
    history.push(`/sermons/${sermon._id}`);
  };

  const handleDeleteSermon = async (sermonId: string) => {
    try {
      setDeletingSermonId(sermonId);
      setShowDeleteConfirm(null);
      
      // Wait for animation to complete before actually deleting
      setTimeout(async () => {
        try {
          await deleteSermon({
            variables: { id: sermonId },
          });
          // Refetch to update the list after deletion
          await refetch();
        } finally {
          setDeletingSermonId(null);
        }
      }, 300); // Match animation duration
    } catch (err) {
      console.error("Error deleting sermon:", err);
      setDeletingSermonId(null);
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
      <PageHeader
        title="Sermons"
        subtitle="Create and manage your sermon notes"
        actions={[
          {
            label: "New Sermon",
            icon: add,
            color: "primary",
            onClick: handleCreateNew,
          },
        ]}
      />

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
            <IonButton onClick={() => refetch()} shape="round" color="primary">Retry</IonButton>
          </IonCardContent>
        </IonCard>
      )}

      {!loading && !error && filteredSermons.length === 0 && (
        <EmptyState
          icon={document}
          title="No Sermons Yet"
          description="Create your first sermon to get started."
          actionLabel="Create Sermon"
          onAction={handleCreateNew}
        />
      )}

      {!loading && !error && filteredSermons.length > 0 && (
        <div className="sermons-grid">
          <AddCard
            label="New Sermon"
            onClick={handleCreateNew}
            color="primary"
            className="sermon-card"
          />

          {/* Existing Sermons */}
          {filteredSermons.map((sermon) => {
            const isDeleting = deletingSermonId === sermon._id;
            return (
              <ItemCard
                key={sermon._id}
                icon={document}
                iconClassName="doc-icon"
                title={sermon.title}
                badges={[{ text: sermon.status, color: getStatusColor(sermon.status) }]}
                metadata={
                  <>
                    <IonIcon icon={time} />
                    <IonText color="medium">
                      Edited {new Date(Number(sermon.updatedAt)).toLocaleDateString()}
                    </IonText>
                  </>
                }
                onClick={() => handleEditSermon(sermon)}
                onEdit={() => handleEditSermon(sermon)}
                onDelete={() => setShowDeleteConfirm(sermon._id)}
                isDeleting={isDeleting}
                className="sermon-card"
                searchWords={searchQuery ? [searchQuery] : []}
              />
            );
          })}
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
                color="primary"
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
