

'use client';
import useSWR from 'swr';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Helper to format date as "YYYY-M"
const getMonthKey = (date: string | Date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`; // Month is 0-indexed
};

export default function BudgetComparisonChart() {
  const { data: transactions } = useSWR('/api/transactions', fetcher);
  const { data: budgets } = useSWR('/api/budgets', fetcher);

  if (!transactions || !budgets) return null;

  const currentMonthKey = getMonthKey(new Date());

  // Filter transactions for current month
  const filteredTxns = transactions.filter(
    (t: any) => getMonthKey(t.date) === currentMonthKey
  );

  const spentByCategory: Record<string, number> = {};
  filteredTxns.forEach((txn: any) => {
    spentByCategory[txn.category] =
      (spentByCategory[txn.category] || 0) + txn.amount;
  });

  // Get formatted string version for budget matching
  const formattedMonth = new Date().toLocaleString('default', {
    month: 'short',
    year: 'numeric',
  });

  const chartData = budgets
    .filter((b: any) => b.month === formattedMonth)
    .map((b: any) => ({
      category: b.category,
      Budget: b.amount,
      Spent: spentByCategory[b.category] || 0,
    }));

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#82ca9d" />
          <Bar dataKey="Spent" fill="#ff7f50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
