import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { apiClient } from '../lib/api'
import { User, Edit3, Save, X, MapPin, Calendar, Mail, Building2, Camera, Upload } from 'lucide-react'

interface Profile {
  id: string
  fullName: string
  bio: string
  email: string
  createdAt: string
  profileImage?: string
  bannerImage?: string
}

interface ProfileCardProps {
  profileId?: string
  isOwnProfile?: boolean
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profileId, isOwnProfile = false }) => {
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedBio, setEditedBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string>('')
  const [bannerImagePreview, setBannerImagePreview] = useState<string>('')

  const targetProfileId = profileId || user?.id

  useEffect(() => {
    if (targetProfileId) {
      fetchProfile()
    }
  }, [targetProfileId])

  const fetchProfile = async () => {
    try {
      if (targetProfileId) {
        const response = await apiClient.getUser(targetProfileId)

        if (response.data) {
          setProfile(response.data)
          setEditedName(response.data.fullName)
          setEditedBio(response.data.bio || '')
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return

    setSaving(true)
    try {
      const profileImageData = profileImagePreview || profile.profileImage
      const bannerImageData = bannerImagePreview || profile.bannerImage



      const response = await apiClient.updateProfile(
        editedName.trim(),
        editedBio.trim(),
        profileImageData,
        bannerImageData
      )

      if (response.error) {
        console.error('Error updating profile:', response.error)
        addNotification({
          type: 'error',
          title: '❌ Update Failed',
          message: 'Failed to update profile. Please try again.'
        })
        return
      }

      if (response.data) {

        setProfile({
          ...profile,
          fullName: response.data.fullName,
          bio: response.data.bio,
          profileImage: response.data.profileImage,
          bannerImage: response.data.bannerImage
        })
        addNotification({
          type: 'success',
          title: '✅ Profile Updated',
          message: 'Your profile has been updated successfully!'
        })
      }
      setIsEditing(false)
      setProfileImageFile(null)
      setBannerImageFile(null)
      setProfileImagePreview('')
      setBannerImagePreview('')
    } catch (error) {
      console.error('Error updating profile:', error)
      addNotification({
        type: 'error',
        title: '❌ Update Failed',
        message: 'Failed to update profile. Please try again.'
      })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedName(profile?.fullName || '')
    setEditedBio(profile?.bio || '')
    setProfileImageFile(null)
    setBannerImageFile(null)
    setProfileImagePreview('')
    setBannerImagePreview('')
    setIsEditing(false)
  }

  const handleProfileImageUpload = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      addNotification({
        type: 'error',
        title: '❌ File Too Large',
        message: 'Profile image must be under 5MB'
      })
      return
    }

    setProfileImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfileImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleBannerImageUpload = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      addNotification({
        type: 'error',
        title: '❌ File Too Large',
        message: 'Banner image must be under 10MB'
      })
      return
    }

    setBannerImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setBannerImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <p className="text-gray-500">Profile not found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      {/* Banner Image */}
      <div className="h-24 sm:h-32 rounded-t-lg relative overflow-hidden">
        {profile.bannerImage ? (
          <img
            src={profile.bannerImage}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#0a66c2] to-[#004182]"></div>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="flex items-end space-x-3 sm:space-x-4 -mt-12 sm:-mt-16 mb-4">
          <div className="flex-shrink-0 relative z-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-sm overflow-hidden bg-white">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#0a66c2] flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0 pb-2">
            {isOwnProfile && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-semibold text-[#0a66c2] border border-[#0a66c2] rounded-md hover:bg-[#0a66c2] hover:text-white transition-colors duration-200"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {isEditing ? (
            <div className="space-y-4">
              {/* Image Upload Section */}
              <div className="space-y-4">
                {/* Banner Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Banner Image
                  </label>
                  <div className="relative">
                    <div className="h-24 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-[#0a66c2] transition-colors">
                      {(bannerImagePreview || profile.bannerImage) ? (
                        <img
                          src={bannerImagePreview || profile.bannerImage}
                          alt="Banner preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-[#0a66c2] to-[#004182] flex items-center justify-center">
                          <span className="text-white text-sm">Banner Image</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0]
                          if (file) handleBannerImageUpload(file)
                        }
                        input.click()
                      }}
                      className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
                    >
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Profile Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Profile Image
                  </label>
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-[#0a66c2] transition-colors">
                      {(profileImagePreview || profile.profileImage) ? (
                        <img
                          src={profileImagePreview || profile.profileImage}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0a66c2] flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            {profile.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0]
                          if (file) handleProfileImageUpload(file)
                        }
                        input.click()
                      }}
                      className="absolute bottom-0 right-0 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all"
                    >
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2] resize-none"
                  placeholder="Tell us about yourself..."
                  maxLength={200}
                />
                <p className="text-sm text-gray-500 mt-1">{editedBio.length}/200 characters</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  disabled={saving || !editedName.trim()}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#0a66c2] text-white text-sm font-semibold rounded-md hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Saving...' : 'Save'}</span>
                </button>

                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.fullName}</h2>

              {profile.bio ? (
                <p className="text-gray-600 leading-relaxed mb-3">{profile.bio}</p>
              ) : (
                <p className="text-gray-400 italic mb-3">
                  {isOwnProfile ? 'Add a bio to tell others about yourself' : 'No bio available'}
                </p>
              )}

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {profile.createdAt && new Date(profile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}