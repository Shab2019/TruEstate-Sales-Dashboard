import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [sales, setSales] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [total, setTotal] = useState(0);

  const fetchSales = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/sales?page=${page}&limit=${limit}&search=${search}&sortField=${sortField}&sortOrder=${sortOrder}`
      );
      setSales(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Sales fetch error:", err);
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/sales/filters`);
      setFilters(res.data.fields);
    } catch (err) {
      console.error("Filters fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchSales();
  }, [page, search, sortField, sortOrder]);

  const totalPages = Math.ceil(total / limit);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        TruEstate Sales Dashboard
      </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {/* SALES TABLE */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {filters.map((field) => (
              <th
                key={field}
                onClick={() => handleSort(field)}
                className="border p-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
              >
                {field} {sortField === field ? (sortOrder === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sales.map((row, idx) => (
            <tr key={idx} className="border hover:bg-gray-50">
              {filters.map((f) => (
                <td key={f} className="border p-2 text-sm">
                  {row[f]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 border rounded"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="text-sm font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          className="px-4 py-2 border rounded"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
