"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = ["WARM UP", "CORE", "LEGS", "CARDIO"]

const workouts = [
  {
    title: "10 Min Pilates Ab Workout",
    instructor: "Cassey Ho",
    duration: "10m",
    image: "/images/womencore1.jpg",
    category: "CORE",
    link: "https://youtu.be/0K7NNWMhO1Q?feature=shared",
  },
  {
    title: "10 Min Daily Ab Workout",
    instructor: "MadFit",
    duration: "10m",
    image:"/images/womencore2.jpg",
    category: "CORE",
    link: "https://youtu.be/DUvXoAwR-8k?feature=shared",
  },
  {
    title: "10 Min Standing Abs Workout to get Ripped ABS",
    instructor: "Chloe Ting",
    duration: "10m",
    image: "/images/womencore3.jpg",
    category: "CORE",
    link: "https://youtu.be/V4sWpLJcQoU?feature=shared",
  },
  {
    title: "Extreme Abs Workout",
    instructor: "Cassey Ho",
    duration: "25m",
    image: "/images/womencore4.jpg",
    category: "CORE",
    link: "https://youtu.be/cO7iMCci904?feature=shared",
  },
  {
    title: "10 Minute Full Body Stretch",
    instructor: "Sydney Cummings",
    duration: "10m",
    image: "/images/womenwarmup1.jpg",
    category: "WARM UP",
    link: "https://youtu.be/G1DM86lyNUc?feature=shared",
  },
  {
    title: "10 Minute Warm Up Routine Before Any Workout",
    instructor: "Emi",
    duration: "10m",
    image: "/images/womenwarmup2.jpg",
    category: "WARM UP",
    link: "https://youtu.be/p7EU5yGAcJ4?feature=shared",
  },
  {
    title: "Quick Warm Up Routine",
    instructor: "Chloe Ting",
    duration: "6m",
    image: "/images/womenwarmup3.jpg",
    category: "WARM UP",
    link: "https://youtu.be/j6C-6F6dr-4?feature=shared",
  },
  {
    title: "5 M Minute Up For At Home Workouts",
    instructor: "MadFit",
    duration: "5m",
    image: "/images/womenwarmup4.jpg",
    category: "WARM UP",
    link: "https://youtu.be/f3zOrYCwquE?feature=shared",
  },
  {
    title: "10 Mins Thigh Workout",
    instructor: "Chloe Ting",
    duration: "10m",
    image: "/images/womenlegs1.jpg",
    category: "LEGS",
    link: "https://youtube.com/watch?v=p-byEw_tKa8",
  },
  {
    title: "30 Minute Legs, Butt, And Thighs Burnout Workout",
    instructor: "Sydney Cummings",
    duration: "30m",
    image: "/images/womenlegs2.jpg",
    category: "LEGS",
    link: "https://youtube.com/watch?v=It17H7RDG9g",
  },
  {
    title: "10 min No Jumping Quiet Home Workout",
    instructor: "Emi",
    duration: "10m",
    image: "/images/womenlegs3.jpg",
    category: "LEGS",
    link: "https://youtu.be/Jg61m0DwURs?feature=shared",
  },
  {
    title: "15 MIN STANDING LEGS",
    instructor: "MadFit",
    duration: "15m",
    image: "/images/womenlegs4.jpg",
    category: "LEGS",
    link: "https://youtu.be/wgTVkCWNRxk?feature=shared",
  },
  {
    title: "20 Min HIIT Cardio Workout to lose weight",
    instructor: "Chloe Ting",
    duration: "20m",
    image: "/images/womencardio1.jpg",
    category: "CARDIO",
    link: "https://youtu.be/HIfQ6botXm4?feature=shared",
  },
  {
    title: "40 Minute Fat Burning Cardio Workout ",
    instructor: "Sydney Cummings",
    duration: "40m",
    image: "/images/womencardio2.jpg",
    category: "CARDIO",
    link: "https://youtu.be/Fsbjz-6RuLU?feature=shared",
  },
  {
    title: "10 MIN CARDIO WORKOUT AT HOME",
    instructor: "MadFit",
    duration: "10m",
    image: "/images/womencardio3.jpg",
    category: "CARDIO",
    link: "https://youtu.be/PqqJBaE4srs?feature=shared",
  },
  {
    title: "30 MIN WALKING CARDIO WORKOUT",
    instructor: "Emi",
    duration: "10m",
    image: "/images/womencardio4.jpg",
    category: "CARDIO",
    link: "https://youtu.be/ow3hpYJqYEI?feature=shared",
  },
]

export default function WomenCoursePage() {
  const [activeCategory, setActiveCategory] = useState("WARM UP")

  const filteredWorkouts = workouts.filter((workout) => workout.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Women's Course</h1>
          <p className="text-xl max-w-2xl">
            Tone, sculpt, and energize! Boost confidence with workouts designed to transform your fitness journey.
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
