import React, { useEffect } from "react";
import { IonPage, IonToast } from "@ionic/react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router";
import "./Platform.scss";

/* Context */
import { useAppContext } from "../../../context/context";

/* Hooks */
import { useToast } from "../../../hooks/useToast";
import { usePlatformAuth } from "../../../hooks/usePlatformAuth";
import { usePlatformNFCDevices } from "../../../hooks/usePlatformNFCDevices";

/* Components */
import CheckingAuthentication from "../../../components/Auth/CheckingAuthentication";
import {
  DashboardLayout,
  DashboardSection,
} from "../../../components/Platform/DashboardLayout";
import { DashboardOverview } from "../../../components/Platform/DashboardOverview";
import { NFCAndHomeScreensPage } from "../../../components/Platform/NFCAndHomeScreensPage";
import { SermonsManagement } from "../../../components/Platform/SermonsManagement";
import { SermonEditorPage } from "../../../components/Platform/SermonEditor";

const Platform: React.FC = () => {
  const { userInfo } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const organizationName = "My Organization";

  // Authentication
  const { isLoading, isAuthenticated } = usePlatformAuth(userInfo);

  // Toast notifications
  const { showToast, toastMessage, toastOptions, show, hide } = useToast();

  // NFC Devices management
  const { devices, isSavingTiles, saveTiles, createHomeScreen, deleteDevice, fetchConfig } =
    usePlatformNFCDevices(userInfo?._id!);

  // Fetch NFC config when user is authenticated
  useEffect(() => {
    if (isAuthenticated && userInfo) {
      fetchConfig();
    }
  }, [isAuthenticated, userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Navigate to different dashboard sections
  const handleSectionChange = (section: DashboardSection) => {
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

  // Handle tile save with toast feedback
  const handleSaveTiles = async (
    deviceId: string,
    tiles: any[],
    wallpaper?: string,
    name?: string,
  ) => {
    try {
      await saveTiles(deviceId, tiles, wallpaper, name);
      show("Home screen updated successfully");
    } catch (error) {
      console.error("Error saving tiles:", error);
      show(
        error instanceof Error
          ? `Failed to update home screen: ${error.message}`
          : "Failed to update home screen",
      );
    }
  };

  // Handle create home screen with toast feedback
  const handleCreateHomeScreen = async (
    name: string,
    tiles: any[],
    wallpaper?: string,
  ) => {
    try {
      await createHomeScreen(name, tiles, wallpaper);
      show("Home screen created successfully");
    } catch (error) {
      console.error("Error creating home screen:", error);
      show(
        error instanceof Error
          ? `Failed to create home screen: ${error.message}`
          : "Failed to create home screen",
      );
    }
  };

  // Handle delete with toast feedback
  const handleDelete = async (deviceId: string) => {
    try {
      await deleteDevice(deviceId);
      show("Home screen deleted successfully");
    } catch (error) {
      console.error("Error deleting home screen:", error);
      show(
        error instanceof Error
          ? `Failed to delete home screen: ${error.message}`
          : "Failed to delete home screen",
      );
      throw error; // Re-throw to let the component handle it
    }
  };

  if (isLoading) {
    return <CheckingAuthentication />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage id="platform-page">
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
              nfcDeviceCount={devices.length}
            />
          </Route>

          <Route path="/nfc">
            <NFCAndHomeScreensPage
              devices={devices}
              onSaveTiles={handleSaveTiles}
              onCreateHomeScreen={handleCreateHomeScreen}
              onDeleteHomeScreen={handleDelete}
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
