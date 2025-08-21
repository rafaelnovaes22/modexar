import { NextRequest, NextResponse } from 'next/server';
import { createSupplier, readSuppliers } from '@/lib/suppliers-server';

export async function GET() {
  try {
    const { data, error } = await readSuppliers();
    if (error) {
      return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supplierData = await request.json();
    const { data, error } = await createSupplier(supplierData);
    if (error || !data) {
      return NextResponse.json({ error: 'Failed to create supplier' }, { status: 500 });
    }
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}