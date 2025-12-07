import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FiltersPanel from "./components/FiltersPanel.jsx";
import SortDropdown from "./components/SortDropdown.jsx";
import SalesTable from "./components/SalesTable.jsx";
import Pagination from "./components/Pagination.jsx";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    regions: [],
    genders: [],
    categories: [],
    paymentMethods: [],
    tags: [],
    ageMin: "",
    ageMax: "",
    dateFrom: "",
    dateTo: "",
  });
  const [sort, setSort] = useState("date_desc");
  const [page, setPage] = useState(1);

  const [filterOptions, setFilterOptions] = useState(null);
  const [sales, setSales] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load filter options once
  useEffect(() => {
    fetch(`${API_BASE}/api/sales/filters`)
      .then((res) => res.json())
      .then((data) => setFilterOptions(data))
      .catch((err) => console.error("Failed to load filter options", err));
  }, []);

  // Fetch sales data when input changes
  useEffect(() => {
    const controller = new AbortController();
    async function fetchSales() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();
        if (search) params.set("search", search);

        if (filters.regions.length)
          params.set("region", filters.regions.join(","));
        if (filters.genders.length)
          params.set("gender", filters.genders.join(","));
        if (filters.categories.length)
          params.set("category", filters.categories.join(","));
        if (filters.paymentMethods.length)
          params.set("payment", filters.paymentMethods.join(","));
        if (filters.tags.length) params.set("tags", filters.tags.join(","));

        if (filters.ageMin) params.set("ageMin", filters.ageMin);
        if (filters.ageMax) params.set("ageMax", filters.ageMax);
        if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
        if (filters.dateTo) params.set("dateTo", filters.dateTo);

        params.set("sort", sort);
        params.set("page", String(page));

        const url = `${API_BASE}/api/sales?${params.toString()}`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await res.json();
        setSales(json.data || []);
        setMeta(json.meta || null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSales();

    return () => controller.abort();
  }, [search, filters, sort, page]);

  const handleFiltersChange = (updated) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (!meta) return;
    if (newPage < 1 || newPage > meta.totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Retail Sales Management System
            </h1>
            <p className="text-sm text-slate-500">
              Search, filter, sort and explore sales transactions.
            </p>
          </div>
        </header>

        {/* 🔥 Tailwind Test — remove after confirming Tailwind works */}
        <div className="text-4xl font-bold text-red-600">
          TAILWIND TEST
        </div>

        <SearchBar value={search} onChange={setSearch} />

        <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-4">
          <aside>
            <FiltersPanel
              filters={filters}
              options={filterOptions}
              onChange={handleFiltersChange}
            />
          </aside>

          <main className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <SortDropdown value={sort} onChange={handleSortChange} />
              {meta && (
                <span className="text-xs text-slate-500">
                  Showing {sales.length} of {meta.totalItems} results
                </span>
              )}
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-slate-200">
              {loading ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  Loading transactions...
                </div>
              ) : error ? (
                <div className="p-6 text-center text-sm text-red-500">
                  {error}
                </div>
              ) : sales.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  No results found. Try changing search or filters.
                </div>
              ) : (
                <SalesTable items={sales} />
              )}
            </div>

            <Pagination meta={meta} onPageChange={handlePageChange} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
