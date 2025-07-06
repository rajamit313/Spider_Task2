import { NextResponse } from "next/server";
import Group from "@/models/group";
import User from "@/models/user";
import { dbConnect } from "@/lib/mongoose";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "SuperSecret";
export async function POST(request) {
    try {
        dbConnect();
        const body = await request.json();
        const groupName = await Group.findOne({ name: body.name });
        if (groupName) {
            return NextResponse.json({ success: false, message: "Group name already exists" });
        }

        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ username: decoded.username });

        for (let i of body.members) {
            if (user.friends.includes(i)) {
                continue;
            } else {
                return NextResponse.json({ success: false, message: "You can't add a non-friend in a group" });
            }
        }
        const members = [...body.members, user.username];
        const newGroup = new Group({
            name: body.name,
            members: members,
            category: body.category,
            createdBy: user.username,
        });

        await newGroup.save();
        return NextResponse.json({ success: true, message: "New group created" });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Server issue" });
    }
}