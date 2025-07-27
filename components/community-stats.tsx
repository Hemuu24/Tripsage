import { Card, CardContent } from "@/components/ui/card"
import { Users, MapPin, Calendar, Star } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Travelers",
    description: "Join our growing community",
  },
  {
    icon: MapPin,
    value: "200+",
    label: "Destinations",
    description: "Across 6 continents",
  },
  {
    icon: Calendar,
    value: "10,000+",
    label: "Trips Planned",
    description: "Adventures made possible",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "User Rating",
    description: "Trusted by travelers",
  },
]

export function CommunityStats() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Trusted by Travelers Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of adventurers who have found their perfect travel companions
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="font-semibold">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
