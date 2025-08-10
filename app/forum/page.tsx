"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { getForumPosts, PostWithProfile, getAllPostsDebug } from "@/lib/post-helpers"
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

// Fallback sample forum posts when database is empty
const fallbackForumPosts: PostWithProfile[] = [
  {
    id: 'sample-1',
    user_id: 'rdj-user',
    title: 'Best time to visit Iceland?',
    content: 'Planning a trip to Iceland and wondering about the best time to visit. I want to see the Northern Lights but also want to avoid extreme weather. Any recommendations? The landscapes there look absolutely incredible!',
    images: null,
    location: 'Iceland',
    tags: ['forum', 'Iceland', 'Northern Lights', 'Planning'],
    trip_dates: null,
    looking_for_companions: false,
    max_companions: null,
    likes_count: 156,
    comments_count: 23,
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z',
    profiles: {
      username: 'robert_downey_jr',
      full_name: 'Robert Downey Jr.',
      avatar_url: '/images/rdj.jpg'
    }
  },
  {
    id: 'sample-2',
    user_id: 'henry-cavill-user',
    title: 'Solo travel safety tips for women',
    content: 'I\'m planning my first solo trip to Europe and would love to hear from experienced solo travelers about safety tips, especially for women. What are your must-know safety practices? I want to make sure I can explore confidently and safely.',
    images: null,
    location: 'Europe',
    tags: ['forum', 'Solo Travel', 'Safety', 'Women Travelers'],
    trip_dates: null,
    looking_for_companions: false,
    max_companions: null,
    likes_count: 234,
    comments_count: 45,
    created_at: '2025-01-14T15:30:00Z',
    updated_at: '2025-01-14T15:30:00Z',
    profiles: {
      username: 'henry_cavill',
      full_name: 'Henry Cavill',
      avatar_url: '/images/henry-cavill.jpg'
    }
  },
  {
    id: 'sample-3',
    user_id: 'brad-pitt-user',
    title: 'Budget accommodation in Paris',
    content: 'Looking for affordable but safe accommodation options in Paris. Any recommendations for budget hotels or hostels that are well-located and clean? I want to experience the city without breaking the bank.',
    images: null,
    location: 'Paris, France',
    tags: ['forum', 'Paris', 'Budget', 'Accommodation'],
    trip_dates: null,
    looking_for_companions: false,
    max_companions: null,
    likes_count: 189,
    comments_count: 31,
    created_at: '2025-01-13T09:15:00Z',
    updated_at: '2025-01-13T09:15:00Z',
    profiles: {
      username: 'brad_pitt',
      full_name: 'Brad Pitt',
      avatar_url: '/images/brad-pitt.jpg'
    }
  },
  {
    id: 'sample-4',
    user_id: 'tom-cruise-user',
    title: 'Travel insurance recommendations',
    content: 'What travel insurance companies do you recommend? I\'m looking for good coverage at a reasonable price, especially for international travel. Safety first, right?',
    images: null,
    location: 'Global',
    tags: ['forum', 'Insurance', 'Planning', 'Safety'],
    trip_dates: null,
    looking_for_companions: false,
    max_companions: null,
    likes_count: 142,
    comments_count: 28,
    created_at: '2025-01-12T14:45:00Z',
    updated_at: '2025-01-12T14:45:00Z',
    profiles: {
      username: 'tom_cruise',
      full_name: 'Tom Cruise',
      avatar_url: '/images/tom-cruise.jpg'
    }
  },
  {
    id: 'sample-5',
    user_id: 'ryan-gosling-user',
    title: 'Best apps for travel planning',
    content: 'What are your favorite apps for planning trips? I\'m looking for recommendations for booking flights, finding accommodation, and discovering local attractions. Technology makes everything so much easier these days!',
    images: null,
    location: 'Global',
    tags: ['forum', 'Apps', 'Planning', 'Technology'],
    trip_dates: null,
    looking_for_companions: false,
    max_companions: null,
    likes_count: 203,
    comments_count: 37,
    created_at: '2025-01-11T11:20:00Z',
    updated_at: '2025-01-11T11:20:00Z',
    profiles: {
      username: 'ryan_gosling',
      full_name: 'Ryan Gosling',
      avatar_url: '/images/ryan-gosling.jpg'
    }
  },
  {
    id: 'sample-6',
    user_id: 'jake-gyllenhaal-user',
    title: 'Hidden gems in Morocco',
    content: 'I\'ve been to the main tourist spots in Morocco, but I\'m looking for those hidden gems that most travelers miss. Any recommendations for off-the-beaten-path experiences? I love discovering authentic local culture.',
    images: null,
    location: 'Morocco',
    tags: ['forum', 'Morocco', 'Hidden Gems', 'Local Culture'],
    trip_dates: null,
    looking_for_companions: false,
    max_companions: null,
    likes_count: 167,
    comments_count: 29,
    created_at: '2025-01-10T16:45:00Z',
    updated_at: '2025-01-10T16:45:00Z',
    profiles: {
      username: 'jake_gyllenhaal',
      full_name: 'Jake Gyllenhaal',
      avatar_url: '/images/Jake Gyllenhaal.jpg'
    }
  }
]

