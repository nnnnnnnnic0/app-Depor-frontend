// src/components/LeagueForm.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { League } from '../types'

interface Props {
  initialData: League | null
  onSuccess: () => void
  onCancel: () => void
}

const LeagueForm: React.FC<Props> = ({ initialData, onSuccess, onCancel }) => {
  const [name, setName] = useState('')
  const [seasonStart, setSeasonStart] = useState('')
  const [seasonEnd, setSeasonEnd] = useState('')
  const [budget, setBudget] = useState<number>(0)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setSeasonStart(initialData.season_start)
      setSeasonEnd(initialData.season_end)
      setBudget(initialData.budget)
      setDescription(initialData.description || '')
    } else {
      setName(''); setSeasonStart(''); setSeasonEnd(''); setBudget(0); setDescription('')
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = { name, season_start: seasonStart, season_end: seasonEnd, budget, description }
      if (initialData) {
        await api.put(`/leagues/${initialData.id}`, payload)
      } else {
        await api.post('/leagues', payload)
      }
      onSuccess()
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error guardando liga')
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
        {/* Season Start */}
        <div>
          <label className="block text-sm">Inicio temporada</label>
          <input
            type="date"
            className="mt-1 w-full p-2 border rounded"
            value={seasonStart}
            onChange={e => setSeasonStart(e.target.value)}
            required
          />
        </div>
        {/* Season End */}
        <div>
          <label className="block text-sm">Fin temporada</label>
          <input
            type="date"
            className="mt-1 w-full p-2 border rounded"
            value={seasonEnd}
            onChange={e => setSeasonEnd(e.target.value)}
            required
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
            required
          />
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm">Descripción</label>
          <textarea
            className="mt-1 w-full p-2 border rounded"
            value={description}
            onChange={e => setDescription(e.target.value)}
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

export default LeagueForm
