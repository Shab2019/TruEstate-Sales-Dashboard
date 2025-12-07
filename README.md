# Retail Sales Management System

## 1. Overview (3–5 lines)

Retail Sales Management System built for TruEstate SDE Intern assignment.  
The app loads a structured retail sales dataset and provides advanced search, filtering, sorting and pagination over transactions.  
It demonstrates clear separation of frontend and backend, predictable state management and production-style folder structure.

## 2. Tech Stack

- Backend: Node.js, Express, csv-parser
- Frontend: React, Vite, Tailwind CSS
- Deployment: Render (backend), Vercel (frontend)

## 3. Search Implementation Summary

- Full-text search across Customer Name and Phone Number.
- Case-insensitive matching implemented in backend service layer.
- Search can be combined with any filters and sorting, and is preserved across pagination.

## 4. Filter Implementation Summary

- Multi-select filters: Customer Region, Gender, Product Category, Tags, Payment Method.
- Range filters: Age (min/max), Date range (from/to).
- All filters are processed in a single backend pipeline with no duplicated logic, and can be combined arbitrarily.

## 5. Sorting Implementation Summary

- Supported fields: Date (Newest first), Quantity (ascending/descending), Customer Name (A–Z / Z–A).
- Sorting is applied after search and filters in the backend service.
- Active sorting is preserved across pagination and filter changes.

## 6. Pagination Implementation Summary

- Page size fixed at 10 records per page.
- Backend returns metadata: current page, page size, total items and total pages.
- Frontend exposes Previous/Next navigation while retaining active search, filters and sort state.

## 7. Setup Instructions

### Backend

```bash
cd backend
npm install
# Place CSV at: backend/src/data/truestate_assignment_dataset.csv
npm run dev       # local development on http://localhost:5000
```
