"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Menu, 
  Search, 
  Bell, 
  Compass, 
  Users, 
  Calendar, 
  Camera, 
  MessageCircle,
  LogOut,
  User
} from "lucide-react"
import { Logo } from "./logo"
import { useAuth } from "@/hooks/use-auth"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const navItems = [
    { href: "/discover", label: "Discover", icon: Compass },
    { href: "/trips", label: "Trips", icon: Calendar },
    { href: "/travelers", label: "Travelers", icon: Users },
    { href: "/journal", label: "Journal", icon: Camera },
    { href: "/forum", label: "Forum", icon: MessageCircle },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-muted">
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:flex relative hover:bg-muted">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-foreground text-background flex items-center justify-center">3</Badge>
          </Button>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Button variant="ghost" asChild className="hover:bg-muted">
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
                <Button variant="ghost" onClick={handleSignOut} className="hover:bg-muted">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hover:bg-muted">
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="btn-minimal" asChild>
                  <Link href="/signup">Join TripSage</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background border-l border-border">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-lg font-semibold hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="pt-6 border-t border-border">
                  <div className="flex flex-col space-y-3">
                    {user ? (
                      <>
                        <Button variant="ghost" asChild className="hover:bg-muted justify-start">
                          <Link href="/profile">
                            <User className="h-5 w-5 mr-3" />
                            Profile
                          </Link>
                        </Button>
                        <Button variant="ghost" onClick={handleSignOut} className="hover:bg-muted justify-start">
                          <LogOut className="h-5 w-5 mr-3" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" asChild className="hover:bg-muted justify-start">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button className="btn-minimal justify-start">
                          <Link href="/signup">Join TripSage</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
