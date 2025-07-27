"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  MessageCircle, 
  ThumbsUp, 
  MessageSquare, 
  Clock, 
  Users, 
  TrendingUp,
  Filter,
  Plus,
  Star
} from "lucide-react"

const forumCategories = [
  { id: "general", name: "General Discussion", count: 156 },
  { id: "planning", name: "Trip Planning", count: 89 },
  { id: "destinations", name: "Destinations", count: 234 },
  { id: "safety", name: "Safety & Tips", count: 67 },
  { id: "budget", name: "Budget Travel", count: 123 },
  { id: "solo", name: "Solo Travel", count: 78 },
]

const forumDiscussions = [
  {
    id: 1,
    title: "Best hidden gems in Tokyo for food lovers?",
    author: {
      name: "Robert Downey Jr.",
      avatar: "/images/rdj.jpg",
      verified: true,
    },
    category: "destinations",
    content: "Just got back from an amazing trip to Tokyo and discovered some incredible local spots that aren't in the guidebooks. The ramen shop in Shibuya's backstreets was life-changing! Anyone have recommendations for authentic local experiences?",
    replies: 23,
    views: 456,
    likes: 67,
    timestamp: "2 hours ago",
    tags: ["Tokyo", "Food", "Local Experience"],
    isPinned: false,
    isHot: true,
  },
  {
    id: 2,
    title: "Solo travel safety tips for female travelers",
    author: {
      name: "Ryan Gosling",
      avatar: "/images/ryan-gosling.jpg",
      verified: true,
    },
    category: "safety",
    content: "Planning my first solo trip to Europe and would love to hear from experienced solo travelers about safety tips, especially for women. What are your must-know safety practices?",
    replies: 45,
    views: 892,
    likes: 134,
    timestamp: "5 hours ago",
    tags: ["Solo Travel", "Safety", "Europe"],
    isPinned: true,
    isHot: false,
  },
  {
    id: 3,
    title: "Budget-friendly accommodation in Paris",
    author: {
      name: "Tom Cruise",
      avatar: "/images/tom-cruise.jpg",
      verified: true,
    },
    category: "budget",
    content: "Looking for affordable but safe accommodation options in Paris. Any recommendations for budget hotels or hostels that are well-located and clean?",
    replies: 31,
    views: 567,
    likes: 89,
    timestamp: "1 day ago",
    tags: ["Paris", "Budget", "Accommodation"],
    isPinned: false,
    isHot: false,
  },
  {
    id: 4,
    title: "Adventure activities in Iceland - recommendations needed!",
    author: {
      name: "Henry Cavill",
      avatar: "/images/henry-cavill.jpg",
      verified: true,
    },
    category: "destinations",
    content: "Heading to Iceland next month and want to experience the best adventure activities. Glacier hiking, ice cave exploration, northern lights hunting - what should I prioritize?",
    replies: 67,
    views: 1234,
    likes: 234,
    timestamp: "2 days ago",
    tags: ["Iceland", "Adventure", "Activities"],
    isPinned: false,
    isHot: true,
  },
  {
    id: 5,
    title: "Group travel vs solo travel - what's your preference?",
    author: {
      name: "Brad Pitt",
      avatar: "/images/brad-pitt.jpg",
      verified: true,
    },
    category: "general",
    content: "I've done both solo and group travel, and each has its unique advantages. Solo travel gives you complete freedom, while group travel creates amazing shared memories. What's your experience?",
    replies: 89,
    views: 1567,
    likes: 345,
    timestamp: "3 days ago",
    tags: ["Solo Travel", "Group Travel", "Discussion"],
    isPinned: false,
    isHot: true,
  },
  {
    id: 6,
    title: "Photography tips for travel bloggers",
    author: {
      name: "Jake Gyllenhaal",
      avatar: "/images/Jake Gyllenhaal.jpg",
      verified: true,
    },
    category: "general",
    content: "Fellow photographers, what are your essential tips for capturing amazing travel photos? Looking for advice on equipment, composition, and editing techniques.",
    replies: 42,
    views: 789,
    likes: 156,
    timestamp: "4 days ago",
    tags: ["Photography", "Travel Blogging", "Tips"],
    isPinned: false,
    isHot: false,
  },
]

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredDiscussions = forumDiscussions.filter((discussion) => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "popular":
        return b.likes - a.likes
      case "replies":
        return b.replies - a.replies
      case "views":
        return b.views - a.views
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <h1 className="text-display text-5xl md:text-6xl font-bold">Travel Forum</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Connect with fellow travelers, share experiences, and get advice from the community
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <Card className="card-minimal">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-foreground" />
                  <h2 className="text-heading text-lg">Search Discussions</h2>
                </div>
                <Input
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-minimal"
                />
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="card-minimal">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-foreground" />
                  <h2 className="text-heading text-lg">Categories</h2>
                </div>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "ghost"}
                    className={selectedCategory === "all" ? "btn-minimal" : "w-full justify-start"}
                    onClick={() => setSelectedCategory("all")}
                  >
                    All Topics
                  </Button>
                  {forumCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className={selectedCategory === category.id ? "btn-minimal" : "w-full justify-start"}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                      <Badge className="ml-auto bg-muted text-foreground rounded-none">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="input-minimal w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="replies">Most Replies</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">
                  {filteredDiscussions.length} discussions
                </span>
              </div>
              <Button className="btn-minimal">
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {sortedDiscussions.map((discussion) => (
                <Card key={discussion.id} className="card-minimal hover:border-foreground transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                        <AvatarFallback>
                          {discussion.author.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-heading text-lg font-semibold hover:text-foreground cursor-pointer">
                                {discussion.title}
                              </h3>
                              {discussion.isPinned && (
                                <Badge className="bg-foreground text-background rounded-none text-xs">
                                  Pinned
                                </Badge>
                              )}
                              {discussion.isHot && (
                                <Badge className="bg-red-500 text-white rounded-none text-xs">
                                  Hot
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <span className="font-semibold">{discussion.author.name}</span>
                                {discussion.author.verified && (
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                )}
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                {discussion.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground line-clamp-2">
                          {discussion.content}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              {discussion.replies}
                            </span>
                            <span className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              {discussion.likes}
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              {discussion.views}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-muted text-foreground rounded-none">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDiscussions.length === 0 && (
              <Card className="card-minimal">
                <CardContent className="p-12 text-center">
                  <MessageCircle className="h-16 w-16 text-foreground mx-auto mb-4" />
                  <h3 className="text-heading text-lg mb-2">No discussions found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters to find more discussions.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 