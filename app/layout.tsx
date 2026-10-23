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
  title: {
    default: "Novion Biopharma",
    template: "%s · Novion Biopharma",
  },
  description:
    "Novion Biopharma research catalog. Prices are set in South African rand and shown in the visitor’s currency. Laboratory use only.",
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
