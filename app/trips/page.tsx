"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Plus, DollarSign, Star, MessageCircle, Settings } from "lucide-react"

const upcomingTrips = [
  {
    id: 1,
    title: "Bali Adventure",
    destination: "Bali, Indonesia",
    image: "/images/bali-temple.png",
    dates: "Mar 15 - Mar 25, 2024",
    members: [
      { name: "You", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Sarah", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Mike", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    budget: "$1,200",
    status: "Planning",
    progress: 75,
  },
  {
    id: 2,
    title: "Tokyo Food Tour",
    destination: "Tokyo, Japan",
    image: "/images/tokyo-street.png",
    dates: "Apr 10 - Apr 17, 2024",
    members: [
      { name: "You", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Emma", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    budget: "$1,800",
    status: "Ready",
    progress: 100,
  },
]

const pastTrips = [
  {
    id: 3,
    title: "Iceland Northern Lights",
    destination: "Reykjavik, Iceland",
    image: "/images/iceland-landscape.png",
    dates: "Dec 5 - Dec 12, 2023",
    members: [
      { name: "You", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Alex", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Lisa", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Tom", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    budget: "$1,500",
    rating: 4.8,
    photos: 127,
  },
]

const availableTrips = [
  {
    id: 4,
    title: "Morocco Desert Safari",
    destination: "Marrakech, Morocco",
    image: "/images/Morocco Desert.jpg",
    dates: "May 20 - May 30, 2024",
    organizer: "David Chen",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    spotsLeft: 2,
    totalSpots: 6,
    budget: "$900",
    tags: ["Adventure", "Culture", "Photography"],
  },
  {
    id: 5,
    title: "Greek Islands Hopping",
    destination: "Santorini & Mykonos",
    image: "/images/Greek Islands.jpg",
    dates: "Jun 15 - Jun 25, 2024",
    organizer: "Maria Rodriguez",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    spotsLeft: 3,
    totalSpots: 8,
    budget: "$1,300",
    tags: ["Beach", "Culture", "Romance"],
  },
]

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-display text-5xl md:text-6xl font-bold">Your Trips</h1>
              <p className="text-xl opacity-90 mt-2">
                Plan, join, and manage your travel adventures
              </p>
            </div>
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
              <Plus className="mr-2 h-5 w-5" />
              Plan New Trip
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
            <TabsTrigger value="available">Join Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-48 object-cover" />
                    <Badge className="absolute top-3 right-3 bg-secondary">{trip.status}</Badge>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{trip.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trip.destination}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {trip.dates}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {trip.budget}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{trip.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${trip.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <div className="flex -space-x-2">
                          {trip.members.map((member, index) => (
                            <Avatar key={index} className="h-8 w-8 border-2 border-white">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{trip.members.length} members</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {trip.photos} photos
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{trip.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trip.destination}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {trip.dates}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{trip.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <div className="flex -space-x-2">
                          {trip.members.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="h-8 w-8 border-2 border-white">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                          {trip.members.length > 3 && (
                            <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                              +{trip.members.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                      >
                        View Memories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableTrips.map((trip) => (
                <Card key={trip.id} className="card-minimal group overflow-hidden">
                  <div className="relative">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-56 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 right-3 bg-orange-500">{trip.spotsLeft} spots left</Badge>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{trip.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trip.destination}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {trip.dates}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {trip.budget}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {trip.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-secondary/20 text-secondary-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={trip.organizerAvatar || "/placeholder.svg"} alt={trip.organizer} />
                          <AvatarFallback>{trip.organizer[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{trip.organizer}</p>
                          <p className="text-xs text-gray-600">Trip Organizer</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {trip.spotsLeft}/{trip.totalSpots} spots
                        </p>
                        <Button size="sm" className="mt-1 gradient-bg-primary">
                          Join Trip
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
