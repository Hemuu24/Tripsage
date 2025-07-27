import { Hero } from "@/components/hero"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { CommunityStats } from "@/components/community-stats"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedDestinations />
      <HowItWorks />
      <CommunityStats />
      <Testimonials />
    </div>
  )
}
