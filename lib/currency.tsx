"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Currency = "USD" | "EUR" | "INR";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);
const STORAGE_KEY = "jeestore-currency";

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "USD" || saved === "EUR" || saved === "INR") {
        setCurrencyState(saved);
      }
    } catch {
      // Keep the default currency when browser storage is unavailable.
    }
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency: (nextCurrency: Currency) => {
        try {
          window.localStorage.setItem(STORAGE_KEY, nextCurrency);
        } catch {
          // Currency selection still works for the current page session.
        }
        setCurrencyState(nextCurrency);
      },
    }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }
  return context;
}
