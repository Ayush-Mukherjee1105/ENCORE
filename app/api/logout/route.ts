import { NextRequest, NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set("user", "", { path: "/", maxAge: 0 })
  return response
}