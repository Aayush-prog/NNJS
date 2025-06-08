import React from "react";

export default function SortSelect({ options, value, onChange }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <label className="font-semibold">Sort by:</label>
      <select
        className="border rounded px-2 py-1"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}