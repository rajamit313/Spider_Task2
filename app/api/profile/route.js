import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'SuperSecret';

//GET request
export async function GET(request) {
  await dbConnect();
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      profilepic: user.profilepic,
      name: user.name
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
  }
}

//PUT request
export async function PUT(request) {
  const body = await request.json();
  await dbConnect();

  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  let decode;
  try {
    decode = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ success: false, message: "Invalid or token expired" }, { status: 401 });
  }

  const updatedUser = await User.findOneAndUpdate(
    { username: decode.username },
    { email: body.email, mobile: body.mobile, profilepic: body.profilepic, name: body.name },
    { new: true }
  );

  return NextResponse.json({ success: true, message: 'Update successful' });
}


