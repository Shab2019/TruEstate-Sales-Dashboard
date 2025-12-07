import React from "react";

function SortDropdown({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-slate-500">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-200 px-2 py-1 text-xs bg-white"
      >
        <option value="date_desc">Date (Newest first)</option>
        <option value="quantity_desc">Quantity (High to Low)</option>
        <option value="quantity_asc">Quantity (Low to High)</option>
        <option value="name_asc">Customer Name (A–Z)</option>
        <option value="name_desc">Customer Name (Z–A)</option>
      </select>
    </div>
  );
}

export default SortDropdown;
