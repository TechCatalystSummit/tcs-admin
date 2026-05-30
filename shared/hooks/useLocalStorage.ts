"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function subscribeKey(key: string, callback: () => void) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(callback);
  return () => listeners.get(key)?.delete(callback);
}

function notifyKey(key: string) {
  listeners.get(key)?.forEach((cb) => cb());
}

function readKey(key: string, initial: string) {
  if (typeof window === "undefined") return initial;
  return localStorage.getItem(key) ?? initial;
}

export function useLocalStorage(key: string, initialValue: string) {
  const value = useSyncExternalStore(
    (cb) => subscribeKey(key, cb),
    () => readKey(key, initialValue),
    () => initialValue,
  );

  const setValue = useCallback(
    (next: string | ((prev: string) => string)) => {
      const current = readKey(key, initialValue);
      const resolved = typeof next === "function" ? next(current) : next;
      localStorage.setItem(key, resolved);
      notifyKey(key);
    },
    [key, initialValue],
  );

  return [value, setValue] as const;
}

export function useLocalStorageBoolean(key: string, initialValue = false) {
  const [raw, setRaw] = useLocalStorage(key, String(initialValue));
  const value = raw === "true";

  const setValue = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      setRaw((prev) => {
        const current = prev === "true";
        const resolved = typeof next === "function" ? next(current) : next;
        return String(resolved);
      });
    },
    [setRaw],
  );

  return [value, setValue] as const;
}
