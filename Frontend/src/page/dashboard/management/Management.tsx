import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Table, { type Column } from "../../../ui/Table";
import SearchBox from "../../../ui/SearchBox";
import { pageSize } from "../../../constants/common";
import { useAllUsers } from "../../../services/users/userQuries";
import { useGetAllStores } from "../../../services/stores/storeQueries";

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
  overallRating: number;
};

const Management: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("view") || "user";

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: users = [], isPending, isError } = useAllUsers();

  const {
    data: stores = [],
    isPending: isGetAllStorePending,
    isError: isGetAllStoreError,
  } = useGetAllStores();

  const handleTabChange = (tab: string) => {
    setSearchParams({ view: tab });
    setPage(1);
    setSearchQuery("");
  };

  const userColumns: Column<User>[] = [
    { header: "Name", accessor: "name", sortable: true },
    { header: "Email", accessor: "email", sortable: true },
    { header: "Address", accessor: "address", sortable: true },
    { header: "Role", accessor: "role" },
  ];

  const storeColumns: Column<Store>[] = [
    { header: "Name", accessor: "name", sortable: true },
    { header: "Address", accessor: "address", sortable: true },
    { header: "Overall Rating", accessor: "overallRating" },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((u: any) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower) ||
        u.address.toLowerCase().includes(searchLower) ||
        u.role.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, users]);

  const filteredStores = useMemo(() => {
    return stores.filter((s: any) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(searchLower) ||
        s.address.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, stores]);

  const getPaginatedData = <T,>(data: T[]) => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  };

  return (
    <div className="p-6 bg-[var(--background)] min-h-screen">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["user", "store"].map((t) => (
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

      <div className="mb-4">
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={`Search ${tab}...`}
        />
      </div>

      {/* Users */}
      {tab === "user" &&
        (isPending ? (
          <p className="text-center text-[var(--text-secondary)]">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">
            Failed to load users. Please try again.
          </p>
        ) : (
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
        ))}

      {/* Stores */}
      {tab === "store" &&
        (isGetAllStorePending ? (
          <p className="text-center text-[var(--text-secondary)]">Loading...</p>
        ) : isGetAllStoreError ? (
          <p className="text-center text-red-500">
            Failed to load stores. Please try again.
          </p>
        ) : (
          <Table
            columns={storeColumns}
            data={getPaginatedData(filteredStores)}
            page={page}
            pageSize={pageSize}
            total={filteredStores.length}
            onPageChange={setPage}
          />
        ))}
    </div>
  );
};

export default Management;
