import React, { useState, useEffect } from "react";

export default function SearchBar({ value = "", onChange }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => onChange(text), 300); // debounce 300ms
    return () => clearTimeout(id);
  }, [text, onChange]);

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Search posts..."
      className="w-full max-w-md border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
