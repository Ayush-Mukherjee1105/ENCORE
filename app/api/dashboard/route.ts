import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import DashboardData from "@/models/DashboardData"

export async function GET(req: NextRequest) {
  await dbConnect()
  const email = req.nextUrl.searchParams.get("email")
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })
  const data = await DashboardData.findOne({ email })
  if (!data) {
    return NextResponse.json({
      email,
      weight: 0,
      waterIntake: 0,
      caloriesBurned: 0,
      workoutMinutes: 0,
      bmi: 0,
      bmiCategory: "",
      streak: 0,
      nutrition: { calories: 2200, protein: 120, carbs: 250, fat: 70 },
      sleep: { totalSleep: "7.25", deepSleep: "1.75", lightSleep: "4.5", remSleep: "1" },
      weightHistory: [],
      healthIssues: [],
    })
  }
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  await dbConnect()
  const { email, ...rest } = await req.json()
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })
  const data = await DashboardData.findOneAndUpdate(
    { email },
    { $set: rest },
    { upsert: true, new: true }
  )
  return NextResponse.json(data)
}