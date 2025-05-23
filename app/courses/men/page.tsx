"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = ["WARM UP", "CHEST", "BACK", "ARMS"]

const workouts = [
  {
    title: "INTENSE CHEST WORKOUT AT HOME",
    instructor: "TIFF x DAN",
    duration: "12m",
    image: "/images/menchest3.jpg",
    category: "CHEST",
    link: "https://www.youtube.com/watch?v=Jf5_PJCFs-g",
  },
    {
    title: "Most Effective CHEST Workout at HOME",
    instructor: "NEXT Workout",
    duration: "10m",
    image: "/images/menchest4.jpg",
    category: "CHEST",
    link: "https://www.youtube.com/watch?v=qwx1VV9vV1A",
  },
  {
    title: "9 Most Underrated Chest Exercises!",
    instructor: "Tharun Kumar",
    duration: "10m",
    image: "/images/menchest1.jpg",
    category: "CHEST",
    link: "https://www.youtube.com/watch?v=17WEFXKOljA",
  },
  {
    title: "Chest. Shoulder & ABS Workout",
    instructor: "Jae-ho",
    duration: "20m",
    image: "/images/menchest2.jpg",
    category: "CHEST",
    link: "https://www.youtube.com/watch?v=17WEFXKOljA",
  },
  {
    "title": "Total Body Warmup",
    "instructor": "Athlean-X",
    "duration": "5m",
    "image": "/images/menwarmup1.jpg",
    "category": "WARM UP",
    "link": "https://www.youtube.com/watch?v=XjjxZs21nsA"
  },
  {
    "title": "The Perfect Warm-Up Routine for Peak Performance",
    "instructor": "Dr. Mike Israetel",
    "duration": "5m",
    "image": "/images/menwarmup2.jpg",
    "category": "WARM UP",
    "link": "https://www.youtube.com/watch?v=HdgDDSjtaLM"
  },
  {
    "title": "8 Minute Stretching Routine",
    "instructor": "Jared Beckstrand",
    "duration": "8m",
    "image": "/images/menwarmup3.jpg",
    "category": "WARM UP",
    "link": "https://youtu.be/FI51zRzgIe4?feature=shared"
  },
  {
    "title": "5 Min Whole Body Stretch Routine ",
    "instructor": "Athlean-X",
    "duration": "5m",
    "image": "/images/menwarmup4.jpg",
    "category": "WARM UP",
    "link": "https://www.youtube.com/watch?v=AGj7wEn1jLo"
  },
  {
    "title": "5 Tips To Grow a Bigger Back",
    "instructor": "Noel Deyzel",
    "duration": "20m",
    "image": "/images/menback1.jpg",
    "category": "BACK",
    "link": "https://www.youtube.com/watch?v=oqA4TSF3pYk"
  },
  {
    "title": "Back Exercise MISTAKES You're Making That Are Holding You Back!",
    "instructor": "JONNI SHREVE",
    "duration": "15m",
    "image": "/images/menback2.jpg",
    "category": "BACK",
    "link": "https://www.youtube.com/watch?v=fimedi6cx7E"
  },
  {
    "title": "Training W/ Noel Deyzel",
    "instructor": "Noel Deyzel",
    "duration": "10m",
    "image": "/images/menback3.jpg",
    "category": "BACK",
    "link": "https://www.youtube.com/watch?v=Sm10xl2ZYpE"
  },
  {
    "title": "Complete Back Development Workout",
    "instructor": "Dr. Mike Israetel",
    "duration": "20m",
    "image": "/images/menback4.jpg",
    "category": "BACK",
    "link": "https://youtu.be/E81VwgxD45c?feature=shared"
  },
  {
    "title": "Jeff Nippard Arm Workout",
    "instructor": "Jeff Nippard",
    "duration": "10m",
    "image": "/images/menarms1.jpg",
    "category": "ARMS",
    "link": "https://www.youtube.com/watch?v=WQiS87M1BT0"
  },
  {
    "title": "Working Arms Like Never Before with Jeff Nippard!",
    "instructor": "Jeff Nippard",
    "duration": "12m",
    "image": "/images/menarms2.jpg",
    "category": "ARMS",
    "link": "https://www.youtube.com/watch?v=pDImHFrz9ew"
  },
  {
    "title": "Top 4 BICEPS Exercises (Brutal Stretch!)",
    "instructor": "Jeff Nippard",
    "duration": "15m",
    "image": "/images/menarms3.jpg",
    "category": "ARMS",
    "link": "https://www.youtube.com/watch?v=j5f_0rNkPwU"
  },
  {
    "title": "My Full Arm Training Routine / Physique Update",
    "instructor": "Jeff Nippard",
    "duration": "10m",
    "image": "/images/menarms4.jpg",
    "category": "ARMS",
    "link": "https://www.youtube.com/watch?v=gStLkPCGznY"
  }
]

export default function MenCoursePage() {
  const [activeCategory, setActiveCategory] = useState("WARM UP")

  const filteredWorkouts = workouts.filter((workout) => workout.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Men's Course</h1>
          <p className="text-xl max-w-2xl">
            Push limits, build muscle, and dominate your fitness game with targeted, high-performance workouts.
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
