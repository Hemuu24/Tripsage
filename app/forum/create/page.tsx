"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Tag, Send, ArrowLeft, X, HelpCircle, MapPin, DollarSign, Users } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { createPost } from "@/lib/post-helpers"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CreateForumPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [posting, setPosting] = useState(false)
  
  const [forumData, setForumData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[]
  })

  const [currentTag, setCurrentTag] = useState("")

  const categories = [
    { value: "general", label: "General Discussion", icon: MessageSquare },
    { value: "destinations", label: "Destinations", icon: MapPin },
    { value: "budget", label: "Budget Travel", icon: DollarSign },
    { value: "companions", label: "Find Travel Buddies", icon: Users },
    { value: "advice", label: "Travel Advice", icon: HelpCircle },
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleInputChange = (field: string, value: any) => {
    setForumData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (currentTag && !forumData.tags.includes(currentTag)) {
      setForumData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setForumData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handlePost = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive"
      })
      return
    }

    setPosting(true)
    
    try {
      // Prepare the post data
      const postData = {
        user_id: user.id,
        title: forumData.title,
        content: forumData.content,
        location: forumData.category === 'destinations' ? 'Various Locations' : 'Global',
        tags: ['forum', forumData.category, ...forumData.tags],
        images: [],
        trip_dates: null,
        looking_for_companions: forumData.category === 'companions',
        max_companions: forumData.category === 'companions' ? 4 : null
      }

      // Create the post in the database
      const newPost = await createPost(postData)
      
      if (newPost) {
        toast({
          title: "Success!",
          description: "Your forum post has been created successfully!",
        })
        
        // Redirect to the forum page
        router.push('/forum')
      } else {
        throw new Error('Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      toast({
        title: "Error",
        description: "Failed to create your post. Please try again.",
        variant: "destructive"
      })
    } finally {
      setPosting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-12">
        <div className="container">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-background hover:bg-background/20" asChild>
              <Link href="/forum">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Forum
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <h1 className="text-4xl font-bold">Start a Discussion</h1>
            <p className="text-background/80 mt-2">Ask questions, share tips, or connect with fellow travelers</p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="card-minimal">
            <CardHeader>
              <CardTitle>Create Forum Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Category *</label>
                <Select value={forumData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="input-minimal">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center space-x-2">
                          <category.icon className="w-4 h-4" />
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Title *</label>
                <Input
                  value={forumData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="input-minimal"
                  placeholder="What do you want to discuss?"
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Your Question or Discussion *</label>
                <Textarea
                  value={forumData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  className="input-minimal min-h-[200px]"
                  placeholder="Provide details about your question or topic. The more information you give, the better the community can help you!"
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Tags</label>
                <div className="flex space-x-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    className="input-minimal flex-1"
                    placeholder="Add a tag (e.g., Italy, backpacking, solo-travel)..."
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} variant="outline" className="btn-minimal-outline">
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                {forumData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {forumData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-foreground text-background">
                        {tag}
                        <X 
                          className="w-3 h-3 ml-1 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Guidelines */}
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Forum Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be respectful and helpful to fellow travelers</li>
                  <li>• Search existing posts before asking duplicate questions</li>
                  <li>• Use clear, descriptive titles for better responses</li>
                  <li>• Add relevant tags to help others find your post</li>
                </ul>
              </div>

              {/* Post Button */}
              <div className="pt-6 border-t">
                <Button 
                  onClick={handlePost}
                  disabled={posting || !forumData.title || !forumData.content || !forumData.category}
                  className="btn-minimal w-full"
                >
                  {posting ? (
                    "Posting..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Post to Forum
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
