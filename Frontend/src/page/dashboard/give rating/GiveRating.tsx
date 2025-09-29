import { useState, useEffect, useMemo } from "react";
import type { Column } from "../../../ui/Table";
import Table from "../../../ui/Table";
import SearchBox from "../../../ui/SearchBox";
import { pageSize } from "../../../constants/common";
import { getUserId, StarRating } from "../../../utils/functions";
import { useGetAllStores } from "../../../services/stores/storeQueries";
import { useRateStore } from "../../../services/ratings/ratingMutations";

interface Store {
  id: number;
  name: string;
  address: string;
  overallRating: number;
  userRating?: number;
}

const GiveRating = () => {
  const {
    data: initialStores = [],
    isPending: isStoresPending,
    isError: isStoresError,
  } = useGetAllStores();

  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { mutate: rateStore, isPending: isRatingPending } = useRateStore();

  const userId = getUserId();

  useEffect(() => {
    if (initialStores.length > 0) {
      setStores(initialStores);
    }
  }, [initialStores]);

  const handleRatingChange = (storeId: number, rating: number) => {
    setStores((prev) =>
      prev.map((s) => (s.id === storeId ? { ...s, userRating: rating } : s))
    );

    rateStore({
      userId,
      storeId,
      rating,
    });
  };

  const filteredStores = useMemo(() => {
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, stores]);

  const getPaginatedData = <T,>(data: T[]) => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  };

  const columns: Column<Store>[] = [
    { header: "Store Name", accessor: "name", sortable: true },
    { header: "Address", accessor: "address", sortable: true },
    {
      header: "Overall Rating",
      accessor: "overallRating",
      render: (value) => <StarRating rating={Math.round(value)} />,
    },
    {
      header: "Your Rating",
      accessor: "userRating",
      render: (value, row) => (
        <StarRating
          editable={true}
          rating={value || 0}
          onChange={(val) => handleRatingChange(row.id, val)}
        />
      ),
    },
  ];

  if (isStoresPending) {
    return (
      <p className="text-center text-[var(--text-secondary)]">
        Loading stores...
      </p>
    );
  }

  if (isStoresError) {
    return <p className="text-center text-red-500">Failed to load stores.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Rate Stores</h2>

      <div className="flex space-x-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search by name or address"
        />
      </div>

      {isRatingPending && (
        <p className="text-center text-[var(--text-secondary)]">
          Submitting your rating...
        </p>
      )}

      <Table
        heading="Stores"
        columns={columns}
        data={getPaginatedData(filteredStores)}
        page={page}
        pageSize={pageSize}
        total={filteredStores.length}
        onPageChange={setPage}
      />
    </div>
  );
};

export default GiveRating;
