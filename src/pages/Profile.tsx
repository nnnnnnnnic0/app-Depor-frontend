// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Profile } from '../types'

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    setLoading(true)
    try {
      // Ajuste: endpoint correcto para obtener el perfil
      const res = await api.get<Profile>('/users/me/')
      console.log('Perfil recibido:', res.data)
      setProfile(res.data)
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error cargando perfil')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      {loading && <p>Cargando perfil...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {profile && (
        <div className="bg-white shadow rounded p-4">
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Username:</strong> {profile.username || profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {/* Ajusta los campos según tu esquema real */}
        </div>
      )}
    </div>
  )
}

export default ProfilePage
