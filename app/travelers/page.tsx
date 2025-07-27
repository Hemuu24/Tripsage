"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, MessageCircle, UserPlus, Filter, Users, Calendar, Camera } from "lucide-react"

const travelers = [
  {
    id: 1,
    name: "Henry Cavill",
    avatar: "/images/henry-cavill.jpg",
    location: "London, UK",
    age: 40,
    rating: 4.9,
    trips: 12,
    interests: ["Rail Adventure", "Europe", "Fitness"],
    nextTrip: "European Rail Tour",
    bio: "Actor, gamer, and travel enthusiast. Always up for a new adventure!",
    languages: ["English", "French"],
    travelStyle: "Mid-range",
    verified: true,
  },
  {
    id: 2,
    name: "Robert Downey Jr.",
    avatar: "/images/rdj.jpg",
    location: "Los Angeles, CA",
    age: 58,
    rating: 4.8,
    trips: 18,
    interests: ["Food", "Japan", "Marvel"],
    nextTrip: "Marvel Japan Tour",
    bio: "Iron Man on screen, foodie off screen. Love exploring new cultures.",
    languages: ["English"],
    travelStyle: "Luxury",
    verified: true,
  },
  {
    id: 3,
    name: "Brad Pitt",
    avatar: "/images/brad-pitt.jpg",
    location: "Springfield, MO",
    age: 59,
    rating: 4.7,
    trips: 8,
    interests: ["Hiking", "Patagonia", "Photography"],
    nextTrip: "Patagonia Expedition",
    bio: "Actor and adventure seeker. Always looking for the next great hike.",
    languages: ["English", "French"],
    travelStyle: "Adventure",
    verified: true,
  },
  {
    id: 4,
    name: "Tom Cruise",
    avatar: "/images/tom-cruise.jpg",
    location: "Syracuse, NY",
    age: 61,
    rating: 4.9,
    trips: 15,
    interests: ["Asia", "Action", "Mission Impossible"],
    nextTrip: "Asia Adventure",
    bio: "Mission accomplished! Love fast-paced trips and new experiences.",
    languages: ["English", "Japanese"],
    travelStyle: "Luxury",
    verified: true,
  },
  {
    id: 5,
    name: "Ryan Gosling",
    avatar: "/images/ryan-gosling.jpg",
    location: "London, Canada",
    age: 43,
    rating: 4.8,
    trips: 10,
    interests: ["Jazz", "Paris", "Nightlife"],
    nextTrip: "Paris Jazz Nights",
    bio: "Actor and music lover. Always searching for the best jazz bars.",
    languages: ["English", "French"],
    travelStyle: "Budget",
    verified: true,
  },
  {
    id: 6,
    name: "Jake Gyllenhaal",
    avatar: "/images/Jake Gyllenhaal.jpg",
    location: "Los Angeles, CA",
    age: 43,
    rating: 4.6,
    trips: 22,
    interests: ["Photography", "Iceland", "Adventure"],
    nextTrip: "Iceland Northern Lights",
    bio: "Actor and photographer. Chasing the Northern Lights and great photos.",
    languages: ["English", "Spanish"],
    travelStyle: "Mid-range",
    verified: true,
  },
]

export default function TravelersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInterest, setSelectedInterest] = useState("All interests")
  const [selectedTravelStyle, setSelectedTravelStyle] = useState("All styles")
  const [selectedLocation, setSelectedLocation] = useState("All locations")

  const filteredTravelers = travelers.filter((traveler) => {
    const matchesSearch =
      traveler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      traveler.bio.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesInterest = selectedInterest === "All interests" || traveler.interests.includes(selectedInterest)
    const matchesTravelStyle = selectedTravelStyle === "All styles" || traveler.travelStyle === selectedTravelStyle
    const matchesLocation = selectedLocation === "All locations" || traveler.location.includes(selectedLocation)

    return matchesSearch && matchesInterest && matchesTravelStyle && matchesLocation
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <h1 className="text-display text-5xl md:text-6xl font-bold">Find Travel Buddies</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Connect with like-minded travelers and plan your next adventure together
            </p>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Find Travelers</h2>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name or interests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interests</label>
                  <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                    <SelectTrigger>
                      <SelectValue placeholder="All interests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All interests">All interests</SelectItem>
                      <SelectItem value="Photography">Photography</SelectItem>
                      <SelectItem value="Adventure">Adventure</SelectItem>
                      <SelectItem value="Culture">Culture</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Travel Style */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Travel Style</label>
                  <Select value={selectedTravelStyle} onValueChange={setSelectedTravelStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="All styles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All styles">All styles</SelectItem>
                      <SelectItem value="Budget">Budget</SelectItem>
                      <SelectItem value="Mid-range">Mid-range</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All locations">All locations</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="Korea">Korea</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedInterest("All interests")
                    setSelectedTravelStyle("All styles")
                    setSelectedLocation("All locations")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{filteredTravelers.length} travelers found</span>
              </div>
            </div>

            {/* Travelers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTravelers.map((traveler) => (
                <Card key={traveler.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={traveler.avatar || "/placeholder.svg"} alt={traveler.name} />
                          <AvatarFallback>
                            {traveler.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {traveler.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{traveler.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{traveler.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {traveler.location} • {traveler.age} years old
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{traveler.bio}</p>

                        <div className="flex flex-wrap gap-1">
                          {traveler.interests.slice(0, 3).map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {traveler.interests.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{traveler.interests.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4 text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{traveler.trips} trips</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Camera className="h-3 w-3" />
                              <span>{traveler.travelStyle}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">Next trip: {traveler.nextTrip}</div>

                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <UserPlus className="h-3 w-3 mr-1" />
                            Connect
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTravelers.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No travelers found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters to find more travel companions.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
