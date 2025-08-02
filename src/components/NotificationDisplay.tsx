import React from 'react'
import { X, Info, CheckCircle, AlertTriangle, AlertCircle, Users, Briefcase, MessageSquare, Bell } from 'lucide-react'
import { useNotifications, Notification } from '../contexts/NotificationContext'

const getIcon = (type: Notification['type']) => {
    switch (type) {
        case 'success':
            return <CheckCircle className="h-6 w-6 text-green-500" />
        case 'warning':
            return <AlertTriangle className="h-6 w-6 text-yellow-500" />
        case 'error':
            return <AlertCircle className="h-6 w-6 text-red-500" />
        default:
            return <Info className="h-6 w-6 text-blue-500" />
    }
}

const getBorderColor = (type: Notification['type']) => {
    switch (type) {
        case 'success':
            return 'border-l-green-500'
        case 'warning':
            return 'border-l-yellow-500'
        case 'error':
            return 'border-l-red-500'
        default:
            return 'border-l-blue-500'
    }
}

export const NotificationDisplay: React.FC = () => {
    const { notifications, removeNotification } = useNotifications()

    if (notifications.length === 0) return null

    return (
        <div className="fixed top-20 right-6 z-[9999] space-y-3 max-w-md">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-xl border-l-4 ${getBorderColor(notification.type)} p-4 transform transition-all duration-300 ease-in-out hover:shadow-2xl animate-in slide-in-from-right-2`}
                >
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                            {getIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="text-base font-semibold text-gray-900 mb-2">
                                        {notification.title}
                                    </h4>
                                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                        {notification.message}
                                    </p>

                                    {notification.action && (
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                onClick={notification.action.onClick}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0a66c2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a66c2] transition-colors shadow-sm"
                                            >
                                                {notification.action.label}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => removeNotification(notification.id)}
                                    className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
} 