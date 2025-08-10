import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Heart, Award, MapPin, Plane } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Active Travelers", value: "50K+", icon: Users },
    { label: "Countries Covered", value: "195", icon: Globe },
    { label: "Trips Organized", value: "12K+", icon: Plane },
    { label: "Success Stories", value: "8K+", icon: Heart },
  ]



  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <Badge className="bg-background text-foreground border-0 px-6 py-3 text-sm font-semibold rounded-none">
              About TripSage
            </Badge>
            <h1 className="text-display text-5xl md:text-6xl font-bold">
              Connecting Travelers,
              <br />
              Creating Adventures
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We believe that the best travel experiences happen when like-minded people explore the world together. 
              TripSage is more than a platform—it's a global community of adventurers.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Mission Section */}
        <div className="text-center space-y-8 mb-20">
          <h2 className="text-heading text-4xl font-bold">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            To revolutionize how people travel by fostering authentic connections between travelers, 
            making it easy to find compatible travel companions, and creating unforgettable shared experiences 
            that break down barriers and build lasting friendships across cultures.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="card-minimal text-center">
              <CardContent className="p-8">
                <stat.icon className="h-12 w-12 text-foreground mx-auto mb-4" />
                <div className="text-heading text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-muted-foreground font-semibold">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-heading text-4xl font-bold">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                TripSage was born from a simple frustration: traveling solo was lonely, but finding compatible 
                travel companions was nearly impossible. Our founder, Sarah, experienced this firsthand during 
                a solo trip to Iceland in 2019.
              </p>
              <p className="text-lg leading-relaxed">
                She met amazing fellow travelers by chance at a hostel, and that serendipitous encounter turned 
                into the adventure of a lifetime. But she realized this shouldn't be left to chance—there had 
                to be a better way to connect travelers with shared interests and compatible travel styles.
              </p>
              <p className="text-lg leading-relaxed">
                That's when the idea for TripSage was born. We launched in 2020 with a simple goal: make it 
                easy for travelers to find their perfect travel companions and create extraordinary adventures together.
              </p>
            </div>
          </div>
          <Card className="card-minimal overflow-hidden">
            <img 
              src="/images/iceland-landscape.png" 
              alt="Iceland landscape that inspired TripSage" 
              className="w-full h-96 object-cover"
            />
          </Card>
        </div>

        {/* Values Section */}
        <div className="text-center space-y-12 mb-20">
          <h2 className="text-heading text-4xl font-bold">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-minimal">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-foreground mx-auto mb-4" />
                <h3 className="text-heading text-xl font-bold mb-4">Authentic Connections</h3>
                <p className="text-muted-foreground">
                  We believe in fostering genuine relationships between travelers that extend beyond the trip.
                </p>
              </CardContent>
            </Card>
            <Card className="card-minimal">
              <CardContent className="p-8 text-center">
                <Globe className="h-12 w-12 text-foreground mx-auto mb-4" />
                <h3 className="text-heading text-xl font-bold mb-4">Cultural Understanding</h3>
                <p className="text-muted-foreground">
                  Travel breaks down barriers and builds bridges between cultures and communities.
                </p>
              </CardContent>
            </Card>
            <Card className="card-minimal">
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-foreground mx-auto mb-4" />
                <h3 className="text-heading text-xl font-bold mb-4">Safety First</h3>
                <p className="text-muted-foreground">
                  We prioritize the safety and security of our community above all else.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </div>
  )
}
