import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, UserCheck, Mail, Calendar } from "lucide-react"

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2024"

  const sections = [
    {
      icon: UserCheck,
      title: "Information We Collect",
      content: [
        "Personal information you provide when creating an account (name, email, profile picture)",
        "Travel preferences and interests you share",
        "Messages and communications through our platform",
        "Trip planning and booking information",
        "Device information and usage analytics to improve our service"
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "To provide and improve our travel matching services",
        "To facilitate connections between compatible travelers",
        "To send you relevant trip recommendations and updates",
        "To ensure safety and security of our platform",
        "To comply with legal obligations and prevent fraud"
      ]
    },
    {
      icon: Shield,
      title: "Information Sharing",
      content: [
        "We only share information necessary for trip coordination with your matched travel companions",
        "We never sell your personal data to third parties",
        "We may share anonymized analytics data with partners to improve travel services",
        "We will disclose information if required by law or to protect user safety",
        "Your profile information is only visible to verified members of our community"
      ]
    },
    {
      icon: Eye,
      title: "Your Privacy Rights",
      content: [
        "Access and download your personal data at any time",
        "Correct or update your information through your profile settings",
        "Delete your account and associated data permanently",
        "Control who can see your profile and travel information",
        "Opt out of marketing communications while maintaining essential service updates"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "All data is encrypted in transit and at rest using industry-standard protocols",
        "We use secure authentication methods including two-factor authentication",
        "Regular security audits and penetration testing",
        "Limited access to personal data on a need-to-know basis",
        "Immediate notification process for any potential security incidents"
      ]
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: [
        "If you have questions about this privacy policy, contact us at privacy@tripsage.com",
        "For data protection concerns, write to our Data Protection Officer",
        "We respond to all privacy inquiries within 72 hours",
        "You can also reach us through our Help Center for general privacy questions"
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
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Badge>
            <h1 className="text-display text-5xl md:text-6xl font-bold">
              Your Privacy Matters
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're committed to protecting your personal information and being transparent about how we use it. 
              Your trust is the foundation of our community.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm opacity-75">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="card-minimal">
            <CardContent className="p-8">
              <h2 className="text-heading text-2xl font-bold mb-4">Welcome to TripSage</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At TripSage, we believe that traveling with the right companions creates the most meaningful experiences. 
                This Privacy Policy explains how we collect, use, and protect your information when you use our platform 
                to connect with fellow travelers and plan amazing adventures together.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
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

          {/* Data Retention */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">Data Retention</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We retain your personal information only as long as necessary to provide our services and fulfill 
                  the purposes outlined in this privacy policy. Specifically:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Account information: Retained while your account is active</li>
                  <li>• Trip history: Retained for 7 years for safety and reference purposes</li>
                  <li>• Communications: Retained for 3 years to resolve disputes and improve service</li>
                  <li>• Analytics data: Anonymized and retained indefinitely for service improvement</li>
                </ul>
                <p>
                  When you delete your account, we will permanently remove your personal data within 30 days, 
                  except where we are required to retain it for legal compliance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card className="card-minimal">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-foreground" />
                <h2 className="text-heading text-2xl font-bold">International Data Transfers</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  As a global platform connecting travelers worldwide, we may transfer your data internationally. 
                  We ensure all transfers are protected by appropriate safeguards:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Data processing agreements with all service providers</li>
                  <li>• Compliance with GDPR and other international privacy standards</li>
                  <li>• Regular audits of our data handling practices</li>
                  <li>• Encryption of all data during transfer and storage</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="card-minimal border-2 border-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-heading text-2xl font-bold mb-4">Policy Updates</h2>
              <p className="text-muted-foreground mb-6">
                We may update this privacy policy from time to time. We'll notify you of any significant changes 
                through email or a prominent notice on our platform. Your continued use of TripSage after 
                any changes indicates your acceptance of the updated policy.
              </p>
              <Badge className="bg-foreground text-background rounded-none">
                Current Version: v2.1 | Effective: {lastUpdated}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
