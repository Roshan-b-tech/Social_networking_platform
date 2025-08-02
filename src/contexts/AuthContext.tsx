import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from '../lib/api'

interface User {
  id: string
  email: string
  fullName: string
  bio: string
  avatarUrl?: string
  profileImage?: string
  bannerImage?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      apiClient.setToken(token)
      getCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const getCurrentUser = async () => {
    try {
      const response = await apiClient.getCurrentUser()
      if (response.data) {
        setUser(response.data)
      } else {
        // Invalid token, clear it
        localStorage.removeItem('token')
        apiClient.setToken(null)
      }
    } catch (error) {
      console.error('Error getting current user:', error)
      localStorage.removeItem('token')
      apiClient.setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const response = await apiClient.register(email, password, fullName)

      if (response.error) {
        return { error: response.error }
      }

      if (response.data) {
        apiClient.setToken(response.data.token)
        setUser(response.data.user)
      }

      return {}
    } catch (error) {
      return { error: 'Registration failed. Please try again.' }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password)

      if (response.error) {
        return { error: response.error }
      }

      if (response.data) {
        apiClient.setToken(response.data.token)
        setUser(response.data.user)
      }

      return {}
    } catch (error) {
      return { error: 'Login failed. Please try again.' }
    }
  }

  const signOut = async () => {
    localStorage.removeItem('token')
    apiClient.setToken(null)
    setUser(null)
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}