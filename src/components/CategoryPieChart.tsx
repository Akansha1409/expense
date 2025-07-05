'use client';
import useSWR from 'swr';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D84DFF'];
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoryPieChart() {
  const { data } = useSWR('/api/transactions', fetcher);
  if (!data) return null;

  const categoryData: Record<string, number> = {};
  data.forEach((txn: any) => {
    categoryData[txn.category] = (categoryData[txn.category] || 0) + txn.amount;
  });

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({ name: category, value: amount }));

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
