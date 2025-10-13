// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";

export default function SearchBar({ value = "", onChange = () => {} }) {
  const [text, setText] = useState(value);
  const inputRef = useRef();

  useEffect(() => setText(value), [value]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (typeof onChange === "function") onChange(text);
    }, 250);
    return () => clearTimeout(id);
  }, [text, onChange]);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search posts by title or content..."
        aria-label="Search posts"
        className={
          "w-full py-3 px-4 pr-12 rounded-xl shadow-sm outline-none transition " +
          "bg-white text-gray-900 placeholder-gray-500 border border-gray-200 " +
          "focus:ring-2 focus:ring-blue-400 focus:border-blue-400 " +
          "dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-700"
        }
      />

      {text && (
        <button
          aria-label="Clear search"
          onClick={() => {
            setText("");
            inputRef.current?.focus();
            if (typeof onChange === "function") onChange("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-300"
        >
          ✕
        </button>
      )}
    </div>
  );
}
