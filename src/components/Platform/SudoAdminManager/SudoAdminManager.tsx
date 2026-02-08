import React, { useState, useEffect, useCallback } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonBadge,
  IonChip,
  IonText,
  IonSpinner,
  IonAlert,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonItem,
  IonAvatar,
} from "@ionic/react";
import {
  add,
  card,
  trash,
  create,
  checkmarkCircle,
  alertCircle,
  refresh,
  person,
  phonePortrait,
  link as linkIcon,
  eye,
  time,
  close,
  search,
} from "ionicons/icons";
import { useAdminNFCConfigs } from "../../../hooks/useAdminNFCConfigs";
import "./SudoAdminManager.scss";

// Admin user ID that has access to this page
export const SUDO_ADMIN_USER_ID = "65239e9380cfeb07c8fb0145";

interface NFCConfigFormData {
  nfcId: string;
  name: string;
  deviceType: string;
  homeScreenId: string;
}

const initialFormData: NFCConfigFormData = {
  nfcId: "",
  name: "",
  deviceType: "",
  homeScreenId: "",
};

const deviceTypes = [
  { value: "church-tap", label: "Church Tap" },
  { value: "card-tap-white", label: "Card Tap (White)" },
  { value: "card-tap-transparent", label: "Card Tap (Transparent)" },
  { value: "sticker", label: "NFC Sticker" },
  { value: "keychain", label: "NFC Keychain" },
  { value: "custom", label: "Custom Device" },
];

