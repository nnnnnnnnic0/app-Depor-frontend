// src/pages/FixturesPage.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Fixture } from '../types'
import FixtureList from '../components/FixtureList'
import FixtureForm from '../components/FixtureForm'

const FixturesPage: React.FC = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Fixture | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchFixtures = async () => {
    setLoading(true)
    try {
      const res = await api.get<Fixture[]>('/fixtures')
      setFixtures(res.data)
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error cargando fixtures')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFixtures()
  }, [])

  const handleEdit = (fx: Fixture) => {
    setEditing(fx)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este fixture?')) return
    try {
      await api.delete(`/fixtures/${id}`)
      fetchFixtures()
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error al eliminar')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditing(null)
    fetchFixtures()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Fixtures</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nuevo Fixture
        </button>
      </div>

      {showForm && (
        <FixtureForm
          initialData={editing}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading
        ? <p>Cargando...</p>
        : error
          ? <p className="text-red-500">{error}</p>
          : <FixtureList
              fixtures={fixtures}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
      }
    </div>
  )
}

export default FixturesPage
