import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { apiClient } from '../lib/api'
import { ProfileImage } from './ProfileImage'
import { Send, User, Image, Video, Calendar, Smile } from 'lucide-react'
import { EventModal } from './EventModal'
import { CelebrateModal } from './CelebrateModal'

interface PostComposerProps {
  onPostCreated: () => void
}

export const PostComposer: React.FC<PostComposerProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string>('')
  const [showEventModal, setShowEventModal] = useState(false)
  const [showCelebrateModal, setShowCelebrateModal] = useState(false)
  const { user } = useAuth()
  const { addNotification } = useNotifications()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !user) return

    setLoading(true)
    try {


      const response = await apiClient.createPost(
        content.trim(),
        mediaPreview,
        mediaFile?.type.startsWith('image/') ? 'image' : mediaFile?.type.startsWith('video/') ? 'video' : ''
      )



      if (response.error) {
        console.error('Error creating post:', response.error)
        return
      }

      setContent('')
      setMediaFile(null)
      setMediaPreview('')
      onPostCreated()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMediaUpload = (file: File, type: 'image' | 'video') => {
    setMediaFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setMediaPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleEventCreate = (eventText: string) => {
    setContent(prev => prev + (prev ? '\n\n' : '') + eventText)
  }

  const handleCelebrationCreate = (celebrationText: string) => {
    setContent(prev => prev + (prev ? '\n\n' : '') + celebrationText)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-3 md:p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-1 sm:space-x-2 md:space-x-3">
          <div className="flex-shrink-0">
            <ProfileImage
              profileImage={user?.profileImage}
              fullName={user?.fullName || ''}
              size="md"
            />
          </div>

          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start a post"
              className="w-full border-0 resize-none focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 text-sm"
              rows={2}
              maxLength={500}
            />

            {/* Media Preview */}
            {mediaPreview && (
              <div className="mt-3 relative">
                {mediaFile?.type.startsWith('image/') ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="max-w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    controls
                    className="max-w-full h-48 object-cover rounded-lg"
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMediaFile(null)
                    setMediaPreview('')
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <span className="text-xs text-gray-500">
                  {content.length}/500 characters
                </span>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-1 sm:space-x-2 md:space-x-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        // Check file size (limit to 10MB for images)
                        if (file.size > 10 * 1024 * 1024) {
                          addNotification({
                            type: 'error',
                            title: '❌ File Too Large',
                            message: 'Image file is too large. Please select an image under 10MB.'
                          })
                          return
                        }
                        handleMediaUpload(file, 'image')
                      }
                    }
                    input.click()
                  }}
                  className="flex items-center justify-center space-x-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200 p-1.5 sm:p-2 rounded hover:bg-gray-100 min-w-[50px] sm:min-w-[60px] md:min-w-0"
                >
                  <Image className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
                  <span className="text-xs hidden sm:inline">Media</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'video/*'
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        // Check file size (limit to 50MB for videos)
                        if (file.size > 50 * 1024 * 1024) {
                          addNotification({
                            type: 'error',
                            title: '❌ File Too Large',
                            message: 'Video file is too large. Please select a video under 50MB.'
                          })
                          return
                        }
                        handleMediaUpload(file, 'video')
                      }
                    }
                    input.click()
                  }}
                  className="flex items-center justify-center space-x-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200 p-1.5 sm:p-2 rounded hover:bg-gray-100 min-w-[50px] sm:min-w-[60px] md:min-w-0"
                >
                  <Video className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
                  <span className="text-xs hidden sm:inline">Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowEventModal(true)}
                  className="flex items-center justify-center space-x-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200 p-1.5 sm:p-2 rounded hover:bg-gray-100 min-w-[50px] sm:min-w-[60px] md:min-w-0"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
                  <span className="text-xs hidden sm:inline">Event</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCelebrateModal(true)}
                  className="flex items-center justify-center space-x-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200 p-1.5 sm:p-2 rounded hover:bg-gray-100 min-w-[50px] sm:min-w-[60px] md:min-w-0"
                >
                  <Smile className="h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
                  <span className="text-xs hidden sm:inline">Celebrate</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={!content.trim() || loading}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-1.5 border border-transparent text-sm font-semibold rounded-md text-white bg-[#0a66c2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <span>{loading ? 'Posting...' : 'Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Modals */}
      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        onEventCreate={handleEventCreate}
      />

      <CelebrateModal
        isOpen={showCelebrateModal}
        onClose={() => setShowCelebrateModal(false)}
        onCelebrationCreate={handleCelebrationCreate}
      />
    </div>
  )
}