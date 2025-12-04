"use client";

import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation";
import { cn } from "@/lib/utils";

const reasons = [
  "Product inquiry",
  "Partnership opportunity",
  "Press / media",
  "Customer support",
  "Careers",
  "Other",
];

export default function About() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState(reasons[0]);
  const [otherReason, setOtherReason] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const reasonSelectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const displayReason = useMemo(() => (reason === "Other" ? otherReason || "Other" : reason), [reason, otherReason]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setStatusMessage("Thanks for reaching out. Our team will respond shortly.");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const focusForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => reasonSelectRef.current?.focus(), 120);
  };

  const handleReasonSelect = (value: string) => {
    if (reasons.includes(value)) {
      setReason(value);
      setOtherReason("");
    } else {
      setReason("Other");
      setOtherReason(value);
    }
    setSubmitted(false);
    focusForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-neutral-50 text-neutral-900 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 dark:text-white">
      <NavigationBar />

      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 pb-20 pt-12">
        <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-white/60">About us</p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">FoundationData is building the ground layer for edtech.</h1>
            <p className="text-lg text-neutral-600 dark:text-white/70">
              Our mission is to become the foundation for which edtech startups can be built on. We turn fragmented labor-market
              information into reliable, structured intelligence so founders, universities, and builders can launch products
              faster with confidence in the data that powers them.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <HighlightCard title="Data-native DNA" description="Live job-market feeds, mapped to skills, roles, and demand across industries." />
              <HighlightCard title="Built for builders" description="APIs, starter kits, and support that shorten the path from idea to launch." />
              <HighlightCard title="Education first" description="Tooling and insights purpose-built for students, educators, and career services." />
              <HighlightCard title="Trusted groundwork" description="Governance, privacy, and QA processes that keep your products dependable." />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.07)] dark:border-white/10 dark:bg-neutral-900">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.14),transparent_26%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.16),transparent_28%)]" />
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/60">FoundationData</p>
            <h2 className="mt-3 text-2xl font-semibold">The infrastructure layer for education innovation</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-white/70">
              From curriculum design to career services, we help teams plug into market reality. Our data architecture aligns
              live demand with courses, competencies, and learning outcomes so every new product ships with real-world context.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Skill ontology", "Role taxonomies", "Demand scoring", "University signals", "Employer insights", "Privacy-first ingest"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleReasonSelect(tag)}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:-translate-y-[1px] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 dark:bg-blue-400/15 dark:text-blue-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-white/60">Contact us</p>
              <h3 className="text-2xl font-semibold">Tell us what you want to build</h3>
              <p className="text-sm text-neutral-600 dark:text-white/70">
                Share your details and a short note. Choose a reason below—select "Other" if you want to add something specific.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-neutral-600 dark:text-white/70">
                <Badge onClick={() => handleReasonSelect("Go-to-market partners")}>Go-to-market partners</Badge>
                <Badge onClick={() => handleReasonSelect("Beta access")}>Beta access</Badge>
                <Badge onClick={() => handleReasonSelect("University pilots")}>University pilots</Badge>
                <Badge onClick={() => handleReasonSelect("Technical support")}>Technical support</Badge>
              </div>
              {submitted && (
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {statusMessage || `Message sent about ${displayReason}. We will get back to you soon.`}
                </p>
              )}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-white/15 dark:bg-neutral-950/60 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                />
              </Field>

              <Field label="Reason for contact">
                <div className="space-y-3">
                  <select
                    ref={reasonSelectRef}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-white/15 dark:bg-neutral-950/60 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                  >
                    {reasons.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {reason === "Other" && (
                    <input
                      required
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      placeholder="Tell us your reason"
                      className="w-full rounded-xl border border-dashed border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-white/20 dark:bg-neutral-950/60 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                    />
                  )}
                </div>
              </Field>

              <Field label="Message">
                <textarea
                  required
                  rows={5}
                  onChange={(e) => setMessageBody(e.target.value)}
                  value={messageBody}
                  ref={messageRef}
                  placeholder="Share your idea, integration needs, or what you want to explore together."
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-white/15 dark:bg-neutral-950/60 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                />
              </Field>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(59,130,246,0.35)] transition hover:translate-y-[-1px] hover:shadow-[0_25px_80px_rgba(59,130,246,0.45)]"
              >
                Submit
              </button>

              <p className="text-xs text-neutral-500 dark:text-white/60">
                By submitting, you agree to let FoundationData contact you about our products and services.
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function HighlightCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(59,130,246,0.15)] dark:border-white/10 dark:bg-neutral-900">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-neutral-600 dark:text-white/65">{description}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-neutral-700 dark:text-white/80">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Badge({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-700 transition hover:-translate-y-[1px] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 dark:border-white/10 dark:text-white/80",
        onClick && "cursor-pointer"
      )}
    >
      {children}
    </button>
  );
}
