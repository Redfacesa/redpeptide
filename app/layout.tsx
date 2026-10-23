import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CurrencyProvider } from "@/components/currency";
import { Shell } from "@/components/shell";
import { StoreProvider } from "@/components/store";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novion.ch"),
  title: {
    default: "Novion Biopharma",
    template: "%s · Novion Biopharma",
  },
  description:
    "Novion Biopharma, Geneva. Sealed research peptides for laboratory use by adults. Not a medicine and not for human use.",
  openGraph: {
    title: "Novion Biopharma",
    description: "Sealed research peptides for laboratory use. Geneva catalog. Not for human use.",
    url: "https://novion.ch",
    siteName: "Novion Biopharma",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <CurrencyProvider>
          <StoreProvider>
            <Shell>{children}</Shell>
          </StoreProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
