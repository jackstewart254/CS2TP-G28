"use client";

import {
  useEffect,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useFetchCart } from "@/lib/hooks/useFetchCart";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { useFetchProducts } from "@/lib/hooks/useFetchProducts";
import { PageLoader } from "@/components/page-loader";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useFetchUser } from "@/lib/hooks/useFetchUser";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { EventLoader } from "@/components/event-loader";
import { useRemoveFromCart } from "@/lib/hooks/useRemoveFromCart";
import Link from "next/link";

type BillingInterval = "monthly" | "annual";

export default function Payment() {
  const {
    cartItems,
    loading: cartLoading,
    refetch: cartRefetch,
  } = useFetchCart();
  const { products, loading } = useFetchProducts();
  const { addToCart } = useAddToCart();
  const { removeFromCart } = useRemoveFromCart();
  const {
    user: { cards },
    loading: userLoading,
    refetch,
    insertCard,
  } = useFetchUser();

  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [newCard, setNewCard] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
    brand: false,
  });
  const [confirmAction, setConfirmAction] = useState<{
    planId: string;
    mode: "add" | "remove";
  } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const togglePlan = (planId: string, mode: "add" | "remove") => {
    setConfirmAction({ planId, mode });
    setSelectedProduct(planId);
  };

  const callRemoveFromCart = async (cartItem: string) => {
    await removeFromCart(cartItem);
    cartRefetch();
  };

  const confirmPlanAction = (id: string) => {
    if (!confirmAction) return;
    if (confirmAction.mode === "add") {
      setMessage("Plan added to basket.");
    } else {
      setMessage("Plan removed from basket.");
      callRemoveFromCart(id);
    }
    setConfirmAction(null);
    setTimeout(() => setMessage(null), 2400);
  };

  const isCardValid = () => {
    const name = newCard.holder.trim();

    const nameParts = name.split(" ").filter(Boolean);
    const nameValid =
      nameParts.length >= 2 && nameParts.every((w) => w.length >= 1);
    const digits = newCard.number.replace(/\D/g, "");
    const numberValid = digits.length === 16;

    const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(newCard.expiry);

    const cvvValid = newCard.cvv.length >= 3;

    return nameValid && numberValid && expiryValid && cvvValid;
  };

  const callSaveCard = async () => {
    const id = EventLoader("Inserting bank card");

    try {
      await insertCard({
        holder: newCard.holder,
        card_number: newCard.number,
        cvv: +newCard.cvv,
        expiry: newCard.expiry,
        provider: Math.random() < 0.5 ? "Visa" : "Mastercard",
      });
      setNewCard({ holder: "", number: "", expiry: "", cvv: "", brand: false });
      setCardFormOpen(false);
      toast.success("Bank card inserted successfully!");
    } catch (err) {
      toast.error("Something went wrong creating your key.");
    } finally {
      await refetch();
      toast.dismiss(id);
    }
  };

  if (loading || cartLoading || userLoading) {
    return <PageLoader text="Loading payment..." />;
  }

  return (
    <div className="mx-auto max-w-7xl p-10">
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
            Save 17% annually
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
            {cartItems.length === 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-neutral-500 dark:text-white/60">
                  No plans selected yet.
                </p>
                <Link href="/products">
                  <Button className="w-full">Return to products</Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {cartItems.map((plan) => {
                  const product = products.find(
                    (p) => p.id === plan.product_id
                  );
                  return (
                    <PlanCard
                      key={plan.id}
                      plan={product}
                      interval={interval}
                      actionLabel="Remove"
                      onAction={() => togglePlan(plan.product_id, "remove")}
                      variant="selected"
                    />
                  );
                })}
              </div>
            )}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Order summary"
            description="Review your selection before checkout."
          >
            <div className="space-y-3">
              <div className="mt-4 border-t border-dashed border-neutral-200 pt-4 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-white/70">
                    Total
                  </span>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-neutral-700 dark:text-white/70">
                        {"\u00a3"}
                      </span>
                      <span className="text-3xl font-bold">
                        <NumberTicker
                          value={
                            interval === "monthly"
                              ? cartItems.length * 5
                              : cartItems.length * 5 * 10
                          }
                        />
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-white/60">
                        {interval === "monthly" ? "/month" : "/year"}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-white/60">
                      Excludes taxes
                    </p>
                  </div>
                </div>
              </div>
              <button
                disabled={cartItems.length === 0}
                className={cn(
                  "mt-2 w-full rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition",
                  cartItems.length === 0
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
              {cards.map((card, idx) => {
                const active = idx === activeCardIndex;

                return (
                  <button
                    key={card.id}
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
                        <p className="font-semibold">
                          {card.provider +
                            " **** " +
                            String(card.card_number).slice(-4)}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-white/60">
                          {card.holder} - Expires{" "}
                          {card.expiry
                            .replace(/\D/g, "")
                            .slice(0, 4)
                            .replace(/(\d{2})(\d{(1, 2)})/, "$1/$2")}
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
                  value={newCard.holder}
                  onChange={(e) =>
                    setNewCard((c) => ({ ...c, holder: e.target.value }))
                  }
                  placeholder="Alex Johnson"
                  label={""}
                />

                <Input
                  value={newCard.number}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 16);
                    const grouped = digits.replace(/(.{4})/g, "$1 ").trim();
                    setNewCard((c) => ({ ...c, number: grouped }));
                  }}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={newCard.expiry}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);
                      const withSlash =
                        digits.length > 2
                          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                          : digits;
                      setNewCard((c) => ({ ...c, expiry: withSlash }));
                    }}
                    placeholder="MM/YY"
                    inputMode="numeric"
                  />

                  <Input
                    value={newCard.cvv}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 3);
                      setNewCard((c) => ({ ...c, cvv: digits }));
                    }}
                    placeholder="123"
                    inputMode="numeric"
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={!isCardValid()}
                  onClick={() => {
                    callSaveCard();
                  }}
                >
                  Save card
                </Button>
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
          onConfirm={() => {
            confirmPlanAction(selectedProduct);
          }}
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
        {/* {plan.features.map((feature) => (
          <div
            key={feature}
            className="flex items-start gap-2 text-sm leading-snug"
          >
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400" />
            <span>{feature}</span>
          </div>
        ))} */}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-neutral-700 dark:text-white/70">
            {"\u00a3"}
          </span>
          <span className="text-3xl font-bold">
            <NumberTicker
              value={interval === "monthly" ? plan.price : plan.price * 10}
            />
          </span>
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
