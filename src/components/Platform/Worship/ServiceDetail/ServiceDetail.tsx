import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToast,
} from "@ionic/react";
import { playCircle, checkmarkCircle } from "ionicons/icons";
import { PageHeader } from "../../PageHeader";
import {
  useGetWorshipService,
  usePublishWorshipService,
} from "../../../../hooks/WorshipServiceHooks";
import { useGetTeamMembers } from "../../../../hooks/WorshipTeamHooks";
import { useGetSongs } from "../../../../hooks/SongHooks";
import { useAppContext } from "../../../../context/context";
import { parseServiceDate } from "../../../../utils/serviceDate";
import { ServiceStatus } from "../../../../__generated__/graphql";
import {
  buildMySongTitles,
  getInviteStatusColor,
} from "../../../../utils/worshipConstants";
import { WorshipNav } from "../WorshipNav/WorshipNav";
import { WorshipLoadingState } from "../shared/WorshipLoadingState";
import { WorshipPublishModal } from "../shared/WorshipPublishModal";
import { ServiceLineup } from "./ServiceLineup";
import { ServiceSetlist } from "./ServiceSetlist";
import "./ServiceDetail.scss";

export const ServiceDetail: React.FC = () => {
  const history = useHistory();
  const { userInfo } = useAppContext();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"assignments" | "setlist">(
    "assignments",
  );
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [publishToast, setPublishToast] = useState<{
    open: boolean;
    message: string;
    color: string;
  }>({ open: false, message: "", color: "success" });

  const { data, loading, refetch } = useGetWorshipService(id);
  const [publishService, { loading: publishing }] = usePublishWorshipService();

  const service = data?.getWorshipService?.results;
  const teamId = service?.team?._id;
  const isOwner = service?.author?._id === userInfo?._id;

  const { data: membersData } = useGetTeamMembers(teamId || "");
  const { data: songsData } = useGetSongs();

  const assignments = service?.assignments || [];
  const setlist = service?.setlist;
  const setlistItems = setlist?.items || [];
  const teamMembers = membersData?.getTeamMembers?.results || [];
  const songs = (songsData?.getSongs?.results || []) as any[];

  const mySongTitles = buildMySongTitles(songs, userInfo?._id);

  if (loading) {
    return (
      <div className="service-detail">
        <WorshipLoadingState message="Loading service..." />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="service-detail">
        <PageHeader
          title="Service not found"
          onBack={() => history.push("/worship/services")}
        />
      </div>
    );
  }

  const serviceDate = parseServiceDate(service.date);
  const isDraft = service.status === ServiceStatus.Draft;

  const handlePublish = async () => {
    const result = await publishService({ variables: { id } });
    if (result.data?.publishWorshipService?.errors?.length) {
      setPublishToast({
        open: true,
        message: result.data.publishWorshipService.errors[0].message,
        color: "danger",
      });
    } else {
      setShowPublishConfirm(false);
      setPublishToast({
        open: true,
        message: "Service published! Assignees have been notified.",
        color: "success",
      });
      refetch();
    }
  };

  return (
    <div className="service-detail">
      <WorshipNav />

      <PageHeader
        title={service.name}
        onBack={() => history.push("/worship/services")}
        metaSlot={
          <>
            <span>
              {serviceDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>at</span>
            <span>
              {serviceDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
            {service.team?.name && (
              <>
                <span className="service-detail__meta-dot">·</span>
                <span>{service.team.name}</span>
              </>
            )}
          </>
        }
        badges={[
          {
            label: service.status,
            color: getInviteStatusColor(
              service.status === ServiceStatus.Scheduled
                ? "accepted"
                : service.status,
            ),
          },
        ]}
        actions={[
          ...(isOwner && isDraft
            ? [
                {
                  label: publishing ? "Publishing…" : "Publish",
                  icon: checkmarkCircle,
                  color: "success",
                  onClick: () => setShowPublishConfirm(true),
                  disabled: publishing,
                  loading: publishing,
                },
              ]
            : []),
          ...(setlistItems.length > 0 && !isDraft
            ? [
                {
                  label: "Start Service",
                  icon: playCircle,
                  color: "primary",
                  onClick: () => history.push(`/worship/services/${id}/live`),
                },
              ]
            : []),
        ]}
      />

      {service.notes && (
        <IonCard className="service-detail__notes-card">
          <IonCardContent>
            <IonText color="medium">
              <p>{service.notes}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      )}

      <IonSegment
        value={activeTab}
        onIonChange={(e) => setActiveTab(e.detail.value as any)}
        className="service-detail__tabs"
      >
        <IonSegmentButton value="assignments">
          <IonLabel>Lineup ({assignments.length})</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="setlist">
          <IonLabel>Setlist ({setlistItems.length})</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {activeTab === "assignments" && (
        <ServiceLineup
          serviceId={id}
          assignments={assignments}
          teamMembers={teamMembers}
          isOwner={isOwner}
          onRefetch={refetch}
        />
      )}

      {activeTab === "setlist" && (
        <ServiceSetlist
          serviceId={id}
          serviceName={service.name}
          setlist={setlist}
          songs={songs}
          mySongTitles={mySongTitles}
          isOwner={isOwner}
          onRefetch={refetch}
        />
      )}

      <WorshipPublishModal
        isOpen={showPublishConfirm}
        onDismiss={() => setShowPublishConfirm(false)}
        onConfirm={handlePublish}
        isPublishing={publishing}
        serviceName={service.name}
      />

      <IonToast
        isOpen={publishToast.open}
        onDidDismiss={() => setPublishToast((t) => ({ ...t, open: false }))}
        message={publishToast.message}
        color={publishToast.color}
        duration={4000}
        position="bottom"
      />
    </div>
  );
};
