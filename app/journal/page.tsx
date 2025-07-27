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
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Bali, Indonesia",
    },
    timestamp: "2 hours ago",
    content:
      "Just witnessed the most incredible sunset at Tanah Lot Temple! The way the light danced on the waves was absolutely magical. Sometimes you have to wake up at 5 AM for moments like these. 🌅",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    likes: 127,
    comments: 23,
    tags: ["Bali", "Sunset", "Temple", "Photography"],
    liked: false,
    bookmarked: true,
  },
  {
    id: 2,
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Patagonia, Chile",
    },
    timestamp: "5 hours ago",
    content:
      "Day 3 of the Torres del Paine trek. My legs are screaming but my soul is singing! The landscape here is otherworldly - jagged peaks, pristine lakes, and endless skies. Met some amazing fellow hikers from Germany who shared their trail mix. Travel really brings out the best in people! 🥾⛰️",
    images: ["/placeholder.svg?height=400&width=600"],
    likes: 89,
    comments: 15,
    tags: ["Patagonia", "Hiking", "Adventure", "Mountains"],
    liked: true,
    bookmarked: false,
  },
  {
    id: 3,
    author: {
      name: "Elena Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Marrakech, Morocco",
    },
    timestamp: "1 day ago",
    content:
      "Lost in the maze of Marrakech medina and loving every minute of it! The colors, the sounds, the smells - it's sensory overload in the best way possible. Just had the most amazing tagine at a tiny local spot recommended by our guide Ahmed. Pro tip: always trust the locals! 🏺",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    likes: 156,
    comments: 31,
    tags: ["Morocco", "Food", "Culture", "Medina"],
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
