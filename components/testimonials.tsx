"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "Henry Cavill",
    avatar: "/images/henry-cavill.jpg",
    location: "London, UK",
    rating: 5,
    text: "TripSage made planning my European rail adventure effortless. I met amazing people and discovered hidden gems along the way!",
    trip: "European Rail Tour",
    verified: true,
  },
  {
    id: 2,
    name: "Robert Downey Jr.",
    avatar: "/images/rdj.jpg",
    location: "Los Angeles, CA",
    rating: 5,
    text: "The group features are genius! Our Marvel reunion in Japan was a blast thanks to TripSage's collaborative tools.",
    trip: "Marvel Japan Tour",
    verified: true,
  },
  {
    id: 3,
    name: "Brad Pitt",
    avatar: "/images/brad-pitt.jpg",
    location: "Springfield, MO",
    rating: 5,
    text: "I love how easy it is to connect with fellow travelers. Found my hiking crew for Patagonia right here!",
    trip: "Patagonia Expedition",
    verified: true,
  },
  {
    id: 4,
    name: "Tom Cruise",
    avatar: "/images/tom-cruise.jpg",
    location: "Syracuse, NY",
    rating: 5,
    text: "Mission accomplished! TripSage helped me organize a whirlwind trip across Asia with friends. Highly recommend!",
    trip: "Asia Adventure",
    verified: true,
  },
  {
    id: 5,
    name: "Ryan Gosling",
    avatar: "/images/ryan-gosling.jpg",
    location: "London, Canada",
    rating: 5,
    text: "The recommendations are spot on. I found the best jazz bars in Paris and made lifelong friends.",
    trip: "Paris Jazz Nights",
    verified: true,
  },
  {
    id: 6,
    name: "Jake Gyllenhaal",
    avatar: "/images/Jake Gyllenhaal.jpg",
    location: "Los Angeles, CA",
    rating: 5,
    text: "TripSage's community is incredible. Got tips for Iceland and joined a photography group for the Northern Lights!",
    trip: "Iceland Northern Lights",
    verified: true,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const getVisibleTestimonials = () => {
    const startIndex = currentIndex * 3
    return testimonials.slice(startIndex, startIndex + 3)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">What Our Travelers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real adventurers who found their tribe on TripSage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getVisibleTestimonials().map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                  <p className="text-muted-foreground italic pl-6">"{testimonial.text}"</p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">{testimonial.name}</p>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-primary font-medium">{testimonial.trip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
