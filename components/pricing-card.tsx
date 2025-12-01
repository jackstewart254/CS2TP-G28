"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { CustomPricingNote } from "./custom-pricing-note"

interface PricingBlockProps {
  title: string
  price: string | number
  interval?: string
  features: string[]
  extras?: string[]
  buttonLabel?: string
  onClick?: () => void
}

export function PricingBlock({
  title,
  price,
  interval = "/month",
  features,
  extras = [],
  buttonLabel = "Get Started",
  onClick,
}: PricingBlockProps) {
  return (
    <div className="p-1 sm:p-4 md:p-4 rounded-3xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
      <div className="flex flex-col gap-4 h-full justify-start">
        <div className="p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-input w-full dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)]">
          <div className="flex justify-between items-start">
            <div className="flex gap-2 flex-col">
              <p className="font-medium text-lg text-black dark:text-white">
                {title}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-end">
              <span className="text-lg font-bold text-neutral-500 dark:text-neutral-200">
                $
              </span>

              <div className="flex items-start gap-2">
                <span className="text-3xl md:text-7xl font-bold dark:text-neutral-50 text-neutral-800">
                  {price}
                </span>
              </div>

              <span className="text-base font-normal text-neutral-500 dark:text-neutral-200 mb-1 md:mb-2">
                {interval}
              </span>
            </div>
          </div>

       <button
  type="button"
  onClick={() => {
    console.log("pricing button clicked")
    onClick?.()
  }}
  className="
    px-4 py-2 rounded-md bg-gradient-to-b from-blue-500 to-blue-700 
    text-sm font-bold text-white cursor-pointer inline-block text-center 
    hover:-translate-y-0.5 transition duration-200 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]
    w-full mt-10
  "
>
  {buttonLabel}
</button>

        </div>

        <div className="mt-1 p-4">
          {features.map((feature, i) => (
            <PricingItem key={i} text={feature} color="bg-neutral-700" />
          ))}
          <CustomPricingNote />
        </div>

        <Divider />

        <div className="p-4">
          {extras.map((extra, i) => (
            <PricingItem key={i} text={extra} color="bg-sky-500" />
          ))}
        </div>
      </div>
    </div>
  )
}

function PricingItem({ text, color }: { text: string; color: string }) {
  return (
    <div className="flex items-start justify-start gap-2 my-4">
      <div
        className={cn(
          "h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
          color,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 [stroke-width:4px] text-neutral-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M5 12l5 5l10 -10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="font-medium text-black text-sm dark:text-white">
        {text}
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div className="relative">
      <div className="w-full h-px dark:bg-neutral-950 bg-white" />
      <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800" />

      <div
        className="absolute inset-0 h-5 w-5 m-auto rounded-xl dark:bg-neutral-800 bg-white
                     shadow-[0px_-1px_0px_0px_var(--neutral-200)] 
                     dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)] 
                     flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 [stroke-width:4px] dark:text-neutral-300 text-black"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 5v14" strokeLinecap="round" />
          <path d="M5 12h14" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
