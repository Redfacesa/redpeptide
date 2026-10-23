"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { formatMoney } from "@/lib/currency";

type Quote = {
  country: string;
  currency: string;
  locale: string;
  rates: Record<string, number>;
};

const fallback: Quote = { country: "CH", currency: "CHF", locale: "en-CH", rates: { ZAR: 1, CHF: 0.049 } };

const CurrencyContext = createContext<{
  quote: Quote;
  format: (zarAmount: number) => string;
}>({
  quote: fallback,
  format: (value) => formatMoney(value, "CHF", 0.049, "en-CH"),
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [quote, setQuote] = useState<Quote>(fallback);

  useEffect(() => {
    let cancel = false;
    fetch("/api/locale")
      .then((response) => response.json())
      .then((payload) => {
        const data = payload as Quote;
        if (!cancel && data?.currency && data.rates) setQuote(data);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      quote,
      format: (zarAmount: number) =>
        formatMoney(zarAmount, quote.currency, quote.rates[quote.currency] ?? 1, quote.locale),
    }),
    [quote],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useMoney() {
  return useContext(CurrencyContext);
}
