'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SummaryCards() {
  const { data: transactions } = useSWR('/api/transactions', fetcher);

  if (!transactions) return null;
  if (transactions.length === 0) return <p>No transactions available.</p>;

  const total = transactions.reduce((sum: number, t: any) => sum + t.amount, 0);

  const recent = [...transactions]
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const breakdown: Record<string, number> = {};
  transactions.forEach((t: any) => {
    breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-600">Total Expenses</h3>
        <p className="text-xl font-semibold text-red-600">₹{total}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-600">Category Breakdown</h3>
        <ul className="text-sm">
          {Object.entries(breakdown).map(([cat, amt]) => (
            <li key={cat}>
              {cat}: ₹{amt}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-600">Recent Transactions</h3>
        <ul className="text-sm">
          {recent.map((txn: any) => (
            <li key={txn._id}>
              {txn.description} - ₹{txn.amount} on {new Date(txn.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

