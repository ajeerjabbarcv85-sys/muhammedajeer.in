"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "jeestore-wishlist";
const EMPTY: string[] = [];

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function readStored(): string[] {
  try {
    const stored: unknown = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "[]"
    );
    return Array.isArray(stored)
      ? [...new Set(stored.filter((id): id is string => typeof id === "string"))]
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot() {
  if (cache === null) cache = readStored();
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Keep wishlist changes available for the current session.
  }
  listeners.forEach((listener) => listener());
}

export function toggleWishlist(id: string) {
  const current = getSnapshot();
  commit(
    current.includes(id)
      ? current.filter((savedId) => savedId !== id)
      : [...current, id]
  );
}

export function removeFromWishlist(id: string) {
  commit(getSnapshot().filter((savedId) => savedId !== id));
}

export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  return { ids, toggleWishlist, removeFromWishlist };
}
