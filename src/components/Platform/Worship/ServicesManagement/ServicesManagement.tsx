import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonSearchbar,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { add, calendar, trash, people, arrowBack, list } from "ionicons/icons";
import { useGetWorshipServices, useCreateWorshipService, useDeleteWorshipService } from "../../../../hooks/WorshipServiceHooks";
import { useGetWorshipTeams } from "../../../../hooks/WorshipTeamHooks";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import "./ServicesManagement.scss";

export const ServicesManagement: React.FC = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newService, setNewService] = useState({ name: "", date: "", teamId: "", notes: "" });

  const { data, loading, error, refetch } = useGetWorshipServices();
  const { data: teamsData } = useGetWorshipTeams();
  const [createService, { loading: isCreating }] = useCreateWorshipService();
  const [deleteService, { loading: isDeleting }] = useDeleteWorshipService();

  const services: any[] = data?.getWorshipServices?.results || [];
  const teams: any[] = teamsData?.getWorshipTeams?.results || [];

  const filteredServices = services.filter((s) => {
    return s.name.toLowerCase().includes(searchQuery.toLowerCase()) || deletingId === s._id;
  });

  const handleCreate = async () => {
    if (!newService.name.trim() || !newService.date || !newService.teamId) return;
    try {
      await createService({
        variables: {
          options: {
            name: newService.name,
            date: newService.date,
            teamId: newService.teamId,
            notes: newService.notes || undefined,
          },
        },
      });
      setShowCreateModal(false);
      setNewService({ name: "", date: "", teamId: "", notes: "" });
    } catch (err) {
      console.error("Error creating service:", err);
    }
  };

  const handleDelete = async (serviceId: string) => {
    try {
      setDeletingId(serviceId);
      setShowDeleteConfirm(null);
      setTimeout(async () => {
        try {
          await deleteService({ variables: { id: serviceId } });
          await refetch();
        } finally { setDeletingId(null); }
      }, 300);
    } catch (err) {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "primary";
      case "completed": return "success";
      case "cancelled": return "danger";
      default: return "medium";
    }
  };

  return (
    <div className="services-container">
      <WorshipNav />
      <div className="services-header">
        <div className="services-header__left">
          <IonButton fill="clear" size="small" shape="round" onClick={() => history.push("/worship")}>
            <IonIcon slot="icon-only" icon={arrowBack} />
          </IonButton>
          <div>
            <h1>Services</h1>
            <p>Schedule and manage worship services</p>
          </div>
        </div>
        <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowCreateModal(true)}>
          <IonIcon slot="start" icon={add} />
          New Service
        </IonButton>
      </div>

      <div className="services-search">
        <IonSearchbar value={searchQuery} onIonInput={(e) => setSearchQuery(e.detail.value || "")} placeholder="Search services..." debounce={300} />
      </div>

      {loading && (
        <div className="loading-state"><IonSpinner name="crescent" /><p>Loading services...</p></div>
      )}

      {!loading && !error && filteredServices.length === 0 && (
        <div className="empty-state-container">
          <IonCard className="empty-state-card">
            <IonCardContent>
              <div className="empty-state">
                <div className="empty-state-icon-wrapper">
                  <IonIcon icon={calendar} className="empty-state-icon" />
                </div>
                <h2>No Services Yet</h2>
                <p className="empty-state-description">Create a service to start scheduling your worship team.</p>
                <IonButton size="large" fill="solid" shape="round" color="primary" onClick={() => setShowCreateModal(true)} className="empty-state-button">
                  <IonIcon slot="start" icon={add} />
                  Create Service
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      )}

      {!loading && !error && filteredServices.length > 0 && (
        <div className="services-list">
          {filteredServices.map((service) => {
            const isBeingDeleted = deletingId === service._id;
            const serviceDate = new Date(Number(service.date));
            const isPast = serviceDate < new Date();
            return (
              <IonCard
                key={service._id}
                className={`service-card ${isBeingDeleted ? "deleting" : ""} ${isPast ? "past" : ""}`}
                onClick={() => !isBeingDeleted && history.push(`/worship/services/${service._id}`)}
                button={!isBeingDeleted}
              >
                <IonCardContent>
                  <div className="service-card__date">
                    <span className="service-card__day">{serviceDate.toLocaleDateString("en-US", { day: "numeric" })}</span>
                    <span className="service-card__month">{serviceDate.toLocaleDateString("en-US", { month: "short" })}</span>
                    <span className="service-card__year">{serviceDate.toLocaleDateString("en-US", { year: "numeric" })}</span>
                  </div>
                  <div className="service-card__info">
                    <div className="service-card__title-row">
                      <h3>{service.name}</h3>
                      <IonBadge color={getStatusColor(service.status)}>{service.status}</IonBadge>
                    </div>
                    <div className="service-card__meta">
                      <span className="service-card__meta-item">
                        <IonIcon icon={people} />
                        {service.team?.name}
                      </span>
                      <span className="service-card__meta-item">
                        <IonIcon icon={list} />
                        {service.assignments?.length || 0} assigned
                      </span>
                    </div>
                    {service.notes && <p className="service-card__notes">{service.notes}</p>}
                  </div>
                  <div className="service-card__actions" onClick={(e) => e.stopPropagation()}>
                    <IonButton fill="clear" size="small" shape="round" color="danger" disabled={isBeingDeleted}
                      onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(service._id); }}>
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>
      )}

      {/* Create Service Modal */}
      <PlatformBottomSheet
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setNewService({ name: "", date: "", teamId: "", notes: "" }); }}
        title="Create Service"
        onSave={handleCreate}
        saveLabel="Create Service"
        saveDisabled={!newService.name.trim() || !newService.date || !newService.teamId}
        isSaving={isCreating}
        breakpoints={[0, 0.75, 0.95]}
        initialBreakpoint={0.75}
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Service Name *</IonLabel>
          <IonInput
            value={newService.name}
            onIonInput={(e) => setNewService({ ...newService, name: e.detail.value || "" })}
            placeholder="e.g. Sunday Morning Worship"
            clearInput
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Date *</IonLabel>
          <IonInput
            value={newService.date}
            onIonInput={(e) => setNewService({ ...newService, date: e.detail.value || "" })}
            type="date"
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Team *</IonLabel>
          <IonSelect
            value={newService.teamId}
            onIonChange={(e) => setNewService({ ...newService, teamId: e.detail.value })}
            interface="action-sheet"
            placeholder="Select a team"
          >
            {teams.map((team: any) => (
              <IonSelectOption key={team._id} value={team._id}>{team.name}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Notes</IonLabel>
          <IonTextarea
            value={newService.notes}
            onIonInput={(e) => setNewService({ ...newService, notes: e.detail.value || "" })}
            placeholder="Optional notes..."
            rows={3}
            autoGrow
          />
        </IonItem>
      </PlatformBottomSheet>

      {/* Delete Confirmation Modal */}
      <IonModal isOpen={!!showDeleteConfirm} onDidDismiss={() => setShowDeleteConfirm(null)} breakpoints={[0, 0.45]} initialBreakpoint={0.45}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Delete Service</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="worship-delete-confirm">
            <IonIcon icon={trash} className="worship-delete-icon" />
            <h2>Delete Service?</h2>
            <p>This will also remove all assignments. This action cannot be undone.</p>
            <IonButton
              expand="block"
              size="large"
              shape="round"
              color="danger"
              style={{ width: "100%" }}
              onClick={() => handleDelete(showDeleteConfirm!)}
              disabled={isDeleting}
            >
              {isDeleting ? <IonSpinner name="crescent" /> : "Delete Service"}
            </IonButton>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
