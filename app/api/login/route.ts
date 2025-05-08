import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  await dbConnect()
  const { email, password } = await req.json()
  const user = await User.findOne({ email })
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }
  // Set a secure cookie with user info (no password)
  const response = NextResponse.json({ success: true })
  response.cookies.set("user", JSON.stringify({
    name: user.name,
    email: user.email,
    profileImage: user.profileImage || ""
  }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
  return response
}