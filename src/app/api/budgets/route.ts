import { connectDB } from '@/lib/db';
import { Budget } from '@/lib/models';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  await connectDB();
  const data = await Budget.find({});
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const newBudget = await Budget.create(body);
  return NextResponse.json(newBudget);
}
