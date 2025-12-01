"use client"

import { useSearchParams } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { FormEvent, useState, useEffect } from "react"
import { motion } from "motion/react"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const name = searchParams.get("name") ?? "Selected product"
  const priceParam = searchParams.get("price")
  const price = priceParam ? Number(priceParam) : 25
  const priceId = searchParams.get("priceId")
  const period = "month"


  useEffect(() => {
    if (searchParams.get("canceled") === "true") {
      setError("Checkout was canceled. You're back on the payment page.")
    }
  }, [searchParams])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setError(null)

    try {
     
      const origin = typeof window !== "undefined" ? window.location.origin : ""
      const currentPath = typeof window !== "undefined" ? window.location.pathname + window.location.search : ""
      const cancelUrl = `${origin}${currentPath}`
      const successUrl = `${origin}${currentPath}`

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, priceId, cancelUrl, successUrl }),
      })

      if (!res.ok) {
        setError("Unable to start checkout. Please try again.")
        setLoading(false)
        return
      }

      const data = (await res.json()) as { url?: string }

      if (!data.url) {
        setError("No checkout URL returned. Please contact support.")
        setLoading(false)
        return
      }

     
      window.location.assign(data.url)
    } catch {
      setError("Network error. Check your connection and try again.")
      setLoading(false)
    }
  }

  return (
    <LayoutShell>
      <section className="container mx-auto max-w-4xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Review your subscription and securely complete payment with Stripe.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-[2fr,1.6fr]">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Order summary</h2>

            <div className="rounded-2xl border border-neutral-200/70 bg-gradient-to-br from-white via-white to-blue-50/40 p-6 shadow-sm dark:border-neutral-800 dark:from-neutral-900 dark:via-neutral-900 dark:to-blue-950/40">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                    {name}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Subscription billed per {period}. Cancel anytime.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                    £{price}
                    <span className="ml-1 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                      /{period}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-200/70 pt-4 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                <span>Secure payments powered by Stripe</span>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
                  Test mode
                </span>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Payment details</h2>

            <div className="rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label
                      htmlFor="card-number"
                      className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      Card number
                    </label>
                    <input
                      id="card-number"
                      autoComplete="cc-number"
                      className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="cvc"
                      className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
                    >
                      CVC
                    </label>
                    <input
                      id="cvc"
                      autoComplete="cc-csc"
                      className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-blue-400 dark:focus:ring-blue-900/50"
                      placeholder="123"
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-medium text-red-600 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold
                             bg-black text-white hover:bg-black/90
                             dark:bg-white dark:text-black dark:hover:bg-white/90
                             disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Redirecting…" : `Pay £${price}/${period}`}
                </motion.button>

                <p className="mt-2 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  You will be redirected to Stripe to securely complete your payment.
                  This is a test environment; use Stripe test card numbers to simulate
                  transactions.
                </p>
              </form>
            </div>
          </motion.section>
        </div>
      </section>
    </LayoutShell>
  )
}
