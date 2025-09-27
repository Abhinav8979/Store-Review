import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table, { type Column } from "../../../ui/Table";
import SearchBox from "../../../ui/SearchBox";

type User = {
  name: string;
  email: string;
  address: string;
  role: string;
};

type Store = {
  name: string;
  email: string;
  address: string;
  rating: number;
};

// Dummy data
const users: User[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    role: "User",
  },
  {
    name: "Jane Admin",
    email: "jane@example.com",
    address: "456 Park Ave",
    role: "Admin",
  },
];

const stores: Store[] = [
  {
    name: "SuperMart",
    email: "contact@supermart.com",
    address: "789 Market Rd",
    rating: 4.5,
  },
  {
    name: "MegaStore",
    email: "info@megastore.com",
    address: "321 High St",
    rating: 4.2,
  },
];

const Management: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("view") || "user";

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Handle tab click
  const handleTabChange = (tab: string) => {
    setSearchParams({ view: tab });
    setPage(1); // reset page when switching tab
    setSearchQuery(""); // reset search
  };

  // Columns
  const userColumns: Column<User>[] = [
    { header: "Name", accessor: "name", sortable: true },
    { header: "Email", accessor: "email", sortable: true },
    { header: "Address", accessor: "address", sortable: true },
    { header: "Role", accessor: "role" },
  ];

  const storeColumns: Column<Store>[] = [
    { header: "Name", accessor: "name", sortable: true },
    { header: "Email", accessor: "email", sortable: true },
    { header: "Address", accessor: "address", sortable: true },
    { header: "Rating", accessor: "rating" },
  ];

  // Filtered data
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower) ||
        u.address.toLowerCase().includes(searchLower) ||
        u.role.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);

  const filteredStores = useMemo(() => {
    return stores.filter((s) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(searchLower) ||
        s.email.toLowerCase().includes(searchLower) ||
        s.address.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);

  // Paginated Data
  const getPaginatedData = <T,>(data: T[]) => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  };

  return (
    <div className="p-6 bg-[var(--background)] min-h-screen">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["user", "admin", "store"].map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              tab === t
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card)] text-[var(--text-primary)]"
            }`}
          >
            {t === "user" ? "Users" : t === "admin" ? "Admins" : "Stores"}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={`Search ${tab}...`}
        />
      </div>

      {/* Table */}
      <div>
        {tab === "user" && (
          <Table
            columns={userColumns}
            data={getPaginatedData(
              filteredUsers.filter((u) => u.role !== "Admin")
            )}
            page={page}
            pageSize={pageSize}
            total={filteredUsers.filter((u) => u.role !== "Admin").length}
            onPageChange={setPage}
          />
        )}
        {tab === "admin" && (
          <Table
            columns={userColumns}
            data={getPaginatedData(
              filteredUsers.filter((u) => u.role === "Admin")
            )}
            page={page}
            pageSize={pageSize}
            total={filteredUsers.filter((u) => u.role === "Admin").length}
            onPageChange={setPage}
          />
        )}
        {tab === "store" && (
          <Table
            columns={storeColumns}
            data={getPaginatedData(filteredStores)}
            page={page}
            pageSize={pageSize}
            total={filteredStores.length}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Management;
