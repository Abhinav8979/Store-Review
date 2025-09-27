import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto w-full bg-[var(--card)] rounded-xl shadow-md border p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[var(--primary)] text-white">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-[var(--text-secondary)] py-4"
              >
                No data available
              </td>
            </tr>
          )}
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0
                  ? "bg-[var(--background)]"
                  : "bg-[var(--card)]"
              }
            >
              {columns.map((col, colIndex) => {
                const value: any =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : row[col.accessor];
                return (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-[var(--text-primary)] text-sm"
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
