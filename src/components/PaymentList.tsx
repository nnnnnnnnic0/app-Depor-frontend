// src/components/PaymentList.tsx
import React from 'react'
import type { Payment } from '../types'

interface Props {
  payments: Payment[]
  onEdit: (p: Payment) => void
  onDelete: (id: number) => void
}

const PaymentList: React.FC<Props> = ({ payments, onEdit, onDelete }) => (
  <table className="min-w-full bg-white border">
    <thead>
      <tr>
        <th className="px-4 py-2 border">ID</th>
        <th className="px-4 py-2 border">Jugador ID</th>
        <th className="px-4 py-2 border">Monto</th>
        <th className="px-4 py-2 border">Fecha</th>
        <th className="px-4 py-2 border">Método</th>
        <th className="px-4 py-2 border">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {payments.map(p => (
        <tr key={p.id} className={!p.is_active ? 'bg-gray-100' : ''}>
          <td className="px-4 py-2 border">{p.id}</td>
          <td className="px-4 py-2 border">{p.player_id}</td>
          <td className="px-4 py-2 border">{p.amount}</td>
          <td className="px-4 py-2 border">{p.payment_date}</td>
          <td className="px-4 py-2 border">{p.method}</td>
          <td className="px-4 py-2 border space-x-2">
            <button onClick={() => onEdit(p)} className="text-blue-600">Editar</button>
            <button onClick={() => onDelete(p.id)} className="text-red-600">Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default PaymentList
