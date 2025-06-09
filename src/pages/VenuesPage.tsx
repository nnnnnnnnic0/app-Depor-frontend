// src/pages/VenuesPage.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Venue } from '../types'
import VenueList from '../components/VenueList'
import VenueForm from '../components/VenueForm'

const VenuesPage: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Venue | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchVenues = async () => {
    setLoading(true)
    try {
      const res = await api.get<Venue[]>('/venues')
      setVenues(res.data)
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error cargando canchas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVenues()
  }, [])

  const handleEdit = (venue: Venue) => {
    setEditing(venue)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta cancha?')) return
    try {
      await api.delete(`/venues/${id}`)
      fetchVenues()
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error al eliminar')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditing(null)
    fetchVenues()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Canchas</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nueva Cancha
        </button>
      </div>

      {showForm && (
        <VenueForm
          initialData={editing}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading
        ? <p>Cargando...</p>
        : error
          ? <p className="text-red-500">{error}</p>
          : <VenueList
              venues={venues}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
      }
    </div>
  )
}

export default VenuesPage
