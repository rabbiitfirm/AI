"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  { name: "Free", price: "0", features: ["1 feedback board", "50 items"] },
  { name: "Pro", price: "19", features: ["Unlimited boards", "Advanced analytics"] },
  { name: "Enterprise", price: "Custom", features: ["SSO / SAML", "Custom SLA"] },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 text-foreground">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-12">Simple pricing</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="border border-border rounded-2xl p-8 bg-card">
              <h3 className="text-lg font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-extrabold mb-6">${plan.price}</div>
              <Link href="/dashboard" className="block w-full py-3 bg-primary text-white rounded-lg mb-6">Get Started</Link>
              <ul className="text-left space-y-2">
                {plan.features.map(f => <li key={f} className="flex gap-2 text-sm"><Check size={16}/> {f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
