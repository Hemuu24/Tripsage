"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Camera, MapPin, Calendar as CalendarIcon, Tag, Users, Send, ArrowLeft, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { createPost, uploadPostImages } from "@/lib/post-helpers"
import Link from "next/link"
import { format } from "date-fns"

export default function CreateJournalPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [publishing, setPublishing] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const [journalData, setJournalData] = useState({
    title: "",
    content: "",
    location: "",
    tags: ["journal"] as string[], // Always include 'journal' tag
    images: [] as string[],
    selectedFiles: [] as File[],
    trip_dates: {
      start_date: null as Date | null,
      end_date: null as Date | null
    },
    looking_for_companions: false,
    max_companions: 1
  })

  const [currentTag, setCurrentTag] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleInputChange = (field: string, value: any) => {
    setJournalData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (currentTag && !journalData.tags.includes(currentTag)) {
      setJournalData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    // Don't allow removing the 'journal' tag
    if (tagToRemove === 'journal') return
    
    setJournalData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setJournalData(prev => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, ...files]
    }))
  }

  const removeFile = (index: number) => {
    setJournalData(prev => ({
      ...prev,
      selectedFiles: prev.selectedFiles.filter((_, i) => i !== index)
    }))
  }

  const handlePublish = async () => {
    if (!user) return
    
    setPublishing(true)
    try {
      // First upload images if any
      let imageUrls: string[] = []
      if (journalData.selectedFiles.length > 0) {
        setUploading(true)
        imageUrls = await uploadPostImages(user.id, journalData.selectedFiles)
        setUploading(false)
      }

      // Create the post
      const postData = {
        user_id: user.id,
        title: journalData.title,
        content: journalData.content,
        location: journalData.location || null,
        tags: journalData.tags,
        images: imageUrls,
        trip_dates: journalData.trip_dates.start_date || journalData.trip_dates.end_date ? {
          start_date: journalData.trip_dates.start_date?.toISOString().split('T')[0] || null,
          end_date: journalData.trip_dates.end_date?.toISOString().split('T')[0] || null
        } : null,
        looking_for_companions: journalData.looking_for_companions,
        max_companions: journalData.looking_for_companions ? journalData.max_companions : null
      }

      const newPost = await createPost(postData)
      if (newPost) {
        router.push('/journal')
      } else {
        throw new Error('Failed to create post')
      }
    } catch (error) {
      console.error('Error publishing journal:', error)
      alert('Failed to publish journal. Please try again.')
    }
    setPublishing(false)
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
              <Link href="/journal">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Journal
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <h1 className="text-4xl font-bold">Share Your Journey</h1>
            <p className="text-background/80 mt-2">Tell the community about your travel experience</p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="card-minimal">
            <CardHeader>
              <CardTitle>Create Journal Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Title *</label>
                <Input
                  value={journalData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="input-minimal"
                  placeholder="Give your journey a memorable title..."
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    value={journalData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="input-minimal pl-10"
                    placeholder="Where did you go?"
                  />
                </div>
              </div>

              {/* Trip Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="btn-minimal-outline w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {journalData.trip_dates.start_date ? format(journalData.trip_dates.start_date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={journalData.trip_dates.start_date || undefined}
                        onSelect={(date) => handleInputChange("trip_dates", { ...journalData.trip_dates, start_date: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="btn-minimal-outline w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {journalData.trip_dates.end_date ? format(journalData.trip_dates.end_date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={journalData.trip_dates.end_date || undefined}
                        onSelect={(date) => handleInputChange("trip_dates", { ...journalData.trip_dates, end_date: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Your Story *</label>
                <Textarea
                  value={journalData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  className="input-minimal min-h-[300px]"
                  placeholder="Share your travel experience... What did you see? What did you learn? What would you recommend to others?"
                />
              </div>

              {/* Images */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Photos</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    {uploading ? "Uploading photos..." : "Upload photos from your trip"}
                  </p>
                  <Button 
                    variant="outline" 
                    className="btn-minimal-outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 5MB each</p>
                </div>
                
                {/* Selected Files Preview */}
                {journalData.selectedFiles.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {journalData.selectedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Tags</label>
                <div className="flex space-x-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    className="input-minimal flex-1"
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} variant="outline" className="btn-minimal-outline">
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                {journalData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {journalData.tags.map((tag, index) => (
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

              {/* Publish Button */}
              <div className="pt-6 border-t">
                <Button 
                  onClick={handlePublish}
                  disabled={publishing || !journalData.title || !journalData.content}
                  className="btn-minimal w-full"
                >
                  {publishing ? (
                    "Publishing..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Publish Journal Entry
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
