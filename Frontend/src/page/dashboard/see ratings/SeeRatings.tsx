import React, { useState, useMemo } from "react";
import type { Column } from "../../../ui/Table";
import Table from "../../../ui/Table";
import SearchBox from "../../../ui/SearchBox";
import { pageSize } from "../../../constants/common";
import { StarRating } from "../../../utils/functions";
import { useGetOwnerStore } from "../../../services/stores/storeQueries";

type Rating = {
  userName: string;
  email: string;
  rating: number;
  comment?: string | null;
};

type StoreResponse = {
  id: string;
  name: string;
  address: string;
  owner: { id: string; name: string; email: string };
  overallRating: number;
  totalRatings: number;
  ratings: Rating[];
};

const SeeRatings: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: store,
    isPending,
    isError,
  } = useGetOwnerStore() as {
    data: StoreResponse | undefined;
    isPending: boolean;
    isError: boolean;
  };

  const ratings = store?.ratings || [];

  const filteredRatings = useMemo(() => {
    return ratings.filter(
      (r) =>
        r.userName.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, ratings]);

  const columns: Column<Rating>[] = [
    { header: "User Name", accessor: "userName", sortable: true },
    { header: "Email", accessor: "email", sortable: true },
    {
      header: "Rating",
      accessor: "rating",
      render: (value: number) => <StarRating rating={value} />,
    },
  ];

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading ratings...</p>
      </div>
    );
  }

  if (isError || !store) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Failed to load ratings.</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">{store.name} Ratings</h1>
      <p className="text-gray-600 mb-2">{store.address}</p>

      <div className="mb-4 flex items-center space-x-2">
        <span className="font-semibold">Overall Store Rating:</span>
        <StarRating rating={store.overallRating} />
        <span className="text-gray-600 text-sm">
          {store.overallRating.toFixed(1)} ({store.totalRatings} reviews)
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
        heading="User Ratings"
        columns={columns}
        data={filteredRatings}
        page={currentPage}
        pageSize={pageSize}
        total={filteredRatings.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SeeRatings;
