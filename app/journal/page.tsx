"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MapPin,
  Calendar,
  Plus,
  ImageIcon,
  Video,
  MoreHorizontal,
} from "lucide-react"

const journalPosts = [
  {
    id: 1,
    author: {
      name: "Robert Downey Jr.",
      avatar: "/images/rdj.jpg",
      location: "Tokyo, Japan",
    },
    timestamp: "1 hour ago",
    content: "Just finished an epic ramen tour in Tokyo. Highly recommend Ichiran for solo travelers! 🍜",
    images: ["/images/tokyo-street.png"],
    likes: 120,
    comments: 15,
    tags: ["Tokyo", "Food", "Marvel"],
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    author: {
      name: "Henry Cavill",
      avatar: "/images/henry-cavill.jpg",
      location: "London, UK",
    },
    timestamp: "3 hours ago",
    content: "Exploring the English countryside on my bike. Nothing beats the fresh air and open roads. 🚴‍♂️",
    images: ["/images/swiss-alps.png"],
    likes: 98,
    comments: 10,
    tags: ["UK", "Adventure", "Cycling"],
    liked: false,
    bookmarked: false,
  },
  {
    id: 3,
    author: {
      name: "Brad Pitt",
      avatar: "/images/brad-pitt.jpg",
      location: "Patagonia, Argentina",
    },
    timestamp: "5 hours ago",
    content: "Hiking in Patagonia is a dream come true. The landscapes are unreal and the people are amazing! 🏔️",
    images: ["/images/iceland-landscape.png"],
    likes: 110,
    comments: 12,
    tags: ["Patagonia", "Hiking", "Adventure"],
    liked: false,
    bookmarked: false,
  },
  {
    id: 4,
    author: {
      name: "Tom Cruise",
      avatar: "/images/tom-cruise.jpg",
      location: "Marrakech, Morocco",
    },
    timestamp: "8 hours ago",
    content: "Mission accomplished! Survived the Marrakech medina and found the best tagine in town. 🥘",
    images: ["/images/morocco-market.png"],
    likes: 105,
    comments: 9,
    tags: ["Morocco", "Food", "Mission Impossible"],
    liked: false,
    bookmarked: false,
  },
  {
    id: 5,
    author: {
      name: "Ryan Gosling",
      avatar: "/images/ryan-gosling.jpg",
      location: "Paris, France",
    },
    timestamp: "1 day ago",
    content: "Found the coolest jazz bar in Paris last night. The music scene here is incredible. 🎷",
    images: ["/images/santorini-sunset.png"],
    likes: 99,
    comments: 7,
    tags: ["Paris", "Jazz", "Nightlife"],
    liked: false,
    bookmarked: false,
  },
  {
    id: 6,
    author: {
      name: "Jake Gyllenhaal",
      avatar: "/images/Jake Gyllenhaal.jpg",
      location: "Reykjavik, Iceland",
    },
    timestamp: "2 days ago",
    content: "Chasing the Northern Lights in Iceland. Got some amazing shots! 📸",
    images: ["/images/iceland-landscape.png"],
    likes: 130,
    comments: 18,
    tags: ["Iceland", "Photography", "Nature"],
    liked: false,
    bookmarked: false,
  },
]

export default function JournalPage() {
  const [posts, setPosts] = useState(journalPosts)
  const [newPost, setNewPost] = useState("")

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const toggleBookmark = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-display text-5xl md:text-6xl font-bold">Travel Journal</h1>
              <p className="text-xl opacity-90 mt-2">
                Share your adventures and discover stories from fellow travelers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-2xl">
        {/* Create Post */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <Textarea
                  placeholder="Share your travel story..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-base"
                />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Location
                    </Button>
                  </div>
                  <Button disabled={!newPost.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {post.author.location}
                          <span className="mx-2">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.timestamp}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <p className="text-sm leading-relaxed">{post.content}</p>
                </div>

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div
                    className={`grid gap-1 ${
                      post.images.length === 1
                        ? "grid-cols-1"
                        : post.images.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-2"
                    }`}
                  >
                    {post.images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative ${post.images.length === 3 && index === 0 ? "col-span-2" : ""}`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-64 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                        />
                        {index === 2 && post.images.length > 3 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">+{post.images.length - 3}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Post Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="px-6 py-3">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="px-6 py-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(post.id)}
                        className={post.liked ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-current" : ""}`} />
                        {post.likes}
                      </Button>

                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {post.comments}
                      </Button>

                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(post.id)}
                      className={post.bookmarked ? "text-blue-500" : ""}
                    >
                      <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Stories
          </Button>
        </div>
      </div>
    </div>
  )
}
