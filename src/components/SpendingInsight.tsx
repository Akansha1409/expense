'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SpendingInsight() {
  const { data: transactions } = useSWR('/api/transactions', fetcher);
  const { data: budgets } = useSWR('/api/budgets', fetcher);

  if (!transactions || !budgets) return null;

  const getFormattedMonth = (date: string | Date) =>
    new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });

  const currentMonth = getFormattedMonth(new Date());

  const filtered = transactions.filter((t: any) =>
    getFormattedMonth(t.date) === currentMonth
  );

  const spentByCategory: Record<string, number> = {};
  filtered.forEach((txn: any) => {
    spentByCategory[txn.category] = (spentByCategory[txn.category] || 0) + txn.amount;
  });

  const overspent = budgets.filter(
    (b: any) => b.month === currentMonth && spentByCategory[b.category] > b.amount
  );

  if (overspent.length === 0) {
    return <p className="text-green-600">🎉 All expenses are within budget this month!</p>;
  }

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
      <p className="font-semibold mb-2">⚠️ Overspending Alert:</p>
      <ul className="list-disc list-inside">
        {overspent.map((b: any) => (
          <li key={b._id}>
            {b.category}: Over by ₹{spentByCategory[b.category] - b.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
