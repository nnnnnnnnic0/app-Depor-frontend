// src/pages/PlayersPage.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Player } from '../types'
import PlayerList from '../components/PlayerList'
import PlayerForm from '../components/PlayerForm'

const PlayersPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Player | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchPlayers = async () => {
    setLoading(true)
    try {
      const res = await api.get<Player[]>('/players')
      setPlayers(res.data)
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error cargando jugadores')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  const handleEdit = (player: Player) => {
    setEditing(player)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este jugador?')) return
    try {
      await api.delete(`/players/${id}`)
      fetchPlayers()
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error al eliminar')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditing(null)
    fetchPlayers()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Jugadores</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nuevo Jugador
        </button>
      </div>

      {showForm && (
        <PlayerForm
          initialData={editing}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading
        ? <p>Cargando...</p>
        : error
          ? <p className="text-red-500">{error}</p>
          : <PlayerList
              players={players}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
      }
    </div>
  )
}

export default PlayersPage
