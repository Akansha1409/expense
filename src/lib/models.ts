import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  category: String,
});

const BudgetSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  month: String,
});

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
export const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
