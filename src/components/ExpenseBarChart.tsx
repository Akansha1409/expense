'use client';
import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ExpenseBarChart() {
  const { data } = useSWR('/api/transactions', fetcher);
  if (!data) return null;

  const monthly: Record<string, number> = {};
  data.forEach((txn: any) => {
    const date = new Date(txn.date);
    const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    monthly[key] = (monthly[key] || 0) + txn.amount;
  });

  const chartData = Object.entries(monthly).map(([month, value]) => ({ month, value }));

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
