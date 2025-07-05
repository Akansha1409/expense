'use client';
import { useState } from 'react';

export default function BudgetForm() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMonth = new Date(`${month}-01`).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });

    const res = await fetch('/api/budgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        amount: Number(amount),
        month: formattedMonth,
      }),
    });

    if (res.ok) {
      setMessage('✅ Budget saved successfully!');
      setCategory('');
      setAmount('');
      setMonth('');
      setTimeout(() => setMessage(''), 3000); // auto-clear after 3 sec
    } else {
      setMessage('❌ Failed to save budget. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Set Monthly Budget</h2>

      {message && (
        <p className="text-sm font-medium text-green-600 bg-green-100 border border-green-300 rounded p-2">
          {message}
        </p>
      )}

      <div>
        <label className="block">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block">Month</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Budget
      </button>
    </form>
  );
}
