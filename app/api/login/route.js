import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import User from "@/models/user";
import { dbConnect } from "@/lib/mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "SuperSecret";

export async function POST(request) {
    const body = await request.json();
    await dbConnect();

    const doc = await User.findOne({ username: body.username });
    if (!doc) return NextResponse.json({ success: false, message: 'Login unsuccessful' });

    const passwordMatch = await bcrypt.compare(body.password, doc.password);
    if (!passwordMatch) return NextResponse.json({ success: false, message: 'Login unsuccessful' });

    const token = jwt.sign({ username: body.username }, JWT_SECRET, { expiresIn: "1h" });

    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 3600,
        path: "/"
    });
   
    return response;
}
