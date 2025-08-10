"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MapPin, Send, MessageCircle, HelpCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", category: "", message: "" })
  }

  const travelResources = [
    {
      icon: Mail,
      title: "Travel Community",
      description: "Connect with fellow travelers",
      contact: "Join our forum and journal discussions",
      response: "Active 24/7"
    },
    {
      icon: MapPin,
      title: "Safety First",
      description: "Emergency travel resources",
      contact: "Safety guidelines and emergency contacts",
      response: "Always available"
    },
    {
      icon: MessageCircle,
      title: "Share Your Journey",
      description: "Tell us about your adventures",
      contact: "Post in travel journal or forum",
      response: "Community engagement"
    }
  ]

  const categories = [
    { value: "general", label: "General Inquiry", icon: HelpCircle },
    { value: "travel-help", label: "Travel Help", icon: MapPin },
    { value: "safety", label: "Safety Concern", icon: Mail },
    { value: "community", label: "Community & Forum", icon: MessageCircle },
    { value: "feedback", label: "Platform Feedback", icon: MessageCircle },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <Badge className="bg-background text-foreground border-0 px-6 py-3 text-sm font-semibold rounded-none">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Badge>
            <h1 className="text-display text-5xl md:text-6xl font-bold">
              Get in Touch
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Have a question, suggestion, or need help planning your next adventure? We're here to support your travel journey. 
              Connect with our community and share your experiences through our journal and forum discussions.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-minimal">
              <CardContent className="p-8">
                <h2 className="text-heading text-2xl font-bold mb-6">Send us a Message</h2>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-heading text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button 
                      className="btn-minimal mt-4"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="input-minimal"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="input-minimal"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Category *</label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="input-minimal">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center space-x-2">
                                <category.icon className="w-4 h-4" />
                                <span>{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Subject *</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="input-minimal"
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Message *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="input-minimal min-h-[120px] resize-none"
                        placeholder="Please provide as much detail as possible..."
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="btn-minimal w-full"
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.category || !formData.subject || !formData.message}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Travel Resources */}
          <div className="space-y-8">
            {/* Travel Community Resources */}
            <div className="space-y-4">
              {travelResources.map((resource, index) => (
                <Card key={index} className="card-minimal">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <resource.icon className="w-6 h-6 text-foreground mt-1" />
                      <div className="flex-1">
                        <h3 className="text-heading font-bold mb-1">{resource.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{resource.description}</p>
                        <p className="font-semibold text-sm">{resource.contact}</p>
                        <p className="text-muted-foreground text-xs">{resource.response}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Community Links */}
            <Card className="card-minimal border-2 border-foreground">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-foreground mx-auto mb-2" />
                <h3 className="text-heading font-bold mb-2">Join the Community</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Connect with travelers, share stories, and get travel advice.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="btn-minimal-outline" size="sm" asChild>
                    <a href="/forum">Visit Forum</a>
                  </Button>
                  <Button variant="outline" className="btn-minimal-outline" size="sm" asChild>
                    <a href="/journal">Travel Journal</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
