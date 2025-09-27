import { useState } from "react";
import type { Column } from "../../../ui/Table";
import Table from "../../../ui/Table";
import SearchBox from "../../../ui/SearchBox";
import { pageSize } from "../../../constants/common";
import { StarRating } from "../../../utils/functions";

interface Store {
  id: number;
  name: string;
  address: string;
  overallRating: number;
  userRating?: number;
}

const initialStores: Store[] = [
  {
    id: 1,
    name: "Tech Mart",
    address: "123 Street",
    overallRating: 4.2,
    userRating: 4,
  },
  { id: 2, name: "Grocery Hub", address: "456 Avenue", overallRating: 3.8 },
  { id: 3, name: "Book World", address: "789 Road", overallRating: 5 },
  { id: 4, name: "Laptop Zone", address: "111 Square", overallRating: 4.5 },
  { id: 5, name: "Food Plaza", address: "222 Street", overallRating: 3.9 },
];

const GiveRating = () => {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleRatingChange = (id: number, rating: number) => {
    setStores((prev) =>
      prev.map((s) => (s.id === id ? { ...s, userRating: rating } : s))
    );
  };

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

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
          rating={value || 0}
          onChange={(val) => handleRatingChange(row.id, val)}
        />
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Rate Stores</h2>

      {/* Search + Select */}
      <div className="flex space-x-3">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search by name or address"
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredStores}
        page={page}
        pageSize={pageSize}
        total={stores.length}
        onPageChange={setPage}
      />
    </div>
  );
};

export default GiveRating;
