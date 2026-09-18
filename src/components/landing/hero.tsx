import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 md:pt-28 md:pb-32 text-foreground">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          Trusted by 2,000+ product teams
        </div>
        <h1 className="text-balance text-5xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl leading-[1.08]">
          Understand Your Customers.{" "}
          <span className="text-primary">Build Better Products.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Collect, organize, and prioritize customer feedback in one place. Stop guessing what to build next — let your users tell you.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:shadow-primary/30 hover:shadow-xl text-white"
          >
            Start for Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted transition-colors"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  )
}
