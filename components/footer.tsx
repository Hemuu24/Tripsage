"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react"
import ShinyText from "@/components/ui/shiny-text"
import MagicGlow from "@/components/ui/magic-glow"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    if (email) {
      // Here you would typically send the email to your backend
      alert(`Thank you for subscribing with: ${email}`)
      setEmail("")
    } else {
      alert("Please enter a valid email address")
    }
  }

  const footerLinks = {
    discover: [
      { label: "Destinations", href: "/discover" },
      { label: "Travel Journal", href: "/journal" },
      { label: "About Us", href: "/about" },
    ],
    community: [
      { label: "Find Travelers", href: "/travelers" },
      { label: "Join Trips", href: "/trips" },
      { label: "Travel Forum", href: "/forum" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Safety Guidelines", href: "/safety" },
      { label: "Contact Us", href: "/contact" },
    ],
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/tripsage_logo.png"
                alt="TripSage"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>

            <p className="text-background/70 max-w-sm">
              Connecting travelers worldwide to create unforgettable adventures together. Your journey starts with
              finding the right travel companions.
            </p>

            <div className="flex space-x-4">
              <MagicGlow enableParticles={true} particleCount={4} className="rounded-lg">
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background transition-all duration-300 hover:scale-110" asChild>
                  <a href="https://www.instagram.com/the_trip_sage/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              </MagicGlow>
              <MagicGlow enableParticles={true} particleCount={4} className="rounded-lg">
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background transition-all duration-300 hover:scale-110" asChild>
                  <a href="https://x.com/The_Trip_Sage" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
              </MagicGlow>
            </div>
          </div>

          {/* Links sections */}
          <MagicGlow className="space-y-4 p-6" enableParticles={true} particleCount={6}>
            <h3 className="font-semibold text-lg">
              <ShinyText text="Discover" speed={6} />
            </h3>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-background/70 hover:text-background transition-colors cursor-pointer hover:underline block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MagicGlow>

          <MagicGlow className="space-y-4 p-6" enableParticles={true} particleCount={6}>
            <h3 className="font-semibold text-lg">
              <ShinyText text="Community" speed={7} />
            </h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-background/70 hover:text-background transition-colors cursor-pointer hover:underline block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MagicGlow>

          <MagicGlow className="space-y-4 p-6" enableParticles={true} particleCount={6}>
            <h3 className="font-semibold text-lg">
              <ShinyText text="Support" speed={8} />
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-background/70 hover:text-background transition-colors cursor-pointer hover:underline block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MagicGlow>
        </div>

        {/* Newsletter section */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <MagicGlow className="p-8" enableParticles={true} particleCount={8}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  <ShinyText text="Stay Updated" speed={5} />
                </h3>
                <p className="text-background/70">Get the latest travel tips, destination guides, and community updates.</p>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/10 border-background/30 text-background placeholder:text-background/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                />
                <Button 
                  onClick={handleSubscribe}
                  className="gradient-bg-primary relative overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <ShinyText text="Subscribe" speed={4} className="text-white" />
                </Button>
              </div>
            </div>
          </MagicGlow>
        </div>

        {/* Bottom section */}
        <Separator className="my-8 bg-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-background/70">
            <p>&copy; 2024 TripSage. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-background transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-background/70">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Global Platform</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
