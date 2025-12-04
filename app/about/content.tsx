"use client";

import {
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
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

  const displayReason = useMemo(
    () => (reason === "Other" ? otherReason || "Other" : reason),
    [reason, otherReason]
  );

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
    <div className="w-full flex items-center justify-center p-10 min-h-[calc(100vh*0.8)]">
      <div className="max-w-7xl flex">
        <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-white/60">
              About us
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              FoundationData is building the ground layer for edtech.
            </h1>
            <p className="text-lg text-neutral-600 dark:text-white/70">
              Our mission is to become the foundation for which edtech startups
              can be built on. We turn fragmented labor-market information into
              reliable, structured intelligence so founders, universities, and
              builders can launch products faster with confidence in the data
              that powers them.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <HighlightCard
                title="Data-native DNA"
                description="Live job-market feeds, mapped to skills, roles, and demand across industries."
              />
              <HighlightCard
                title="Built for builders"
                description="APIs, starter kits, and support that shorten the path from idea to launch."
              />
              <HighlightCard
                title="Education first"
                description="Tooling and insights purpose-built for students, educators, and career services."
              />
              <HighlightCard
                title="Trusted groundwork"
                description="Governance, privacy, and QA processes that keep your products dependable."
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.07)] dark:border-white/10 dark:bg-neutral-900">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.14),transparent_26%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.16),transparent_28%)]" />
            <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/60">
              FoundationData
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              The infrastructure layer for education innovation
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-white/70">
              From curriculum design to career services, we help teams plug into
              market reality. Our data architecture aligns live demand with
              courses, competencies, and learning outcomes so every new product
              ships with real-world context.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Skill ontology",
                "Role taxonomies",
                "Demand scoring",
                "University signals",
                "Employer insights",
                "Privacy-first ingest",
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleReasonSelect(tag)}
                  className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 dark:bg-blue-400/15 dark:text-blue-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function HighlightCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(59,130,246,0.15)] dark:border-white/10 dark:bg-neutral-900">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-neutral-600 dark:text-white/65">
        {description}
      </p>
    </div>
  );
}
