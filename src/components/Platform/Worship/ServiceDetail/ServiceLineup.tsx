import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonBadge,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { personAdd, trash } from "ionicons/icons";
import {
  useCreateServiceAssignment,
  useRemoveServiceAssignment,
} from "../../../../hooks/WorshipServiceHooks";
import { TeamRole } from "../../../../__generated__/graphql";
import { PlatformBottomSheet } from "../../PlatformBottomSheet";
import { TEAM_ROLES, getInviteStatusIcon, getInviteStatusColor } from "../../../../utils/worshipConstants";

interface ServiceLineupProps {
  serviceId: string;
  assignments: any[];
  teamMembers: any[];
  isOwner: boolean;
  onRefetch: () => void;
}

export const ServiceLineup: React.FC<ServiceLineupProps> = ({
  serviceId,
  assignments,
  teamMembers,
  isOwner,
  onRefetch,
}) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [removingAssignmentId, setRemovingAssignmentId] = useState<string | null>(null);
  const [assignForm, setAssignForm] = useState({ memberId: "", role: "OTHER" });

  const [createAssignment, { loading: isAssigning }] = useCreateServiceAssignment();
  const [removeAssignment] = useRemoveServiceAssignment();

  const handleAssign = async () => {
    if (!assignForm.memberId) return;
    try {
      await createAssignment({
        variables: {
          options: {
            serviceId,
            memberId: assignForm.memberId,
            role: assignForm.role as TeamRole,
          },
        },
      });
      setShowAssignModal(false);
      setAssignForm({ memberId: "", role: "OTHER" });
      onRefetch();
    } catch (err) {
      console.error("Error assigning member:", err);
    }
  };

  const handleRemoveAssignment = async (assignmentId: string) => {
    try {
      setRemovingAssignmentId(assignmentId);
      await removeAssignment({ variables: { id: assignmentId } });
      onRefetch();
    } catch (err) {
      console.error("Error removing assignment:", err);
    } finally {
      setRemovingAssignmentId(null);
    }
  };

  return (
    <>
      <div className="assignments-section">
        {isOwner && (
          <div className="section-action-bar">
            <IonButton fill="solid" shape="round" color="primary" onClick={() => setShowAssignModal(true)}>
              <IonIcon slot="start" icon={personAdd} />
              Assign Member
            </IonButton>
          </div>
        )}

        {assignments.length === 0 ? (
          <div className="empty-section"><p>No members assigned yet.</p></div>
        ) : (
          <div className="assignments-list">
            {assignments.map((assignment: any) => (
              <IonCard key={assignment._id} className="assignment-card">
                <IonCardContent>
                  <div className="assignment-card__info">
                    <IonIcon
                      icon={getInviteStatusIcon(assignment.status)}
                      color={getInviteStatusColor(assignment.status)}
                      className="assignment-card__status"
                    />
                    <div className="assignment-card__details">
                      <h3>{assignment.member?.user?.firstName} {assignment.member?.user?.lastName}</h3>
                      <IonBadge color="primary">
                        {TEAM_ROLES.find((r) => r.value === assignment.role)?.label || assignment.role}
                      </IonBadge>
                    </div>
                  </div>
                  {isOwner && (
                    <IonButton
                      fill="clear"
                      size="small"
                      shape="round"
                      color="danger"
                      disabled={removingAssignmentId === assignment._id}
                      onClick={() => handleRemoveAssignment(assignment._id)}
                    >
                      {removingAssignmentId === assignment._id
                        ? <IonSpinner name="crescent" style={{ width: 18, height: 18 }} />
                        : <IonIcon slot="icon-only" icon={trash} />}
                    </IonButton>
                  )}
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}
      </div>

      <PlatformBottomSheet
        isOpen={showAssignModal}
        onClose={() => { setShowAssignModal(false); setAssignForm({ memberId: "", role: "OTHER" }); }}
        title="Assign Member"
        onSave={handleAssign}
        saveLabel="Assign"
        saveDisabled={!assignForm.memberId}
        isSaving={isAssigning}
        breakpoints={[0, 0.6, 0.75]}
        initialBreakpoint={0.6}
      >
        <IonItem lines="none">
          <IonLabel position="stacked">Member *</IonLabel>
          <IonSelect
            value={assignForm.memberId}
            onIonChange={(e) => {
              const memberId = e.detail.value;
              const member = teamMembers.find((m: any) => m._id === memberId);
              setAssignForm({ memberId, role: member?.role || "OTHER" });
            }}
            interface="action-sheet"
            placeholder="Select a member"
          >
            {teamMembers.map((m: any) => (
              <IonSelectOption key={m._id} value={m._id}>
                {m.user?.firstName} {m.user?.lastName}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonLabel position="stacked">Role</IonLabel>
          <IonSelect
            value={assignForm.role}
            onIonChange={(e) => setAssignForm({ ...assignForm, role: e.detail.value })}
            interface="action-sheet"
            placeholder="Select a role"
          >
            {TEAM_ROLES.map((role) => (
              <IonSelectOption key={role.value} value={role.value}>{role.label}</IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </PlatformBottomSheet>
    </>
  );
};
