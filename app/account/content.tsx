import { cn } from "@/lib/utils";
import { useFetchUser } from "@/lib/hooks/useFetchUser";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SectionCard } from "../payment/components/sectionCard";
import { SavedCard } from "@/lib/types/savedCards";
import { CardErrors } from "@/lib/types/cardErrors";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { InsertKey } from "@/lib/hooks/create/create-api";
import { EventLoader } from "@/components/event-loader";
import { toast } from "sonner";

const Account = () => {
  const {
    user: { email, fname, lname, apiKeys, cards },
    loading,
    error,
    refetch,
    insertCard,
  } = useFetchUser();

  const [cardFormOpen, setCardFormOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [newCard, setNewCard] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
    brand: false,
  });
  const [cardErrors, setCardErrors] = useState<CardErrors>({});
  const [confirmAction, setConfirmAction] = useState<{
    planId: string;
    mode: "add" | "remove";
  } | null>(null);
  const [keyName, setKeyName] = useState<string>("");
  const [addKey, setAddKey] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const callInsertKey = async () => {
    const id = EventLoader("Creating API key...");

    try {
      await InsertKey({ name: keyName });
      toast.success("API key created!");
      setKeyName("");
      setAddKey(false);
    } catch (err) {
      toast.error("Something went wrong creating your key.");
    } finally {
      await refetch();
      toast.dismiss(id);
    }
  };

  const isCardValid = () => {
    const name = newCard.holder.trim();

    // NAME RULE: Two words, each 2+ characters
    const nameParts = name.split(" ").filter(Boolean);
    const nameValid =
      nameParts.length >= 2 && nameParts.every((w) => w.length >= 1);

    // CARD NUMBER RULE: 16 digits
    const digits = newCard.number.replace(/\D/g, "");
    const numberValid = digits.length === 16;

    // EXPIRY RULE: must match MM/YY
    const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(newCard.expiry);

    // CVV RULE: at least 3 digits
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

  if (loading) {
    return <PageLoader text="Loading your account..." />;
  }

  // if (error) {
  //   return (
  //     <div className="flex h-[calc(100vh-53px)] items-center justify-center">
  //       <p className="text-sm text-red-500">
  //         There was a problem loading your account. Please try again.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div
      className={cn(
        "flex w-full flex-1 items-center justify-center no-scrollbar",
        "h-[calc(100vh-53px)]"
      )}
    >
      <div className="w-full h-full max-w-7xl flex flex-col p-4 lg:p-10 overflow-auto no-scrollbar">
        <div className="w-full flex flex-col gap-6">
          <header className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">Hey, {fname}</h1>
              <p className="mt-2 text-neutral-600 dark:text-white/65">
                Voilà! Here is your account overview.
              </p>
            </div>
          </header>

          {/* Personal information */}
          <SectionCard
            title="Profile"
            description="Basic information associated with your account."
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-xs font-medium text-muted-foreground mb-1">
                  Email
                </label>
                <Input
                  value={email}
                  disabled
                  className="font-mono text-sm bg-muted/40"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-muted-foreground mb-1">
                  First name
                </label>
                <Input
                  value={fname}
                  disabled
                  className="font-mono text-sm bg-muted/40"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-muted-foreground mb-1">
                  Last name
                </label>
                <Input
                  value={lname}
                  disabled
                  className="font-mono text-sm bg-muted/40"
                />
              </div>
            </div>
          </SectionCard>

          {/* Two-column layout */}
          <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Data API column */}
            <div className="w-full flex flex-col gap-4">
              <SectionCard
                title="Data API"
                description="Configure API keys to securely control access to your project."
              >
                <div className="flex flex-col gap-3">
                  <button
                    className="w-full rounded-xl border border-dashed border-neutral-300 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-400 dark:border-white/15 dark:text-blue-300"
                    onClick={() => setAddKey((v) => !v)}
                  >
                    {addKey ? "Cancel" : "New API key"}
                  </button>

                  <Separator />

                  {apiKeys.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {apiKeys.map((item) => {
                        const isCopied = copiedId === item.id;

                        return (
                          <div
                            className="w-full flex items-end gap-3 p-4 border rounded-xl bg-muted/30"
                            key={item.id}
                          >
                            <div className="flex flex-col w-1/3">
                              <label className="text-xs font-medium text-muted-foreground mb-1">
                                Name
                              </label>
                              <Input
                                value={item.name}
                                disabled
                                className="font-mono text-sm bg-muted/40"
                              />
                            </div>

                            <div className="flex flex-col flex-1">
                              <label className="text-xs font-medium text-muted-foreground mb-1">
                                API key
                              </label>
                              <Input
                                value={item.key}
                                disabled
                                className="font-mono text-sm bg-muted/40"
                              />
                            </div>

                            {isCopied ? (
                              <Button
                                disabled
                                className="h-min flex items-center gap-1 rounded-lg"
                              >
                                ✓ Copied
                              </Button>
                            ) : (
                              <Button
                                className="h-min rounded-lg"
                                onClick={() => {
                                  navigator.clipboard.writeText(item.key);
                                  setCopiedId(item.id);
                                  setTimeout(() => setCopiedId(null), 1000);
                                }}
                              >
                                Copy
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      You don&apos;t have any API keys yet.
                    </p>
                  )}
                </div>
              </SectionCard>

              {addKey && (
                <SectionCard title="Create data API key">
                  <div className="flex flex-col w-full gap-3">
                    <Input
                      placeholder="Name your key (min. 3 characters)"
                      value={keyName}
                      onChange={(e) => setKeyName(e.target.value)}
                    />
                    <Button
                      className="w-full"
                      disabled={keyName.length < 3}
                      onClick={callInsertKey}
                    >
                      Create key
                    </Button>
                  </div>
                </SectionCard>
              )}
            </div>

            {/* Saved cards column */}
            <div className="flex flex-col gap-4 w-full">
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
        </div>
      </div>
    </div>
  );
};

export default Account;
