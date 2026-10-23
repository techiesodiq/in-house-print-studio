import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ARTWORK_CHECKLIST, FAQS, PHOTOS, PROCESS_STEPS } from "@/lib/products";

export const metadata: Metadata = {
  title: "How it works — In House Print Studios",
  description: "From enquiry to boxed and delivered — exactly what happens at each step of a print job.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] py-[clamp(28px,4vw,56px)] pb-[clamp(48px,6vw,90px)]">
      <div className="mb-[clamp(28px,4vw,52px)] flex max-w-[60ch] flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-acc-ink">How it works</span>
        <h1 className="font-display text-[clamp(30px,4.3vw,52px)] font-bold leading-[1.02] tracking-[-0.036em]">
          From enquiry to
          <br />
          boxed and delivered
        </h1>
        <p className="text-[15px] leading-[1.62] text-ink2 text-pretty">
          We quote per job because no two are the same. Here&apos;s exactly what happens and what we
          need from you at each point.
        </p>
      </div>

      <div className="relative mb-[clamp(28px,3.4vw,48px)] flex min-h-[clamp(180px,26vw,380px)] items-end overflow-hidden rounded-[18px] border border-line bg-bg2 p-[clamp(16px,2.4vw,28px)]">
        <Image
          src={PHOTOS.howItWorksBanner}
          alt="Screen printing frames racked in the studio"
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,7,.72)] via-[rgba(10,9,7,.12)] to-transparent" />
        <span className="relative font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/90">
          Screens racked and ready — every job starts here
        </span>
      </div>

      <div className="mb-[clamp(32px,4vw,60px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[clamp(12px,1.6vw,20px)]">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.n}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-surf p-[clamp(18px,2.2vw,28px)]"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-acc-soft font-mono text-[11px] text-acc-ink">
              {step.n}
            </span>
            <span className="text-[16px] font-semibold tracking-[-0.01em]">{step.title}</span>
            <span className="text-[13.5px] leading-[1.6] text-ink2">{step.body}</span>
            <span className="mt-auto font-mono text-[10px] uppercase tracking-[0.08em] text-acc-ink">
              {step.who}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(20px,3vw,44px)]">
        <div id="faq" className="flex scroll-mt-24 flex-col gap-4">
          <h2 className="font-display text-[clamp(21px,2.5vw,30px)] font-bold tracking-[-0.03em]">
            Common questions
          </h2>
          <div className="flex flex-col border-t border-line">
            {FAQS.map((faq) => (
              <details key={faq.q} name="faq" className="faq-item group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[17px] text-left marker:content-none">
                  <span className="text-[15px] font-semibold tracking-[-0.01em]">{faq.q}</span>
                  <span className="shrink-0 font-mono text-[15px] text-acc-ink">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <p className="max-w-[62ch] pb-[18px] text-[14px] leading-[1.65] text-ink2 text-pretty">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-[18px] border border-line bg-bg2 p-[clamp(20px,2.6vw,32px)]">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-acc-ink">
            Artwork checklist
          </span>
          {ARTWORK_CHECKLIST.map((item) => (
            <span
              key={item}
              className="flex items-start gap-[11px] border-b border-line py-[9px] text-[13.5px] leading-[1.55]"
            >
              <span className="mt-[2px] h-4 w-4 shrink-0 rounded border border-acc bg-acc-soft" />
              {item}
            </span>
          ))}
          <Link
            href="/quote"
            className="mt-2 self-start rounded-xl bg-ink px-[22px] py-[14px] text-[14.5px] font-semibold text-bg"
          >
            Start a quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
