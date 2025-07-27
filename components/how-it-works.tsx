import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Calendar, Camera } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Explore destinations through our interactive map and community recommendations",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Connect",
    description: "Find like-minded travelers who share your interests and travel style",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Calendar,
    title: "Plan",
    description: "Collaborate on itineraries, budgets, and logistics with your travel group",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Camera,
    title: "Share",
    description: "Document your adventures and inspire others with your travel stories",
    color: "from-orange-500 to-orange-600",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="text-center space-y-6 mb-20">
          <Badge className="px-6 py-2 text-sm font-semibold bg-foreground text-background rounded-full border-0">
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
            Your Journey in Four Simple Steps
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From discovery to memories, we make travel planning social and seamless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="relative overflow-hidden border-2 border-border bg-background hover:border-foreground transition-all duration-500 group hover:shadow-2xl"
            >
              <CardContent className="p-8 lg:p-10 text-center space-y-6">
                <div className="relative">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                  >
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-foreground transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </CardContent>

              {/* Connecting arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-foreground/20 to-transparent" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
