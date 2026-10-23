"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Chip } from "@/components/Chip";
import { OptionCard } from "@/components/OptionCard";
import { StepRail } from "@/components/StepRail";
import { QuoteSummary } from "@/components/QuoteSummary";
import { Dropzone } from "@/components/Dropzone";
import { api } from "@/lib/api";
import { estimateTotal } from "@/lib/estimate";
import { defaultSizeBreakdown, useQuoteStore } from "@/lib/quote-store";
import { PRODUCTS, getProduct } from "@/lib/products";
import type { Deadline, FullMethod, InkCount, Placement } from "@/types";

const STEP_NAMES = ["Product & quantity", "Print method", "Artwork", "Your details"];
const STEP_HEADINGS = [
  "What are we printing?",
  "How should it print?",
  "Send us the artwork",
  "Where do we send the quote?",
];

const QTY_PRESETS = [10, 25, 48, 100, 250];
const SIZE_LABELS = ["XS", "S", "M", "L", "XL", "2XL"];
const METHOD_CHOICES: { name: FullMethod; moq: string; hint: string }[] = [
  { name: "Screen print", moq: "MOQ on request", hint: "Best value at volume. Priced per colour." },
  { name: "DTF transfer", moq: "No minimum", hint: "Full colour, any quantity, fast." },
];
const PLACEMENTS: { label: Placement; dotX: number; dotY: number }[] = [
  { label: "Front", dotX: 12, dotY: 10 },
  { label: "Back", dotX: 12, dotY: 14 },
  { label: "Left chest", dotX: 20, dotY: 9 },
  { label: "Sleeve", dotX: 3, dotY: 18 },
];
const INK_COUNTS: InkCount[] = ["1 colour", "2 colours", "3 colours", "4+", "Full colour"];
const ARTWORK_SPECS = [
  { k: "Preferred", v: "Adobe Illustrator (.ai), outlined fonts" },
  { k: "Accepted", v: "PDF and JPG at 300 DPI or higher" },
  { k: "Reviewed by", v: "Us, before any proof goes out" },
];
const DEADLINES: Deadline[] = ["Standard", "Fixed date", "Not sure yet"];
const NEXT_STEPS = [
  "We read the request ourselves and reply with a written quote, usually the same day.",
  "Happy with it? Pay by bank transfer and we send an artwork proof for approval.",
  "Once approved, we print and let you know when it is ready for pickup or delivery.",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AU_PHONE_RE = /^(\+61|0)4\d{8}$/;

export default function QuotePage() {
  const draft = useQuoteStore();
  const [artwork, setArtwork] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const garmentPicks = PRODUCTS.slice(0, 4);
  const currentProduct = getProduct(draft.garment) ?? PRODUCTS[0];
  const sizeBreakdown = draft.sizeBreakdown ?? defaultSizeBreakdown(draft.qty);
  const estimate = useMemo(
    () => estimateTotal(draft.garment, draft.qty, draft.method, draft.inks),
    [draft.garment, draft.qty, draft.method, draft.inks]
  );

  const inkNote =
    draft.method === "Screen print"
      ? "Screen print is priced per colour — each colour is its own screen. Repeat orders reuse them free of charge."
      : "DTF prints unlimited colours in one pass, so colour count does not change the price.";

  function goToStep(n: number) {
    draft.setStep(n);
  }

  function validateContact() {
    const next: { name?: string; contact?: string } = {};
    if (!draft.contact.name.trim()) next.name = "Let us know your name.";
    const phoneDigits = draft.contact.phone.replace(/\s+/g, "");
    const emailOk = EMAIL_RE.test(draft.contact.email.trim());
    const phoneOk = AU_PHONE_RE.test(phoneDigits);
    if (!emailOk && !phoneOk) {
      next.contact = "Add a valid email, or an Australian mobile like 04__ ___ ___.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (!validateContact()) return;
    setSubmitError(null);
    setSubmitting(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("garment", draft.garment);
    formData.append("qty", String(draft.qty));
    formData.append("sizeBreakdown", JSON.stringify(sizeBreakdown));
    formData.append("method", draft.method);
    formData.append("placement", draft.placement);
    formData.append("inks", draft.inks);
    formData.append("notes", draft.notes);
    formData.append("deadline", draft.deadline);
    formData.append("name", draft.contact.name);
    formData.append("business", draft.contact.business);
    formData.append("email", draft.contact.email);
    formData.append("phone", draft.contact.phone);
    if (artwork) formData.append("artwork", artwork);

    try {
      const res = await api.post<{ ok: boolean; reference: string }>("/quote", formData, {
        onUploadProgress: (evt) => {
          if (evt.total) setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
        },
      });
      setConfirmation(res.data.reference);
      draft.reset();
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again, or email us directly.");
    } finally {
      setSubmitting(false);
      setUploadProgress(null);
    }
  }

  function handleNext() {
    if (draft.step < 4) {
      goToStep(draft.step + 1);
      return;
    }
    void handleSubmit();
  }

  if (confirmation) {
    return (
      <div className="mx-auto flex max-w-[640px] flex-col items-start gap-5 px-[clamp(16px,4vw,56px)] py-[clamp(60px,8vw,120px)]">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-acc-soft text-[22px] text-acc-ink">
          ✓
        </span>
        <h1 className="font-display text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.03em]">
          Request sent.
        </h1>
        <p className="text-[15.5px] leading-[1.6] text-ink2">
          We&apos;ll reply with a written quote, usually the same day. Your reference number is:
        </p>
        <span className="rounded-full border border-line bg-surf px-4 py-[10px] font-mono text-[13px] tracking-[0.06em] text-acc-ink">
          {confirmation}
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-[clamp(16px,4vw,56px)] py-[clamp(20px,3vw,40px)] pb-[clamp(48px,6vw,90px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(22px,3vw,48px)]">
        <div className="flex flex-col gap-[26px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-acc-ink">
              Step {draft.step} of 4 — {STEP_NAMES[draft.step - 1]}
            </span>
            <h1 className="font-display text-[clamp(26px,3.6vw,44px)] font-bold leading-[1.05] tracking-[-0.034em]">
              {STEP_HEADINGS[draft.step - 1]}
            </h1>
            <div className="mt-[6px] h-1 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-acc transition-[width] duration-[350ms] ease-[cubic-bezier(.4,0,.2,1)]"
                style={{ width: `${(draft.step / 4) * 100}%` }}
              />
            </div>
          </div>

          <StepRail step={draft.step} stepNames={STEP_NAMES} onStepClick={goToStep} />

          {draft.step === 1 && (
            <div className="animate-ihps-rise flex flex-col gap-[18px]">
              <div className="flex flex-col gap-[9px]">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">Garment</label>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-[9px]">
                  {garmentPicks.map((g) => (
                    <OptionCard
                      key={g.slug}
                      active={draft.garment === g.slug}
                      onClick={() => draft.setGarment(g.slug)}
                      className="flex items-center gap-3 px-[14px] py-3"
                    >
                      <span className="relative h-[34px] w-[34px] shrink-0 overflow-hidden rounded-lg bg-bg2">
                        <Image src={g.image} alt="" fill sizes="34px" className="object-cover" />
                      </span>
                      <span className="flex flex-col gap-[3px]">
                        <span className="text-[13.5px] font-semibold">{g.name}</span>
                        <span className="font-mono text-[10px] text-ink2">
                          {g.supplier} {g.code}
                        </span>
                      </span>
                    </OptionCard>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[9px]">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
                  Quantity — {draft.qty} units
                </label>
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={draft.qty}
                  onChange={(e) => draft.setQty(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-[7px] pt-[2px]">
                  {QTY_PRESETS.map((n) => (
                    <Chip key={n} active={draft.qty === n} onClick={() => draft.setQty(n)}>
                      {n}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[9px]">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
                  Size breakdown
                </label>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(72px,1fr))] gap-2">
                  {SIZE_LABELS.map((label) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-[5px] rounded-[10px] border border-line bg-surf p-[10px]"
                    >
                      <span className="font-mono text-[10px] tracking-[0.1em] text-ink2">{label}</span>
                      <input
                        type="number"
                        min={0}
                        value={sizeBreakdown[label] ?? 0}
                        onChange={(e) =>
                          draft.setSizeBreakdown({
                            ...sizeBreakdown,
                            [label]: Math.max(0, Number(e.target.value)),
                          })
                        }
                        className="w-full bg-transparent text-center text-[15px] font-semibold outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {draft.step === 2 && (
            <div className="animate-ihps-rise flex flex-col gap-5">
              <div className="flex flex-col gap-[9px]">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">Method</label>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[10px]">
                  {METHOD_CHOICES.map((m) => (
                    <OptionCard
                      key={m.name}
                      active={draft.method === m.name}
                      onClick={() => draft.setMethod(m.name)}
                      className="flex flex-col gap-[6px] px-4 py-[15px]"
                    >
                      <span className="text-[15px] font-semibold">{m.name}</span>
                      <span className="font-mono text-[10px] tracking-[0.06em] text-ink2">{m.moq}</span>
                      <span className="text-[12.5px] leading-[1.5] text-ink2">{m.hint}</span>
                    </OptionCard>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[9px]">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
                  Print placements
                </label>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] gap-[9px]">
                  {PLACEMENTS.map((p) => (
                    <OptionCard
                      key={p.label}
                      active={draft.placement === p.label}
                      onClick={() => draft.setPlacement(p.label)}
                      className="flex flex-col items-center gap-[9px] px-[10px] py-[14px]"
                    >
                      <span className="relative h-[42px] w-[34px] rounded-[5px] border border-line bg-bg2">
                        <span
                          className="absolute h-2 w-[10px] rounded-[2px]"
                          style={{
                            left: p.dotX,
                            top: p.dotY,
                            background: draft.placement === p.label ? "var(--acc)" : "var(--line)",
                          }}
                        />
                      </span>
                      <span className="text-[12.5px] font-medium">{p.label}</span>
                    </OptionCard>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[9px]">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
                  Colours in the artwork
                </label>
                <div className="flex flex-wrap gap-[7px]">
                  {INK_COUNTS.map((ink) => (
                    <Chip key={ink} active={draft.inks === ink} onClick={() => draft.setInks(ink)} className="min-w-[46px]">
                      {ink}
                    </Chip>
                  ))}
                </div>
                <span className="text-[12.5px] leading-[1.5] text-ink2">{inkNote}</span>
              </div>
            </div>
          )}

          {draft.step === 3 && (
            <div className="animate-ihps-rise flex flex-col gap-[18px]">
              <Dropzone file={artwork} onFileChange={setArtwork} />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[10px]">
                {ARTWORK_SPECS.map((spec) => (
                  <div key={spec.k} className="flex flex-col gap-[5px] rounded-xl border border-line bg-surf p-[14px]">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-acc-ink">{spec.k}</span>
                    <span className="text-[13.5px] leading-[1.5]">{spec.v}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[9px]">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
                  Notes for the studio (optional)
                </label>
                <textarea
                  rows={4}
                  value={draft.notes}
                  onChange={(e) => draft.setNotes(e.target.value)}
                  placeholder="Pantone references, where the logo should sit, anything we should know."
                  className="w-full resize-y rounded-xl border border-line bg-surf p-[14px] text-[14px] leading-[1.55] outline-none focus:border-acc"
                />
              </div>
              <div className="flex items-start gap-[11px] rounded-xl border border-line bg-bg2 p-[15px]">
                <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-acc" />
                <span className="text-[13px] leading-[1.55] text-ink2">
                  No print-ready file yet? Skip this step — leave a note above and we&apos;ll sort it offline.
                </span>
              </div>
            </div>
          )}

          {draft.step === 4 && (
            <div className="animate-ihps-rise flex flex-col gap-4">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
                <div className="flex flex-col gap-[7px]">
                  <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">Your name</label>
                  <input
                    type="text"
                    value={draft.contact.name}
                    onChange={(e) => draft.setContact({ name: e.target.value })}
                    placeholder="Matthew Ostini"
                    className="w-full rounded-[11px] border border-line bg-surf px-[14px] py-[13px] text-[14px] outline-none focus:border-acc"
                  />
                  {errors.name && <span className="text-[12.5px] text-acc-ink">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
                    Business or group
                  </label>
                  <input
                    type="text"
                    value={draft.contact.business}
                    onChange={(e) => draft.setContact({ business: e.target.value })}
                    placeholder="Ostini Cafe"
                    className="w-full rounded-[11px] border border-line bg-surf px-[14px] py-[13px] text-[14px] outline-none focus:border-acc"
                  />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">Email</label>
                  <input
                    type="email"
                    value={draft.contact.email}
                    onChange={(e) => draft.setContact({ email: e.target.value })}
                    placeholder="you@business.com.au"
                    className="w-full rounded-[11px] border border-line bg-surf px-[14px] py-[13px] text-[14px] outline-none focus:border-acc"
                  />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">Phone</label>
                  <input
                    type="tel"
                    value={draft.contact.phone}
                    onChange={(e) => draft.setContact({ phone: e.target.value })}
                    placeholder="04__ ___ ___"
                    className="w-full rounded-[11px] border border-line bg-surf px-[14px] py-[13px] text-[14px] outline-none focus:border-acc"
                  />
                </div>
              </div>
              {errors.contact && <span className="text-[12.5px] text-acc-ink">{errors.contact}</span>}

              <div className="flex flex-col gap-[9px]">
                <label className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink2">
                  When do you need it?
                </label>
                <div className="flex flex-wrap gap-2">
                  {DEADLINES.map((d) => (
                    <Chip key={d} active={draft.deadline === d} onClick={() => draft.setDeadline(d)}>
                      {d}
                    </Chip>
                  ))}
                </div>
                <span className="text-[12.5px] leading-[1.5] text-ink2">
                  Standard turnaround is 7–10 working days from approved artwork.
                </span>
              </div>

              <div className="flex flex-col gap-[10px] rounded-[13px] border border-line bg-bg2 p-4">
                {NEXT_STEPS.map((body, i) => (
                  <span key={i} className="flex items-start gap-[11px] text-[13.5px] leading-[1.5]">
                    <span className="pt-[3px] font-mono text-[10px] text-acc-ink">{String(i + 1).padStart(2, "0")}</span>
                    {body}
                  </span>
                ))}
              </div>

              {submitError && <span className="text-[13px] text-acc-ink">{submitError}</span>}
              {uploadProgress !== null && (
                <div className="h-1 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-acc transition-[width]" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-[10px]">
            <button
              type="button"
              onClick={() => goToStep(draft.step - 1)}
              disabled={draft.step === 1}
              className="rounded-xl border border-line bg-surf px-[22px] py-[14px] text-[14.5px] font-semibold text-ink2 transition-colors hover:border-acc hover:text-ink disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={submitting}
              className="min-w-[180px] flex-1 rounded-xl bg-ink px-[26px] py-[15px] text-[15px] font-semibold text-bg shadow-[var(--shadow)] transition-transform hover:-translate-y-[2px] disabled:opacity-60"
            >
              {submitting ? "Sending…" : draft.step === 4 ? "Send request" : `Continue — ${STEP_NAMES[draft.step]}`}
            </button>
          </div>
        </div>

        <QuoteSummary
          rows={[
            { k: "Garment", v: currentProduct.name },
            { k: "Quantity", v: `${draft.qty} units` },
            { k: "Method", v: draft.method },
            { k: "Placement", v: draft.placement },
            { k: "Colours", v: draft.inks },
            { k: "Artwork", v: artwork ? "Uploaded" : "Not yet", accent: !artwork },
            { k: "Needed by", v: draft.deadline },
          ]}
          estimate={estimate}
          disclaimer="A guide only, based on tiered garment pricing. We quote the real number by email — usually same day."
        />
      </div>
    </div>
  );
}
