"use client";

import {
  useMemo,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { cards } from "./components/initialCards";

type BillingInterval = "monthly" | "annual";

type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  features: string[];
};

type SavedCard = { label: string; name: string; exp: string; brand: string };

type CardErrors = {
  name?: string;
  number?: string;
  exp?: string;
  cvc?: string;
};

const plans: Plan[] = [
  {
    id: "job-market",
    name: "Job Market Data Packs",
    priceMonthly: 25,
    priceAnnual: 250,
    description: "Live insights into skills, roles, and market demand.",
    features: [
      "Top Skills Report",
      "Industry Trends Pack",
      "Salary Insights Pack",
      "Role Demand Report",
      "Location Hotspots Pack",
    ],
  },
  {
    id: "university-performance",
    name: "University Performance Insights",
    priceMonthly: 25,
    priceAnnual: 250,
    description: "Data to help institutions improve employability outcomes.",
    features: [
      "Employability Scorecard",
      "Skills Gap Summary",
      "Course Improvement Suggestions",
      "Graduate Outcomes Comparison",
      "Student Feedback Insights",
    ],
  },
  {
    id: "student-career",
    name: "Student Career Tools",
    priceMonthly: 25,
    priceAnnual: 250,
    description:
      "Tools that help students navigate the job market with clarity.",
    features: [
      "Career Match Quiz",
      "Skill Gap Checker",
      "Keyword Optimiser",
      "Interview Prep Pack",
      "Learning Roadmap",
    ],
  },
  {
    id: "employer-recruitment",
    name: "Employer & Recruitment Tools",
    priceMonthly: 25,
    priceAnnual: 250,
    description: "Insight and intelligence for smarter hiring decisions.",
    features: [
      "University Talent Finder",
      "Hiring Trends Dashboard",
      "Employer Brand Insights",
      "Campus Recruitment Planner",
      "Job Posting Keyword Tool",
    ],
  },
  {
    id: "education-skill",
    name: "Education & Skill Development",
    priceMonthly: 25,
    priceAnnual: 250,
    description: "Data-driven tools for shaping future-ready curriculums.",
    features: [
      "Emerging Skills Pack",
      "Learning Resource Bundle",
      "Certification Value Guide",
      "Skill Development Tracker",
      "Workshop Ideas Pack",
    ],
  },
];

const addOns = [
  {
    name: "Daily data refresh",
    price: 10,
    description: "24h ingestion cycles and freshness guarantees.",
  },
  {
    name: "Priority support",
    price: 4,
    description: "Faster responses with shared Slack channel access.",
  },
];

const initialCards: SavedCard[] = cards();

