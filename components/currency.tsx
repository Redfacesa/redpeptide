"use client";

import { createContext, useContext, useMemo } from "react";
import { formatMoney } from "@/lib/currency";

type Quote = {
  country: string;
  currency: string;
  locale: string;
  rates: Record<string, number>;
};

const fallback: Quote = { country: "CH", currency: "CHF", locale: "de-CH", rates: { CHF: 1 } };

const CurrencyContext = createContext<{
  quote: Quote;
  format: (zarAmount: number) => string;
}>({
  quote: fallback,
  format: (value) => formatMoney(value, "CHF", 1, "de-CH"),
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(
    () => ({
      quote: fallback,
      format: (amount: number) => formatMoney(amount, "CHF", 1, "de-CH"),
    }),
    [],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useMoney() {
  return useContext(CurrencyContext);
}
