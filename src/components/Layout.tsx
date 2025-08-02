import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'
import { ProfileImage } from './ProfileImage'
import {
  LogOut,
  User,
  Home,
  Building2,
  Bell,
  MessageSquare,
  Search,
  Briefcase,
  Globe,
  Settings,
  HelpCircle,
  Users,
  Menu
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const location = useLocation()
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showMobileMenu && !target.closest('.mobile-menu-container')) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showMobileMenu])

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth')
  }

  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#f3f2ef]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Left Section - Logo and Search */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/" className="flex items-center">
                <img
                  src="/social networking.png"
                  alt="Social Networking"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                />
              </Link>

              {/* Search Bar */}
              <div className="hidden md:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const searchTerm = (e.target as HTMLInputElement).value
                      if (searchTerm.trim()) {
                        addNotification({
                          type: 'info',
                          title: '🔍 Search Results',
                          message: `Searching for: "${searchTerm}"\n\nThis would search:\n• People\n• Posts\n• Companies\n• Jobs\n• Groups`
                        })
                      }
                    }
                  }}
                  className="pl-10 pr-4 py-1.5 w-32 sm:w-48 md:w-64 lg:w-80 bg-[#f3f2ef] border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-gray-300 text-sm"
                />
              </div>
            </div>

            {/* Center Section - Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              <Link
                to="/"
                className={`flex flex-col items-center px-3 py-1 rounded-md transition-colors duration-200 ${location.pathname === '/'
                  ? 'text-[#0a66c2]'
                  : 'text-gray-600 hover:text-[#0a66c2]'
                  }`}
              >
                <Home className="h-5 w-5 mb-1" />
                <span className="text-xs">Home</span>
              </Link>

              <button
                onClick={() => {
                  const connections = [
                    'John Doe - Senior Developer at Google',
                    'Sarah Smith - Product Manager at Microsoft',
                    'Mike Johnson - UX Designer at Apple',
                    'Lisa Chen - Data Scientist at Amazon',
                    'Alex Brown - DevOps Engineer at Netflix'
                  ]
                  addNotification({
                    type: 'info',
                    title: '🤝 Network Suggestions',
                    message: `People you may know:\n\n${connections.join('\n')}\n\n• 500+ connections in your network\n• 50+ pending invitations\n• 25+ new suggestions this week`
                  })
                }}
                className="flex flex-col items-center px-3 py-1 rounded-md text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
              >
                <Users className="h-5 w-5 mb-1" />
                <span className="text-xs">My Network</span>
              </button>

              <button
                onClick={() => {
                  const jobs = [
                    'Senior React Developer - $120k/year',
                    'Full Stack Engineer - $110k/year',
                    'Product Manager - $130k/year',
                    'UX Designer - $95k/year',
                    'DevOps Engineer - $125k/year'
                  ]
                  addNotification({
                    type: 'info',
                    title: '💼 Job Recommendations',
                    message: `Jobs you might be interested in:\n\n${jobs.join('\n')}\n\n• 15 new jobs matching your profile\n• 5 applications in progress\n• 3 interviews scheduled`
                  })
                }}
                className="flex flex-col items-center px-3 py-1 rounded-md text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
              >
                <Briefcase className="h-5 w-5 mb-1" />
                <span className="text-xs">Jobs</span>
              </button>

              <button
                onClick={() => {
                  const senders = ['Sarah Smith', 'Mike Johnson', 'Lisa Chen', 'Alex Brown', 'John Doe']
                  const messages = [
                    'Thanks for the connection!',
                    'Great to meet you at the conference',
                    'Would you be interested in a project?',
                    'Let\'s catch up soon!',
                    'Check out this article I shared'
                  ]
                  const sender = senders[Math.floor(Math.random() * senders.length)]
                  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
                  addNotification({
                    type: 'info',
                    title: `💬 New Message from ${sender}`,
                    message: `"${randomMessage}"`,
                    action: {
                      label: 'Reply',
                      onClick: () => {
                        addNotification({
                          type: 'success',
                          title: '✅ Message Sent',
                          message: `Reply sent to ${sender}`
                        })
                      }
                    }
                  })
                }}
                className="flex flex-col items-center px-3 py-1 rounded-md text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
              >
                <MessageSquare className="h-5 w-5 mb-1" />
                <span className="text-xs">Messaging</span>
              </button>

              <button
                onClick={() => {
                  const notifications = [
                    'John Doe liked your post',
                    'Sarah Smith commented on your post',
                    'New job opportunities matching your profile',
                    'You have 3 new connection requests',
                    'Your post reached 50+ people'
                  ]
                  const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
                  addNotification({
                    type: 'info',
                    title: '🔔 Notification',
                    message: randomNotification
                  })
                }}
                className="flex flex-col items-center px-3 py-1 rounded-md text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
              >
                <Bell className="h-5 w-5 mb-1" />
                <span className="text-xs">Notifications</span>
              </button>
            </nav>

            {/* Right Section - User Menu & Mobile Menu */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Link
                to="/profile"
                className="flex flex-col items-center px-2 sm:px-3 md:px-4 py-1 rounded-md text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
              >
                <div className="mb-1">
                  <ProfileImage
                    profileImage={user.profileImage}
                    fullName={user.fullName}
                    size="sm"
                  />
                </div>
                <span className="text-xs hidden md:block">Me</span>
              </Link>

              {/* Mobile Menu Button */}
              <div className="lg:hidden relative mobile-menu-container">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#0a66c2] hover:bg-gray-100 transition-colors duration-200"
                >
                  <Menu className="h-5 w-5" />
                </button>

                {/* Mobile Menu Dropdown */}
                {showMobileMenu && (
                  <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-900">Navigation</span>
                    </div>

                    <Link
                      to="/"
                      onClick={() => setShowMobileMenu(false)}
                      className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${location.pathname === '/'
                        ? 'text-[#0a66c2] bg-blue-50'
                        : 'text-gray-700 hover:text-[#0a66c2] hover:bg-gray-50'
                        }`}
                    >
                      <Home className="h-4 w-4 mr-3" />
                      Home
                    </Link>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false)
                        const connections = [
                          'John Doe - Senior Developer at Google',
                          'Sarah Smith - Product Manager at Microsoft',
                          'Mike Johnson - UX Designer at Apple',
                          'Lisa Chen - Data Scientist at Amazon',
                          'Alex Brown - DevOps Engineer at Netflix'
                        ]
                        addNotification({
                          type: 'info',
                          title: '🤝 Network Suggestions',
                          message: `People you may know:\n\n${connections.join('\n')}\n\n• 500+ connections in your network\n• 50+ pending invitations\n• 25+ new suggestions this week`
                        })
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#0a66c2] hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                    >
                      <Users className="h-4 w-4 mr-3" />
                      My Network
                    </button>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false)
                        const jobs = [
                          'Senior React Developer - $120k/year',
                          'Full Stack Engineer - $110k/year',
                          'Product Manager - $130k/year',
                          'UX Designer - $95k/year',
                          'DevOps Engineer - $125k/year'
                        ]
                        addNotification({
                          type: 'info',
                          title: '💼 Job Recommendations',
                          message: `Jobs you might be interested in:\n\n${jobs.join('\n')}\n\n• 15 new jobs matching your profile\n• 5 applications in progress\n• 3 interviews scheduled`
                        })
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#0a66c2] hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                    >
                      <Briefcase className="h-4 w-4 mr-3" />
                      Jobs
                    </button>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false)
                        const messages = [
                          'Sarah Smith: "Thanks for the connection!"',
                          'Mike Johnson: "Great to meet you at the conference"',
                          'Lisa Chen: "Would you be interested in a project?"',
                          'Alex Brown: "Let\'s catch up soon!"',
                          'John Doe: "Check out this article I shared"'
                        ]
                        addNotification({
                          type: 'info',
                          title: '💬 Messaging',
                          message: `Recent messages:\n\n${messages.join('\n')}\n\n• 12 unread messages\n• 5 new connections\n• 3 group conversations`
                        })
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#0a66c2] hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                    >
                      <MessageSquare className="h-4 w-4 mr-3" />
                      Messaging
                    </button>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false)
                        const notifications = [
                          'Sarah Smith commented on your post',
                          'Mike Johnson liked your article',
                          'New job alert: Senior Developer at Google',
                          'Lisa Chen sent you a connection request',
                          'Your post reached 100+ views'
                        ]
                        addNotification({
                          type: 'info',
                          title: '🔔 Notifications',
                          message: `Recent notifications:\n\n${notifications.join('\n')}\n\n• 8 new notifications\n• 3 connection requests\n• 2 job alerts`
                        })
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#0a66c2] hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                    >
                      <Bell className="h-4 w-4 mr-3" />
                      Notifications
                    </button>

                    <div className="px-4 py-2 border-t border-gray-100 mt-2">
                      <span className="text-sm font-medium text-gray-900">Settings</span>
                    </div>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false)
                        addNotification({
                          type: 'info',
                          title: '⚙️ Settings',
                          message: 'Account settings opened:\n\n• Privacy & Security\n• Communication preferences\n• Profile visibility\n• Notification settings\n• Account management'
                        })
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#0a66c2] hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </button>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false)
                        addNotification({
                          type: 'info',
                          title: '❓ Help Center',
                          message: 'Help & Support:\n\n• Getting Started Guide\n• Privacy Policy\n• Terms of Service\n• Contact Support\n• FAQ & Troubleshooting'
                        })
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#0a66c2] hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                    >
                      <HelpCircle className="h-4 w-4 mr-3" />
                      Help Center
                    </button>

                    <div className="px-4 py-2 border-t border-gray-100 mt-2">
                      <button
                        onClick={() => {
                          setShowMobileMenu(false)
                          handleSignOut()
                        }}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:flex items-center space-x-1 border-l border-gray-300 pl-2 ml-2">
                <button
                  onClick={() => addNotification({
                    type: 'warning',
                    title: '🌐 Language Settings',
                    message: 'Language settings coming soon!'
                  })}
                  className="p-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
                  title="Language"
                >
                  <Globe className="h-5 w-5" />
                </button>
                <button
                  onClick={() => addNotification({
                    type: 'warning',
                    title: '⚙️ Settings',
                    message: 'Settings coming soon!'
                  })}
                  className="p-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
                  title="Settings"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <button
                  onClick={() => addNotification({
                    type: 'warning',
                    title: '❓ Help Center',
                    message: 'Help center coming soon!'
                  })}
                  className="p-1 text-gray-600 hover:text-[#0a66c2] transition-colors duration-200"
                  title="Help"
                >
                  <HelpCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-1 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {children}
      </main>
    </div>
  )
}