import { LayoutDashboard, ThumbsUp, Tag, BarChart, Bell, Users } from "lucide-react"

const mainFeatures = [
  { icon: LayoutDashboard, title: "Feedback Boards", description: "Centralize all customer feedback into organized boards." },
  { icon: ThumbsUp, title: "Upvoting Logic", description: "Let customers vote on the features they care about most." },
  { icon: Tag, title: "Categorization", description: "Auto-tag and categorize incoming feedback by type." },
  { icon: BarChart, title: "Admin Dashboard", description: "Get a bird's-eye view of all feedback trends." },
  { icon: Bell, title: "Smart Notifications", description: "Keep customers in the loop automatically." },
  { icon: Users, title: "Team Collaboration", description: "Assign, comment, and collaborate on feedback threads." },
]

export default function Features() {
  return (
    <section id="features" className="bg-muted/40 py-24 md:py-32 text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight">Everything you need to act on feedback</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mainFeatures.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-border bg-card p-7">
              <feature.icon className="h-6 w-6 text-primary mb-4" />
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
