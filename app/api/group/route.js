import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import Group from '@/models/group';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    await dbConnect();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const groupName = searchParams.get('groupName'); 

    const group = await Group.findOne({ name: groupName });
    if (!group) {
      return NextResponse.json({ success: false, message: 'Group not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, group });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server issue' }, { status: 500 });
  }
}
