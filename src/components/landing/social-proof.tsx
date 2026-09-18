import { Star } from "lucide-react"

export default function SocialProof() {
  return (
    <section id="testimonials" className="bg-background py-24 text-foreground text-center">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-4xl font-extrabold mb-12">Loved by teams</h2>
        <div className="flex justify-center gap-4">
          <div className="bg-card border border-border p-8 rounded-2xl max-w-md">
            <p className="italic mb-4">"FeedbackPulse transformed how we handle feature requests."</p>
            <div className="font-bold">Sarah Chen</div>
            <div className="text-sm text-muted-foreground">Head of Product</div>
          </div>
        </div>
      </div>
    </section>
  )
}
