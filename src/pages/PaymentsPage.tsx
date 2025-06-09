// src/pages/PaymentsPage.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Payment } from '../types'
import PaymentList from '../components/PaymentList'
import PaymentForm from '../components/PaymentForm'

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Payment | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const res = await api.get<Payment[]>('/payments')
      setPayments(res.data)
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error cargando pagos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const handleEdit = (p: Payment) => {
    setEditing(p)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este pago?')) return
    try {
      await api.delete(`/payments/${id}`)
      fetchPayments()
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Error al eliminar')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditing(null)
    fetchPayments()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pagos</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true) }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nuevo Pago
        </button>
      </div>

      {showForm && (
        <PaymentForm
          initialData={editing}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading
        ? <p>Cargando...</p>
        : error
          ? <p className="text-red-500">{error}</p>
          : <PaymentList
              payments={payments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
      }
    </div>
  )
}

export default PaymentsPage
