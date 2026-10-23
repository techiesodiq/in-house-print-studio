import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import {
  CLIENTS,
  METHOD_INFO,
  PHOTOS,
  PRODUCTS,
  PROCESS_STEPS,
  WORK,
} from "@/lib/products";

const HERO_FACTS = [
  "7–10 working day turnaround",
  "No minimum on DTF",
  "Quoted, not guessed",
];

export default function HomePage() {
  const homeProducts = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-[clamp(28px,4vw,64px)] px-[clamp(16px,4vw,56px)] py-[clamp(40px,7vw,96px)] pb-[clamp(32px,5vw,64px)]">
        <div className="animate-ihps-rise flex flex-col items-start gap-[clamp(18px,2.4vw,30px)]">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surf py-[6px] pl-2 pr-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
            <span className="h-[6px] w-[6px] rounded-full bg-acc" />
            Screen print &amp; DTF · Australia
          </span>
          <h1 className="font-display text-[clamp(34px,6.1vw,74px)] font-bold leading-[0.96] tracking-[-0.038em] text-balance">
            Merch worth wearing twice.
          </h1>
          <p className="max-w-[46ch] text-[clamp(15px,1.35vw,18.5px)] leading-[1.62] text-ink2 text-pretty">
            A small print studio working with cafes, gyms, churches, trades and
            bands. Send us the artwork, we quote it properly, and it lands on
            garments we&apos;d wear ourselves.
          </p>
          <div className="flex flex-wrap gap-[10px] pt-[2px]">
            <Link
              href="/quote"
              className="rounded-xl bg-ink px-[26px] py-[15px] text-[15px] font-semibold text-bg shadow-[var(--shadow)] transition-transform hover:-translate-y-[2px]"
            >
              Start a quote
            </Link>
            <Link
              href="/catalogue"
              className="rounded-xl border border-line bg-surf px-[26px] py-[15px] text-[15px] font-semibold transition-colors hover:border-acc"
            >
              Browse the range
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-[22px] gap-y-2 pt-[6px]">
            {HERO_FACTS.map((fact) => (
              <span
                key={fact}
                className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.04em] text-ink2"
              >
                <span className="h-[3px] w-[3px] rounded-full bg-acc" />
                {fact}
              </span>
            ))}
          </div>
        </div>
        <div className="relative flex aspect-[4/5] items-end overflow-hidden rounded-[18px] border border-line bg-bg2 p-[18px] shadow-[var(--shadow)]">
          <Image
            src={PHOTOS.hero}
            alt="Two printers pulling a screen print in the studio"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="absolute inset-0 object-cover"
            priority
          />
          <span className="relative rounded-full border border-line bg-bg px-[11px] py-[7px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink2">
            In the studio — Screen print run
          </span>
        </div>
      </section>

      <Marquee items={CLIENTS} />

      {/* Range */}
      <section className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] py-[clamp(44px,6vw,96px)]">
        <div className="mb-[clamp(22px,3vw,40px)] flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-acc-ink">
              01 — The range
            </span>
            <h2 className="mt-3 font-display text-[clamp(26px,3.5vw,42px)] font-bold leading-[1.05] tracking-[-0.032em]">
              Blanks we stand behind
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="rounded-[10px] border border-line bg-surf px-[18px] py-[11px] text-[14px] font-semibold transition-colors hover:border-acc"
          >
            All products →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[clamp(12px,1.6vw,22px)]">
          {homeProducts.map((product) => (
            <ProductCard key={product.slug} product={product} variant="home" />
          ))}
        </div>
      </section>

      {/* Methods */}
      <section className="border-y border-line bg-bg2 px-[clamp(16px,4vw,56px)] py-[clamp(44px,6vw,96px)]">
        <div className="mx-auto max-w-[1400px]">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-acc-ink">
            02 — How we print
          </span>
          <h2 className="mb-[clamp(24px,3vw,42px)] mt-3 font-display text-[clamp(26px,3.5vw,42px)] font-bold leading-[1.05] tracking-[-0.032em]">
            Two methods, one studio
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(14px,2vw,26px)]">
            {METHOD_INFO.map((method) => (
              <div
                key={method.name}
                className="flex flex-col gap-4 overflow-hidden rounded-[18px] border border-line bg-surf pb-[clamp(22px,2.6vw,34px)]"
              >
                <div className="relative h-[clamp(150px,20vw,230px)] w-full bg-bg2">
                  <Image
                    src={method.image}
                    alt={method.name}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3 px-[clamp(22px,2.6vw,34px)]">
                  <h3 className="font-display text-[clamp(21px,2.3vw,28px)] font-bold tracking-[-0.026em]">
                    {method.name}
                  </h3>
                  <span className="whitespace-nowrap rounded-full bg-acc-soft px-[10px] py-[6px] font-mono text-[10px] uppercase tracking-[0.1em] text-acc-ink">
                    {method.moq}
                  </span>
                </div>
                <p className="px-[clamp(22px,2.6vw,34px)] text-[14.5px] leading-[1.6] text-ink2 text-pretty">
                  {method.body}
                </p>
                <div className="flex flex-col gap-[9px] px-[clamp(22px,2.6vw,34px)] pt-1">
                  {method.points.map((point) => (
                    <span
                      key={point}
                      className="flex items-start gap-[10px] text-[13.5px] text-ink"
                    >
                      <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-acc" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] py-[clamp(44px,6vw,96px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(24px,4vw,56px)]">
          <div className="flex flex-col items-start gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-acc-ink">
              03 — The process
            </span>
            <h2 className="font-display text-[clamp(26px,3.5vw,42px)] font-bold leading-[1.05] tracking-[-0.032em]">
              No mystery, no chasing
            </h2>
            <p className="max-w-[40ch] text-[15px] leading-[1.62] text-ink2 text-pretty">
              Every job runs the same five steps. You always know which one
              you&apos;re on.
            </p>
            <Link
              href="/how-it-works"
              className="mt-[6px] rounded-[11px] border border-line bg-surf px-5 py-[13px] text-[14px] font-semibold transition-colors hover:border-acc"
            >
              How it works in detail →
            </Link>
          </div>
          <div className="flex flex-col">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.n}
                className="flex gap-[18px] border-t border-line py-[18px]"
              >
                <span className="shrink-0 pt-[3px] font-mono text-[11px] text-acc-ink">
                  {step.n}
                </span>
                <span className="flex flex-col gap-[5px]">
                  <span className="text-[16px] font-semibold tracking-[-0.01em]">
                    {step.title}
                  </span>
                  <span className="text-[13.5px] leading-[1.55] text-ink2">
                    {step.body}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] pb-[clamp(44px,6vw,96px)]">
        <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(23px,2.8vw,34px)] font-bold tracking-[-0.03em]">
            Recent work
          </h2>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink2">
            Selected · 2025–26
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-[clamp(12px,1.6vw,20px)]">
          {WORK.map((item) => (
            <div
              key={item.client}
              className="relative flex aspect-[3/4] flex-col justify-end gap-[6px] overflow-hidden rounded-[14px] border border-line bg-bg2 p-[14px]"
            >
              <Image
                src={item.image}
                alt={item.client}
                fill
                sizes="25vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,7,.78)] via-[rgba(10,9,7,.16)] to-transparent" />
              <span className="relative self-start rounded-full border border-white/30 px-2 py-[5px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/90">
                {item.tag}
              </span>
              <span className="relative text-[14.5px] font-semibold text-white">
                {item.client}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] pb-[clamp(44px,6vw,96px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-center gap-7 rounded-[22px] bg-ink px-[clamp(20px,4vw,56px)] py-[clamp(32px,5vw,72px)] text-bg">
          <div className="flex flex-col gap-[14px]">
            <h2 className="font-display text-[clamp(26px,3.6vw,44px)] font-bold leading-[1.05] tracking-[-0.034em]">
              Got the artwork?
              <br />
              We&apos;ll quote it today.
            </h2>
            <p className="max-w-[44ch] text-[15px] leading-[1.6] opacity-70 text-pretty">
              Four short steps, an artwork upload, and a real human reading it.
              No account needed.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Link
              href="/quote"
              className="rounded-xl bg-acc px-7 py-4 text-[15.5px] font-bold text-[#17150F] transition-transform hover:-translate-y-[2px]"
            >
              Request a quote
            </Link>
            <span className="font-mono text-[11px] tracking-[0.06em] opacity-60">
              AI preferred · PDF &amp; JPG at 300 DPI min
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
