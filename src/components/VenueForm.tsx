// src/components/VenueForm.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Venue } from '../types'

interface Props {
  initialData: Venue | null
  onSuccess: () => void
  onCancel: () => void
}

const VenueForm: React.FC<Props> = ({ initialData, onSuccess, onCancel }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [capacity, setCapacity] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setAddress(initialData.address || '')
      setCapacity(initialData.capacity || 0)
    } else {
      setName(''); setAddress(''); setCapacity(0)
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = { name, address, capacity }
      if (initialData) {
        await api.put(`/venues/${initialData.id}`, payload)
      } else {
        await api.post('/venues', payload)
      }
      onSuccess()
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error guardando cancha')
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
        {/* Address */}
        <div>
          <label className="block text-sm">Dirección</label>
          <input
            className="mt-1 w-full p-2 border rounded"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        {/* Capacity */}
        <div>
          <label className="block text-sm">Capacidad</label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded"
            value={capacity}
            onChange={e => setCapacity(parseInt(e.target.value, 10))}
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

export default VenueForm
