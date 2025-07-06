import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      weeklyReports: false,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showBio: true,
      allowTaskSharing: true
    },
    preferences: {
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h'
    }
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    const data = {
      user: user,
      settings: settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.info('Account deletion feature coming soon...');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-cyan rounded-lg flex items-center justify-center shadow-cyan border border-[#00eaff]">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-gradient-cyan drop-shadow-lg mb-0.5 tracking-tight">
              Settings
            </h1>
            <p className="text-xs text-[#b0b8c1] font-medium">
              Customize your experience and manage your preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Settings Sections */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {/* Theme Settings */}
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <h2 className="text-sm sm:text-base font-bold text-gradient-cyan mb-2">Appearance</h2>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-semibold text-[#00eaff] mb-1">Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSettingChange('theme', 'theme', 'dark')}
                    className={`p-2 rounded-lg border-2 transition-all touch-manipulation ${
                      settings.theme === 'dark'
                        ? 'border-[#00eaff] bg-[#00eaff]/10'
                        : 'border-[#00eaff]/30 bg-[#0a0a0a]/60'
                    }`}
                    aria-label="Dark theme"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#0a0a0a] rounded-full border-2 border-[#00eaff]"></div>
                      <span className="text-xs text-[#b0b8c1] font-medium">Dark Mode</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <h2 className="text-sm sm:text-base font-bold text-gradient-cyan mb-2">Notifications</h2>
            <div className="space-y-2">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-[#0a0a0a]/60 rounded-lg">
                  <div>
                    <h3 className="text-xs text-[#b0b8c1] font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSettingChange('notifications', key, !value)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00eaff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                      value ? 'bg-[#00eaff]' : 'bg-[#444]'
                    }`}
                    aria-label={`Toggle ${key} notifications`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <h2 className="text-sm sm:text-base font-bold text-gradient-cyan mb-2">Privacy</h2>
            <div className="space-y-2">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-[#0a0a0a]/60 rounded-lg">
                  <div>
                    <h3 className="text-xs text-[#b0b8c1] font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSettingChange('privacy', key, typeof value === 'boolean' ? !value : value)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00eaff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] ${
                      value ? 'bg-[#00eaff]' : 'bg-[#444]'
                    }`}
                    aria-label={`Toggle ${key} privacy setting`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences Settings */}
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <h2 className="text-sm sm:text-base font-bold text-gradient-cyan mb-2">Preferences</h2>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-semibold text-[#00eaff] mb-1">Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                  className="input-modern w-full text-xs"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#00eaff] mb-1">Timezone</label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                  className="input-modern w-full text-xs"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">GMT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleSaveSettings}
              disabled={loading}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold touch-manipulation"
              aria-label="Save settings"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Settings
                </>
              )}
            </button>
            <button
              onClick={handleExportData}
              className="btn-secondary flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold touch-manipulation"
              aria-label="Export data"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Data
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="lg:col-span-1">
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <h2 className="text-sm sm:text-base font-bold text-gradient-cyan mb-3">Account Actions</h2>
            <div className="space-y-3">
              <button
                onClick={handleDeleteAccount}
                className="w-full btn-danger flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold touch-manipulation"
                aria-label="Delete account"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
              </button>
              <div className="text-xs text-[#b0b8c1] text-center">
                <p>Account deletion is permanent and cannot be undone.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 