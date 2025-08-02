import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { PostComposer } from '../components/PostComposer'
import { PostCard } from '../components/PostCard'
import { apiClient } from '../lib/api'
import { RefreshCw } from 'lucide-react'

interface Post {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    fullName: string
  }
}

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    try {
      const response = await apiClient.getPosts()
      if (response.data) {
        setPosts(response.data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handlePostCreated = () => {
    fetchPosts(true)
  }

  const handleRefresh = () => {
    fetchPosts(true)
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Home</h1>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`inline-flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-[#0a66c2] transition-colors duration-200 ${refreshing ? 'animate-spin' : ''
                }`}
            >
              <RefreshCw className="h-4 w-4" />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
          <PostComposer onPostCreated={handlePostCreated} />
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
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
              <div className="text-gray-400 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500">Be the first to share something with the community!</p>
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