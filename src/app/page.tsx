import Navbar from "@/components/landing/navbar"
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import SocialProof from "@/components/landing/social-proof"
import Pricing from "@/components/landing/pricing"
import FooterCta from "@/components/landing/footer-cta"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <FooterCta />
    </main>
  )
}
