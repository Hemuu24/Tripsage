"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, BookOpen, MessageSquare, Users, MapPin, LogOut, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const quickActions = [
    {
      icon: BookOpen,
      title: "Write Journal Entry",
      description: "Share your travel experiences",
      href: "/journal/create",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Start Discussion",
      description: "Ask questions or share tips",
      href: "/forum/create",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Users,
      title: "Find Travel Buddies",
      description: "Connect with fellow travelers",
      href: "/travelers",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: MapPin,
      title: "Explore Destinations",
      description: "Discover new places to visit",
      href: "/discover",
      color: "bg-orange-50 text-orange-600"
    }
  ]

  const recentActivity = [
    { type: "journal", title: "Your Journey to Bali", time: "2 days ago" },
    { type: "forum", title: "Best time to visit Japan?", time: "5 days ago" },
    { type: "companion", title: "Joined trip to Iceland", time: "1 week ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-foreground text-background py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Welcome back!</h1>
              <p className="text-background/80 mt-2">Ready for your next adventure?</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-background text-foreground">
                <User className="w-4 h-4 mr-2" />
                {user.email}
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-background text-background hover:bg-background hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Card className="card-minimal hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${action.color}`}>
                          <action.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                          <p className="text-muted-foreground text-sm">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Community Stats */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Your Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-minimal text-center">
                  <CardContent className="p-6">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-muted-foreground text-sm">Journal Entries</div>
                  </CardContent>
                </Card>
                <Card className="card-minimal text-center">
                  <CardContent className="p-6">
                    <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-muted-foreground text-sm">Forum Posts</div>
                  </CardContent>
                </Card>
                <Card className="card-minimal text-center">
                  <CardContent className="p-6">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-muted-foreground text-sm">Connections</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Setup */}
            <Card className="card-minimal">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Complete Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Add more details to help other travelers connect with you.
                </p>
                <Link href="/profile">
                  <Button className="btn-minimal w-full">Update Profile</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Getting Started */}
            <Card className="card-minimal">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  </div>
                  <span className="text-sm">Create your account</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-muted-foreground">Complete your profile</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-muted-foreground">Write your first journal entry</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-muted-foreground">Join a community discussion</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
