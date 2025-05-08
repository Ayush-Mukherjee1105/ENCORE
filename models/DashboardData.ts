import mongoose, { Schema, models, model } from "mongoose"

const DashboardDataSchema = new Schema({
  email: { type: String, required: true, unique: true },
  weight: { type: Number, default: 0 },
  weightHistory: { type: Array, default: [] },
  waterIntake: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  workoutMinutes: { type: Number, default: 0 },
  bmi: { type: Number, default: 0 },
  bmiCategory: { type: String, default: "" },
  streak: { type: Number, default: 0 },
  nutrition: {
    calories: { type: Number, default: 2200 },
    protein: { type: Number, default: 120 },
    carbs: { type: Number, default: 250 },
    fat: { type: Number, default: 70 },
  },
  sleep: {
    totalSleep: { type: String, default: "7.25" },
    deepSleep: { type: String, default: "1.75" },
    lightSleep: { type: String, default: "4.5" },
    remSleep: { type: String, default: "1" },
  },
  healthIssues: { type: Array, default: [] },
})

export default models.DashboardData || model("DashboardData", DashboardDataSchema)