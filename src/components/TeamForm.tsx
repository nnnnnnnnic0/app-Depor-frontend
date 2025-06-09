// src/components/TeamForm.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Team } from '../types'

interface Props {
  initialData: Team | null
  onSuccess: () => void
  onCancel: () => void
}

const TeamForm: React.FC<Props> = ({ initialData, onSuccess, onCancel }) => {
  const [name, setName] = useState('')
  const [leagueId, setLeagueId] = useState<number>(0)
  const [founded, setFounded] = useState('')
  const [budget, setBudget] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setLeagueId(initialData.league_id)
      setFounded(initialData.founded || '')
      setBudget(initialData.budget || 0)
    } else {
      setName(''); setLeagueId(0); setFounded(''); setBudget(0)
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = { name, league_id: leagueId, founded, budget }
      if (initialData) {
        await api.put(`/teams/${initialData.id}`, payload)
      } else {
        await api.post('/teams', payload)
      }
      onSuccess()
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error guardando equipo')
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
        {/* League ID */}
        <div>
          <label className="block text-sm">Liga ID</label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded"
            value={leagueId}
            onChange={e => setLeagueId(Number(e.target.value))}
            required
          />
        </div>
        {/* Founded */}
        <div>
          <label className="block text-sm">Fundado</label>
          <input
            type="date"
            className="mt-1 w-full p-2 border rounded"
            value={founded}
            onChange={e => setFounded(e.target.value)}
          />
        </div>
        {/* Budget */}
        <div>
          <label className="block text-sm">Presupuesto</label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded"
            value={budget}
            onChange={e => setBudget(parseFloat(e.target.value))}
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

export default TeamForm
