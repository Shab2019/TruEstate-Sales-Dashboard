const { sales } = require("../utils/csvLoader");

function getSalesWithQuery(query) {
  console.log("getSalesWithQuery called with:", query);
  console.log("Total CSV records loaded:", sales.length);

  if (!sales.length) {
    throw new Error("CSV not loaded yet");
  }

  let filtered = [...sales];

  // Filters
  if (query.search) {
    const s = query.search.toLowerCase();
    filtered = filtered.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(s)
      )
    );
  }

  // Sorting
  if (query.sortField) {
    filtered.sort((a, b) => {
      const field = query.sortField;
      const order = query.sortOrder === "desc" ? -1 : 1;
      return String(a[field]).localeCompare(String(b[field])) * order;
    });
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    limit,
  };
}

function getFilterOptions() {
  if (!sales.length) throw new Error("CSV not loaded yet");

  const keys = Object.keys(sales[0]);
  return { fields: keys };
}

module.exports = { getSalesWithQuery, getFilterOptions };
