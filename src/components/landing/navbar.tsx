"use client"

import { useState } from "react"
import { MessageSquareHeart, Menu, X } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-white">
            <MessageSquareHeart className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight text-foreground">
            FeedbackPulse
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-foreground">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors text-white"
          >
            Start for Free
          </Link>
        </div>
      </div>
    </header>
  )
}
