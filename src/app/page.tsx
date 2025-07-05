import SpendingInsight from '@/components/SpendingInsight';
import SummaryCards from '@/components/SummaryCards';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpenseBarChart from '@/components/ExpenseBarChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import BudgetForm from '@/components/BudgetForm';
import BudgetComparisonChart from '@/components/BudgetComparisonChart';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">💸 Personal Finance Visualizer</h1>
<SpendingInsight />
<SummaryCards />
<TransactionForm />
<BudgetForm /> {/* Move up to be near TransactionForm */}
<TransactionList />
<ExpenseBarChart />
<CategoryPieChart />
<BudgetComparisonChart />
    </div>
  );
}