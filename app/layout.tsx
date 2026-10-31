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
    "Novion Biopharma, Genf. Versiegelte Forschungspeptide für das Labor. Kein Arzneimittel und nicht zur Anwendung am Menschen.",
  openGraph: {
    title: "Novion Biopharma",
    description: "Versiegelte Forschungspeptide für das Labor. Katalog aus Genf. Nicht zur Anwendung am Menschen.",
    url: "https://novion.ch",
    siteName: "Novion Biopharma",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={sans.variable}>
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
