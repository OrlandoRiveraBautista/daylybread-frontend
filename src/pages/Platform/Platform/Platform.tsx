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
import { useAssignHomeScreenToNFCConfig } from "../../../hooks/NFCConfigHooks";

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
import { SudoAdminManager, SUDO_ADMIN_USER_ID } from "../../../components/Platform/SudoAdminManager";

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
  const { 
    devices, 
    nfcDevices,
    isSavingTiles, 
    saveTiles, 
    createHomeScreen, 
    deleteDevice,
    deleteNFCDevice,
    fetchConfig 
  } = usePlatformNFCDevices(userInfo?._id!);

  // NFC assignment mutation
  const [assignHomeScreenToNFCConfig] = useAssignHomeScreenToNFCConfig();

  // Fetch NFC config when user is authenticated
  useEffect(() => {
    if (isAuthenticated && userInfo) {
      fetchConfig();
    }
  }, [isAuthenticated, userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check if user is sudo admin
  const isSudoAdmin = userInfo?._id === SUDO_ADMIN_USER_ID;

  // Get active section from URL
  const getActiveSection = (): DashboardSection => {
    const path = location.pathname;
    if (path.includes("/sudo-admin")) return "sudo-admin";
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
      "sudo-admin": "/sudo-admin",
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

  // Handle NFC device delete with toast feedback
  const handleDeleteNFC = async (deviceId: string) => {
    try {
      await deleteNFCDevice(deviceId);
      show("NFC device deleted successfully");
    } catch (error) {
      console.error("Error deleting NFC device:", error);
      show(
        error instanceof Error
          ? `Failed to delete NFC device: ${error.message}`
          : "Failed to delete NFC device",
      );
      throw error;
    }
  };

  // Handle NFC device assignment to home screen
  const handleAssignNFCToHomeScreen = async (nfcDeviceId: string, homeScreenId: string) => {
    try {
      const result = await assignHomeScreenToNFCConfig({
        variables: { id: nfcDeviceId, homeScreenId },
      });
      
      if (result.data?.assignHomeScreenToNFCConfig?.errors) {
        const errorMsg = result.data.assignHomeScreenToNFCConfig.errors[0]?.message || "Failed to assign NFC device";
        show(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Refresh the data
      await fetchConfig();
      show("NFC device assigned successfully");
    } catch (error) {
      console.error("Error assigning NFC device:", error);
      show(
        error instanceof Error
          ? `Failed to assign NFC device: ${error.message}`
          : "Failed to assign NFC device",
      );
      throw error;
    }
  };

  // Handle NFC device unassignment from home screen
  const handleUnassignNFC = async (nfcDeviceId: string) => {
    try {
      const result = await assignHomeScreenToNFCConfig({
        variables: { id: nfcDeviceId, homeScreenId: null },
      });
      
      if (result.data?.assignHomeScreenToNFCConfig?.errors) {
        const errorMsg = result.data.assignHomeScreenToNFCConfig.errors[0]?.message || "Failed to unassign NFC device";
        show(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Refresh the data
      await fetchConfig();
      show("NFC device unassigned successfully");
    } catch (error) {
      console.error("Error unassigning NFC device:", error);
      show(
        error instanceof Error
          ? `Failed to unassign NFC device: ${error.message}`
          : "Failed to unassign NFC device",
      );
      throw error;
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
        isSudoAdmin={isSudoAdmin}
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
              nfcDevices={nfcDevices}
              onSaveTiles={handleSaveTiles}
              onCreateHomeScreen={handleCreateHomeScreen}
              onDeleteHomeScreen={handleDelete}
              onDeleteNFC={handleDeleteNFC}
              onAssignNFCToHomeScreen={handleAssignNFCToHomeScreen}
              onUnassignNFC={handleUnassignNFC}
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

          {/* Sudo Admin Manager - restricted to specific user */}
          {isSudoAdmin && (
            <Route path="/sudo-admin">
              <SudoAdminManager />
            </Route>
          )}

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
