import User from "@/models/user";
import { dbConnect } from "@/lib/mongoose";
import bcrypt from 'bcrypt';

export async function POST(request) {
  const body = await request.json();
  await dbConnect();

  const existingUser = await User.findOne({ username: body.username });
  const existingEmail = await User.findOne({ email: body.email });

  if (existingUser) {
    return Response.json({ success: false, message: 'Username already exists!' });
  }
  if (existingEmail) {
    return Response.json({ success: false, message: 'Email already exists!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new User({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      name: body.username,
    });

    await newUser.save();

    return new Response(JSON.stringify({ success: true, message: "Sign-up successful" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Signup error:", err);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
