"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import { RollingGallery } from "./rolling-gallery"
import SplitText from "@/components/ui/split-text"

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative">
      {/* Main Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="container relative z-10 text-center space-y-12 px-4 py-20">
          {/* Badge */}
          <Badge className="mb-8 bg-foreground text-background border-0 px-6 py-3 text-sm font-semibold rounded-none">
            <Sparkles className="w-4 h-4 mr-2" />
            Join 50K+ Travel Enthusiasts
          </Badge>

          {/* Main heading */}
          <div className="space-y-8">
            <div className="text-hero text-6xl md:text-8xl lg:text-9xl text-foreground leading-none">
              <SplitText 
                text="Discover." 
                splitType="chars"
                delay={80}
                duration={0.8}
                className="block mb-4"
                from={{ opacity: 0, y: 100, rotationX: -90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
              />
              <SplitText 
                text="Connect." 
                splitType="chars"
                delay={100}
                duration={0.8}
                className="block mb-4"
                from={{ opacity: 0, y: 100, rotationX: -90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
              />
              <SplitText 
                text="Explore." 
                splitType="chars"
                delay={120}
                duration={0.8}
                className="block"
                from={{ opacity: 0, y: 100, rotationX: -90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
              />
            </div>

            <div className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              <SplitText 
                text="Join a community of like-minded travelers. Plan adventures, share experiences, and explore the world with your tribe, not solo."
                splitType="words"
                delay={50}
                duration={0.6}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
              />
            </div>
          </div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mt-16">
            <div className="relative">
              <Input
                placeholder="Where do you want to explore next?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-minimal w-full pl-6 pr-32 py-6 text-lg text-foreground placeholder:text-muted-foreground"
              />
              <Button
                size="lg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-minimal px-8 py-3"
              >
                Explore
              </Button>
            </div>
          </div>

          {/* Trending destinations */}
          <div className="space-y-6 mt-16">
            <div className="inline-block border-2 border-foreground px-8 py-4">
              <p className="text-foreground text-xl font-display font-bold tracking-wide uppercase">Trending destinations</p>
            </div>
          </div>

          {/* Rolling Gallery - Moved here */}
          <div className="mt-8">
            <RollingGallery />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
            <Button
              size="lg"
              className="btn-minimal px-12 py-4 text-lg"
              asChild
            >
              <Link href="/discover">
                <MapPin className="mr-3 h-5 w-5" />
                Start Exploring
              </Link>
            </Button>

            <Button
              size="lg"
              className="btn-minimal-outline px-12 py-4 text-lg"
              asChild
            >
              <Link href="/travelers">
                <Users className="mr-3 h-5 w-5" />
                Find Travel Buddies
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
