"use client";

import { createContext, useContext, useMemo } from "react";
import { formatMoney } from "@/lib/currency";
import { isZa, moneyCode, moneyLocale } from "@/lib/region";

type Quote = {
  country: string;
  currency: string;
  locale: string;
  rates: Record<string, number>;
};

const fallback: Quote = isZa
  ? { country: "ZA", currency: "ZAR", locale: "en-ZA", rates: { ZAR: 1 } }
  : { country: "CH", currency: "CHF", locale: "de-CH", rates: { CHF: 1 } };

const CurrencyContext = createContext<{
  quote: Quote;
  format: (zarAmount: number) => string;
}>({
  quote: fallback,
  format: (value) => formatMoney(value, moneyCode, 1, moneyLocale),
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(
    () => ({
      quote: fallback,
      format: (amount: number) => formatMoney(amount, moneyCode, 1, moneyLocale),
    }),
    [],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useMoney() {
  return useContext(CurrencyContext);
}
