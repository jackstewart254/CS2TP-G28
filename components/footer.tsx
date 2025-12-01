"use client";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background w-full py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* BIG HEADING */}
        <h1
          className="
            text-center text-3xl md:text-5xl lg:text-[8rem] font-bold 
            bg-clip-text text-transparent 
            bg-gradient-to-r 
            from-[#38bdf8] 
            via-[#818cf8] 
            via-[#c084fc] 
            via-[#e879f9] 
            to-[#22d3ee]
            select-none
          "
        >
          Get Started Today
        </h1>

        {/* DESCRIPTION */}
        <p className="text-center max-w-2xl mx-auto mt-4 text-neutral-600 dark:text-neutral-400 text-lg">
          Start building meaningful products powered by real-time data,
          actionable insights, and a powerful ecosystem.
        </p>

        {/* CTA BUTTON */}
        <div className="flex justify-center mt-8">
          <Link
            href="/products"
            className="
              px-6 py-3 rounded-xl 
              bg-gradient-to-r from-blue-500 to-purple-500 
              text-white font-semibold shadow-lg
              hover:opacity-90 transition
            "
          >
            Explore Products
          </Link>
        </div>

        {/* FOOTER GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li>
                <Link
                  href="/products"
                  className="hover:text-neutral-900 dark:hover:text-white"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-neutral-900 dark:hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-neutral-900 dark:hover:text-white"
                >
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - No links */}
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="hover:text-neutral-900 dark:hover:text-white">
                <span>About</span>
              </li>
              <li className="hover:text-neutral-900 dark:hover:text-white">
                <span>Careers</span>
              </li>
              <li className="hover:text-neutral-900 dark:hover:text-white">
                <span>Contact</span>
              </li>
            </ul>
          </div>

          {/* Column 3 - No links */}
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="hover:text-neutral-900 dark:hover:text-white">
                <span>Documentation</span>
              </li>
              <li className="hover:text-neutral-900 dark:hover:text-white">
                <span>Blog</span>
              </li>
              <li className="hover:text-neutral-900 dark:hover:text-white">
                <span>Support</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social (kept) */}
          <div>
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4 text-neutral-600 dark:text-neutral-400">
              <Twitter
                size={20}
                className="hover:text-blue-500 cursor-pointer"
              />
              <Github
                size={20}
                className="hover:text-purple-500 cursor-pointer"
              />
              <Linkedin
                size={20}
                className="hover:text-blue-700 cursor-pointer"
              />
              <Mail size={20} className="hover:text-red-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t pt-6 text-center text-neutral-500 dark:text-neutral-500 text-sm">
          © {new Date().getFullYear()} FoundationData. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
