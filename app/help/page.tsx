"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Users, Shield, Calendar, MessageCircle, MapPin, Star } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { icon: Users, title: "Getting Started", count: 8 },
    { icon: Shield, title: "Safety & Security", count: 6 },
    { icon: Calendar, title: "Trip Planning", count: 10 },
    { icon: MessageCircle, title: "Communication", count: 5 },
    { icon: MapPin, title: "Destinations", count: 7 },
    { icon: Star, title: "Account & Profile", count: 9 },
  ]

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create a TripSage account?",
      answer: "Creating an account is simple! Click the 'Join TripSage' button on our homepage, fill in your basic information, and verify your email address. You can also sign up using your Google or Facebook account for faster registration."
    },
    {
      category: "Getting Started",
      question: "Is TripSage free to use?",
      answer: "Yes, TripSage is completely free to use. You can create a profile, search for travel companions, join trips, and use all our core features without any cost. We may introduce premium features in the future, but our core mission of connecting travelers will always remain free."
    },
    {
      category: "Safety & Security",
      question: "How does TripSage ensure user safety?",
      answer: "Safety is our top priority. We verify email addresses, encourage users to meet in public places first, provide safety guidelines, and have a reporting system for inappropriate behavior. However, users are responsible for their own safety and should always take proper precautions when meeting people online."
    },
    {
      category: "Safety & Security",
      question: "What should I do before meeting a travel companion?",
      answer: "Before meeting anyone from TripSage, we recommend: 1) Video chatting first, 2) Meeting in a public place, 3) Telling friends/family about your plans, 4) Verifying their identity through social media, and 5) Trusting your instincts. Never share personal financial information or travel documents until you're comfortable."
    },
    {
      category: "Trip Planning",
      question: "How do I find travel companions?",
      answer: "Use our Travelers page to browse profiles of other users. You can filter by interests, travel style, destination preferences, and dates. You can also post your own trip in the Trips section and wait for interested travelers to join you."
    },
    {
      category: "Trip Planning",
      question: "What information should I include in my trip posting?",
      answer: "Include destination, dates, budget range, group size, travel style (budget/mid-range/luxury), activities planned, and what type of travel companions you're looking for. The more detailed your posting, the better matches you'll attract."
    },
    {
      category: "Communication",
      question: "How do I message other users?",
      answer: "Once you find someone you'd like to connect with, click the 'Connect' button on their profile or trip posting. This will send them a connection request. Once accepted, you can communicate through our messaging system."
    },
    {
      category: "Account & Profile",
      question: "How do I make my profile stand out?",
      answer: "Upload a clear, recent photo of yourself, write an engaging bio that shows your personality, list your travel interests and experiences, specify your travel style, and include any languages you speak. Verified profiles with complete information tend to get more connections."
    },
    {
      category: "Account & Profile",
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account at any time from your account settings. This will permanently remove your profile, messages, and all associated data. Note that this action cannot be undone."
    },
    {
      category: "Destinations",
      question: "Can I suggest new destinations?",
      answer: "Absolutely! We love hearing about amazing destinations from our community. You can suggest new destinations through our contact form or by posting in the forum. Our team reviews all suggestions and adds popular destinations to our platform."
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-foreground text-background py-20">
        <div className="container">
          <div className="text-center space-y-6">
            <Badge className="bg-background text-foreground border-0 px-6 py-3 text-sm font-semibold rounded-none">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Badge>
            <h1 className="text-display text-5xl md:text-6xl font-bold">
              How Can We Help?
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Find answers to common questions, learn how to use TripSage effectively, 
              and get the most out of your travel community experience.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-minimal pl-12 py-6 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="card-minimal hover:border-foreground transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <category.icon className="w-8 h-8 text-foreground mx-auto mb-3" />
                <h3 className="text-heading font-bold text-sm mb-1">{category.title}</h3>
                <p className="text-muted-foreground text-xs">{category.count} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-3">
            <h2 className="text-heading text-3xl font-bold mb-8">
              Frequently Asked Questions
              {searchQuery && (
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  ({filteredFaqs.length} results)
                </span>
              )}
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <Card className="card-minimal">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-start space-x-3 text-left">
                        <Badge variant="secondary" className="text-xs bg-muted text-foreground rounded-none mt-1">
                          {faq.category}
                        </Badge>
                        <span className="text-heading font-semibold">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <Card className="card-minimal">
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-heading text-lg font-bold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try searching with different keywords or browse our categories above.
                  </p>
                  <Button 
                    variant="outline" 
                    className="btn-minimal-outline"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <Card className="card-minimal border-2 border-foreground">
              <CardContent className="p-6">
                <h3 className="text-heading text-lg font-bold mb-4">Still Need Help?</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="space-y-3">
                  <Button className="btn-minimal w-full" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="btn-minimal-outline w-full" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Community Forum
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-minimal">
              <CardContent className="p-6">
                <h3 className="text-heading text-lg font-bold mb-4">Safety Resources</h3>
                <div className="space-y-3 text-sm">
                  <a href="/safety" className="block text-muted-foreground hover:text-foreground transition-colors">
                    → Travel Safety Guidelines
                  </a>
                  <a href="/safety" className="block text-muted-foreground hover:text-foreground transition-colors">
                    → Meeting Safety Tips
                  </a>
                  <a href="/safety" className="block text-muted-foreground hover:text-foreground transition-colors">
                    → Emergency Contacts
                  </a>
                  <a href="/report" className="block text-muted-foreground hover:text-foreground transition-colors">
                    → Report a Safety Concern
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="card-minimal">
              <CardContent className="p-6">
                <h3 className="text-heading text-lg font-bold mb-4">Quick Links</h3>
                <div className="space-y-3 text-sm">
                  <a href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                    → About TripSage
                  </a>
                  <a href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                    → Terms of Service
                  </a>
                  <a href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                    → Privacy Policy
                  </a>
                  <a href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                    → Contact Us
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
