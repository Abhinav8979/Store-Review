import React from "react";
import { useSearchParams } from "react-router-dom";
import Table from "../../../ui/Table";

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

  // Handle tab click
  const handleTabChange = (tab: string) => {
    setSearchParams({ view: tab });
  };

  // Columns with correct typing
  const userColumns: { header: string; accessor: keyof User }[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Role", accessor: "role" },
  ];

  const storeColumns: { header: string; accessor: keyof Store }[] = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Address", accessor: "address" },
    { header: "Rating", accessor: "rating" },
  ];

  return (
    <div className="p-6 bg-[var(--background)] min-h-screen">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange("user")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "user"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--card)] text-[var(--text-primary)]"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => handleTabChange("admin")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "admin"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--card)] text-[var(--text-primary)]"
          }`}
        >
          Admins
        </button>
        <button
          onClick={() => handleTabChange("store")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            tab === "store"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--card)] text-[var(--text-primary)]"
          }`}
        >
          Stores
        </button>
      </div>

      {/* Table */}
      <div>
        {tab === "user" && (
          <Table
            columns={userColumns}
            data={users.filter((u) => u.role !== "Admin")}
          />
        )}
        {tab === "admin" && (
          <Table
            columns={userColumns}
            data={users.filter((u) => u.role === "Admin")}
          />
        )}
        {tab === "store" && <Table columns={storeColumns} data={stores} />}
      </div>
    </div>
  );
};

export default Management;
