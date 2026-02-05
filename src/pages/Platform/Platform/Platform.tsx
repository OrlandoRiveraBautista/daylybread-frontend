import React, { useState, useEffect } from "react";
import { IonPage, IonToast } from "@ionic/react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router";
import "./Platform.scss";

/* Context */
import { useAppContext } from "../../../context/context";

/* Hooks */
import { useToast } from "../../../hooks/useToast";
import { useNFCConfig } from "../../../hooks/useNFCConfig";
import { useUpdateNFCTiles } from "../../../hooks/NFCConfigHooks";

/* Components */
import CheckingAuthentication from "../../../components/Auth/CheckingAuthentication";
import {
  DashboardLayout,
  DashboardSection,
} from "../../../components/Platform/DashboardLayout";
import { DashboardOverview } from "../../../components/Platform/DashboardOverview";
import { NFCDevicesList } from "../../../components/Platform/NFCDevicesList";
import { SermonsManagement } from "../../../components/Platform/SermonsManagement";
import { SermonEditorPage } from "../../../components/Platform/SermonEditor";
import { TileConfig } from "../../../components/NFC/iPhoneHomeScreen/types";

const Platform: React.FC = () => {
  const { userInfo } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const organizationName = "My Organization";

  const { showToast, toastMessage, toastOptions, show, hide } = useToast();
  const { nfcConfigData, fetchConfig } = useNFCConfig(userInfo?._id!);
  const [updateTiles, { loading: isSavingTiles }] = useUpdateNFCTiles();

  // Get active section from URL
  const getActiveSection = (): DashboardSection => {
    const path = location.pathname;
    if (path.includes("/nfc")) return "nfc";
    if (path.includes("/sermons")) return "sermons";
    if (path.includes("/calendar")) return "calendar";
    if (path.includes("/organization")) return "organization";
    if (path.includes("/analytics")) return "analytics";
    if (path.includes("/members")) return "members";
    return "overview";
  };

  useEffect(() => {
    let tries = 0;
    const checkAuth = () => {
      const hasUserInfo = !!userInfo;

      if (tries > 3) {
        setIsAuthenticated(hasUserInfo);
        setIsLoading(false);
        return;
      }

      if (hasUserInfo) {
        setIsAuthenticated(true);
        setIsLoading(false);
        console.log("userInfo", userInfo);
        fetchConfig();
        return;
      }

      tries++;
    };

    setTimeout(() => {
      checkAuth();
    }, 1500);
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNFCDeviceDelete = (deviceId: string) => {
    // Handle delete if needed
    console.log("Delete device:", deviceId);
  };

  const handleSaveTiles = async (
    deviceId: string,
    tiles: TileConfig[],
    wallpaper?: string,
  ) => {
    try {
      await updateTiles({
        variables: {
          id: deviceId,
          tiles: tiles.map((tile) => ({
            id: tile.id,
            type: tile.type,
            label: tile.label,
            icon: tile.icon,
            url: tile.url,
            size: tile.size,
            position: {
              x: tile.position.x,
              y: tile.position.y,
            },
            color: tile.color,
            subtitle: tile.subtitle,
            isInDock: tile.isInDock,
          })),
          wallpaper: wallpaper || null,
        },
      });
      
      show("Home screen updated successfully");
      fetchConfig();
    } catch (error) {
      console.error("Error saving tiles:", error);
      show(
        error instanceof Error
          ? error.message
          : "Failed to update home screen",
      );
    }
  };

  const handleSectionChange = (section: DashboardSection) => {
    // Navigate to the appropriate route
    const routes: Record<DashboardSection, string> = {
      overview: "/",
      nfc: "/nfc",
      sermons: "/sermons",
      calendar: "/calendar",
      organization: "/organization",
      analytics: "/analytics",
      members: "/members",
    };
    history.push(routes[section]);
  };

  // Convert single config to array format for the list view
  const getDevices = () => {
    const results = nfcConfigData?.getNFCConfigByOwner?.results;
    if (!results) return [];
    return [
      {
        name: "Primary NFC Device",
        ...results,
        id: results._id, // NFC config document id (not owner id)
        status: "active" as const,
        tapCount: 0,
      },
    ];
  };

  if (isLoading) {
    return <CheckingAuthentication />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <DashboardLayout
        activeSection={getActiveSection()}
        onSectionChange={handleSectionChange}
        organizationName={organizationName}
      >
        <Switch>
          <Route exact path="/">
            <DashboardOverview
              organizationName={organizationName}
              onNavigate={handleSectionChange}
              nfcDeviceCount={getDevices().length}
            />
          </Route>

          <Route path="/nfc">
            <NFCDevicesList
              devices={getDevices()}
              onSaveTiles={handleSaveTiles}
              onDelete={handleNFCDeviceDelete}
              isSaving={isSavingTiles}
            />
          </Route>

          <Route exact path="/sermons">
            <SermonsManagement />
          </Route>

          <Route exact path="/sermons/new">
            <SermonEditorPage />
          </Route>

          <Route exact path="/sermons/:id">
            <SermonEditorPage />
          </Route>

          {/* Coming in future releases */}
          {/* <Route path="/calendar">
            <CalendarManagement
              events={events}
              onSave={handleEventSave}
              onDelete={handleEventDelete}
              isSaving={false}
            />
          </Route>

          <Route path="/organization">
            <OrganizationSettings
              organizationName={organizationName}
              onSave={handleOrganizationSave}
            />
          </Route>

          <Route path="/analytics">
            <AnalyticsDashboard />
          </Route>

          <Route path="/members">
            <MembersManagement />
          </Route> */}

          {/* Fallback to overview */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </DashboardLayout>
      <IonToast
        isOpen={showToast}
        onDidDismiss={hide}
        message={toastMessage}
        duration={toastOptions.duration}
        position={toastOptions.position}
      />
    </IonPage>
  );
};

export default Platform;
