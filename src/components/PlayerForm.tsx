// src/components/PlayerForm.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Player } from '../types'

interface Props {
  initialData: Player | null
  onSuccess: () => void
  onCancel: () => void
}

const PlayerForm: React.FC<Props> = ({ initialData, onSuccess, onCancel }) => {
  const [name, setName] = useState('')
  const [teamId, setTeamId] = useState<number>(0)
  const [position, setPosition] = useState('')
  const [number, setNumber] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setTeamId(initialData.team_id)
      setPosition(initialData.position || '')
      setNumber(initialData.number || 0)
    } else {
      setName(''); setTeamId(0); setPosition(''); setNumber(0)
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = { name, team_id: teamId, position, number }
      if (initialData) {
        await api.put(`/players/${initialData.id}`, payload)
      } else {
        await api.post('/players', payload)
      }
      onSuccess()
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error guardando jugador')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 mb-4 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm">Nombre</label>
          <input
            className="mt-1 w-full p-2 border rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        {/* Team ID */}
        <div>
          <label className="block text-sm">Equipo ID</label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded"
            value={teamId}
            onChange={e => setTeamId(Number(e.target.value))}
            required
          />
        </div>
        {/* Position */}
        <div>
          <label className="block text-sm">Posición</label>
          <input
            className="mt-1 w-full p-2 border rounded"
            value={position}
            onChange={e => setPosition(e.target.value)}
          />
        </div>
        {/* Number */}
        <div>
          <label className="block text-sm">Número</label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded"
            value={number}
            onChange={e => setNumber(parseInt(e.target.value, 10))}
          />
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex justify-end space-x-2 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Guardando...' : (initialData ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  )
}

export default PlayerForm
