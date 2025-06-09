// src/pages/LeaguesPage.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { League } from '../types'
import LeagueList from '../components/LeagueList'
import LeagueForm from '../components/LeagueForm'

const LeaguesPage: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<League | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchLeagues = async () => {
    setLoading(true)
    try {
      const res = await api.get<League[]>('/leagues')
      setLeagues(res.data)
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error cargando ligas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeagues()
  }, [])

  const handleEdit = (league: League) => {
    setEditing(league)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta liga?')) return
    try {
      await api.delete(`/leagues/${id}`)
      fetchLeagues()
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error al eliminar')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditing(null)
    fetchLeagues()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ligas</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nueva Liga
        </button>
      </div>

      {showForm && (
        <LeagueForm
          initialData={editing}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <LeagueList
          leagues={leagues}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default LeaguesPage
