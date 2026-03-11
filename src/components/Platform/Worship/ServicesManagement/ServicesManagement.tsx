import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { calendar, trash, people, list } from "ionicons/icons";
import Highlighter from "react-highlight-words";
import { useGetWorshipServices, useCreateWorshipService, useDeleteWorshipService } from "../../../../hooks/WorshipServiceHooks";
import { useGetWorshipTeams } from "../../../../hooks/WorshipTeamHooks";
import { parseServiceDate, toDateTimeLocalInput, defaultServiceDateTime } from "../../../../utils/serviceDate";
import { getServiceStatusColor } from "../../../../utils/worshipConstants";
import { useAppContext } from "../../../../context/context";
import { useDeleteWithAnimation } from "../../../../hooks/useDeleteWithAnimation";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import { WorshipPageHeader } from "../shared/WorshipPageHeader";
import { WorshipLoadingState } from "../shared/WorshipLoadingState";
import EmptyState from "../../../EmptyState/EmptyState";
import { WorshipDeleteModal } from "../shared/WorshipDeleteModal";
import "./ServicesManagement.scss";

export const ServicesManagement: React.FC = () => {
  const history = useHistory();
  const { userInfo } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newService, setNewService] = useState({ name: "", date: "", teamId: "", notes: "" });

  const { data, loading, error, refetch } = useGetWorshipServices();
  const { data: teamsData } = useGetWorshipTeams();
  const [createService, { loading: isCreating }] = useCreateWorshipService();
  const [deleteService, { loading: isDeleting }] = useDeleteWorshipService();

  const services: any[] = data?.getWorshipServices?.results || [];
  const teams: any[] = teamsData?.getWorshipTeams?.results || [];
  const ownedTeams = teams.filter((t) => t.author?._id === userInfo?._id);
  const canCreateService = ownedTeams.length > 0;

  const { deletingId, handleDelete } = useDeleteWithAnimation(
    (opts) => deleteService(opts),
    refetch,
  );

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
            date: new Date(newService.date).toISOString(),
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

  const openCreate = () => {
    setNewService((prev) => ({ ...prev, date: toDateTimeLocalInput(defaultServiceDateTime()) }));
    setShowCreateModal(true);
  };

  return (
    <div className="services-container">
      <WorshipNav />

      <WorshipPageHeader
        classPrefix="services"
        title="Services"
        subtitle="Schedule and manage worship services"
        onBack={() => history.push("/worship")}
        actionLabel="New Service"
        onAction={openCreate}
        showAction={canCreateService}
      />

      <div className="services-search">
        <IonSearchbar value={searchQuery} onIonInput={(e) => setSearchQuery(e.detail.value || "")} placeholder="Search services..." debounce={300} />
      </div>

      {loading && <WorshipLoadingState message="Loading services..." />}

      {!loading && !error && filteredServices.length === 0 && (
        <EmptyState
          icon={calendar}
          title="No Services Yet"
          description="Create a service to start scheduling your worship team."
          actionLabel={canCreateService ? "Create Service" : undefined}
          onAction={canCreateService ? openCreate : undefined}
        />
      )}

      {!loading && !error && filteredServices.length > 0 && (
        <div className="services-list">
          {filteredServices.map((service) => {
            const isBeingDeleted = deletingId === service._id;
            const serviceDate = parseServiceDate(service.date);
            const isPast = serviceDate < new Date();
            const isOwner = service.author?._id === userInfo?._id;
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
                    <span className="service-card__time">{serviceDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}</span>
                  </div>
                  <div className="service-card__info">
                    <div className="service-card__title-row">
                      <h3>
                        {searchQuery ? (
                          <Highlighter
                            searchWords={[searchQuery]}
                            autoEscape
                            textToHighlight={service.name}
                            highlightClassName="service-highlight"
                          />
                        ) : service.name}
                      </h3>
                      <IonBadge color={getServiceStatusColor(service.status)}>{service.status}</IonBadge>
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
                  {isOwner && (
                    <div className="service-card__actions" onClick={(e) => e.stopPropagation()}>
                      <IonButton fill="clear" size="small" shape="round" color="danger" disabled={isBeingDeleted}
                        onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(service._id); }}>
                        <IonIcon slot="icon-only" icon={trash} />
                      </IonButton>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>
      )}

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
          <IonLabel position="stacked">Date & time *</IonLabel>
          <IonInput
            value={newService.date}
            onIonInput={(e) => setNewService({ ...newService, date: e.detail.value || "" })}
            type="datetime-local"
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
            {ownedTeams.map((team: any) => (
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

      <WorshipDeleteModal
        isOpen={!!showDeleteConfirm}
        onDismiss={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm!, () => setShowDeleteConfirm(null))}
        isDeleting={isDeleting}
        title="Delete Service"
        message="This will also remove all assignments. This action cannot be undone."
        confirmLabel="Delete Service"
      />
    </div>
  );
};
