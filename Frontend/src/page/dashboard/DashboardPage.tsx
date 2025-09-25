import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboardComp/SideBar";

export const DashboardPage = () => {
  return (
    <div className="flex bg-[var(--background)] min-h-screen">
      <section className="flex flex-col justify-between w-64 bg-[var(--card)] h-screen p-4  border-r">
        <SideBar />
      </section>
      <section className="flex-1">{<Outlet />}</section>
    </div>
  );
};
