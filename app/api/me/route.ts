import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("user")
  if (!cookie) return NextResponse.json({}, { status: 401 })
  try {
    const user = JSON.parse(cookie.value)
    return NextResponse.json(user)
  } catch {
    return NextResponse.json({}, { status: 401 })
  }
}