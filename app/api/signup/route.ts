import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(req: NextRequest) {
  await dbConnect()
  const { name, email, password, gender } = await req.json()

  // Check if user already exists
  const existing = await User.findOne({ email })
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 })
  }

  const user = await User.create({ name, email, password, gender })
  const { password: _, ...userData } = user.toObject()
  return NextResponse.json(userData)
}