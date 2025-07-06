import { NextResponse } from "next/server"

export async function POST(request) {

    const response = NextResponse.json({ success: true, message: 'Logout successful' });
    response.cookies.set("token", '', {
        httpOnly: true,
        maxAge: 0,
        path: "/"
    });

    return response;
}
