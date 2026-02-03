import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonModal,
  IonTitle,
  IonContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonItem,
  IonLabel,
  IonChip,
  IonSpinner,
} from "@ionic/react";
import {
  add,
  create,
  trash,
  calendar,
  time,
  location,
  people,
  repeat,
  alertCircle,
} from "ionicons/icons";
import "./CalendarManagement.scss";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location?: string;
  locationUrl?: string;
  category: "service" | "event" | "meeting" | "class" | "other";
  recurring?: "none" | "weekly" | "monthly";
  capacity?: number;
  registrationRequired: boolean;
  registrationUrl?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  attendeeCount?: number;
}

interface CalendarManagementProps {
  events?: CalendarEvent[];
  onSave: (eventId: string | null, data: any) => Promise<void>;
  onDelete: (eventId: string) => void;
  isSaving?: boolean;
}

export const CalendarManagement: React.FC<CalendarManagementProps> = ({
  events = [],
  onSave,
  onDelete,
  isSaving = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [viewFilter, setViewFilter] = useState<"all" | "upcoming" | "past">(
    "upcoming",
  );

  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endDate: new Date().toISOString().split("T")[0],
    endTime: "10:00",
    location: "",
    locationUrl: "",
    category: "event",
    recurring: "none",
    capacity: undefined,
    registrationRequired: false,
    registrationUrl: "",
    status: "upcoming",
  });

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endDate: new Date().toISOString().split("T")[0],
      endTime: "10:00",
      location: "",
      locationUrl: "",
      category: "event",
      recurring: "none",
      capacity: undefined,
      registrationRequired: false,
      registrationUrl: "",
      status: "upcoming",
    });
    setShowModal(true);
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const handleSaveEvent = async () => {
    await onSave(editingEvent?.id || null, formData);
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    onDelete(eventId);
    setShowDeleteConfirm(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "service":
        return "primary";
      case "event":
        return "success";
      case "meeting":
        return "tertiary";
      case "class":
        return "warning";
      default:
        return "medium";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "success";
      case "ongoing":
        return "warning";
      case "completed":
        return "medium";
      case "cancelled":
        return "danger";
      default:
        return "medium";
    }
  };

  const filterEvents = () => {
    const now = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      if (viewFilter === "upcoming") {
        return eventDate >= now && event.status !== "cancelled";
      } else if (viewFilter === "past") {
        return eventDate < now || event.status === "completed";
      }
      return true;
    });
  };

  const filteredEvents = filterEvents();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div>
          <h1>Calendar & Events</h1>
          <p>Manage your organization's events and schedule</p>
        </div>
        <IonButton size="large" onClick={handleAddEvent}>
          <IonIcon slot="start" icon={add} />
          Add Event
        </IonButton>
      </div>

      <div className="calendar-filters">
        <IonButton
          fill={viewFilter === "all" ? "solid" : "outline"}
          onClick={() => setViewFilter("all")}
        >
          All Events
        </IonButton>
        <IonButton
          fill={viewFilter === "upcoming" ? "solid" : "outline"}
          onClick={() => setViewFilter("upcoming")}
        >
          Upcoming
        </IonButton>
        <IonButton
          fill={viewFilter === "past" ? "solid" : "outline"}
          onClick={() => setViewFilter("past")}
        >
          Past
        </IonButton>
      </div>

      {filteredEvents.length === 0 ? (
        <IonCard className="empty-state-card">
          <IonCardContent>
            <div className="empty-state">
              <IonIcon icon={calendar} className="empty-state-icon" />
              <h2>No Events Found</h2>
              <p>
                {viewFilter === "all"
                  ? "Start building your event calendar by adding your first event"
                  : `No ${viewFilter} events found`}
              </p>
              <IonButton size="large" onClick={handleAddEvent}>
                <IonIcon slot="start" icon={add} />
                Create Event
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      ) : (
        <div className="events-list">
          {filteredEvents.map((event) => (
            <IonCard key={event.id} className="event-card">
              <IonCardContent>
                <div className="event-card-content">
                  <div className="event-date-badge">
                    <div className="month">
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </div>
                    <div className="day">
                      {new Date(event.startDate).getDate()}
                    </div>
                  </div>

                  <div className="event-main">
                    <div className="event-header">
                      <div className="event-info">
                        <h3>{event.title}</h3>
                        <div className="event-badges">
                          <IonChip color={getCategoryColor(event.category)}>
                            <IonLabel>
                              {event.category.charAt(0).toUpperCase() +
                                event.category.slice(1)}
                            </IonLabel>
                          </IonChip>
                          <IonBadge color={getStatusColor(event.status)}>
                            {event.status}
                          </IonBadge>
                        </div>
                      </div>
                    </div>

                    <div className="event-meta">
                      <div className="meta-item">
                        <IonIcon icon={time} />
                        <IonText>
                          {event.startTime} - {event.endTime}
                        </IonText>
                      </div>
                      {event.location && (
                        <div className="meta-item">
                          <IonIcon icon={location} />
                          <IonText>{event.location}</IonText>
                        </div>
                      )}
                      {event.recurring && event.recurring !== "none" && (
                        <div className="meta-item">
                          <IonIcon icon={repeat} />
                          <IonText>
                            {event.recurring.charAt(0).toUpperCase() +
                              event.recurring.slice(1)}
                          </IonText>
                        </div>
                      )}
                      {event.capacity && (
                        <div className="meta-item">
                          <IonIcon icon={people} />
                          <IonText>
                            {event.attendeeCount || 0} / {event.capacity}
                          </IonText>
                        </div>
                      )}
                    </div>

                    <IonText color="medium" className="description">
                      <p>{event.description}</p>
                    </IonText>

                    {event.registrationRequired && (
                      <IonChip color="warning">
                        <IonIcon icon={alertCircle} />
                        <IonLabel>Registration Required</IonLabel>
                      </IonChip>
                    )}
                  </div>

                  <div className="event-actions">
                    <IonButton
                      fill="outline"
                      onClick={() => handleEditEvent(event)}
                    >
                      <IonIcon slot="start" icon={create} />
                      Edit
                    </IonButton>
                    <IonButton
                      fill="clear"
                      color="danger"
                      onClick={() => setShowDeleteConfirm(event.id)}
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
        className="event-modal"
        breakpoints={[0, 0.75, 1]}
        initialBreakpoint={0.75}
      >
        <IonContent className="ion-padding">
          <IonTitle className="ion-text-center">
            {editingEvent ? "Edit Event" : "Add New Event"}
          </IonTitle>
          <div className="event-form">
            <div className="form-section">
              <h3 className="section-title">Event Details</h3>
              <IonItem>
                <IonLabel position="stacked">Title *</IonLabel>
                <IonInput
                  value={formData.title}
                  onIonInput={(e) =>
                    setFormData({ ...formData, title: e.detail.value! })
                  }
                  placeholder="Enter event title"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Category *</IonLabel>
                <IonSelect
                  value={formData.category}
                  onIonChange={(e) =>
                    setFormData({ ...formData, category: e.detail.value })
                  }
                >
                  <IonSelectOption value="service">Service</IonSelectOption>
                  <IonSelectOption value="event">Event</IonSelectOption>
                  <IonSelectOption value="meeting">Meeting</IonSelectOption>
                  <IonSelectOption value="class">Class</IonSelectOption>
                  <IonSelectOption value="other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonTextarea
                  value={formData.description}
                  onIonInput={(e) =>
                    setFormData({ ...formData, description: e.detail.value! })
                  }
                  placeholder="Event description"
                  rows={4}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Start Date *</IonLabel>
                <IonInput
                  type="date"
                  value={formData.startDate}
                  onIonInput={(e) =>
                    setFormData({ ...formData, startDate: e.detail.value! })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Start Time *</IonLabel>
                <IonInput
                  type="time"
                  value={formData.startTime}
                  onIonInput={(e) =>
                    setFormData({ ...formData, startTime: e.detail.value! })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">End Date *</IonLabel>
                <IonInput
                  type="date"
                  value={formData.endDate}
                  onIonInput={(e) =>
                    setFormData({ ...formData, endDate: e.detail.value! })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">End Time *</IonLabel>
                <IonInput
                  type="time"
                  value={formData.endTime}
                  onIonInput={(e) =>
                    setFormData({ ...formData, endTime: e.detail.value! })
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Recurring</IonLabel>
                <IonSelect
                  value={formData.recurring}
                  onIonChange={(e) =>
                    setFormData({ ...formData, recurring: e.detail.value })
                  }
                >
                  <IonSelectOption value="none">None</IonSelectOption>
                  <IonSelectOption value="weekly">Weekly</IonSelectOption>
                  <IonSelectOption value="monthly">Monthly</IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>

            <div className="form-section">
              <h3 className="section-title">Location</h3>
              <IonItem>
                <IonLabel position="stacked">Location Name</IonLabel>
                <IonInput
                  value={formData.location}
                  onIonInput={(e) =>
                    setFormData({ ...formData, location: e.detail.value! })
                  }
                  placeholder="e.g., Main Sanctuary, Fellowship Hall"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Location URL</IonLabel>
                <IonInput
                  type="url"
                  value={formData.locationUrl}
                  onIonInput={(e) =>
                    setFormData({ ...formData, locationUrl: e.detail.value! })
                  }
                  placeholder="Google Maps link or address"
                />
              </IonItem>
            </div>

            <div className="form-section">
              <h3 className="section-title">Registration</h3>
              <IonItem>
                <IonLabel position="stacked">Capacity</IonLabel>
                <IonInput
                  type="number"
                  value={formData.capacity}
                  onIonInput={(e) =>
                    setFormData({
                      ...formData,
                      capacity: e.detail.value
                        ? parseInt(e.detail.value)
                        : undefined,
                    })
                  }
                  placeholder="Maximum attendees (optional)"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Registration Required</IonLabel>
                <IonSelect
                  value={formData.registrationRequired}
                  onIonChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationRequired: e.detail.value,
                    })
                  }
                >
                  <IonSelectOption value={false}>No</IonSelectOption>
                  <IonSelectOption value={true}>Yes</IonSelectOption>
                </IonSelect>
              </IonItem>

              {formData.registrationRequired && (
                <IonItem>
                  <IonLabel position="stacked">Registration URL</IonLabel>
                  <IonInput
                    type="url"
                    value={formData.registrationUrl}
                    onIonInput={(e) =>
                      setFormData({
                        ...formData,
                        registrationUrl: e.detail.value!,
                      })
                    }
                    placeholder="Registration form link"
                  />
                </IonItem>
              )}

              <IonItem>
                <IonLabel position="stacked">Status</IonLabel>
                <IonSelect
                  value={formData.status}
                  onIonChange={(e) =>
                    setFormData({ ...formData, status: e.detail.value })
                  }
                >
                  <IonSelectOption value="upcoming">Upcoming</IonSelectOption>
                  <IonSelectOption value="ongoing">Ongoing</IonSelectOption>
                  <IonSelectOption value="completed">Completed</IonSelectOption>
                  <IonSelectOption value="cancelled">Cancelled</IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>

            <IonButton
              expand="block"
              size="large"
              shape="round"
              onClick={handleSaveEvent}
              className="save-button"
              disabled={isSaving}
            >
              {isSaving && <IonSpinner name="crescent" />}
              {editingEvent ? "Update Event" : "Save Event"}
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
            <IonIcon icon={alertCircle} className="warning-icon" />
            <h2>Delete Event?</h2>
            <p>
              Are you sure you want to delete this event? This action cannot be
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
                onClick={() => handleDeleteEvent(showDeleteConfirm!)}
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
