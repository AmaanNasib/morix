import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Switch,
} from "@heroui/react";
import {
  Bell,
  Globe,
  Settings,
  User,
  Shield,
} from "lucide-react";

import DefaultLayout from "@/layouts/default";

// Types for Settings Data
interface ProfileData {
  displayName: string;
  email: string;
  role: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: boolean;
}

interface SystemPreferences {
  darkMode: boolean;
  autoSave: boolean;
  compactView: boolean;
}

interface NotificationSettings {
  email: {
    licenseExpiryAlerts: boolean;
    screenStatusChanges: boolean;
    weeklyReports: boolean;
  };
  push: {
    criticalAlerts: boolean;
    systemUpdates: boolean;
    marketingMessages: boolean;
  };
}

interface RegionalSettings {
  language: string;
  timeZone: string;
  dateFormat: string;
}

interface SettingsData {
  profile: ProfileData;
  security: SecuritySettings;
  systemPreferences: SystemPreferences;
  notifications: NotificationSettings;
  regional: RegionalSettings;
}

// Default/Mock data - Replace with API call
const defaultSettings: SettingsData = {
  profile: {
    displayName: "Rodger Struck",
    email: "rodger@matrix.com",
    role: "Distributor",
  },
  security: {
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: true,
  },
  systemPreferences: {
    darkMode: false,
    autoSave: true,
    compactView: false,
  },
  notifications: {
    email: {
      licenseExpiryAlerts: true,
      screenStatusChanges: true,
      weeklyReports: false,
    },
    push: {
      criticalAlerts: true,
      systemUpdates: true,
      marketingMessages: false,
    },
  },
  regional: {
    language: "English (US)",
    timeZone: "(UTC-05:00) Eastern Time",
    dateFormat: "MM/DD/YYYY",
  },
};

// API Functions - Replace these with actual API calls
const fetchSettings = async (): Promise<SettingsData> => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/settings');
  // return await response.json();
  
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(defaultSettings), 500);
  });
};

