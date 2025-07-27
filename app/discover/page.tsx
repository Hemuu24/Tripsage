"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, MapPin, Users, Star, Heart, Map, List, Compass, X } from "lucide-react"
import { WorldGlobe } from "@/components/world-globe"
import { WorldMap } from "@/components/world-map"

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/images/bali-temple.png",
    price: [800, 1200],
    rating: 4.8,
    travelers: 234,
    tags: ["Beach", "Culture", "Adventure"],
    description: "Tropical paradise with ancient temples",
    continent: "Asia",
    type: "Beach",
    lat: -8.3405,
    lng: 115.0920,
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "/images/tokyo-street.png",
    price: [1200, 1800],
    rating: 4.9,
    travelers: 189,
    tags: ["City", "Culture", "Food"],
    description: "Modern metropolis with rich traditions",
    continent: "Asia",
    type: "City",
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: 3,
    name: "Santorini, Greece",
    image: "/images/santorini-sunset.png",
    price: [900, 1400],
    rating: 4.7,
    travelers: 156,
    tags: ["Beach", "Romance", "Heritage"],
    description: "Stunning sunsets and architecture",
    continent: "Europe",
    type: "Beach",
    lat: 36.3932,
    lng: 25.4615,
  },
  {
    id: 4,
    name: "Machu Picchu, Peru",
    image: "/images/machu-picchu.png",
    price: [600, 1000],
    rating: 4.9,
    travelers: 98,
    tags: ["Adventure", "Heritage", "Hiking"],
    description: "Ancient Incan citadel in the Andes",
    continent: "South America",
    type: "Adventure",
    lat: -13.1631,
    lng: -72.5450,
  },
  {
    id: 5,
    name: "Iceland",
    image: "/images/iceland-landscape.png",
    price: [1000, 1600],
    rating: 4.8,
    travelers: 145,
    tags: ["Adventure", "Nature", "Photography"],
    description: "Land of fire and ice",
    continent: "Europe",
    type: "Adventure",
    lat: 64.9631,
    lng: -19.0208,
  },
  {
    id: 6,
    name: "Morocco",
    image: "/images/morocco-market.png",
    price: [500, 900],
    rating: 4.6,
    travelers: 167,
    tags: ["Culture", "Adventure", "Food"],
    description: "Exotic blend of cultures",
    continent: "Africa",
    type: "Culture",
    lat: 31.7917,
    lng: -7.0926,
  },
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedContinent, setSelectedContinent] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [likedDestinations, setLikedDestinations] = useState<number[]>([])
  const [selectedDestination, setSelectedDestination] = useState<any>(null)

  const toggleLike = (id: number) => {
    setLikedDestinations((prev) => (prev.includes(id) ? prev.filter((destId) => destId !== id) : [...prev, id]))
  }

  const handleDestinationClick = (destination: any) => {
    setSelectedDestination(destination)
  }

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = dest.price[0] >= priceRange[0] && dest.price[1] <= priceRange[1]
    const matchesContinent = selectedContinent === "all" || dest.continent === selectedContinent
    const matchesType = selectedType === "all" || dest.type === selectedType

    return matchesSearch && matchesPrice && matchesContinent && matchesType
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <h1 className="text-display text-5xl md:text-6xl font-bold">Discover Amazing Destinations</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore the world through the eyes of fellow travelers and find your next adventure
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card className="card-minimal">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-foreground" />
                  <h2 className="text-heading text-lg">Filters</h2>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Search Destinations</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-minimal pl-10"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold">
                    Budget Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                </div>

                {/* Continent */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Continent</label>
                  <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                    <SelectTrigger className="input-minimal">
                      <SelectValue placeholder="All continents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All continents</SelectItem>
                      <SelectItem value="Asia">Asia</SelectItem>
                      <SelectItem value="Europe">Europe</SelectItem>
                      <SelectItem value="Africa">Africa</SelectItem>
                      <SelectItem value="North America">North America</SelectItem>
                      <SelectItem value="South America">South America</SelectItem>
                      <SelectItem value="Oceania">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Travel Type */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Travel Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="input-minimal">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="Beach">Beach</SelectItem>
                      <SelectItem value="City">City</SelectItem>
                      <SelectItem value="Adventure">Adventure</SelectItem>
                      <SelectItem value="Culture">Culture</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full btn-minimal-outline"
                  onClick={() => {
                    setSearchQuery("")
                    setPriceRange([0, 2000])
                    setSelectedContinent("all")
                    setSelectedType("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Toggle and Results Count */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Compass className="h-5 w-5 text-foreground" />
                <span className="text-muted-foreground font-semibold">{filteredDestinations.length} destinations found</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "btn-minimal" : "btn-minimal-outline"}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="btn-minimal-outline opacity-50 cursor-not-allowed"
                  disabled
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDestinations.map((destination) => (
                  <Card
                    key={destination.id}
                    className="card-minimal group overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                        onClick={() => toggleLike(destination.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedDestinations.includes(destination.id) ? "fill-red-500 text-red-500" : "text-foreground"
                          }`}
                        />
                      </Button>
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-foreground text-background rounded-none">
                          ${destination.price[0]} - ${destination.price[1]}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-heading text-xl group-hover:text-foreground transition-colors">
                            {destination.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{destination.rating}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm">{destination.description}</p>

                        <div className="flex flex-wrap gap-1">
                          {destination.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-muted text-foreground rounded-none">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{destination.travelers} travelers</span>
                          </div>

                          <Button size="sm" className="btn-minimal rounded-none">
                            <MapPin className="h-3 w-3 mr-1" />
                            Explore
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="h-[600px] card-minimal">
                <CardContent className="p-0 h-full">
                  <WorldMap 
                    destinations={filteredDestinations} 
                    onDestinationClick={handleDestinationClick}
                  />
                </CardContent>
              </Card>
            )}

            {filteredDestinations.length === 0 && (
              <Card className="card-minimal">
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-foreground mx-auto mb-4" />
                  <h3 className="text-heading text-lg mb-2">No destinations found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms to find more destinations.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Destination Detail Modal */}
      <Dialog open={!!selectedDestination} onOpenChange={() => setSelectedDestination(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedDestination?.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedDestination(null)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedDestination && (
            <div className="space-y-6">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedDestination.rating}</span>
                  </div>
                  <Badge className="bg-foreground text-background rounded-none">
                    ${selectedDestination.price[0]} - ${selectedDestination.price[1]}
                  </Badge>
                </div>

                <p className="text-muted-foreground">{selectedDestination.description}</p>

                <div className="flex flex-wrap gap-2">
                  {selectedDestination.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="bg-muted text-foreground rounded-none">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{selectedDestination.travelers} travelers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedDestination.continent}</span>
                  </div>
                </div>

                <Button className="w-full btn-minimal">
                  <MapPin className="h-4 w-4 mr-2" />
                  Plan Trip to {selectedDestination.name}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
