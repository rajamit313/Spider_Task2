import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import User from '@/models/user';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'SuperSecret';

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
        let friendData = [];
        for(let i of user.friends){
            let userNew = await User.findOne({ username: i});
            friendData.push({username: userNew.username, name: userNew.name, profilepic: userNew.profilepic});
        }
        let friendRequestData = [];
        for(let i of user.friendRequest){
            let userRequest = await User.findOne({username: i});
            friendRequestData.push({username: userRequest.username, name: userRequest.name, profilepic: userRequest.profilepic})
        }
        
        return NextResponse.json({ success: true, friendData: friendData, friendRequestData: friendRequestData });

    } catch {
        return NextResponse.json({ success: false, message: 'Server issue' });
    }
}

export async function PUT(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const currentuser = await User.findOne({ username: decoded.username });

        if (!currentuser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const friend = await User.findOne({ username: body.friendUsername });
        if (!friend) {
            return NextResponse.json({ success: false, message: "Friend doesn't exist" });
        }
        if (friend === currentuser) {
            return NextResponse.json({ success: false, message: "You thought it would be possible?" });
        }
        if(currentuser.friends.includes(body.friendUsername)){
            return NextResponse.json({ success: false, message: "Already added" });
        }
       const id= friend._id;
       const updatedUser=await User.findByIdAndUpdate(id,{
        friendRequest:currentuser.username,
       });
       
        await currentuser.save();
        return NextResponse.json({ success: true, message: 'Request sent' });

    } catch(error) {
        console.log(error)
        return NextResponse.json({ success: false, message: 'Server issue' });
    }
}

export async function DELETE(request) {
    
    const username = searchParams.get('friendUsername');
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });

    if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    
    user.friends = user.friends.filter(friend => friend !== username);
    await user.save();
    
}

