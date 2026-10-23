import { NextResponse } from "next/server";
import { z } from "zod";

const ACCEPTED_EXTENSIONS = [".ai", ".pdf", ".jpg", ".jpeg", ".png"];
const MAX_BYTES = 50 * 1024 * 1024;
const AU_PHONE_RE = /^(\+61|0)4\d{8}$/;

const quoteSchema = z
  .object({
    garment: z.string().min(1),
    qty: z.coerce.number().int().min(1).max(500),
    sizeBreakdown: z.string().optional().default("{}"),
    method: z.enum(["Screen print", "DTF transfer"]),
    placement: z.enum(["Front", "Back", "Left chest", "Sleeve"]),
    inks: z.enum(["1 colour", "2 colours", "3 colours", "4+", "Full colour"]),
    notes: z.string().optional().default(""),
    deadline: z.enum(["Standard", "Fixed date", "Not sure yet"]),
    name: z.string().min(1, "Name is required"),
    business: z.string().optional().default(""),
    email: z.string().optional().default(""),
    phone: z.string().optional().default(""),
  })
  .refine(
    (data) => {
      const emailOk = z.string().email().safeParse(data.email).success;
      const phoneOk = AU_PHONE_RE.test(data.phone.replace(/\s+/g, ""));
      return emailOk || phoneOk;
    },
    { message: "Provide a valid email or Australian mobile number", path: ["email"] }
  );

export async function POST(request: Request) {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const artwork = formData.get("artwork");
  if (artwork instanceof File && artwork.size > 0) {
    const ext = "." + (artwork.name.split(".").pop() ?? "").toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: "Unsupported artwork file type." }, { status: 400 });
    }
    if (artwork.size > MAX_BYTES) {
      return NextResponse.json({ error: "Artwork file exceeds the 50 MB limit." }, { status: 400 });
    }
  }

  const reference = `IHPS-${Date.now().toString(36).toUpperCase()}`;

  // Stub: forward to email/CRM. Logged here for manual follow-up until that's wired up.
  console.log("New quote request", {
    ...parsed.data,
    reference,
    artwork: artwork instanceof File ? { name: artwork.name, size: artwork.size } : null,
  });

  return NextResponse.json({ ok: true, reference });
}
