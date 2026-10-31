import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CurrencyProvider } from "@/components/currency";
import { Shell } from "@/components/shell";
import { StoreProvider } from "@/components/store";
import { htmlLang, isZa, siteUrl } from "@/lib/region";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Novion Biopharma",
    template: "%s · Novion Biopharma",
  },
  description: isZa
    ? "Novion Biopharma. Sealed research peptides for the laboratory. Not a medicine and not for use in people. Prices in rand."
    : "Novion Biopharma, Genf. Versiegelte Forschungspeptide für das Labor. Kein Arzneimittel und nicht zur Anwendung am Menschen.",
  openGraph: {
    title: "Novion Biopharma",
    description: isZa
      ? "Sealed research peptides for the laboratory. Prices in South African rand. Not for use in people."
      : "Versiegelte Forschungspeptide für das Labor. Katalog aus Genf. Nicht zur Anwendung am Menschen.",
    url: siteUrl,
    siteName: "Novion Biopharma",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={htmlLang} className={sans.variable}>
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
