import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Notification {
    id: string
    type: 'info' | 'success' | 'warning' | 'error'
    title: string
    message: string
    action?: {
        label: string
        onClick: () => void
    }
    autoClose?: boolean
    duration?: number
}

interface NotificationContextType {
    notifications: Notification[]
    addNotification: (notification: Omit<Notification, 'id'>) => void
    removeNotification: (id: string) => void
    clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }
    return context
}

interface NotificationProviderProps {
    children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const addNotification = (notification: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newNotification = { ...notification, id }

        setNotifications(prev => [...prev, newNotification])

        // Auto-close if enabled
        if (notification.autoClose !== false) {
            setTimeout(() => {
                removeNotification(id)
            }, notification.duration || 5000)
        }
    }

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id))
    }

    const clearNotifications = () => {
        setNotifications([])
    }

    return (
        <NotificationContext.Provider value={{
            notifications,
            addNotification,
            removeNotification,
            clearNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    )
} 