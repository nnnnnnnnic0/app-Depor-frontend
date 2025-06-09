// src/components/ProtectedRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth()
  if (!token) {
    // Si no hay token, redirige a login
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default ProtectedRoute