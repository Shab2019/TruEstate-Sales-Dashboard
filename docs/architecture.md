---

## 5️⃣ Architecture Document

`docs/architecture.md`:

```md
# Architecture

## Backend Architecture

- **Tech**: Node.js, Express, csv-parser.
- **Entry Point**: `backend/src/index.js`
  - Loads CSV data once at startup using `csvLoader.loadSalesData()`.
  - Configures CORS, JSON parsing and mounts `/api/sales` routes.
- **Routing**: `backend/src/routes/salesRoutes.js`
  - `GET /api/sales` → `salesController.getSales`
  - `GET /api/sales/filters` → `salesController.getFilters`
- **Controllers**: `backend/src/controllers/salesController.js`
  - Translates HTTP requests into service calls.
  - Handles errors and sends JSON responses.
- **Services**: `backend/src/services/salesService.js`
  - Core business logic for search, filters, sorting, pagination.
  - No Express-specific code, making it easy to test and reuse.
- **Utils**: `backend/src/utils/csvLoader.js`
  - Loads the CSV file into memory on startup.
  - Normalizes each row into a canonical JS object.
  - Provides `getSalesData()` for other modules.

## Frontend Architecture

- **Tech**: React, Vite, Tailwind CSS.
- **Entry Point**: `frontend/src/main.jsx`
  - Renders `<App />` into root DOM node.
- **App Component**: `frontend/src/App.jsx`
  - Owns global UI state: search query, filters, sort, current page, data, loading, error.
  - Calls backend API using `fetch` with query parameters.
  - Layout: Search bar → Filters panel → Sort dropdown → Table → Pagination.

### Components

- `SearchBar.jsx`
  - Controlled input for full-text search (customer name/phone).
- `FiltersPanel.jsx`
  - Contains multi-select controls and range inputs for all filters.
  - Emits a single `onChange` with updated filter state.
- `SortDropdown.jsx`
  - Select for choosing sort order (date, quantity, name).
- `SalesTable.jsx`
  - Renders tabular view of transactions.
- `Pagination.jsx`
  - Shows current page and total pages.
  - “Previous” and “Next” buttons wired to parent state.

## Data Flow

1. User updates search text, filter selection, sort choice or page.
2. `App.jsx` updates its state and recomputes query parameters.
3. `App.jsx` calls `GET /api/sales` with query params:
   - `search`, `region`, `gender`, `ageMin`, `ageMax`,
   - `category`, `tags`, `payment`, `dateFrom`, `dateTo`,
   - `sort`, `page`.
4. Backend service:
   - Retrieves in-memory sales data.
   - Applies search → filters → sorting → pagination in order.
   - Returns `{ data: [...], meta: { page, pageSize, totalItems, totalPages } }`.
5. Frontend:
   - Renders `SalesTable` with `data`.
   - Renders `Pagination` with `meta`.
6. For filter options, frontend calls `GET /api/sales/filters` once on mount.

## Folder Structure

- **Root**

  - `README.md` – assignment level documentation.
  - `docs/architecture.md` – this document.

- **backend/**

  - `package.json` – backend dependencies and scripts.
  - `src/`
    - `index.js` – server entry.
    - `routes/`
      - `salesRoutes.js` – sales API routes.
    - `controllers/`
      - `salesController.js` – HTTP controllers.
    - `services/`
      - `salesService.js` – search/filter/sort/pagination logic.
    - `utils/`
      - `csvLoader.js` – CSV loading and normalization.
    - `data/`
      - `truestate_assignment_dataset.csv` – provided dataset.

- **frontend/**
  - `package.json` – frontend dependencies and scripts.
  - `index.html` – root HTML.
  - `tailwind.config.js`, `postcss.config.js` – styling toolchain.
  - `src/`
    - `main.jsx` – React entrypoint.
    - `App.jsx` – main page and state management.
    - `index.css` – Tailwind imports and base styles.
    - `components/`
      - `SearchBar.jsx`
      - `FiltersPanel.jsx`
      - `SortDropdown.jsx`
      - `SalesTable.jsx`
      - `Pagination.jsx`

## Module Responsibilities

- **csvLoader**
  - Single responsibility: read CSV, normalize structure, expose in-memory dataset.
- **salesService**
  - Encapsulates all business rules:
    - what “search” means,
    - how filters combine,
    - sort precedence,
    - pagination details.
- **salesController**
  - Bridge between HTTP and business logic.
  - Ensures consistent response structure and error handling.
- **React components**
  - Dumb UI components where possible.
  - `App.jsx` is the smart component managing state and calling the API.
```
