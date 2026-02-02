import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonChip,
  IonSpinner,
} from "@ionic/react";
import {
  add,
  create,
  trash,
  document,
  calendar,
  person,
  play,
  download,
} from "ionicons/icons";
import { MediaUploader } from "../../MediaUploader/MediaUploader";
import { MediaPurpose } from "../../../__generated__/graphql";
import "./SermonsManagement.scss";

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series?: string;
  description: string;
  scripture?: string;
  audioUrl?: string;
  videoUrl?: string;
  notesUrl?: string;
  status: "published" | "draft" | "scheduled";
  views?: number;
  duration?: string;
}

interface SermonsManagementProps {
  sermons?: Sermon[];
  onSave: (sermonId: string | null, data: any) => Promise<void>;
  onDelete: (sermonId: string) => void;
  isSaving?: boolean;
}

export const SermonsManagement: React.FC<SermonsManagementProps> = ({
  sermons = [],
  onSave,
  onDelete,
  isSaving = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  const [formData, setFormData] = useState<Partial<Sermon>>({
    title: "",
    speaker: "",
    date: new Date().toISOString().split("T")[0],
    series: "",
    description: "",
    scripture: "",
    audioUrl: "",
    videoUrl: "",
    notesUrl: "",
    status: "draft",
  });

  const handleAddSermon = () => {
    setEditingSermon(null);
    setFormData({
      title: "",
      speaker: "",
      date: new Date().toISOString().split("T")[0],
      series: "",
      description: "",
      scripture: "",
      audioUrl: "",
      videoUrl: "",
      notesUrl: "",
      status: "draft",
    });
    setShowModal(true);
  };

  const handleEditSermon = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setFormData(sermon);
    setShowModal(true);
  };

  const handleSaveSermon = async () => {
    await onSave(editingSermon?.id || null, formData);
    setShowModal(false);
    setEditingSermon(null);
  };

  const handleDeleteSermon = (sermonId: string) => {
    onDelete(sermonId);
    setShowDeleteConfirm(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "scheduled":
        return "warning";
      case "draft":
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
          <p>Manage your sermon library and media</p>
        </div>
        <IonButton size="large" onClick={handleAddSermon}>
          <IonIcon slot="start" icon={add} />
          Add Sermon
        </IonButton>
      </div>

      {sermons.length === 0 ? (
        <IonCard className="empty-state-card">
          <IonCardContent>
            <div className="empty-state">
              <IonIcon icon={document} className="empty-state-icon" />
              <h2>No Sermons Yet</h2>
              <p>
                Start building your sermon library by adding your first message
              </p>
              <IonButton size="large" onClick={handleAddSermon}>
                <IonIcon slot="start" icon={add} />
                Create First Sermon
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      ) : (
        <div className="sermons-list">
          {sermons.map((sermon) => (
            <IonCard key={sermon.id} className="sermon-card">
              <IonCardContent>
                <div className="sermon-card-content">
                  <div className="sermon-main">
                    <div className="sermon-header">
                      <div className="sermon-info">
                        <h3>{sermon.title}</h3>
                        {sermon.series && (
                          <IonChip color="primary">
                            <IonLabel>{sermon.series}</IonLabel>
                          </IonChip>
                        )}
                      </div>
                      <IonBadge color={getStatusColor(sermon.status)}>
                        {sermon.status}
                      </IonBadge>
                    </div>

                    <div className="sermon-meta">
                      <div className="meta-item">
                        <IonIcon icon={person} />
                        <IonText>{sermon.speaker}</IonText>
                      </div>
                      <div className="meta-item">
                        <IonIcon icon={calendar} />
                        <IonText>
                          {new Date(sermon.date).toLocaleDateString()}
                        </IonText>
                      </div>
                      {sermon.duration && (
                        <div className="meta-item">
                          <IonIcon icon={play} />
                          <IonText>{sermon.duration}</IonText>
                        </div>
                      )}
                    </div>

                    {sermon.scripture && (
                      <IonText color="medium" className="scripture">
                        <strong>Scripture:</strong> {sermon.scripture}
                      </IonText>
                    )}

                    <IonText color="medium" className="description">
                      <p>{sermon.description}</p>
                    </IonText>

                    <div className="sermon-media">
                      {sermon.audioUrl && (
                        <IonChip color="success">
                          <IonIcon icon={play} />
                          <IonLabel>Audio</IonLabel>
                        </IonChip>
                      )}
                      {sermon.videoUrl && (
                        <IonChip color="danger">
                          <IonIcon icon={play} />
                          <IonLabel>Video</IonLabel>
                        </IonChip>
                      )}
                      {sermon.notesUrl && (
                        <IonChip color="tertiary">
                          <IonIcon icon={download} />
                          <IonLabel>Notes</IonLabel>
                        </IonChip>
                      )}
                    </div>
                  </div>

                  <div className="sermon-actions">
                    <IonButton
                      fill="outline"
                      onClick={() => handleEditSermon(sermon)}
                    >
                      <IonIcon slot="start" icon={create} />
                      Edit
                    </IonButton>
                    <IonButton
                      fill="clear"
                      color="danger"
                      onClick={() => setShowDeleteConfirm(sermon.id)}
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}

      {/* Edit/Create Modal - Bottom Sheet */}
      <IonModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        className="sermon-modal"
        breakpoints={[0, 0.75, 1]}
        initialBreakpoint={0.75}
      >
        <IonContent className="ion-padding">
          <IonTitle className="ion-text-center">
            {editingSermon ? "Edit Sermon" : "Add New Sermon"}
          </IonTitle>
          <div className="sermon-form">
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <IonItem>
                <IonLabel position="stacked">Title *</IonLabel>
                <IonInput
                  value={formData.title}
                  onIonInput={(e) =>
                    setFormData({ ...formData, title: e.detail.value! })
                  }
                  placeholder="Enter sermon title"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Speaker *</IonLabel>
                <IonInput
                  value={formData.speaker}
                  onIonInput={(e) =>
                    setFormData({ ...formData, speaker: e.detail.value! })
                  }
                  placeholder="Speaker name"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Date *</IonLabel>
                <IonInput
                  type="date"
                  value={formData.date}
                  onIonInput={(e) =>
                    setFormData({ ...formData, date: e.detail.value! })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Series</IonLabel>
                <IonInput
                  value={formData.series}
                  onIonInput={(e) =>
                    setFormData({ ...formData, series: e.detail.value! })
                  }
                  placeholder="Sermon series name (optional)"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Scripture Reference</IonLabel>
                <IonInput
                  value={formData.scripture}
                  onIonInput={(e) =>
                    setFormData({ ...formData, scripture: e.detail.value! })
                  }
                  placeholder="e.g., John 3:16"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonTextarea
                  value={formData.description}
                  onIonInput={(e) =>
                    setFormData({ ...formData, description: e.detail.value! })
                  }
                  placeholder="Brief description of the sermon"
                  rows={4}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Status</IonLabel>
                <IonSelect
                  value={formData.status}
                  onIonChange={(e) =>
                    setFormData({ ...formData, status: e.detail.value })
                  }
                >
                  <IonSelectOption value="draft">Draft</IonSelectOption>
                  <IonSelectOption value="scheduled">Scheduled</IonSelectOption>
                  <IonSelectOption value="published">Published</IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>

            <div className="form-section">
              <h3 className="section-title">Media</h3>
              <p className="section-description">
                Add audio, video, or sermon notes
              </p>
              <IonItem>
                <IonLabel position="stacked">Audio URL</IonLabel>
                <IonInput
                  type="url"
                  value={formData.audioUrl}
                  onIonInput={(e) =>
                    setFormData({ ...formData, audioUrl: e.detail.value! })
                  }
                  placeholder="Audio file URL"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Video URL</IonLabel>
                <IonInput
                  type="url"
                  value={formData.videoUrl}
                  onIonInput={(e) =>
                    setFormData({ ...formData, videoUrl: e.detail.value! })
                  }
                  placeholder="YouTube, Vimeo, or direct video URL"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Sermon Notes URL</IonLabel>
                <IonInput
                  type="url"
                  value={formData.notesUrl}
                  onIonInput={(e) =>
                    setFormData({ ...formData, notesUrl: e.detail.value! })
                  }
                  placeholder="PDF or document URL"
                />
              </IonItem>
            </div>

            <IonButton
              expand="block"
              size="large"
              shape="round"
              onClick={handleSaveSermon}
              className="save-button"
              disabled={isSaving}
            >
              {isSaving && <IonSpinner name="crescent" />}
              {editingSermon ? "Update Sermon" : "Save Sermon"}
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      {/* Delete Confirmation Modal - Bottom Sheet */}
      <IonModal
        isOpen={!!showDeleteConfirm}
        onDidDismiss={() => setShowDeleteConfirm(null)}
        breakpoints={[0, 1]}
        initialBreakpoint={1}
      >
        <IonContent className="ion-padding">
          <div className="delete-confirmation">
            <IonTitle className="ion-text-center">Confirm Delete</IonTitle>
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
                color="danger"
                onClick={() => handleDeleteSermon(showDeleteConfirm!)}
              >
                Delete
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
