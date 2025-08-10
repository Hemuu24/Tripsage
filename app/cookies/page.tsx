import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cookie, Settings, Shield, BarChart, Calendar } from "lucide-react"

export default function CookiesPage() {
  const lastUpdated = "January 15, 2024"

  const cookieTypes = [
    {
      icon: Shield,
      title: "Essential Cookies",
      description: "Required for basic website functionality",
      purpose: "These cookies are necessary for our website to function properly. They enable core features like security, network management, and accessibility.",
      examples: [
        "Authentication and login status",
        "Security and fraud prevention",
        "Website functionality and navigation",
        "Load balancing and server performance"
      ],
      canDisable: false
    },
    {
      icon: BarChart,
      title: "Analytics Cookies",
      description: "Help us understand how visitors use our site",
      purpose: "We use analytics cookies to understand how visitors interact with our website, which helps us improve user experience and optimize our platform.",
      examples: [
        "Page views and user journeys",
        "Popular features and content",
        "Error tracking and debugging",
        "Performance monitoring"
      ],
      canDisable: true
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "Remember your preferences and settings",
      purpose: "These cookies remember your choices and preferences to provide a more personalized experience when you return to our site.",
      examples: [
        "Language and region preferences",
        "Display settings and themes",
        "Form data and search preferences",
        "Accessibility settings"
      ],
      canDisable: true
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <Badge className="bg-background text-foreground border-0 px-6 py-3 text-sm font-semibold rounded-none">
              <Cookie className="w-4 h-4 mr-2" />
              Cookie Policy
            </Badge>
            <h1 className="text-display text-5xl md:text-6xl font-bold">
              Cookie Policy
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Learn about how we use cookies to improve your experience on TripSage 
              and how you can control your cookie preferences.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm opacity-75">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <h2 className="text-heading text-2xl font-bold mb-4">What Are Cookies?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cookies are small text files that are stored on your device when you visit websites. 
                  They help websites remember information about your visit, which can make your next 
                  visit easier and the site more useful to you.
                </p>
                <p>
                  At TripSage, we use cookies to improve your browsing experience, analyze how our 
                  platform is used, and provide personalized features that help you connect with 
                  the right travel companions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="space-y-6">
            <h2 className="text-heading text-3xl font-bold text-center">Types of Cookies We Use</h2>
            
            {cookieTypes.map((type, index) => (
              <Card key={index} className="card-minimal">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <type.icon className="h-8 w-8 text-foreground" />
                      <div>
                        <h3 className="text-heading text-xl font-bold">{type.title}</h3>
                        <p className="text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                    <Badge 
                      className={`rounded-none ${
                        type.canDisable 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {type.canDisable ? "Optional" : "Required"}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{type.purpose}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Examples include:</h4>
                    <ul className="space-y-1">
                      {type.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Third-Party Cookies */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <h2 className="text-heading text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Some cookies on our site are set by third-party services that we use to enhance 
                  your experience:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• <strong>Google Analytics:</strong> Helps us understand how users interact with our site</li>
                  <li>• <strong>Social Media Platforms:</strong> Enable sharing and social login features</li>
                  <li>• <strong>Customer Support:</strong> Powers our help chat and support features</li>
                </ul>
                <p>
                  These third parties have their own privacy policies and cookie practices. We recommend 
                  reviewing their policies to understand how they use your information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card className="card-minimal border-2 border-foreground">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">Managing Your Cookie Preferences</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-heading text-lg font-bold mb-3">Browser Settings</h3>
                  <p className="text-muted-foreground mb-4">
                    You can control cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="space-y-2 ml-6 text-muted-foreground">
                    <li>• View and delete cookies</li>
                    <li>• Block cookies from specific sites</li>
                    <li>• Block third-party cookies</li>
                    <li>• Clear all cookies when you close the browser</li>
                    <li>• Set up warnings before cookies are stored</li>
                  </ul>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Popular Browser Cookie Settings:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</p>
                      <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</p>
                    </div>
                    <div>
                      <p><strong>Safari:</strong> Preferences → Privacy → Cookies</p>
                      <p><strong>Edge:</strong> Settings → Privacy → Cookies</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-heading text-lg font-bold mb-3">TripSage Cookie Preferences</h3>
                  <p className="text-muted-foreground mb-4">
                    You can also manage your cookie preferences directly on our site:
                  </p>
                  <Button className="btn-minimal">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Cookie Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact of Disabling Cookies */}
          <Card className="card-minimal border-2 border-yellow-200">
            <CardContent className="p-8">
              <h2 className="text-heading text-2xl font-bold mb-4">Impact of Disabling Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  While you can disable cookies, doing so may affect your experience on TripSage:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• You may need to log in repeatedly</li>
                  <li>• Your preferences and settings won't be saved</li>
                  <li>• Some features may not work properly</li>
                  <li>• You may see less relevant content and recommendations</li>
                  <li>• Site performance may be reduced</li>
                </ul>
                <p>
                  Essential cookies cannot be disabled as they're necessary for the basic 
                  functionality of our platform, including security features.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <h2 className="text-heading text-2xl font-bold mb-4">Changes to This Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or for other operational, legal, or regulatory reasons.
                </p>
                <p>
                  When we make changes, we'll update the "Last updated" date at the top of this 
                  policy and notify you through our platform or by email for significant changes.
                </p>
                <p>
                  We encourage you to review this policy periodically to stay informed about 
                  how we use cookies.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="card-minimal border-2 border-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-heading text-2xl font-bold mb-4">Questions About Cookies?</h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about our use of cookies or this Cookie Policy, 
                please don't hesitate to contact us.
              </p>
              <div className="space-y-2">
                <p className="font-semibold">Email: privacy@tripsage.com</p>
                <p className="text-sm text-muted-foreground">
                  We'll respond to cookie-related inquiries within 48 hours
                </p>
              </div>
              <Badge className="bg-foreground text-background rounded-none mt-4">
                Current Version: v1.2 | Effective: {lastUpdated}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
