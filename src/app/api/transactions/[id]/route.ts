import { connectDB } from '@/lib/db';
import { Transaction } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;
  const data = await req.json();

  const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

