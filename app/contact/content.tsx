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
import { Badge } from "../about/components/badge";
import { Field } from "../about/components/field";

const reasons = [
  "Product inquiry",
  "Partnership opportunity",
  "Press / media",
  "Customer support",
  "Careers",
  "Other",
];

const Contact = () => {
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

  const handleReasonSelect = (value: string) => {
    if (reasons.includes(value)) {
      setReason(value);
      setOtherReason("");
    } else {
      setReason("Other");
      setOtherReason(value);
    }
    setSubmitted(false);
  };
  return (
    <div className="w-full flex items-center justify-center p-10 min-h-[calc(100vh*0.8)]">
      <div className="max-w-7xl flex">
        <section
          id="contact"
          className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-white/60">
                Contact us
              </p>
              <h3 className="text-2xl font-semibold">
                Tell us what you want to build
              </h3>
              <p className="text-sm text-neutral-600 dark:text-white/70">
                Share your details and a short note. Choose a reason
                below—select "Other" if you want to add something specific.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-neutral-600 dark:text-white/70">
                <Badge
                  onClick={() => handleReasonSelect("Go-to-market partners")}
                >
                  Go-to-market partners
                </Badge>
                <Badge onClick={() => handleReasonSelect("Beta access")}>
                  Beta access
                </Badge>
                <Badge onClick={() => handleReasonSelect("University pilots")}>
                  University pilots
                </Badge>
                <Badge onClick={() => handleReasonSelect("Technical support")}>
                  Technical support
                </Badge>
              </div>
              {submitted && (
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {statusMessage ||
                    `Message sent about ${displayReason}. We will get back to you soon.`}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
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
                By submitting, you agree to let FoundationData contact you about
                our products and services.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