export default function ForumPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<PostWithProfile[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

    const loadPosts = async () => {
      try {
        console.log('Loading forum posts...')
        const forumPosts = await getForumPosts()
        console.log('Forum posts found:', forumPosts)
      
      // If no forum posts found in database, use fallback sample data
      if (forumPosts.length === 0) {
        console.log('No forum posts in database, using fallback sample data')
        setPosts(fallbackForumPosts)
      } else {
        // Combine real posts with sample posts, ensuring no duplicates
        const realPostIds = new Set(forumPosts.map(p => p.id))
        const uniqueSamplePosts = fallbackForumPosts.filter(p => !realPostIds.has(p.id))
        const combinedPosts = [...forumPosts, ...uniqueSamplePosts]
        setPosts(combinedPosts)
      }
      } catch (error) {
        console.error('Error loading forum posts:', error)
      // On error, use fallback data
      setPosts(fallbackForumPosts)
      }
      setLoadingPosts(false)
    }

  useEffect(() => {
    loadPosts()
  }, [])

  // Refresh posts when the page becomes visible (e.g., after creating a new post)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadPosts()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const handleCreateClick = () => {
    if (!user) {
      router.push('/login')
      return
    }
    router.push('/forum/create')
  }

  const handleRefresh = () => {
    setLoadingPosts(true)
    loadPosts()
  }

  const filteredDiscussions = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "popular":
        return (b.likes_count || 0) - (a.likes_count || 0)
      case "replies":
        return (b.comments_count || 0) - (a.comments_count || 0)
      case "views":
        return 0 // TODO: implement views count
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
            {/* Info Message */}
            <Card className="card-minimal bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-800">
                      <strong>Welcome to the Travel Forum!</strong> Start discussions, ask questions, and connect with fellow travelers. 
                      Your new posts will appear here automatically. Use the refresh button to see the latest content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  disabled={loadingPosts}
                  className="btn-minimal-outline"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </Button>
              </div>
              <Button className="btn-minimal" onClick={handleCreateClick}>
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {loadingPosts ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
                </div>
              ) : sortedDiscussions.length > 0 ? (
                sortedDiscussions.map((post) => (
                  <Card key={post.id} className="card-minimal hover:border-foreground transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={post.profiles?.avatar_url || "/placeholder-user.jpg"} alt={post.profiles?.username || 'User'} />
                          <AvatarFallback>
                            {(post.profiles?.username || post.profiles?.full_name || 'U')
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="text-heading text-lg font-semibold hover:text-foreground cursor-pointer">
                                  {post.title}
                                </h3>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center space-x-1">
                                  <span className="font-semibold">{post.profiles?.username || post.profiles?.full_name || 'Anonymous'}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(post.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-muted-foreground line-clamp-2">
                            {post.content}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <MessageSquare className="h-4 w-4" />
                                {post.comments_count || 0}
                              </span>
                              <span className="flex items-center space-x-1">
                                <ThumbsUp className="h-4 w-4" />
                                {post.likes_count || 0}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              {post.tags && post.tags.length > 0 && post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs bg-muted text-foreground rounded-none">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="card-minimal">
                  <CardContent className="p-12 text-center">
                    <MessageCircle className="h-16 w-16 text-foreground mx-auto mb-4" />
                    <h3 className="text-heading text-lg mb-2">No forum posts yet</h3>
                    <p className="text-muted-foreground">Be the first to start a discussion!</p>
                  </CardContent>
                </Card>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  )
} 