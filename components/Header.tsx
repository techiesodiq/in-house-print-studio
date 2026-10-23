"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoLockup } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useQuoteStore } from "@/lib/quote-store";
import { PRODUCTS } from "@/lib/products";

const NAV_ITEMS = [
  { href: "/catalogue", label: "Catalogue" },
  { href: `/catalogue/${PRODUCTS[0].slug}`, label: "Product" },
  { href: "/quote", label: "Get a quote" },
  { href: "/how-it-works", label: "How it works" },
];

export function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center bg-ink px-4 py-[9px] text-center text-bg">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] leading-[1.55] sm:text-[10.5px]">
        Print-to-order in Australia · Screen print &amp; DTF · 7–10 working day turnaround
      </span>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const itemCount = useQuoteStore((s) => s.items.length);

  const isActive = (href: string) =>
    href === "/catalogue" ? pathname.startsWith("/catalogue") && pathname === href : pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[clamp(62px,7vw,78px)] max-w-[1400px] items-center justify-between gap-[clamp(8px,2vw,20px)] px-[clamp(12px,4vw,56px)]">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setNavOpen(false)}>
          <LogoLockup />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-lg px-[14px] py-[9px] text-[14px] font-medium transition-colors hover:bg-bg2 ${
                isActive(item.href) ? "bg-bg2 text-ink" : "text-ink2"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 shrink-0 items-center gap-2">
          <ThemeToggle />
          <Link
            href="/quote"
            className="flex items-center gap-2 whitespace-nowrap rounded-[10px] bg-ink px-[clamp(11px,1.4vw,16px)] py-[10px] text-[13.5px] font-semibold text-bg shadow-[var(--shadow)] transition-transform hover:-translate-y-px"
          >
            <span className="hidden md:inline">Request a quote</span>
            <span className="md:hidden">Quote</span>
            <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-acc px-[5px] font-mono text-[10.5px] font-medium text-[#17150F]">
              {itemCount}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-expanded={navOpen}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-[10px] border border-line bg-surf md:hidden"
          >
            <span className="h-[1.5px] w-[15px] bg-ink" />
            <span className="h-[1.5px] w-[15px] bg-ink" />
          </button>
        </div>
      </div>

      {navOpen && (
        <nav className="flex flex-col gap-[2px] border-t border-line bg-bg px-4 pb-[18px] pt-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setNavOpen(false)}
              className={`rounded-[10px] px-3 py-[13px] text-left text-[16px] font-medium ${
                isActive(item.href) ? "bg-bg2 text-ink" : "text-ink2"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
