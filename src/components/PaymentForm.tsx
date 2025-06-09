// src/components/PaymentForm.tsx
import React, { useState, useEffect } from 'react'
import api from '../api'
import type { Payment } from '../types'

interface Props {
  initialData: Payment | null
  onSuccess: () => void
  onCancel: () => void
}

const PaymentForm: React.FC<Props> = ({ initialData, onSuccess, onCancel }) => {
  const [playerId, setPlayerId] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const [date, setDate] = useState('')         // YYYY-MM-DD
  const [method, setMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setPlayerId(initialData.player_id)
      setAmount(initialData.amount)
      setDate(initialData.payment_date)
      setMethod(initialData.method || '')
    } else {
      setPlayerId(0); setAmount(0); setDate(''); setMethod('')
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const payload = { player_id: playerId, amount, payment_date: date, method }
      if (initialData) {
        await api.put(`/payments/${initialData.id}`, payload)
      } else {
        await api.post('/payments', payload)
      }
      onSuccess()
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Error guardando pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 mb-4 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Player ID */}
        <div>
          <label className="block text-sm">Jugador ID</label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded"
            value={playerId}
            onChange={e => setPlayerId(Number(e.target.value))}
            required
          />
        </div>
        {/* Amount */}
        <div>
          <label className="block text-sm">Monto</label>
          <input
            type="number"
            className="mt-1 w-full p-2 border rounded"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        {/* Date */}
        <div>
          <label className="block text-sm">Fecha</label>
          <input
            type="date"
            className="mt-1 w-full p-2 border rounded"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        {/* Method */}
        <div>
          <label className="block text-sm">Método</label>
          <input
            className="mt-1 w-full p-2 border rounded"
            value={method}
            onChange={e => setMethod(e.target.value)}
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

export default PaymentForm
