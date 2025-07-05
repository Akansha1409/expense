import { connectDB } from '@/lib/db';
import { Transaction } from '@/lib/models';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const deleted = await Transaction.findByIdAndDelete(params.id);
  return NextResponse.json(deleted);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}
