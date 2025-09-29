import React, { useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "./Button";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  heading: string;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  page,
  pageSize,
  total,
  heading,
  onPageChange,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | ((row: T) => React.ReactNode) | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const totalPages = Math.ceil(total / pageSize);
  const emptyRows = pageSize - data.length;

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      const sortKey = sortConfig.key;
      if (typeof sortKey === "function") {
        aValue = sortKey(a);
        bValue = sortKey(b);
      } else if (sortKey) {
        aValue = a[sortKey];
        bValue = b[sortKey];
      }

      if (aValue === undefined || bValue === undefined) return 0;

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;

    setSortConfig((prev) => {
      const key = typeof col.accessor === "function" ? null : col.accessor;
      if (key && prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const renderCellValue = (col: Column<T>, row: T): React.ReactNode => {
    let value: any;

    if (typeof col.accessor === "function") {
      value = col.accessor(row);
    } else {
      value = row[col.accessor];
    }

    if (col.render) {
      return col.render(value, row);
    }

    if (value === null || value === undefined) {
      return "";
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }

    if (React.isValidElement(value)) {
      return value;
    }

    return String(value);
  };

  return (
    <div className="bg-[var(--background)] rounded-2xl shadow-2xl overflow-hidden border  border-[var(--primary)]/20">
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-3">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          {heading}
        </h2>
      </div>

      <div className="">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[var(--accent)]/30 to-[var(--secondary)]/30">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => handleSort(col)}
                  className={`text-left px-6 py-4 text-sm font-semibold text-[var(--text-primary)] border-b-2 border-[var(--primary)]/20 ${
                    col.sortable
                      ? "cursor-pointer select-none hover:bg-[var(--accent)]/20 transition-colors duration-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="tracking-wide">{col.header}</span>
                    {col.sortable && (
                      <div className="flex flex-col">
                        <AiOutlineArrowUp
                          className={`w-3 h-3 transition-colors ${
                            sortConfig.key === col.accessor &&
                            sortConfig.direction === "asc"
                              ? "text-[var(--primary)]"
                              : "text-gray-400"
                          }`}
                        />
                        <AiOutlineArrowDown
                          className={`w-3 h-3 -mt-1 transition-colors ${
                            sortConfig.key === col.accessor &&
                            sortConfig.direction === "desc"
                              ? "text-[var(--primary)]"
                              : "text-gray-400"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--primary)]/10">
            {sortedData.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-gradient-to-r hover:from-[var(--accent)]/10 hover:to-[var(--secondary)]/10 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-6 py-4 text-sm text-[var(--text-primary)] border-b border-[var(--primary)]/5"
                  >
                    <div className="font-medium">
                      {renderCellValue(col, row)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}

            {emptyRows > 0 &&
              Array.from({ length: emptyRows }).map((_, i) => (
                <tr key={`empty-${i}`} style={{ height: "57px" }}>
                  {columns.map((_, colIdx) => (
                    <td
                      key={colIdx}
                      className="px-6 py-4 border-b border-[var(--primary)]/5"
                    >
                      <div className="w-full h-4 bg-gradient-to-r from-[var(--accent)]/5 to-transparent rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[var(--background)] to-[var(--accent)]/20 border-t border-[var(--primary)]/10">
        <Button
          variant={page === 1 ? "ghost" : "primary"}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          <div className="flex items-center justify-center gap-1">
            <FaChevronLeft className="w-4 h-4" />
            Previous
          </div>
        </Button>

        <div className="flex items-center gap-4">
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--primary)]/20 shadow-sm">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Page {page} of {totalPages || 1}
            </span>
          </div>

          <div className="hidden md:flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              return (
                <Button
                  variant="ghost"
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
        </div>

        <Button
          variant={
            page === totalPages || totalPages === 0 ? "ghost" : "primary"
          }
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          <div className="flex items-center justify-center gap-1">
            Next
            <FaChevronRight className="w-4 h-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Table;
