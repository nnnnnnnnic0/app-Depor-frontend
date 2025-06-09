// src/pages/TeamsPage.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Team } from '../types'
import TeamList from '../components/TeamList'
import TeamForm from '../components/TeamForm'

const TeamsPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Team | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchTeams = async () => {
    setLoading(true)
    try {
      const res = await api.get<Team[]>('/teams')
      setTeams(res.data)
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error cargando equipos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const handleEdit = (team: Team) => {
    setEditing(team)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este equipo?')) return
    try {
      await api.delete(`/teams/${id}`)
      fetchTeams()
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error al eliminar')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditing(null)
    fetchTeams()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Equipos</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nuevo Equipo
        </button>
      </div>

      {showForm && (
        <TeamForm
          initialData={editing}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading
        ? <p>Cargando...</p>
        : error
          ? <p className="text-red-500">{error}</p>
          : <TeamList
              teams={teams}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
      }
    </div>
  )
}

export default TeamsPage
