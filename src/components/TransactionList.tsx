'use client';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TransactionList() {
  const { data, mutate } = useSWR('/api/transactions', fetcher);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ description: '', amount: '', category: '' });

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    mutate();
  };

  const handleEditClick = (txn: any) => {
    setEditId(txn._id);
    setEditData({
      description: txn.description,
      amount: txn.amount.toString(),
      category: txn.category,
    });
  };

  const handleEditSubmit = async (id: string) => {
    await fetch(`/api/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editData, amount: Number(editData.amount) }),
    });
    setEditId(null);
    mutate();
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul className="space-y-2">
        {data.map((txn: any) => (
          <li key={txn._id} className="border p-2 rounded flex justify-between items-center">
            {editId === txn._id ? (
              <div className="w-full space-y-1">
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                />
                <input
                  type="text"
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                />
                <button
                  onClick={() => handleEditSubmit(txn._id)}
                  className="bg-blue-600 text-white text-xs px-2 py-1 rounded mt-1"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-semibold">{txn.description}</p>
                  <p className="text-sm text-gray-600">{new Date(txn.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Category: {txn.category}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold">₹{txn.amount}</p>
                  <button onClick={() => handleEditClick(txn)} className="text-blue-600 text-xs">Edit</button>
                  <button onClick={() => handleDelete(txn._id)} className="text-red-500 text-xs ml-2">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
