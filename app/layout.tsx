import type { Metadata } from "next";
import { Archivo, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnnouncementBar, Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "700",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "variable",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "In House Print Studios — Screen print & DTF, Australia",
  description:
    "A small Australian print studio working with cafes, gyms, churches, trades and bands. Send us the artwork, we quote it properly.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <AnnouncementBar />
          <Header />
          <main className="flex-1 bg-bg">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
