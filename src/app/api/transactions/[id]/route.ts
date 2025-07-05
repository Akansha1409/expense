import { connectDB } from '@/lib/db';
import { Transaction } from '@/lib/models';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  await connectDB();
  const data = await Transaction.find({}).sort({ date: -1 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const newTransaction = await Transaction.create(body);
  return NextResponse.json(newTransaction);
}
