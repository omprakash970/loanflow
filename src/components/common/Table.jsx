import { useState, useMemo } from "react";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import { ROWS_PER_PAGE } from "../../utils/constants";

/**
 * Reusable Table with pagination and optional status filter.
 *
 * Props:
 *  - columns:    [{ key, label, render? }]
 *  - data:       array of row objects
 *  - filterKey:  optional string — the key to filter on (e.g. "status")
 *  - filterOptions: optional array of strings for filter dropdown
 *  - pageSize:   optional rows per page
 *  - accent:     optional accent colour for header gradient
 */
export default function DataTable({
  columns = [],
  data = [],
  filterKey,
  filterOptions = [],
  pageSize = ROWS_PER_PAGE,
  accent = "#2dd4bf",
}) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (!filterKey || filter === "All") return data;
    return data.filter((row) => row[filterKey] === filter);
  }, [data, filter, filterKey]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const sliced = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleFilterChange = (val) => {
    setFilter(val);
    setPage(1);
  };

  return (
    <>
      <style>{`
        .dt-wrap {
          background: rgba(13,20,32,0.85);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
        }
        .dt-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
          gap: 10px;
        }
        .dt-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: #475569;
        }
        .dt-filter select {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #94a3b8;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 5px 10px;
          cursor: pointer;
          outline: none;
        }
        .dt-filter select:focus {
          border-color: rgba(45,212,191,0.3);
        }
        .dt-filter select option {
          background: #0d1420;
          color: #94a3b8;
        }
        .dt-table {
          width: 100%;
          border-collapse: collapse;
        }
        .dt-table th {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #475569;
          text-align: left;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }
        .dt-table th::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
        }
        .dt-table td {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #cbd5e1;
          padding: 11px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .dt-table tbody tr { transition: background 0.12s; }
        .dt-table tbody tr:hover { background: rgba(255,255,255,0.02); }
        .dt-table tbody tr:last-child td { border-bottom: none; }
      `}</style>

      <div className="dt-wrap">
        {/* Toolbar */}
        {(filterOptions.length > 0 || data.length > 0) && (
          <div className="dt-toolbar">
            <span className="dt-count">
              Showing {sliced.length} of {filtered.length} records
            </span>
            {filterOptions.length > 0 && (
              <div className="dt-filter">
                <select
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  <option value="All">All</option>
                  {filterOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Table or empty state */}
        {sliced.length === 0 ? (
          <EmptyState
            title="No matching records"
            message={filter !== "All" ? `No records with status "${filter}".` : "There are no records to display."}
          />
        ) : (
          <table className="dt-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sliced.map((row, idx) => (
                <tr key={row.id || idx}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding: "0 20px 16px" }}>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </>
  );
}
