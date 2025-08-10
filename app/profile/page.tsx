"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Camera, MapPin, Globe, Save, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { getUserProfile, updateUserProfile, uploadAvatar } from "@/lib/auth-helpers"
import Link from "next/link"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(true)
  
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    bio: "",
    location: "",
    travel_style: "",
    languages: "",
    interests: "",
    avatar_url: ""
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const existingProfile = await getUserProfile(user.id)
        if (existingProfile) {
          setProfile({
            full_name: existingProfile.full_name || "",
            username: existingProfile.username || "",
            bio: existingProfile.bio || "",
            location: existingProfile.location || "",
            travel_style: existingProfile.travel_style || "",
            languages: existingProfile.languages?.join(", ") || "",
            interests: existingProfile.interests?.join(", ") || "",
            avatar_url: existingProfile.avatar_url || ""
          })
        }
        setProfileLoading(false)
      }
    }
    loadProfile()
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    setUploading(true)
    try {
      const avatarUrl = await uploadAvatar(user.id, file)
      if (avatarUrl) {
        setProfile(prev => ({ ...prev, avatar_url: avatarUrl }))
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
    setUploading(false)
  }

  const handleSave = async () => {
    if (!user) return
    
    setSaving(true)
    try {
      const updatedProfile = await updateUserProfile(user.id, {
        full_name: profile.full_name || null,
        username: profile.username || null,
        bio: profile.bio || null,
        location: profile.location || null,
        travel_style: profile.travel_style || null,
        languages: profile.languages ? profile.languages.split(',').map(lang => lang.trim()).filter(Boolean) : null,
        interests: profile.interests ? profile.interests.split(',').map(interest => interest.trim()).filter(Boolean) : null,
        avatar_url: profile.avatar_url || null
      })
      
      if (updatedProfile) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        alert('Failed to save profile. Please try again.')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile. Please try again.')
    }
    setSaving(false)
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
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <h1 className="text-4xl font-bold">Edit Profile</h1>
            <p className="text-background/80 mt-2">Tell other travelers about yourself</p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="card-minimal">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="bg-foreground text-background text-xl">
                    {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    className="btn-minimal-outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {uploading ? "Uploading..." : "Change Photo"}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full Name</label>
                  <Input
                    value={profile.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    className="input-minimal"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Username</label>
                  <Input
                    value={profile.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="input-minimal"
                    placeholder="@username"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Bio</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="input-minimal min-h-[100px]"
                  placeholder="Tell other travelers about yourself..."
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    value={profile.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="input-minimal pl-10"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Travel Style</label>
                <Input
                  value={profile.travel_style}
                  onChange={(e) => handleInputChange("travel_style", e.target.value)}
                  className="input-minimal"
                  placeholder="e.g., Backpacker, Luxury, Adventure, Cultural"
                />
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Languages</label>
                <Input
                  value={profile.languages}
                  onChange={(e) => handleInputChange("languages", e.target.value)}
                  className="input-minimal"
                  placeholder="e.g., English, Spanish, French"
                />
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Travel Interests</label>
                <Input
                  value={profile.interests}
                  onChange={(e) => handleInputChange("interests", e.target.value)}
                  className="input-minimal"
                  placeholder="e.g., Photography, Food, History, Nature"
                />
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <Button 
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-minimal w-full"
                >
                  {saving ? (
                    "Saving..."
                  ) : saved ? (
                    <>Saved!</>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
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
