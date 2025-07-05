import { connectDB } from '@/lib/db';
import { Transaction } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = params;
  const data = await req.json();

  const updated = await Transaction.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}
