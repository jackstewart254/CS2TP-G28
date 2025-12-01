"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";

export function NavigationBar() {
  const path = usePathname();
  const showStyle = path === "/dashboard" || path === "/admin-dashboard";
  const router = useRouter();
  const navItems = [
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Admin",
      link: "/admin-dashboard",
    },
    {
      name: "Account",
      link: "/account",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <Navbar className={showStyle ? "border-b backdrop-blur-md" : ""}>
      <NavBody className="backdrop-blur-md">
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          <NavbarButton
            as="button"
            variant="primary"
            onClick={() => router.push("/auth/sign-up")}
          >
            Signup
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, index) => (
            <a
              key={`mobile-link-${index}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Login
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Signup
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
