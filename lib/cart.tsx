"use client";

import { useSyncExternalStore } from "react";

export interface CartItem {
  id: string;
  name: string;
  dept: string;
  config: string;
  unitPrice: number;
  image: string;
  alt: string;
  href?: string;
  maxQty: number;
  qty: number;
}

export type NewCartItem = Omit<CartItem, "qty">;

const STORAGE_KEY = "jeestore-cart";
const EMPTY: CartItem[] = [];

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function readStored(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): CartItem[] {
  if (cache === null) cache = readStored();
  return cache;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function commit(next: CartItem[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — cart stays in memory only */
  }
  for (const listener of listeners) listener();
}

export function addItem(item: NewCartItem, qty = 1) {
  const prev = getSnapshot();
  const existing = prev.find((i) => i.id === item.id);
  const next = existing
    ? prev.map((i) =>
        i.id === item.id
          ? { ...i, qty: Math.min(i.maxQty, i.qty + qty) }
          : i
      )
    : [...prev, { ...item, qty: Math.min(item.maxQty, Math.max(1, qty)) }];
  commit(next);
}

export function setQty(id: string, qty: number) {
  const prev = getSnapshot();
  commit(
    prev.map((i) =>
      i.id === id ? { ...i, qty: Math.max(1, Math.min(i.maxQty, qty)) } : i
    )
  );
}

export function removeItem(id: string) {
  commit(getSnapshot().filter((i) => i.id !== id));
}

export function clearCart() {
  commit(EMPTY);
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const itemCount = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  return { items, itemCount, subtotal, addItem, setQty, removeItem, clearCart };
}
