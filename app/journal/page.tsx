"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { getJournalPosts, PostWithProfile, getAllPostsDebug } from "@/lib/post-helpers"
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

export default function JournalPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<PostWithProfile[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [newPost, setNewPost] = useState("")

  const handleCreateClick = () => {
    if (!user) {
      router.push('/login')
      return
    }
    router.push('/journal/create')
  }

  // Load journal posts from database
  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('Loading journal posts...')
        const allPosts = await getAllPostsDebug()
        console.log('All posts found:', allPosts)
        
        const journalPosts = await getJournalPosts()
        console.log('Journal posts found:', journalPosts)
        setPosts(journalPosts)
      } catch (error) {
        console.error('Error loading journal posts:', error)
      }
      setLoadingPosts(false)
    }
    loadPosts()
  }, [])

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes_count: post.likes_count + 1,
            }
          : post,
      ),
    )
  }

  const toggleBookmark = (postId: string) => {
    // Bookmark functionality would need to be implemented with a separate table
    console.log('Bookmark toggled for post:', postId)
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
                <AvatarImage 
                  src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "/placeholder-user.jpg"} 
                  alt={user?.user_metadata?.full_name || user?.email || "You"} 
                />
                <AvatarFallback>
                  {user?.user_metadata?.full_name 
                    ? user.user_metadata.full_name.split(" ").map((n: string) => n[0]).join("")
                    : user?.email?.charAt(0).toUpperCase() || "U"
                  }
                </AvatarFallback>
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
                  <Button onClick={handleCreateClick}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Journal Entry
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        {/* Posts */}
        {loadingPosts ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No journal entries yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to share your travel experience!</p>
            <Button onClick={handleCreateClick}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Entry
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.profiles?.avatar_url || "/placeholder-user.jpg"} alt={post.profiles?.username || 'User'} />
                        <AvatarFallback>
                          {(post.profiles?.username || post.profiles?.full_name || 'U')
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.profiles?.username || post.profiles?.full_name || 'Anonymous'}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {post.location || 'Unknown'}
                          <span className="mx-2">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.created_at).toLocaleDateString()}
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
                        className={`relative ${post.images && post.images.length === 3 && index === 0 ? "col-span-2" : ""}`}
                      >
                        <img
                          src={image || "/placeholder.jpg"}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-64 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                        />
                        {index === 2 && post.images && post.images.length > 3 && (
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
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        {post.likes_count || 0}
                      </Button>

                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {post.comments_count || 0}
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
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

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
