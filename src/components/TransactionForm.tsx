'use client';
import { useState } from 'react';

export default function TransactionForm() {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: '',
    category: 'Other',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.amount || !form.description || !form.date) return;

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, amount: Number(form.amount) }),
    });

    setMessage('✅ Transaction added!');
    setForm({ description: '', amount: '', date: '', category: 'Other' });

    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="amount"
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option>Food</option>
        <option>Rent</option>
        <option>Shopping</option>
        <option>Utilities</option>
        <option>Other</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Transaction</button>
      {message && <p className="text-green-600">{message}</p>}
    </form>
  );
}

