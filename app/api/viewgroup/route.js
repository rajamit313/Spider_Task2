import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import Group from '@/models/group';
import User from '@/models/user';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'SuperSecret';

export async function GET(request) {
  try {
    await dbConnect();
    const token = request.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    const groups = await Group.find({ members: user.username });
    console.log(groups);
    return NextResponse.json({ success: true, groups });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Server issue' }, { status: 500 });
  }
}

