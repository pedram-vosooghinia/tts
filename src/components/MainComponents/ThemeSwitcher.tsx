"use client";
import { useEffect, useSyncExternalStore } from "react";

const themes = [
  { id: "default", label: "🔴 قرمز" },
  { id: "theme-dark", label: "🔵 آبی" },
  { id: "theme-green", label: "💚 سبز" },
];

const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(THEME_CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(THEME_CHANGE_EVENT, listener);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(THEME_STORAGE_KEY) || "default";
}

function getServerSnapshot() {
  return "default";
}

export default function ThemeSwitcher() {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const changeTheme = (newTheme: string) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => changeTheme(t.id)}
          className={`px-3 py-1 rounded border ${
            theme === t.id ? "border-black" : "border-gray-300"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
