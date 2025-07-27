"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Users, Star } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/images/bali-temple.png",
    price: "$800 - $1,200",
    rating: 4.8,
    travelers: 234,
    tags: ["Beach", "Culture", "Adventure"],
    description: "Tropical paradise with ancient temples and vibrant culture",
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "/images/tokyo-street.png",
    price: "$1,200 - $1,800",
    rating: 4.9,
    travelers: 189,
    tags: ["City", "Culture", "Food"],
    description: "Modern metropolis blending tradition with cutting-edge innovation",
  },
  {
    id: 3,
    name: "Santorini, Greece",
    image: "/images/santorini-sunset.png",
    price: "$900 - $1,400",
    rating: 4.7,
    travelers: 156,
    tags: ["Beach", "Romance", "Heritage"],
    description: "Stunning sunsets and iconic white-washed architecture",
  },
  {
    id: 4,
    name: "Machu Picchu, Peru",
    image: "/images/machu-picchu.png",
    price: "$600 - $1,000",
    rating: 4.9,
    travelers: 98,
    tags: ["Adventure", "Heritage", "Hiking"],
    description: "Ancient Incan citadel high in the Andes Mountains",
  },
  {
    id: 5,
    name: "Iceland",
    image: "/images/iceland-landscape.png",
    price: "$1,000 - $1,600",
    rating: 4.8,
    travelers: 145,
    tags: ["Adventure", "Nature", "Photography"],
    description: "Land of fire and ice with breathtaking natural wonders",
  },
  {
    id: 6,
    name: "Morocco",
    image: "/images/morocco-market.png",
    price: "$500 - $900",
    rating: 4.6,
    travelers: 167,
    tags: ["Culture", "Adventure", "Food"],
    description: "Exotic blend of Arab, Berber, and European cultures",
  },
]

export function FeaturedDestinations() {
  const [likedDestinations, setLikedDestinations] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedDestinations((prev) => (prev.includes(id) ? prev.filter((destId) => destId !== id) : [...prev, id]))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">Featured Destinations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing places recommended by our travel community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md"
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                  onClick={() => toggleLike(destination.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      likedDestinations.includes(destination.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </Button>
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-black/70 text-white">{destination.price}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{destination.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {destination.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-secondary/20 text-secondary-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{destination.travelers} travelers</span>
                    </div>

                    <Button size="sm" className="rounded-full gradient-bg-primary">
                      <MapPin className="h-3 w-3 mr-1" />
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
            asChild
          >
            <Link href="/discover">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
