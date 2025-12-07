const { getSalesData } = require("../utils/csvLoader");

function parseNumber(value) {
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Build distinct lists for filters
 */
function getFilterOptions() {
  const data = getSalesData();
  const regions = new Set();
  const genders = new Set();
  const categories = new Set();
  const paymentMethods = new Set();
  const tagsSet = new Set();

  data.forEach((item) => {
    if (item.customerRegion) regions.add(item.customerRegion);
    if (item.gender) genders.add(item.gender);
    if (item.productCategory) categories.add(item.productCategory);
    if (item.paymentMethod) paymentMethods.add(item.paymentMethod);
    if (item.tags) {
      item.tags
        .split(/[,;|]/)
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => tagsSet.add(t));
    }
  });

  return {
    regions: Array.from(regions),
    genders: Array.from(genders),
    categories: Array.from(categories),
    paymentMethods: Array.from(paymentMethods),
    tags: Array.from(tagsSet),
  };
}

/**
 * Core search+filter+sort+paginate logic
 */
function getSalesWithQuery(query) {
  const {
    search,
    region,
    gender,
    ageMin,
    ageMax,
    category,
    tags,
    payment,
    dateFrom,
    dateTo,
    sort = "date_desc",
    page = "1",
  } = query;

  const data = getSalesData();
  let filtered = [...data];

  // --- search (Customer Name, Phone Number) ---
  if (search && search.trim()) {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(
      (item) =>
        (item.customerName &&
          item.customerName.toLowerCase().includes(s)) ||
        (item.phoneNumber && item.phoneNumber.toLowerCase().includes(s))
    );
  }

  // Helper to parse comma separated query into set
  const toSet = (value) =>
    new Set(
      value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    );

  // --- multi select filters ---
  if (region) {
    const set = toSet(region);
    filtered = filtered.filter(
      (item) => item.customerRegion && set.has(item.customerRegion)
    );
  }

  if (gender) {
    const set = toSet(gender);
    filtered = filtered.filter(
      (item) => item.gender && set.has(item.gender)
    );
  }

  if (category) {
    const set = toSet(category);
    filtered = filtered.filter(
      (item) => item.productCategory && set.has(item.productCategory)
    );
  }

  if (payment) {
    const set = toSet(payment);
    filtered = filtered.filter(
      (item) => item.paymentMethod && set.has(item.paymentMethod)
    );
  }

  // --- tags (multi-select, contains ANY) ---
  if (tags) {
    const set = toSet(tags);
    filtered = filtered.filter((item) => {
      if (!item.tags) return false;
      const rowTags = item.tags
        .split(/[,;|]/)
        .map((t) => t.trim())
        .filter(Boolean);
      return rowTags.some((t) => set.has(t));
    });
  }

  // --- Age range ---
  const minAge = parseNumber(ageMin);
  const maxAge = parseNumber(ageMax);
  if (minAge !== null || maxAge !== null) {
    filtered = filtered.filter((item) => {
      if (item.age == null) return false;
      if (minAge !== null && item.age < minAge) return false;
      if (maxAge !== null && item.age > maxAge) return false;
      return true;
    });
  }

  // --- Date range ---
  const fromDate = parseDate(dateFrom);
  const toDate = parseDate(dateTo);
  if (fromDate || toDate) {
    filtered = filtered.filter((item) => {
      const d = parseDate(item.date);
      if (!d) return false;
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;
      return true;
    });
  }

  // --- Sorting ---
  filtered.sort((a, b) => {
    switch (sort) {
      case "quantity_asc":
        return a.quantity - b.quantity;
      case "quantity_desc":
        return b.quantity - a.quantity;
      case "name_asc":
        return (a.customerName || "").localeCompare(b.customerName || "");
      case "name_desc":
        return (b.customerName || "").localeCompare(a.customerName || "");
      case "date_desc":
      default: {
        const da = parseDate(a.date);
        const db = parseDate(b.date);
        if (!da || !db) return 0;
        return db - da; // newest first
      }
    }
  });

  // --- Pagination ---
  const PAGE_SIZE = 10;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  return {
    data: pageItems,
    meta: {
      page: currentPage,
      pageSize: PAGE_SIZE,
      totalItems,
      totalPages,
    },
  };
}

module.exports = {
  getSalesWithQuery,
  getFilterOptions,
};
