import type { ReactNode } from "react";
import { SOCIAL_LINKS, type SocialNetwork } from "@/lib/products";

const ICONS: Record<SocialNetwork, ReactNode> = {
  Instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 2h-3.3v13.3a2.9 2.9 0 1 1-2.1-2.8V9.1a6.2 6.2 0 1 0 5.4 6.2V8.6a7.6 7.6 0 0 0 4.4 1.4V6.7a4.4 4.4 0 0 1-4.4-4.4V2Z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
    </svg>
  ),
};

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-2">
      {SOCIAL_LINKS.map((social) => (
        <li key={social.network}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`In House Print Studios on ${social.network}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink2 transition-colors hover:border-ink hover:text-ink [&>svg]:h-4 [&>svg]:w-4"
          >
            {ICONS[social.network]}
          </a>
        </li>
      ))}
    </ul>
  );
}
