import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, Users, AlertTriangle, Calendar, Mail } from "lucide-react"

export default function TermsPage() {
  const lastUpdated = "January 15, 2024"

  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: [
        "By creating an account on TripSage, you agree to be bound by these Terms of Service",
        "You must be at least 18 years old to use our platform",
        "If you're using TripSage on behalf of an organization, you have authority to bind that organization",
        "These terms constitute a legally binding agreement between you and TripSage"
      ]
    },
    {
      icon: Shield,
      title: "Platform Use",
      content: [
        "TripSage is designed to connect travelers and facilitate trip planning",
        "You may not use our platform for any illegal, harmful, or fraudulent activities",
        "All travel arrangements and bookings are made directly between users",
        "TripSage acts as a facilitator and is not responsible for the actions of other users",
        "You must provide accurate information in your profile and communications"
      ]
    },
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        "Verify the identity and credentials of travel companions before meeting",
        "Take appropriate safety precautions when traveling with people you meet online",
        "Respect other users and maintain professional, friendly communication",
        "Report any suspicious or inappropriate behavior to our moderation team",
        "Keep your account information secure and do not share login credentials"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Safety and Liability",
      content: [
        "TripSage does not conduct background checks on users",
        "We strongly recommend meeting potential travel companions in public places first",
        "Travel insurance is highly recommended for all trips",
        "Users are responsible for their own safety and well-being during travel",
        "TripSage is not liable for any incidents, accidents, or disputes between users"
      ]
    },
    {
      icon: FileText,
      title: "Content and Intellectual Property",
      content: [
        "You retain ownership of content you post, but grant TripSage a license to display it",
        "Do not post copyrighted material without permission",
        "TripSage may remove content that violates our community guidelines",
        "Our platform design, features, and algorithms are proprietary to TripSage",
        "You may not copy, reproduce, or create derivative works of our platform"
      ]
    },
    {
      icon: Shield,
      title: "Privacy and Data",
      content: [
        "Your privacy is important to us - see our Privacy Policy for details",
        "We collect only necessary information to provide our services",
        "You can control your privacy settings and data sharing preferences",
        "We use industry-standard security measures to protect your information",
        "You can request deletion of your account and associated data at any time"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <Badge className="bg-background text-foreground border-0 px-6 py-3 text-sm font-semibold rounded-none">
              <FileText className="w-4 h-4 mr-2" />
              Terms of Service
            </Badge>
            <h1 className="text-display text-5xl md:text-6xl font-bold">
              Terms of Service
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              These terms govern your use of TripSage and outline the rights and responsibilities 
              of our community members. Please read them carefully.
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
              <h2 className="text-heading text-2xl font-bold mb-4">Welcome to TripSage</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                TripSage is a platform that connects travelers with similar interests and travel styles, 
                making it easier to find compatible travel companions and plan amazing adventures together. 
                These Terms of Service govern your access to and use of our platform.
              </p>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="card-minimal">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <section.icon className="h-8 w-8 text-foreground" />
                    <h2 className="text-heading text-2xl font-bold">{section.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-foreground rounded-full mt-3 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment and Refunds */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">Payment and Refunds</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TripSage currently operates as a free platform for connecting travelers. We do not process 
                  payments for travel bookings or arrangements.
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• All financial transactions for trips are between users directly</li>
                  <li>• TripSage is not responsible for payment disputes between users</li>
                  <li>• We recommend using secure payment methods and keeping records of all transactions</li>
                  <li>• Future premium features may be introduced with separate terms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card className="card-minimal border-2 border-red-200">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <h2 className="text-heading text-2xl font-bold text-red-600">Prohibited Activities</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>The following activities are strictly prohibited on TripSage:</p>
                <ul className="space-y-2 ml-6">
                  <li>• Using fake profiles or misrepresenting your identity</li>
                  <li>• Harassment, discrimination, or inappropriate behavior</li>
                  <li>• Promoting illegal activities or substances</li>
                  <li>• Spamming or sending unsolicited commercial messages</li>
                  <li>• Attempting to hack or compromise platform security</li>
                  <li>• Using the platform for non-travel related purposes</li>
                </ul>
                <p className="font-semibold text-red-600">
                  Violation of these terms may result in immediate account suspension or termination.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">Dispute Resolution</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have a dispute with another user or with TripSage, we encourage resolution through 
                  direct communication first. For unresolved issues:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Contact our support team for mediation assistance</li>
                  <li>• We may facilitate communication but cannot enforce agreements between users</li>
                  <li>• Serious violations should be reported immediately to our moderation team</li>
                  <li>• Legal disputes will be resolved through binding arbitration in San Francisco, CA</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="card-minimal border-2 border-foreground">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Mail className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">Questions About These Terms?</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                If you have any questions about these Terms of Service, please don't hesitate to contact us. 
                We're here to help ensure you have a safe and enjoyable experience on TripSage.
              </p>
              <div className="space-y-2">
                <p className="font-semibold">Email: legal@tripsage.com</p>
                <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
              </div>
              <Badge className="bg-foreground text-background rounded-none mt-4">
                Current Version: v2.1 | Effective: {lastUpdated}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
