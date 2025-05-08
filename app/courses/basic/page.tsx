"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  "WARM UP",
  "STRETCHING",
  "BEGINNER CARDIO",
  "BASIC STRENGTH",
];

const workouts = [
  // WARM UP
  {
    title: "5 MIN WARM UP FOR AT HOME WORKOUTS",
    instructor: "MadFit",
    duration: "5m",
    image: "/images/basicwarmup1.jpg",
    category: "WARM UP",
    link: "https://www.youtube.com/watch?v=f3zOrYCwquE",
  },
  {
    title: "5 MIN WARM UP (No Jumping)",
    instructor: "MadFit",
    duration: "5m",
    image: "/images/basicwarmup2.jpg",
    category: "WARM UP",
    link: "https://www.youtube.com/watch?v=CSrBaHX3HxQ",
  },
  {
    title: "5 MIN UPPER BODY WARM UP ROUTINE",
    instructor: "MadFit",
    duration: "5m",
    image: "/images/basicwarmup3.jpg",
    category: "WARM UP",
    link: "https://www.youtube.com/watch?v=mf6CZ5_7dfc",
  },

  // STRETCHING
  {
    title: "Total Body Stretch Routine",
    instructor: "Cassey Ho",
    duration: "12m",
    image: "/images/basicstretching1.jpg",
    category: "STRETCHING",
    link: "https://www.youtube.com/watch?v=kKeBjBBUQyY",
  },
  {
    title: "Ultimate Daily Stretch for Flexibility",
    instructor: "Cassey Ho",
    duration: "12m",
    image: "/images/basicstretching2.jpg",
    category: "STRETCHING",
    link: "https://www.youtube.com/watch?v=wUXpigOkBfY",
  },
  {
    title: "15 Minute Deep Stretch for Splits",
    instructor: "Cassey Ho",
    duration: "15m",
    image: "/images/basicstretching3.jpg",
    category: "STRETCHING",
    link: "https://www.youtube.com/watch?v=GFuhJQloXu8",
  },

  // BEGINNER CARDIO
  {
    title: "20 min Cardio Workout - Beginner Friendly",
    instructor: "Chloe Ting",
    duration: "20m",
    image: "/images/basiccardio1.jpg",
    category: "BEGINNER CARDIO",
    link: "https://www.youtube.com/watch?v=RAXj64BEA9Y",
  },
  {
    title: "15 min Full Body HIIT - Beginner Friendly",
    instructor: "Chloe Ting",
    duration: "15m",
    image: "/images/basiccardio2.jpg",
    category: "BEGINNER CARDIO",
    link: "https://www.youtube.com/watch?v=zy-4BbL04uU",
  },
  {
    title: "20 min Full Body Workout for Beginners",
    instructor: "MadFit",
    duration: "20m",
    image: "/images/basiccardio3.jpg",
    category: "BEGINNER CARDIO",
    link: "https://www.youtube.com/watch?v=LqW9gdpctKE",
  },

  // BASIC STRENGTH
  {
    title: "How To Get Bigger & Stronger (Powerbuilding)",
    instructor: "Jeff Nippard",
    duration: "20m",
    image: "/images/basicstrength1.jpg",
    category: "BASIC STRENGTH",
    link: "https://www.youtube.com/watch?v=OPEDjl88P-4",
  },
  {
    title: "Perfect Beginner Workout (Sets and Reps)",
    instructor: "Jeff Nippard",
    duration: "20m",
    image: "/images/basicstrength2.jpg",
    category: "BASIC STRENGTH",
    link: "https://www.youtube.com/watch?v=ixkQaZXVQjs",
  },
  {
    title: "Minimalist Workout Plan (Under 45 mins)",
    instructor: "Jeff Nippard",
    duration: "20m",
    image: "/images/basicstrength3.jpg",
    category: "BASIC STRENGTH",
    link: "https://www.youtube.com/watch?v=eMjyvIQbn9M",
  },
];


export default function BasicCoursePage() {
  const [activeCategory, setActiveCategory] = useState("WARM UP")

  const filteredWorkouts = workouts.filter((workout) => workout.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Basic Course</h1>
          <p className="text-xl max-w-2xl">
            Start strong! A beginner-friendly program to build strength, endurance, and flexibility at your own pace.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories sidebar */}
          <div className="md:w-64 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeCategory === category ? "bg-green-100 text-green-800" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <div
                    className={`w-4 h-4 rounded-full mr-3 ${
                      activeCategory === category ? "bg-green-500" : "border border-gray-300"
                    }`}
                  ></div>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Workout videos */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">{activeCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout, index) => (
                <Link href={workout.link} target="_blank" key={index}>
                  <Card className="overflow-hidden card-hover h-full">
                    <div className="relative h-48">
                      <Image
                        src={workout.image || "/placeholder.svg"}
                        alt={workout.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-sm">
                        {workout.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">{workout.title}</h3>
                      <p className="text-gray-600 text-sm">~ {workout.instructor}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
