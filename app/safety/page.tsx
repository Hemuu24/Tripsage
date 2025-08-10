import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, Users, Phone, MapPin, Eye, FileText, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function SafetyPage() {
  const safetyTips = [
    {
      icon: Users,
      title: "Before Meeting",
      tips: [
        "Video chat with potential travel companions before meeting in person",
        "Meet in public places for initial meetings - never at private homes",
        "Verify identity through social media profiles and mutual connections",
        "Trust your instincts - if something feels off, don't proceed",
        "Tell friends or family about your plans and who you're meeting"
      ]
    },
    {
      icon: Eye,
      title: "During Initial Meetings",
      tips: [
        "Meet during daylight hours in busy, public locations",
        "Bring a friend or let someone know your exact location",
        "Don't share personal financial information or travel documents",
        "Keep your phone charged and with you at all times",
        "Have your own transportation arranged to leave if needed"
      ]
    },
    {
      icon: MapPin,
      title: "Travel Preparation",
      tips: [
        "Research your destination thoroughly before traveling",
        "Purchase comprehensive travel insurance for your trip",
        "Share your complete itinerary with trusted contacts",
        "Keep copies of important documents in separate locations",
        "Know local emergency numbers and embassy contacts"
      ]
    },
    {
      icon: Shield,
      title: "During Travel",
      tips: [
        "Maintain regular check-ins with family or friends back home",
        "Keep some money and documents separate from the group",
        "Be aware of local customs, laws, and potential risks",
        "Have a backup plan if you need to leave the group early",
        "Document your experiences but be mindful of sharing real-time locations"
      ]
    }
  ]

  const redFlags = [
    "Asking for money, financial information, or travel documents upfront",
    "Pressuring you to meet immediately without proper conversation",
    "Refusing to video chat or meet in public places first",
    "Inconsistent information in their profile or conversations",
    "Requests to keep your travel plans secret from others",
    "Aggressive or inappropriate behavior in messages",
    "Newly created profiles with minimal information",
    "Stories that don't add up or seem too good to be true"
  ]

  const emergencyContacts = [
    { location: "India", number: "112", description: "Emergency Services (All States)" },
    { location: "India Police", number: "100", description: "Police Emergency" },
    { location: "India Fire", number: "101", description: "Fire Emergency" },
    { location: "India Medical", number: "108", description: "Medical Emergency" },
    { location: "United States", number: "911", description: "Emergency Services" },
    { location: "European Union", number: "112", description: "Emergency Services" },
    { location: "United Kingdom", number: "999", description: "Emergency Services" },
    { location: "Australia", number: "000", description: "Emergency Services" },
    { location: "International", number: "+91-11-2301-2113", description: "Indian Embassy Abroad" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <Badge className="bg-background text-foreground border-0 px-6 py-3 text-sm font-semibold rounded-none">
              <Shield className="w-4 h-4 mr-2" />
              Safety Guidelines
            </Badge>
            <h1 className="text-display text-5xl md:text-6xl font-bold">
              Your Safety is Our Priority
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Traveling with new people can be incredibly rewarding, but it's important to take proper precautions. 
              Follow these guidelines to ensure safe and enjoyable adventures.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Safety Tips */}
          <div className="space-y-8">
            <h2 className="text-heading text-3xl font-bold text-center">Essential Safety Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {safetyTips.map((section, index) => (
                <Card key={index} className="card-minimal">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <section.icon className="h-8 w-8 text-foreground" />
                      <h3 className="text-heading text-xl font-bold">{section.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-foreground rounded-full mt-3 flex-shrink-0" />
                          <p className="text-muted-foreground leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Red Flags */}
          <Card className="card-minimal border-2 border-red-200">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <h2 className="text-heading text-2xl font-bold text-red-600">Warning Signs to Watch For</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Be cautious if you encounter any of these red flags when communicating with potential travel companions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {redFlags.map((flag, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{flag}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Phone className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">Emergency Contacts</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Keep these important emergency numbers saved in your phone before traveling:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">{contact.location}</h4>
                    <p className="text-2xl font-bold text-foreground mb-1">{contact.number}</p>
                    <p className="text-xs text-muted-foreground">{contact.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Travel Insurance */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">Travel Insurance</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We strongly recommend purchasing comprehensive travel insurance before any trip. Good travel insurance should cover:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Medical emergencies and hospital expenses</li>
                  <li>• Trip cancellation and interruption</li>
                  <li>• Lost, stolen, or damaged luggage</li>
                  <li>• Emergency evacuation and repatriation</li>
                  <li>• 24/7 emergency assistance services</li>
                </ul>
                <p>
                  Many credit cards offer travel insurance, but check the coverage details carefully. 
                  Consider purchasing additional coverage if needed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card className="card-minimal border-2 border-foreground">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">Report Safety Concerns</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                If you encounter any safety issues, inappropriate behavior, or have concerns about another user, 
                please report it immediately. We take all reports seriously and investigate promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-minimal">
                  <Link href="/report" className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report an Issue
                  </Link>
                </Button>
                <Button variant="outline" className="btn-minimal-outline">
                  <Link href="/contact" className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card className="card-minimal bg-muted">
            <CardContent className="p-8 text-center">
              <h2 className="text-heading text-2xl font-bold mb-4">Additional Safety Resources</h2>
              <p className="text-muted-foreground mb-6">
                For more detailed safety information and country-specific travel advisories, 
                consult these official resources:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://travel.state.gov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:underline"
                >
                  US State Department Travel Advisories
                </a>
                <a 
                  href="https://www.gov.uk/foreign-travel-advice" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:underline"
                >
                  UK Foreign Travel Advice
                </a>
                <a 
                  href="https://smartraveller.gov.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:underline"
                >
                  Australian Travel Advice
                </a>
                <a 
                  href="https://travel.gc.ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:underline"
                >
                  Canadian Travel Advice
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
