import React, { useEffect, useRef, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonText,
  IonSpinner,
  IonIcon,
  IonChip,
  IonLabel,
} from "@ionic/react";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  mailOutline,
  personOutline,
  peopleOutline,
  musicalNotesOutline,
  calendarOutline,
} from "ionicons/icons";
import { useParams, useHistory } from "react-router";
import {
  useGetInviteByToken,
  useAcceptInviteByToken,
  useRespondToInvite,
} from "../../../../hooks/WorshipTeamHooks";
import "./TeamInviteAccept.scss";

const formatRole = (role: string) =>
  role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const TeamInviteAccept: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const history = useHistory();
  const hasFetched = useRef(false);
  const [responded, setResponded] = useState<"accepted" | "declined" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [acceptedTeam, setAcceptedTeam] = useState<{ _id: string; name: string } | null>(null);

  const [fetchInvite, { data: inviteData, loading: inviteLoading }] = useGetInviteByToken();
  const [acceptInvite, { loading: acceptLoading }] = useAcceptInviteByToken();
  const [declineInvite, { loading: declineLoading }] = useRespondToInvite();

  useEffect(() => {
    if (!token || hasFetched.current) return;
    hasFetched.current = true;
    fetchInvite({ variables: { token } });
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const invite = inviteData?.getInviteByToken?.results;
  const fetchError = inviteData?.getInviteByToken?.errors?.[0]?.message;
  const isActing = acceptLoading || declineLoading;

  const handleAccept = async () => {
    setActionError(null);
    const result = await acceptInvite({ variables: { token } });
    const errors = result.data?.acceptInviteByToken?.errors;
    if (errors?.length) {
      setActionError(errors[0].message);
      return;
    }
    const team = result.data?.acceptInviteByToken?.results?.team;
    setAcceptedTeam(team ? { _id: team._id as string, name: team.name } : null);
    setResponded("accepted");
  };

  const handleDecline = async () => {
    if (!invite?._id) return;
    setActionError(null);
    const result = await declineInvite({
      variables: { inviteId: invite._id as string, accept: false },
    });
    const errors = result.data?.respondToInvite?.errors;
    if (errors?.length) {
      setActionError(errors[0].message);
      return;
    }
    setResponded("declined");
  };

  return (
    <div className="team-invite-page">
      <IonCard className="team-invite-card">
        <IonCardContent>
          {/* Loading */}
          {inviteLoading && (
            <div className="team-invite-status">
              <IonSpinner name="crescent" />
              <IonText color="medium">
                <p>Loading invite details…</p>
              </IonText>
            </div>
          )}

          {/* Fetch error */}
          {!inviteLoading && fetchError && (
            <div className="team-invite-status">
              <IonIcon icon={closeCircleOutline} className="status-icon status-icon--danger" />
              <h2>Invite Unavailable</h2>
              <IonText color="danger">
                <p>{fetchError}</p>
              </IonText>
              <IonButton expand="block" shape="round" fill="outline" onClick={() => history.push("/")}>
                Go to Dashboard
              </IonButton>
            </div>
          )}

          {/* Accepted */}
          {responded === "accepted" && (
            <div className="team-invite-status">
              <IonIcon icon={checkmarkCircleOutline} className="status-icon status-icon--success" />
              <h2>You&apos;re In!</h2>
              <p>
                You have successfully joined{" "}
                {acceptedTeam ? <strong>{acceptedTeam.name}</strong> : "the team"}.
              </p>
              <IonButton
                expand="block"
                shape="round"
                color="primary"
                onClick={() =>
                  history.push(
                    acceptedTeam ? `/worship/teams/${acceptedTeam._id}` : "/worship/teams"
                  )
                }
              >
                View Team
              </IonButton>
            </div>
          )}

          {/* Declined */}
          {responded === "declined" && (
            <div className="team-invite-status">
              <IonIcon icon={closeCircleOutline} className="status-icon status-icon--medium" />
              <h2>Invite Declined</h2>
              <p>You have declined the invitation.</p>
              <IonButton expand="block" shape="round" fill="outline" onClick={() => history.push("/")}>
                Go to Dashboard
              </IonButton>
            </div>
          )}

          {/* Invite details */}
          {!inviteLoading && invite && !responded && (
            <div className="team-invite-body">
              <div className="team-invite-hero">
                <IonIcon icon={mailOutline} className="hero-icon" />
                <h2>Team Invitation</h2>
                <p>You&apos;ve been invited to join a worship team</p>
              </div>

              <div className="team-invite-divider" />

              <div className="team-invite-detail-row">
                <IonIcon icon={peopleOutline} color="primary" className="detail-icon" />
                <IonText className="detail-text">
                  <strong>{invite.team?.name ?? "A worship team"}</strong>
                </IonText>
              </div>

              <div className="team-invite-detail-row">
                <IonIcon icon={personOutline} color="medium" className="detail-icon" />
                <IonText className="detail-text">
                  Invited by{" "}
                  <strong>
                    {invite.invitedBy
                      ? `${invite.invitedBy.firstName} ${invite.invitedBy.lastName}`
                      : "a team leader"}
                  </strong>
                </IonText>
              </div>

              <div className="team-invite-detail-row">
                <IonIcon icon={musicalNotesOutline} color="medium" className="detail-icon" />
                <IonText className="detail-text">
                  Role: <strong>{formatRole(invite.role)}</strong>
                </IonText>
              </div>

              {invite.expiresAt && (
                <div className="team-invite-detail-row">
                  <IonIcon icon={calendarOutline} color="medium" className="detail-icon" />
                  <IonText className="detail-text">
                    Expires{" "}
                    {new Date(Number(invite.expiresAt)).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </IonText>
                </div>
              )}

              {invite.skills && invite.skills.length > 0 && (
                <>
                  <p className="team-invite-skills-label">Skills</p>
                  <div className="team-invite-skills">
                    {invite.skills.map((skill) => (
                      <IonChip key={skill} outline>
                        <IonLabel>{skill}</IonLabel>
                      </IonChip>
                    ))}
                  </div>
                </>
              )}

              {actionError && (
                <IonText color="danger">
                  <p className="team-invite-error">{actionError}</p>
                </IonText>
              )}

              <div className="team-invite-actions">
                <IonButton
                  expand="block"
                  shape="round"
                  color="primary"
                  disabled={isActing}
                  onClick={handleAccept}
                >
                  {acceptLoading ? <IonSpinner name="crescent" /> : "Accept"}
                </IonButton>
                <IonButton
                  expand="block"
                  shape="round"
                  fill="outline"
                  color="medium"
                  disabled={isActing}
                  onClick={handleDecline}
                >
                  {declineLoading ? <IonSpinner name="crescent" /> : "Decline"}
                </IonButton>
              </div>
            </div>
          )}
        </IonCardContent>
      </IonCard>
    </div>
  );
};
