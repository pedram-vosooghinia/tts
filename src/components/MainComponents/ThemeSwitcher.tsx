"use client";
import { useEffect, useState } from "react";

const themes = [
  { id: "default", label: "🔴 قرمز" },
  { id: "theme-dark", label: "🔵 آبی" },
  { id: "theme-green", label: "💚 سبز" },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "default";
    document.documentElement.className = savedTheme;
    setTheme(savedTheme);
  }, []);

  const changeTheme = (newTheme: string) => {
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
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
