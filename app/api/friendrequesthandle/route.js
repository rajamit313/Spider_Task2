import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'SuperSecret';

export async function DELETE(request) {
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
        const { searchParams } = new URL(request.url);
        user.friendRequest = user.friendRequest.filter(e => e !== searchParams);
        await user.save();
        return Response.json({ success: true, message: `Rejected` });

    }catch(error){
        console.log(error);
        return NextResponse.json({succes: false, message: "Server issue"});
    }
}