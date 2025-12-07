import React from "react";

function MultiSelect({ label, options = [], value = [], onChange }) {
  const handleChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (opt) => opt.value
    );
    onChange(selected);
  };

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <select
        multiple
        value={value}
        onChange={handleChange}
        className="w-full rounded-lg border border-slate-200 px-2 py-2 text-xs h-24 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <p className="text-[10px] text-slate-400">
        Hold Ctrl / Cmd to select multiple
      </p>
    </div>
  );
}

function FiltersPanel({ filters, options, onChange }) {
  const handleField = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 space-y-3 text-xs">
      <h2 className="text-sm font-semibold text-slate-800">Filters</h2>

      <MultiSelect
        label="Customer Region"
        options={options?.regions || []}
        value={filters.regions}
        onChange={(v) => handleField("regions", v)}
      />

      <MultiSelect
        label="Gender"
        options={options?.genders || []}
        value={filters.genders}
        onChange={(v) => handleField("genders", v)}
      />

      <MultiSelect
        label="Product Category"
        options={options?.categories || []}
        value={filters.categories}
        onChange={(v) => handleField("categories", v)}
      />

      <MultiSelect
        label="Payment Method"
        options={options?.paymentMethods || []}
        value={filters.paymentMethods}
        onChange={(v) => handleField("paymentMethods", v)}
      />

      <MultiSelect
        label="Tags"
        options={options?.tags || []}
        value={filters.tags}
        onChange={(v) => handleField("tags", v)}
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-slate-500 mb-1">
            Age Min
          </label>
          <input
            type="number"
            value={filters.ageMin}
            onChange={(e) => handleField("ageMin", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">
            Age Max
          </label>
          <input
            type="number"
            value={filters.ageMax}
            onChange={(e) => handleField("ageMax", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-slate-500 mb-1">
            Date From
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleField("dateFrom", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">
            Date To
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleField("dateTo", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          onChange({
            regions: [],
            genders: [],
            categories: [],
            paymentMethods: [],
            tags: [],
            ageMin: "",
            ageMax: "",
            dateFrom: "",
            dateTo: "",
          })
        }
        className="w-full mt-1 rounded-lg border border-slate-300 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default FiltersPanel;
