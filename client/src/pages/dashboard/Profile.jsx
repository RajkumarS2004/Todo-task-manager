import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: null
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: null
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Avatar file size must be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        bio: formData.bio
      };

      if (formData.avatar) {
        updateData.avatar = formData.avatar;
      }

      await updateProfile(updateData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      bio: user.bio || '',
      avatar: null
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
      {/* Header */}
      <div className="mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-cyan rounded-lg flex items-center justify-center shadow-cyan border border-[#00eaff]">
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-gradient-cyan drop-shadow-lg mb-0.5 tracking-tight">
              Profile
            </h1>
            <p className="text-xs text-[#b0b8c1] font-medium">
              Manage your account information and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-2">
              <h2 className="text-sm sm:text-base font-bold text-gradient-cyan">Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center gap-2 px-3 py-1.5 text-xs font-semibold touch-manipulation"
                  aria-label="Edit profile"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.586 2.586a2 2 0 112.828 2.828L11.828 15H9v-2.828l9.586-9.586z" />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-cyan rounded-full flex items-center justify-center shadow-cyan border-4 border-[#00eaff] overflow-hidden">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-base sm:text-lg font-bold text-white">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 bg-gradient-cyan rounded-full flex items-center justify-center cursor-pointer shadow-cyan border-2 border-white">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[#00eaff] mb-1">
                    {user?.name || 'User Name'}
                  </h3>
                  <p className="text-xs text-[#b0b8c1]">{user?.email || 'user@example.com'}</p>
                  {isEditing && (
                    <p className="text-xs text-[#b0b8c1]/60 mt-1">
                      Click the camera icon to change avatar
                    </p>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#00eaff] mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-modern w-full"
                      placeholder="Enter your full name"
                      required
                    />
                  ) : (
                    <div className="p-2 rounded-lg bg-[#0a0a0a]/60 border border-[#00eaff]/20">
                      <p className="text-xs text-[#b0b8c1]">{user?.name || 'Not provided'}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#00eaff] mb-1">
                    Email
                  </label>
                  <div className="p-2 rounded-lg bg-[#0a0a0a]/60 border border-[#00eaff]/20">
                    <p className="text-xs text-[#b0b8c1]">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Bio Field */}
              <div>
                <label className="block text-xs font-semibold text-[#00eaff] mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className="input-modern w-full resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="p-2 rounded-lg bg-[#0a0a0a]/60 border border-[#00eaff]/20">
                    <p className="text-xs text-[#b0b8c1]">{user?.bio || 'No bio provided'}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold touch-manipulation"
                    aria-label="Save profile changes"
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
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-secondary flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold touch-manipulation"
                    aria-label="Cancel editing"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Stats Card */}
        <div className="lg:col-span-1">
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <h2 className="text-sm sm:text-base font-bold text-gradient-cyan mb-3">Account Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#b0b8c1]">Member Since</span>
                <span className="text-xs font-semibold text-[#00eaff]">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#b0b8c1]">Last Updated</span>
                <span className="text-xs font-semibold text-[#00eaff]">
                  {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#b0b8c1]">Account Status</span>
                <span className="px-2 py-0.5 text-xs rounded-full font-medium bg-[#43e97b]/20 text-[#43e97b] border border-[#43e97b]/30">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 