export const SudoAdminManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [formData, setFormData] = useState<NFCConfigFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ownerSearchQuery, setOwnerSearchQuery] = useState("");
  const [showOwnerSearch, setShowOwnerSearch] = useState(false);

  const {
    nfcConfigs,
    homeScreens,
    users,
    selectedOwner,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    isSearchingUsers,
    error,
    successMessage,
    createNFCConfig,
    updateNFCConfig,
    deleteNFCConfig,
    searchUsers,
    setSelectedOwner,
    fetchHomeScreensForOwner,
    refetch,
    clearMessages,
  } = useAdminNFCConfigs();

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        clearMessages();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, clearMessages]);

  // Debounced user search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ownerSearchQuery.length >= 2) {
        searchUsers(ownerSearchQuery);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [ownerSearchQuery, searchUsers]);

  // Fetch home screens when owner is selected
  useEffect(() => {
    if (selectedOwner?._id) {
      fetchHomeScreensForOwner(selectedOwner._id);
      setFormData((prev) => ({ ...prev, homeScreenId: "" }));
    }
  }, [selectedOwner, fetchHomeScreensForOwner]);

  const handleInputChange = (field: keyof NFCConfigFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.nfcId || !formData.name) {
      return;
    }

    if (!selectedOwner && !editingId) {
      return;
    }

    try {
      if (editingId) {
        await updateNFCConfig(editingId, {
          ...formData,
          ownerId: selectedOwner?._id,
        });
        setEditingId(null);
      } else {
        await createNFCConfig({
          ...formData,
          ownerId: selectedOwner?._id,
        });
      }
      setFormData(initialFormData);
      setSelectedOwner(null);
      setOwnerSearchQuery("");
    } catch (err) {
      console.error("Error submitting NFC config:", err);
    }
  };

  const handleEdit = (config: any) => {
    setFormData({
      nfcId: config.nfcId,
      name: config.name,
      deviceType: config.deviceType || "",
      homeScreenId: config.homeScreen?._id || "",
    });
    if (config.owner) {
      setSelectedOwner({
        _id: config.owner._id,
        email: config.owner.email,
        firstName: config.owner.firstName,
        lastName: config.owner.lastName,
      });
    }
    setEditingId(config._id);
    setActiveTab("create");
  };

  const handleDelete = async () => {
    if (deleteTargetId) {
      try {
        await deleteNFCConfig(deleteTargetId);
        setDeleteTargetId(null);
      } catch (err) {
        console.error("Error deleting NFC config:", err);
      }
    }
    setShowDeleteAlert(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setSelectedOwner(null);
    setOwnerSearchQuery("");
  };

  const handleSelectOwner = (user: any) => {
    setSelectedOwner(user);
    setShowOwnerSearch(false);
    setOwnerSearchQuery("");
  };

  const filteredConfigs = nfcConfigs.filter(
    (config: any) =>
      config.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.nfcId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.deviceType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.owner?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.owner?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.owner?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOwnerDisplayName = (owner: any) => {
    if (!owner) return "Unknown";
    if (owner.firstName || owner.lastName) {
      return `${owner.firstName || ""} ${owner.lastName || ""}`.trim();
    }
    return owner.email;
  };

  return (
    <div className="sudo-admin-container">
      <div className="admin-header">
        <div>
          <h1>Sudo Admin Manager</h1>
          <p>
            Create and manage NFC configurations for any user. Configure physical
            NFC tags and assign them to home screens on the go.
          </p>
        </div>
        <IonButton
          fill="outline"
          shape="round"
          onClick={refetch}
          disabled={isLoading}
        >
          <IonIcon slot="start" icon={refresh} />
          Refresh
        </IonButton>
      </div>

      {/* Status Messages */}
      {(successMessage || error) && (
        <div className={`status-message ${error ? "error" : "success"}`}>
          <IonIcon icon={error ? alertCircle : checkmarkCircle} />
          <span>{error || successMessage}</span>
        </div>
      )}

      {/* Tab Selector */}
      <IonSegment
        value={activeTab}
        onIonChange={(e) => setActiveTab(e.detail.value as "create" | "manage")}
        className="admin-segment"
      >
        <IonSegmentButton value="create">
          <IonLabel>
            <IonIcon icon={add} />
            {editingId ? "Edit Config" : "Create Config"}
          </IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="manage">
          <IonLabel>
            <IonIcon icon={card} />
            Manage ({nfcConfigs.length})
          </IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {/* Create/Edit Form */}
      {activeTab === "create" && (
        <IonCard className="admin-form-card">
          <IonCardHeader>
            <IonCardTitle>
              {editingId ? "Edit NFC Configuration" : "Create New NFC Configuration"}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="form-grid">
              {/* Owner Selection */}
              <div className="form-field owner-field">
                <IonLabel>Owner *</IonLabel>
                {selectedOwner ? (
                  <div className="selected-owner">
                    <div className="owner-info">
                      <IonAvatar>
                        <div className="avatar-placeholder">
                          {(selectedOwner.firstName?.[0] || selectedOwner.email[0]).toUpperCase()}
                        </div>
                      </IonAvatar>
                      <div className="owner-details">
                        <strong>{getOwnerDisplayName(selectedOwner)}</strong>
                        <span>{selectedOwner.email}</span>
                      </div>
                    </div>
                    <IonButton
                      fill="clear"
                      size="small"
                      onClick={() => {
                        setSelectedOwner(null);
                        setShowOwnerSearch(true);
                      }}
                    >
                      <IonIcon slot="icon-only" icon={close} />
                    </IonButton>
                  </div>
                ) : (
                  <div className="owner-search-container">
                    <IonSearchbar
                      value={ownerSearchQuery}
                      onIonInput={(e) => {
                        setOwnerSearchQuery(e.detail.value || "");
                        setShowOwnerSearch(true);
                      }}
                      onIonFocus={() => setShowOwnerSearch(true)}
                      placeholder="Search by email or name..."
                      className="owner-search"
                      debounce={0}
                    />
                    {showOwnerSearch && ownerSearchQuery.length >= 2 && (
                      <div className="owner-search-results">
                        {isSearchingUsers ? (
                          <div className="search-loading">
                            <IonSpinner name="crescent" />
                            <span>Searching...</span>
                          </div>
                        ) : users.length > 0 ? (
                          <IonList>
                            {users.map((user) => (
                              <IonItem
                                key={user._id}
                                button
                                onClick={() => handleSelectOwner(user)}
                              >
                                <IonAvatar slot="start">
                                  <div className="avatar-placeholder">
                                    {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                                  </div>
                                </IonAvatar>
                                <IonLabel>
                                  <h3>{getOwnerDisplayName(user)}</h3>
                                  <p>{user.email}</p>
                                  {user.churchName && (
                                    <p className="church-name">{user.churchName}</p>
                                  )}
                                </IonLabel>
                              </IonItem>
                            ))}
                          </IonList>
                        ) : (
                          <div className="no-results">
                            <IonIcon icon={search} />
                            <span>No users found</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <span className="field-hint">
                  Search and select the user who will own this NFC config
                </span>
              </div>

              <div className="form-field">
                <IonLabel>NFC ID *</IonLabel>
                <IonInput
                  value={formData.nfcId}
                  onIonInput={(e) =>
                    handleInputChange("nfcId", e.detail.value || "")
                  }
                  placeholder="Enter the physical NFC tag ID"
                  disabled={!!editingId}
                  className="form-input"
                />
                <span className="field-hint">
                  The unique identifier from the physical NFC tag
                </span>
              </div>

              <div className="form-field">
                <IonLabel>Device Name *</IonLabel>
                <IonInput
                  value={formData.name}
                  onIonInput={(e) =>
                    handleInputChange("name", e.detail.value || "")
                  }
                  placeholder="e.g., Church Entrance Tag"
                  className="form-input"
                />
                <span className="field-hint">
                  A friendly name to identify this device
                </span>
              </div>

              <div className="form-field">
                <IonLabel>Device Type</IonLabel>
                <IonSelect
                  value={formData.deviceType}
                  onIonChange={(e) =>
                    handleInputChange("deviceType", e.detail.value || "")
                  }
                  placeholder="Select device type"
                  className="form-select"
                  interface="popover"
                >
                  {deviceTypes.map((type) => (
                    <IonSelectOption key={type.value} value={type.value}>
                      {type.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <span className="field-hint">
                  The type of physical NFC device
                </span>
              </div>

              <div className="form-field">
                <IonLabel>Assign to Home Screen</IonLabel>
                <IonSelect
                  value={formData.homeScreenId}
                  onIonChange={(e) =>
                    handleInputChange("homeScreenId", e.detail.value || "")
                  }
                  placeholder={selectedOwner ? "Select a home screen" : "Select owner first"}
                  className="form-select"
                  disabled={!selectedOwner}
                  interface="popover"
                >
                  <IonSelectOption value="">None</IonSelectOption>
                  {homeScreens.map((screen: any) => (
                    <IonSelectOption key={screen._id} value={screen._id}>
                      {screen.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <span className="field-hint">
                  {selectedOwner
                    ? "The home screen to display when this tag is scanned"
                    : "Select an owner first to see their home screens"}
                </span>
              </div>
            </div>

            <div className="form-actions">
              {editingId && (
                <IonButton
                  fill="outline"
                  shape="round"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </IonButton>
              )}
              <IonButton
                shape="round"
                onClick={handleSubmit}
                disabled={
                  !formData.nfcId ||
                  !formData.name ||
                  (!selectedOwner && !editingId) ||
                  isCreating ||
                  isUpdating
                }
              >
                {(isCreating || isUpdating) && <IonSpinner name="crescent" />}
                <IonIcon slot="start" icon={editingId ? create : add} />
                {editingId ? "Update Config" : "Create Config"}
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      )}

      {/* Manage Configs */}
      {activeTab === "manage" && (
        <div className="manage-section">
          <IonSearchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value || "")}
            placeholder="Search by name, NFC ID, owner, or device type..."
            className="config-search"
          />

          {isLoading ? (
            <div className="loading-state">
              <IonSpinner name="crescent" />
              <p>Loading NFC configurations...</p>
            </div>
          ) : filteredConfigs.length === 0 ? (
            <IonCard className="empty-state-card">
              <IonCardContent>
                <div className="empty-state">
                  <IonIcon icon={card} className="empty-state-icon" />
                  <h2>No NFC Configurations Found</h2>
                  <p>
                    {searchQuery
                      ? "No configurations match your search."
                      : "Create your first NFC configuration to get started."}
                  </p>
                  {!searchQuery && (
                    <IonButton
                      shape="round"
                      onClick={() => setActiveTab("create")}
                    >
                      <IonIcon slot="start" icon={add} />
                      Create Config
                    </IonButton>
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          ) : (
            <div className="configs-grid">
              {filteredConfigs.map((config: any) => (
                <IonCard key={config._id} className="config-card">
                  <IonCardHeader>
                    <div className="config-card-header">
                      <div className="config-info">
                        <IonCardTitle>{config.name}</IonCardTitle>
                        <div className="config-badges">
                          {config.deviceType && (
                            <IonBadge color="secondary">
                              {deviceTypes.find(
                                (t) => t.value === config.deviceType
                              )?.label || config.deviceType}
                            </IonBadge>
                          )}
                          <IonChip color="tertiary">
                            <IonIcon icon={card} />
                            <IonLabel>
                              {config.nfcId.slice(0, 12)}
                              {config.nfcId.length > 12 ? "..." : ""}
                            </IonLabel>
                          </IonChip>
                        </div>
                      </div>
                      <div className="config-actions">
                        <IonButton
                          fill="clear"
                          shape="round"
                          onClick={() => handleEdit(config)}
                        >
                          <IonIcon slot="icon-only" icon={create} />
                        </IonButton>
                        <IonButton
                          fill="clear"
                          shape="round"
                          color="danger"
                          onClick={() => {
                            setDeleteTargetId(config._id);
                            setShowDeleteAlert(true);
                          }}
                        >
                          <IonIcon slot="icon-only" icon={trash} />
                        </IonButton>
                      </div>
                    </div>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="config-details">
                      <div className="detail-row">
                        <IonIcon icon={person} />
                        <span className="detail-label">Owner:</span>
                        <span className="detail-value">
                          {getOwnerDisplayName(config.owner)}
                          {config.owner?.email && (
                            <span className="owner-email"> ({config.owner.email})</span>
                          )}
                        </span>
                      </div>
                      <div className="detail-row">
                        <IonIcon icon={phonePortrait} />
                        <span className="detail-label">Home Screen:</span>
                        <span className="detail-value">
                          {config.homeScreen?.name || (
                            <IonText color="medium">Not assigned</IonText>
                          )}
                        </span>
                      </div>
                      {config.homeScreen?.shareableLink && (
                        <div className="detail-row">
                          <IonIcon icon={linkIcon} />
                          <span className="detail-label">Link:</span>
                          <a
                            href={`https://nfc.daylybread.com/${config.homeScreen.shareableLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detail-link"
                          >
                            {config.homeScreen.shareableLink}
                          </a>
                        </div>
                      )}
                      <div className="detail-row">
                        <IonIcon icon={eye} />
                        <span className="detail-label">Views:</span>
                        <span className="detail-value">{config.views || 0}</span>
                      </div>
                      <div className="detail-row">
                        <IonIcon icon={time} />
                        <span className="detail-label">Last Scanned:</span>
                        <span className="detail-value">
                          {formatDate(config.lastScannedAt)}
                        </span>
                      </div>
                      <div className="detail-row">
                        <IonIcon icon={time} />
                        <span className="detail-label">Created:</span>
                        <span className="detail-value">
                          {formatDate(config.createdAt)}
                        </span>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation */}
      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => {
          setShowDeleteAlert(false);
          setDeleteTargetId(null);
        }}
        header="Delete NFC Configuration"
        message="Are you sure you want to delete this NFC configuration? This action cannot be undone."
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Delete",
            role: "destructive",
            handler: handleDelete,
          },
        ]}
      />
    </div>
  );
};
