import { useGetStats } from "../../services/admins/adminQueries";

const AdminDashboardStats = () => {
  const { data: stats, isPending, isError } = useGetStats();

  if (isPending) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Something went wrong!
      </div>
    );

  if (!stats) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="p-5 text-center">
            <h3 className="text-lg font-semibold capitalize">{key}</h3>
            <p className="text-2xl font-bold text-indigo-600 mt-2">
              {value as string | number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardStats;
