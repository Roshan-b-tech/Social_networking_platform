import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotifications } from '../contexts/NotificationContext'
import { ProfileImage } from './ProfileImage'
import { User, Clock, ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { apiClient } from '../lib/api'

interface Comment {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    fullName: string
  }
}

interface Post {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    fullName: string
    profileImage?: string
  }
  likes?: number
  isLiked?: boolean
  comments?: Comment[]
  mediaUrl?: string
  mediaType?: string
  mediaData?: string
}

interface PostCardProps {
  post: Post
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>(post.comments || [])
  const [loading, setLoading] = useState(false)
  const { addNotification } = useNotifications()

  // Debug logging
  console.log('PostCard received post:', {
    authorName: post.author.fullName,
    authorProfileImage: post.author.profileImage ? 'Has image' : 'No image',
    profileImageLength: post.author.profileImage ? post.author.profileImage.length : 0
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-2 sm:space-x-3">
        <div className="flex-shrink-0">
          <ProfileImage
            profileImage={post.author.profileImage}
            fullName={post.author.fullName}
            size="md"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Link
                to={`/profile/${post.author.id}`}
                className="font-semibold text-gray-900 hover:text-[#0a66c2] transition-colors duration-200 text-sm"
              >
                {post.author.fullName}
              </Link>
              <span className="text-gray-500 text-sm">•</span>
              <div className="flex items-center space-x-1 text-gray-500 text-xs">
                <Clock className="h-3 w-3" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap text-sm mb-3">
            {post.content}
          </p>

          {/* Media Display */}
          {post.mediaData && post.mediaType && (
            <div className="mb-3">
              {console.log('Rendering media:', { mediaType: post.mediaType, mediaDataLength: post.mediaData.length })}
              {post.mediaType === 'image' ? (
                <img
                  src={post.mediaData}
                  alt="Post media"
                  className="max-w-full h-64 object-cover rounded-lg"
                  onError={(e) => console.error('Image failed to load:', e)}
                  onLoad={() => console.log('Image loaded successfully')}
                />
              ) : post.mediaType === 'video' ? (
                <video
                  src={post.mediaData}
                  controls
                  className="max-w-full h-64 object-cover rounded-lg"
                  onError={(e) => console.error('Video failed to load:', e)}
                  onLoad={() => console.log('Video loaded successfully')}
                />
              ) : null}
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-100">
            <button
              onClick={async () => {
                try {
                  setLoading(true)
                  const response = await apiClient.likePost(post.id)
                  if (response.data) {
                    setIsLiked(response.data.liked)
                    setLikeCount(response.data.likeCount)
                  }
                } catch (error) {
                  console.error('Error liking post:', error)
                } finally {
                  setLoading(false)
                }
              }}
              disabled={loading}
              className={`flex items-center space-x-1 transition-colors duration-200 ${isLiked
                ? 'text-[#0a66c2]'
                : 'text-gray-600 hover:text-[#0a66c2]'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">
                {likeCount > 0 ? likeCount : ''} Like
              </span>
            </button>
            <button
              onClick={() => setShowCommentInput(!showCommentInput)}
              className="flex items-center space-x-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">
                {comments.length > 0 ? comments.length : ''} Comment
              </span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${post.author.fullName}'s post`,
                    text: post.content,
                    url: window.location.href
                  })
                } else {
                  navigator.clipboard.writeText(post.content)
                  addNotification({
                    type: 'success',
                    title: '📋 Copied to Clipboard',
                    message: 'Post content copied to clipboard!'
                  })
                }
              }}
              className="flex items-center space-x-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-xs font-medium">Share</span>
            </button>
          </div>

          {/* Comments Section */}
          {comments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-2">
                    <div className="w-6 h-6 bg-[#0a66c2] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">
                        {comment.author.fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {comment.author.fullName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comment Input */}
          {showCommentInput && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#0a66c2] focus:border-[#0a66c2]"
                />
                <button
                  onClick={async () => {
                    if (comment.trim()) {
                      try {
                        setLoading(true)
                        const response = await apiClient.addComment(post.id, comment.trim())
                        if (response.data) {
                          setComments(prev => [...prev, response.data])
                          setComment('')
                          setShowCommentInput(false)
                        }
                      } catch (error) {
                        console.error('Error adding comment:', error)
                      } finally {
                        setLoading(false)
                      }
                    }
                  }}
                  disabled={!comment.trim() || loading}
                  className="px-3 py-2 bg-[#0a66c2] text-white text-sm font-medium rounded-md hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}