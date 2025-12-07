import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3">
      <label className="block text-xs font-medium text-slate-500 mb-1">
        Search (Customer Name / Phone)
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a name or phone number..."
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
      />
    </div>
  );
}

export default SearchBar;
