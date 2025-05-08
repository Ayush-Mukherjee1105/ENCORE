"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import Image from "next/image"
import { Activity, Droplet, Heart, User, LogOut, LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string; profileImage?: string } | null>(null)
  const [dashboard, setDashboard] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/me")
      .then(res => {
        if (!res.ok) throw new Error("Not authenticated")
        return res.json()
      })
      .then(user => {
        setUser(user)
        return fetch(`/api/dashboard?email=${encodeURIComponent(user.email)}`)
      })
      .then(res => res.json())
      .then(data => {
        setDashboard(data)
        setLoading(false)
      })
      .catch(() => {
        window.location.href = "/login"
      })
  }, [])

  // Update dashboard data in MongoDB
  const updateDashboard = (updates: any) => {
    if (!user?.email) return
    fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, ...updates }),
    })
      .then(res => res.json())
      .then(setDashboard)
  }

  // Water intake handlers
  const updateWaterIntake = (amount: number) => {
    updateDashboard({ waterIntake: (dashboard?.waterIntake || 0) + amount })
  }
  const resetWaterIntake = () => {
    updateDashboard({ waterIntake: 0 })
  }

  // BMI helpers
  const bmi = dashboard?.bmi || 0
  const bmiCategory = dashboard?.bmiCategory || ""
  const getBmiImage = () => {
    if (bmiCategory === "Underweight") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/under1-VDkYCynP0DfhRtUslG2TTT0WueQcys.png"
    } else if (bmiCategory === "Normal") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/normal1-twM55yMnwxa1jZ1p7y0AYPEqIcLib5.png"
    } else if (bmiCategory === "Overweight") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/over1-LyVrVFLRLpf7FslkhhHs07Nec9sfLM.png"
    } else if (bmiCategory === "Obese") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/obese1-qtzQ5r8RKmXIzxLdLU7CXaB3NJ27Dw.png"
    }
    return ""
  }
  const getBmiQuote = () => {
    if (bmiCategory === "Underweight") {
      return "Whoa there, featherweight champ! One strong breeze and you might fly away. Time to beef up—maybe add an extra scoop of ice cream!"
    } else if (bmiCategory === "Normal") {
      return "You're in the Goldilocks zone—not too heavy, not too light, juuust right! Stay awesome, health ninja!"
    } else if (bmiCategory === "Overweight") {
      return "You're carrying a little extra happiness… mostly around the belly! Time to unfriend the fridge and follow a salad influencer!"
    } else if (bmiCategory === "Obese") {
      return "You're in boss mode, but your joints might not agree. Let's show those calories who's really in charge—time for a glow-up!"
    }
    return ""
  }
  const getBmiSliderPosition = () => {
    if (!bmi) return 0
    if (bmi < 18.5) {
      return (bmi / 18.5) * 25
    } else if (bmi < 25) {
      return 25 + ((bmi - 18.5) / 6.5) * 25
    } else if (bmi < 30) {
      return 50 + ((bmi - 25) / 5) * 25
    } else {
      return 75 + Math.min(((bmi - 30) / 10) * 25, 25)
    }
  }

  // Format date for weight history
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  if (loading || !user || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen border-r border-gray-200 fixed overflow-y-auto">
          <div className="p-6">
            <Link href="/" className="text-2xl font-bold flex items-center text-green-600 mb-8">
              <span className="text-green-500">ENCORE</span>
              <span>.</span>
            </Link>
          </div>
          <div className="px-6 mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                {user.profileImage ? (
                  <Image
                    src={user.profileImage || "/placeholder.svg"}
                    alt={user.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <nav className="px-3">
            <Link href="/dashboard" className="flex items-center px-3 py-3 rounded-lg bg-green-50 text-green-600 mb-1">
              <LayoutDashboard className="mr-3 h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/dashboard/profile" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1">
              <User className="mr-3 h-5 w-5 text-gray-500" />
              <span>Profile</span>
            </Link>
            <Link
              href="/dashboard/water-tracker"
              className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1"
            >
              <Droplet className="mr-3 h-5 w-5 text-gray-500" />
              <span>Water Tracker</span>
            </Link>
            <Link href="/dashboard/health" className="flex items-center px-3 py-3 rounded-lg hover:bg-gray-100 mb-1">
              <Heart className="mr-3 h-5 w-5 text-gray-500" />
              <span>Health Issues</span>
            </Link>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Button
              onClick={() => {
                fetch("/api/logout", { method: "POST" }).then(() => (window.location.href = "/"))
              }}
              variant="ghost"
              className="flex items-center w-full justify-start px-3 py-3 hover:bg-gray-100 text-gray-700"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}</h1>
          <p className="text-gray-600 mb-8">Here's an overview of your health stats</p>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Weight</p>
                    <p className="text-2xl font-bold">{dashboard.weight} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Activity className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">BMI</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold">{bmi}</p>
                      <span className="ml-2 text-green-500 text-sm">{bmiCategory}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Droplet className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Daily Water</p>
                    <p className="text-2xl font-bold">{dashboard.waterIntake}L / 4L</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    <svg
                      className="h-6 w-6 text-yellow-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 15L8.5 11.5L9.91 10.09L12 12.17L14.09 10.09L15.5 11.5L12 15Z" fill="currentColor" />
                      <path
                        d="M12 3L4 9V21H20V9L12 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Streak</p>
                    <p className="text-2xl font-bold">{dashboard.streak} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Progress Tracking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Activity className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-lg font-medium">Weight History</h3>
                </div>
                <div className="h-64 relative">
                  {dashboard.weightHistory && dashboard.weightHistory.length > 0 ? (
                    <div className="h-full flex flex-col">
                      <div className="flex-1 relative">
                        {/* Find min and max for scaling */}
                        {(() => {
                          const weights = dashboard.weightHistory.map((entry: any) => entry.weight)
                          const minWeight = Math.min(...weights)
                          const maxWeight = Math.max(...weights)
                          const range = maxWeight - minWeight || 10
                          const padding = range * 0.1
                          const sortedHistory = [...dashboard.weightHistory].sort(
                            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                          )
                          return (
                            <>
                              {/* Y-axis labels */}
                              <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
                                <span>{Math.ceil(maxWeight + padding)}kg</span>
                                <span>{Math.floor(minWeight - padding)}kg</span>
                              </div>
                              {/* Graph */}
                              <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end">
                                {sortedHistory.map((entry, index) => {
                                  const heightPercent =
                                    ((entry.weight - (minWeight - padding)) /
                                      (maxWeight + padding - (minWeight - padding))) *
                                    100
                                  return (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                      <div
                                        className="w-4/5 bg-blue-500 rounded-t-sm"
                                        style={{ height: `${heightPercent}%` }}
                                      ></div>
                                      <span className="text-xs mt-1 text-gray-500">{formatDate(entry.date)}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      No weight history data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-medium">Water Intake</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500"
                    onClick={resetWaterIntake}
                  >
                    Reset Today
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="text-5xl font-bold mb-2">{dashboard.waterIntake}L</div>
                  <div className="text-gray-500 mb-6">{Math.round((dashboard.waterIntake / 4) * 100)}%</div>
                  <div className="w-full h-8 bg-blue-100 rounded-full mb-6">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.min(100, (dashboard.waterIntake / 4) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                      onClick={() => updateWaterIntake(0.2)}
                    >
                      <span className="mr-2">🥛</span> +200ml
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                      onClick={() => updateWaterIntake(0.35)}
                    >
                      <span className="mr-2">🧃</span> +350ml
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                      onClick={() => updateWaterIntake(0.5)}
                    >
                      <span className="mr-2">💧</span> +500ml
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center justify-center"
                      onClick={() => updateWaterIntake(0.75)}
                    >
                      <span className="mr-2">🍶</span> +750ml
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* BMI Indicator */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Activity className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium">BMI Status</h3>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-lg font-medium">Body Mass Index</h3>
                    <p className="text-sm text-gray-500">Based on your height and weight</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold">{bmi}</span>
                    <p
                      className={`text-sm ${
                        bmiCategory === "Underweight"
                          ? "text-blue-500"
                          : bmiCategory === "Normal"
                          ? "text-green-500"
                          : bmiCategory === "Overweight"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {bmiCategory}
                    </p>
                  </div>
                </div>
                <div className="h-4 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 h-full w-1 bg-white border-2 border-gray-800 transform -translate-x-1/2"
                    style={{ left: `${getBmiSliderPosition()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-4 w-16 h-16">
                      <Image
                        src={getBmiImage() || "/placeholder.svg"}
                        alt={bmiCategory}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm">{getBmiQuote()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Nutrition Overview */}
          <Card className="bg-white mb-6 mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Nutrition Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="text-xl font-bold">{dashboard.nutrition?.calories || 0} / 2,200</p>
                  <Progress value={Math.round(((dashboard.nutrition?.calories || 0) / 2200) * 100)} className="h-2 mt-2" />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="text-xl font-bold">{dashboard.nutrition?.protein || 0}g / 120g</p>
                  <Progress value={Math.round(((dashboard.nutrition?.protein || 0) / 120) * 100)} className="h-2 mt-2" />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="text-xl font-bold">{dashboard.nutrition?.carbs || 0}g / 250g</p>
                  <Progress value={Math.round(((dashboard.nutrition?.carbs || 0) / 250) * 100)} className="h-2 mt-2" />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Fat</p>
                  <p className="text-xl font-bold">{dashboard.nutrition?.fat || 0}g / 70g</p>
                  <Progress value={Math.round(((dashboard.nutrition?.fat || 0) / 70) * 100)} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Sleep Analysis */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Sleep Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Total Sleep</p>
                  <p className="text-xl font-bold">{dashboard.sleep?.totalSleep || "7h 15m"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Deep Sleep</p>
                  <p className="text-xl font-bold">{dashboard.sleep?.deepSleep || "1h 45m"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Light Sleep</p>
                  <p className="text-xl font-bold">{dashboard.sleep?.lightSleep || "4h 30m"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-sm text-gray-500">REM Sleep</p>
                  <p className="text-xl font-bold">{dashboard.sleep?.remSleep || "1h 00m"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}