const updateSettings = async (settings: SettingsData): Promise<SettingsData> => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/settings', {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(settings)
  // });
  // return await response.json();
  
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(settings), 500);
  });
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState<SettingsData>(defaultSettings);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSettings();

        setSettings(data);
        setOriginalSettings(JSON.parse(JSON.stringify(data))); // Deep copy
      } catch (error) {
        console.error("Failed to load settings:", error);
        // Keep default settings on error
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Check for changes
  useEffect(() => {
    const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings);

    setHasChanges(changed);
  }, [settings, originalSettings]);

  // Update handlers
  const updateSecurity = (key: keyof SecuritySettings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [key]: value },
    }));
  };

  const updateSystemPreferences = (key: keyof SystemPreferences, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      systemPreferences: { ...prev.systemPreferences, [key]: value },
    }));
  };

  const updateNotification = (
    type: "email" | "push",
    key: string,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: { ...prev.notifications[type], [key]: value },
      },
    }));
  };

  const updateRegional = (key: keyof RegionalSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      regional: { ...prev.regional, [key]: value },
    }));
  };

  // Save handler
  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updatedSettings = await updateSettings(settings);

      setSettings(updatedSettings);
      setOriginalSettings(JSON.parse(JSON.stringify(updatedSettings)));
      // TODO: Add success notification/toast
      console.log("Settings saved successfully");
    } catch (error) {
      console.error("Failed to save settings:", error);
      // TODO: Add error notification/toast
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setSettings(JSON.parse(JSON.stringify(originalSettings))); // Reset to original
  };

  // Reset to defaults handler
  const handleResetDefaults = () => {
    setSettings(JSON.parse(JSON.stringify(defaultSettings)));
  };

  // Export data handler
  const handleExportData = () => {
    // TODO: Replace with actual API call
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "settings-export.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Delete account handler
  const handleDeleteAccount = () => {
    // TODO: Replace with actual API call and confirmation dialog
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deletion requested");
      // await fetch('/api/account/delete', { method: 'DELETE' });
    }
  };

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading settings...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="space-y-4">

        {/* Content Section */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6">

          {/* Header Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#D12027] p-2 rounded-lg flex items-center justify-center">
                <Settings className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-semibold">Settings</h1>
            </div>
            <p className="text-sm text-gray-600">Manage your account and application preferences</p>
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Settings */}
            <Card className="bg-white text-black rounded-[14px] shadow-xs border border-gray-100">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center gap-2">
                  <User className="text-red-500" size={20} />
                  <h2 className="font-semibold">Profile Settings</h2>
                </div>

                <div className="text-sm space-y-2">
                  <p><span className="font-semibold">Display Name:</span> {settings.profile.displayName}</p>
                  <p><span className="font-semibold">Email:</span> {settings.profile.email}</p>
                  <p><span className="font-semibold">Role:</span> {settings.profile.role}</p>
                </div>

                <Button className="w-full border-[1px] border-gray-300 bg-white">
                  Edit Profile
                </Button>
              </CardBody>
            </Card>

            {/* Security */}
            <Card className="bg-white text-black rounded-[14px] shadow-xs border border-gray-100">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center gap-2">
                  <Shield className="text-red-500" size={20} />
                  <h2 className="font-semibold">Security</h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Two-Factor Authentication</span>
                    <Switch
                      defaultSelected={settings.security.twoFactorAuth}
                      isSelected={settings.security.twoFactorAuth}
                      size="sm"
                      onValueChange={(value) => updateSecurity("twoFactorAuth", value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Login Alerts</span>
                    <Switch
                      defaultSelected={settings.security.loginAlerts}
                      isSelected={settings.security.loginAlerts}
                      size="sm"
                      onValueChange={(value) => updateSecurity("loginAlerts", value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Session Timeout</span>
                    <Switch
                      defaultSelected={settings.security.sessionTimeout}
                      isSelected={settings.security.sessionTimeout}
                      size="sm"
                      onValueChange={(value) => updateSecurity("sessionTimeout", value)}
                    />
                  </div>
                </div>

                <Button className="w-full border-[1px] border-gray-300 bg-white">
                  Change Password
                </Button>
              </CardBody>
            </Card>

            {/* System Preferences */}
            <Card className="bg-white text-black rounded-[14px] shadow-xs border border-gray-100">
              <CardBody className="space-y-4 p-6">
                <div className="flex items-center gap-2">
                  <Settings className="text-red-500" size={20} />
                  <h2 className="font-semibold">System Preferences</h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dark Mode</span>
                    <Switch
                      defaultSelected={settings.systemPreferences.darkMode}
                      isSelected={settings.systemPreferences.darkMode}
                      size="sm"
                      onValueChange={(value) => updateSystemPreferences("darkMode", value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auto Save</span>
                    <Switch
                      defaultSelected={settings.systemPreferences.autoSave}
                      isSelected={settings.systemPreferences.autoSave}
                      size="sm"
                      onValueChange={(value) => updateSystemPreferences("autoSave", value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compact View</span>
                    <Switch
                      defaultSelected={settings.systemPreferences.compactView}
                      isSelected={settings.systemPreferences.compactView}
                      size="sm"
                      onValueChange={(value) => updateSystemPreferences("compactView", value)}
                    />
                  </div>
                </div>

                <Button
                  className="w-full border-[1px] border-gray-300 bg-white"
                  onPress={handleResetDefaults}
                >
                  Reset to Defaults
                </Button>
              </CardBody>
            </Card>
      </div>

          {/* Notification Preferences */}
          <Card className="bg-white text-black rounded-[14px] shadow-xs border border-gray-100">
            <CardBody className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <Bell className="text-red-500" size={20} />
                <h2 className="font-semibold">Notification Preferences</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Email Notification</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">License Expiry Alerts</span>
                    <Switch
                      defaultSelected={settings.notifications.email.licenseExpiryAlerts}
                      isSelected={settings.notifications.email.licenseExpiryAlerts}
                      size="sm"
                      onValueChange={(value) => updateNotification("email", "licenseExpiryAlerts", value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Screen Status Changes</span>
                    <Switch
                      defaultSelected={settings.notifications.email.screenStatusChanges}
                      isSelected={settings.notifications.email.screenStatusChanges}
                      size="sm"
                      onValueChange={(value) => updateNotification("email", "screenStatusChanges", value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Reports</span>
                    <Switch
                      defaultSelected={settings.notifications.email.weeklyReports}
                      isSelected={settings.notifications.email.weeklyReports}
                      size="sm"
                      onValueChange={(value) => updateNotification("email", "weeklyReports", value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-sm">Push Notification</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Critical Alerts</span>
                    <Switch
                      defaultSelected={settings.notifications.push.criticalAlerts}
                      isSelected={settings.notifications.push.criticalAlerts}
                      size="sm"
                      onValueChange={(value) => updateNotification("push", "criticalAlerts", value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Updates</span>
                    <Switch
                      defaultSelected={settings.notifications.push.systemUpdates}
                      isSelected={settings.notifications.push.systemUpdates}
                      size="sm"
                      onValueChange={(value) => updateNotification("push", "systemUpdates", value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Marketing Messages</span>
                    <Switch
                      defaultSelected={settings.notifications.push.marketingMessages}
                      isSelected={settings.notifications.push.marketingMessages}
                      size="sm"
                      onValueChange={(value) => updateNotification("push", "marketingMessages", value)}
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Data & Privacy */}
          <Card className="bg-white text-black rounded-[14px] shadow-xs border border-gray-100">
            <CardBody className="space-y-4 p-6">
              <h2 className="font-semibold">Data & Privacy</h2>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                <p className="text-sm">Data Export <br/><span className="text-gray-500">Download your account data</span></p>
                <Button
                  className="border-[1px] border-gray-300 bg-white w-full sm:w-auto"
                  onPress={handleExportData}
                >
                  Export Data
                </Button>
              </div>

              <Divider />

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                <p className="text-sm">Delete Account<br/><span className="text-gray-500">Permanently delete your account and all data</span></p>
                <Button
                  className="bg-[#F04438] text-white w-full sm:w-auto"
                  onPress={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Regional Settings */}
          <Card className="bg-white text-black rounded-[14px] shadow-xs border border-gray-100">
            <CardBody className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <Globe className="text-red-500" size={20} />
                <h2 className="font-semibold">Regional Settings</h2>
              </div>

              <Input
                label="Language"
                value={settings.regional.language}
                variant="flat"
                onValueChange={(value) => updateRegional("language", value)}
              />
              <Input
                label="Time Zone"
                value={settings.regional.timeZone}
                variant="flat"
                onValueChange={(value) => updateRegional("timeZone", value)}
              />
              <Input
                label="Date Format"
                value={settings.regional.dateFormat}
                variant="flat"
                onValueChange={(value) => updateRegional("dateFormat", value)}
              />
            </CardBody>
          </Card>

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <Button
              className="border-[1px] border-gray-300 bg-white w-full sm:w-auto"
              isDisabled={!hasChanges}
              onPress={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#D12027] text-white w-full sm:w-auto"
              isDisabled={!hasChanges || isSaving}
              isLoading={isSaving}
              onPress={handleSave}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

