import React, { useState, useEffect } from "react";
import { IonPage, IonToast } from "@ionic/react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router";
import "./Platform.scss";

/* Context */
import { useAppContext } from "../../../context/context";

/* Hooks */
import { useToast } from "../../../hooks/useToast";
import { useNFCConfig } from "../../../hooks/useNFCConfig";

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

const Platform: React.FC = () => {
  const { userInfo } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const organizationName = "My Organization";

  const { showToast, toastMessage, toastOptions, show, hide } = useToast();
  const { nfcConfigData, isSaving, fetchConfig, saveConfig } =
    useNFCConfig(userInfo?._id!);

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

  const handleNFCDeviceSave = async (
    deviceId: string | null,
    formData: any,
  ) => {
    try {
      if (!userInfo?._id) {
        throw new Error("User not authenticated");
      }

      // If editing existing device, update it
      if (deviceId) {
        // Update existing device
        await saveConfig(formData);
        show("NFC device updated successfully");
      } else {
        // Create new device
        await saveConfig(formData);
        show("NFC device created successfully");
      }

      // Refresh the config data
      fetchConfig();
    } catch (error) {
      console.error("Error saving NFC device:", error);
      show(
        error instanceof Error ? error.message : "Failed to save NFC device",
      );
    }
  };

  const handleNFCDeviceDelete = (deviceId: string) => {
    // Implement delete functionality
    console.log("Delete device:", deviceId);
    show("Device deleted successfully");
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
              onSave={handleNFCDeviceSave}
              onDelete={handleNFCDeviceDelete}
              isSaving={isSaving}
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
