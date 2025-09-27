import React, { useState, useMemo } from "react";
import type { Column } from "../../../ui/Table";
import Table from "../../../ui/Table";
import SearchBox from "../../../ui/SearchBox";
import { pageSize } from "../../../constants/common";
import { StarRating } from "../../../utils/functions";

type Rating = {
  userName: string;
  email: string;
  rating: number;
};

const ratings: Rating[] = [
  { userName: "John Doe", email: "john@example.com", rating: 4 },
  { userName: "Jane Smith", email: "jane@example.com", rating: 5 },
  { userName: "Mike Brown", email: "mike@example.com", rating: 3 },
  { userName: "Emily Davis", email: "emily@example.com", rating: 4 },
  { userName: "Chris Wilson", email: "chris@example.com", rating: 2 },
  { userName: "Sarah Johnson", email: "sarah@example.com", rating: 5 },
];

const SeeRatings: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRatings = useMemo(() => {
    return ratings.filter(
      (r) =>
        r.userName.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const overallRating =
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

  const columns: Column<Rating>[] = [
    { header: "User Name", accessor: "userName", sortable: true },
    { header: "Email", accessor: "email", sortable: true },
    {
      header: "Rating",
      accessor: "rating",
      render: (value: number) => StarRating({ rating: value }),
    },
  ];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Store Ratings</h1>

      <div className="mb-4 flex items-center space-x-2">
        <span className="font-semibold">Overall Store Rating:</span>
        {StarRating({ rating: Math.round(overallRating) })}
        <span className="text-gray-600 text-sm">
          ({overallRating.toFixed(1)})
        </span>
      </div>

      <div className="mb-4">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search by name or email"
        />
      </div>

      <Table
        columns={columns}
        data={filteredRatings}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SeeRatings;