export default function Payment() {
  const searchParams = useSearchParams();
  const initialPlanId = useMemo(() => {
    const planParam = searchParams.get("plan");
    return planParam && plans.some((p) => p.id === planParam)
      ? planParam
      : null;
  }, [searchParams]);

  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>(() =>
    initialPlanId ? [initialPlanId] : []
  );
  const [showAvailable, setShowAvailable] = useState(true);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>(initialCards);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [newCard, setNewCard] = useState({
    name: "",
    number: "",
    exp: "",
    cvc: "",
    brand: "Visa",
  });
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [confirmAction, setConfirmAction] = useState<{
    planId: string;
    mode: "add" | "remove";
  } | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const selectedPlans = useMemo(
    () => plans.filter((p) => selectedPlanIds.includes(p.id)),
    [selectedPlanIds]
  );
  const availablePlans = useMemo(
    () => plans.filter((p) => !selectedPlanIds.includes(p.id)),
    [selectedPlanIds]
  );

  const togglePlan = (planId: string, mode: "add" | "remove") => {
    setConfirmAction({ planId, mode });
  };

  const confirmPlanAction = () => {
    if (!confirmAction) return;
    if (confirmAction.mode === "add") {
      setSelectedPlanIds((prev) => [...prev, confirmAction.planId]);
      setMessage("Plan added to basket.");
    } else {
      setSelectedPlanIds((prev) =>
        prev.filter((id) => id !== confirmAction.planId)
      );
      setMessage("Plan removed from basket.");
    }
    setConfirmAction(null);
    setTimeout(() => setMessage(null), 2400);
  };

  const toggleAddOn = (name: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const validateCard = () => {
    const errors: CardErrors = {};
    if (!newCard.name.trim()) errors.name = "Name required";
    const numberDigits = newCard.number.replace(/\D/g, "");
    if (numberDigits.length < 13 || numberDigits.length > 19)
      errors.number = "Enter 13-19 digits";
    const expDigits = newCard.exp.replace(/\D/g, "");
    if (expDigits.length !== 4) errors.exp = "MM/YY";
    if (expDigits.length === 4) {
      const mm = parseInt(expDigits.slice(0, 2), 10);
      if (mm < 1 || mm > 12) errors.exp = "Invalid month";
    }
    const cvcDigits = newCard.cvc.replace(/\D/g, "");
    if (cvcDigits.length < 3 || cvcDigits.length > 4) errors.cvc = "3-4 digits";
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };



  const total = useMemo(() => {
    const planTotal = selectedPlans.reduce(
      (sum, p) =>
        sum + (interval === "monthly" ? p.priceMonthly : p.priceAnnual),
      0
    );
    const addOnTotal = selectedAddOns.reduce((sum, name) => {
      const item = addOns.find((a) => a.name === name);
      return sum + (item ? item.price : 0);
    }, 0);
    return planTotal + addOnTotal;
  }, [interval, selectedPlans, selectedAddOns]);

  const formatPrice = (amount: number) => `\u00a3${amount.toFixed(0)}`;
  const savingsPercent =
    100 -
    Math.round((plans[0].priceAnnual / (plans[0].priceMonthly * 12)) * 100);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
            Checkout
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Complete your selection
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-white/65">
            Choose packs, add-ons, and confirm payment details.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/80 px-3 py-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-neutral-900/70">
          <span
            className={cn(
              "cursor-pointer rounded-xl px-3 py-1 text-sm",
              interval === "monthly" &&
                "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
            )}
            onClick={() => setInterval("monthly")}
          >
            Monthly
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Save {savingsPercent}% annually
          </span>
          <span
            className={cn(
              "cursor-pointer rounded-xl px-3 py-1 text-sm",
              interval === "annual" &&
                "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
            )}
            onClick={() => setInterval("annual")}
          >
            Annual
          </span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,0.9fr]">
        <div className="space-y-6">
          <SectionCard
            title="Selected products"
            description="Plans added to your basket."
          >
            {selectedPlans.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-white/60">
                No plans selected yet.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {selectedPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    interval={interval}
                    actionLabel="Remove"
                    onAction={() => togglePlan(plan.id, "remove")}
                    variant="selected"
                  />
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard
            title="Available products"
            description="Click a pack to add it to your basket."
            action={
              <button
                className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                onClick={() => setShowAvailable((s) => !s)}
              >
                {showAvailable ? "Hide" : "Show"}
              </button>
            }
          >
            {showAvailable && (
              <div className="grid gap-4 md:grid-cols-2">
                {availablePlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    interval={interval}
                    actionLabel="Add"
                    onAction={() => togglePlan(plan.id, "add")}
                    variant="available"
                  />
                ))}
              </div>
            )}
            {!showAvailable && (
              <p className="text-sm text-neutral-500 dark:text-white/60">
                Available packs hidden.
              </p>
            )}
          </SectionCard>

          <SectionCard
            title="Optional add-ons"
            description="Enhance your plan with extras."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {addOns.map((addOn) => {
                const active = selectedAddOns.includes(addOn.name);
                return (
                  <div
                    key={addOn.name}
                    className={cn(
                      "relative rounded-2xl border p-4 transition",
                      active
                        ? "border-blue-500 bg-blue-50/60 dark:border-blue-400 dark:bg-blue-400/10"
                        : "border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900/60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold">{addOn.name}</p>
                        <p className="text-sm text-neutral-500 dark:text-white/60">
                          {addOn.description}
                        </p>
                      </div>
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm transition dark:bg-blue-500">
                        {"\u00a3"}
                        {addOn.price}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleAddOn(addOn.name)}
                      className={cn(
                        "mt-4 w-full rounded-xl px-3 py-2 text-sm font-semibold text-white transition",
                        active
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600",
                        "dark:bg-blue-500 dark:hover:bg-blue-600"
                      )}
                    >
                      {active ? "Remove add-on" : "Add add-on"}
                    </button>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Order summary"
            description="Review your selection before checkout."
          >
            <div className="space-y-3">
              {selectedPlans.length === 0 && (
                <p className="text-sm text-neutral-500 dark:text-white/60">
                  Add at least one plan to continue.
                </p>
              )}
              {selectedPlans.map((plan) => (
                <LineItem
                  key={plan.id}
                  label={plan.name}
                  price={
                    interval === "monthly"
                      ? plan.priceMonthly
                      : plan.priceAnnual
                  }
                  interval={interval}
                />
              ))}
              {selectedAddOns.map((name) => {
                const addOn = addOns.find((a) => a.name === name);
                if (!addOn) return null;
                return (
                  <LineItem key={name} label={addOn.name} price={addOn.price} />
                );
              })}
              <div className="mt-4 border-t border-dashed border-neutral-200 pt-4 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-white/70">
                    Total
                  </span>
                  <div className="text-right">
                    <p className="text-xl font-bold">{formatPrice(total)}</p>
                    <p className="text-xs text-neutral-500 dark:text-white/60">
                      Excludes taxes
                    </p>
                  </div>
                </div>
              </div>
              <button
                disabled={selectedPlans.length === 0}
                className={cn(
                  "mt-2 w-full rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition",
                  selectedPlans.length === 0
                    ? "cursor-not-allowed bg-neutral-300 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-[0_18px_40px_rgba(59,130,246,0.35)]"
                )}
                onClick={() =>
                  setMessage("Checkout is front-end only in this prototype.")
                }
              >
                Proceed to checkout
              </button>
            </div>
          </SectionCard>

          <SectionCard
            title="Saved cards"
            description="Tap a card to view or select."
          >
            <div className="space-y-3">
              {savedCards.map((card, idx) => {
                const active = idx === activeCardIndex;
                return (
                  <button
                    key={card.label}
                    onClick={() => setActiveCardIndex(idx)}
                    className={cn(
                      "w-full rounded-2xl border px-4 py-3 text-left transition",
                      active
                        ? "border-blue-500 bg-blue-50/60 dark:border-blue-400 dark:bg-blue-400/10"
                        : "border-neutral-200 bg-white hover:border-blue-300 dark:border-white/10 dark:bg-neutral-900/60"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{card.label}</p>
                        <p className="text-xs text-neutral-500 dark:text-white/60">
                          {card.name} - Expires {card.exp}
                        </p>
                      </div>
                      {active && (
                        <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
              <button
                className="w-full rounded-xl border border-dashed border-neutral-300 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-400 dark:border-white/15 dark:text-blue-300"
                onClick={() => setCardFormOpen((v) => !v)}
              >
                {cardFormOpen ? "Close new card form" : "Use a new card"}
              </button>
            </div>
          </SectionCard>

          {cardFormOpen && (
            <SectionCard title="Add a new card">
              <div className="space-y-3">
                <Input
                  label="Cardholder name"
                  value={newCard.name}
                  onChange={(e) =>
                    setNewCard((c) => ({ ...c, name: e.target.value }))
                  }
                  error={cardErrors.name}
                  placeholder="Alex Johnson"
                />
                <Input
                  label="Card number"
                  value={newCard.number}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 19);
                    const grouped = digits.replace(/(.{4})/g, "$1 ").trim();
                    setNewCard((c) => ({ ...c, number: grouped }));
                  }}
                  error={cardErrors.number}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Expiry"
                    value={newCard.exp}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);
                      const withSlash =
                        digits.length > 2
                          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                          : digits;
                      setNewCard((c) => ({ ...c, exp: withSlash }));
                    }}
                    error={cardErrors.exp}
                    placeholder="MM/YY"
                    inputMode="numeric"
                  />
                  <Input
                    label="CVC"
                    value={newCard.cvc}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);
                      setNewCard((c) => ({ ...c, cvc: digits }));
                    }}
                    error={cardErrors.cvc}
                    placeholder="123"
                    inputMode="numeric"
                  />
                </div>
                <div className="flex gap-3">
                  {["Visa", "Mastercard", "Amex"].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setNewCard((c) => ({ ...c, brand }))}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-sm font-semibold transition",
                        newCard.brand === brand
                          ? "border-blue-500 bg-blue-50/60 text-blue-700 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-100"
                          : "border-neutral-200 bg-white text-neutral-700 dark:border-white/10 dark:bg-neutral-900/60 dark:text-white/80"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
                <button
                  onClick={saveNewCard}
                  className="mt-2 w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-neutral-900"
                >
                  Save card
                </button>
              </div>
            </SectionCard>
          )}
        </div>
      </div>

      {confirmAction && (
        <Modal
          title={
            confirmAction.mode === "add"
              ? "Add plan to basket?"
              : "Remove plan from basket?"
          }
          onCancel={() => setConfirmAction(null)}
          onConfirm={confirmPlanAction}
          confirmLabel={confirmAction.mode === "add" ? "Add" : "Remove"}
        >
          {confirmAction.mode === "add"
            ? "This plan will appear in your order summary."
            : "This plan will be removed from your order summary."}
        </Modal>
      )}

      {message && (
        <div className="fixed bottom-6 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold shadow-2xl dark:border-white/10 dark:bg-neutral-900">
          {message}
        </div>
      )}
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur dark:border-white/10 dark:bg-neutral-900/70">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
            {title}
          </p>
          {description && (
            <p className="text-sm text-neutral-600 dark:text-white/65">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function PlanCard({
  plan,
  interval,
  actionLabel,
  onAction,
  variant,
}: {
  plan: Plan;
  interval: BillingInterval;
  actionLabel: string;
  onAction: () => void;
  variant: "selected" | "available";
}) {
  const price = interval === "monthly" ? plan.priceMonthly : plan.priceAnnual;
  const isSelected = variant === "selected";
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border p-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition",
        "bg-white text-neutral-900 border-neutral-200",
        "dark:bg-neutral-900 dark:text-white dark:border-white/10",
        isSelected &&
          "border-blue-600 shadow-[0_25px_70px_rgba(37,99,235,0.25)] ring-1 ring-blue-300/70 dark:border-blue-400 dark:ring-blue-400/50"
      )}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-white/50">
        {variant === "available" ? "Included in this pack" : "In your basket"}
      </p>
      <h3 className="mt-1 text-xl font-semibold">{plan.name}</h3>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {plan.features.map((feature) => (
          <div
            key={feature}
            className="flex items-start gap-2 text-sm leading-snug"
          >
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-neutral-700 dark:text-white/70">
            {"\u00a3"}
          </span>
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-xs text-neutral-500 dark:text-white/60">
            {interval === "monthly" ? "/month" : "/year"}
          </span>
        </div>
        <button
          onClick={onAction}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold shadow-lg transition",
            variant === "available"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          )}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

function LineItem({
  label,
  price,
  interval,
}: {
  label: string;
  price: number;
  interval?: BillingInterval;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-700 dark:text-white/75">{label}</span>
      <span className="font-semibold text-neutral-900 dark:text-white">
        {"\u00a3"}
        {price}
        {interval === "monthly" && " /mo"}
        {interval === "annual" && " /yr"}
      </span>
    </div>
  );
}

function Input({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block text-sm font-medium text-neutral-700 dark:text-white/75">
      {label}
      <input
        {...props}
        className={cn(
          "mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none transition",
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-neutral-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-white/10 dark:bg-neutral-900/80 dark:focus:ring-blue-400/30"
        )}
      />
      {error && (
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      )}
    </label>
  );
}

function Modal({
  title,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-neutral-900">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-white/65">
          Please confirm this action.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-white/10 dark:text-white dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-neutral-900"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
