import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { ProfileCard } from '../components/ProfileCard'
import { PostCard } from '../components/PostCard'
import { useAuth } from '../contexts/AuthContext'
import { apiClient } from '../lib/api'

interface Post {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    fullName: string
  }
}

export const Profile: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>()
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const profileId = userId || user?.id
  const isOwnProfile = !userId || userId === user?.id

  useEffect(() => {
    if (profileId) {
      fetchUserPosts()
    }
  }, [profileId])

  const fetchUserPosts = async () => {
    setLoading(true)
    try {
      const response = await apiClient.getUserPosts(profileId!)
      if (response.data) {
        setPosts(response.data)
      }
    } catch (error) {
      console.error('Error fetching user posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <ProfileCard profileId={profileId} isOwnProfile={isOwnProfile} />

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            {isOwnProfile ? 'Your Posts' : 'Posts'} ({posts.length})
          </h2>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 rounded"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500">
                  {isOwnProfile
                    ? 'Share your first post to get started!'
                    : 'This user hasn\'t posted anything yet.'
                  }
                </p>
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}