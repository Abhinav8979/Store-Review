import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboardComp/SideBar";

export const DashboardPage = () => {
  return (
    <div className="flex bg-[var(--background)] h-screen overflow-hidden">
      <section className="flex flex-col justify-between w-52 bg-[var(--card)] h-screen p-4 border-r">
        <SideBar />
      </section>
      <section className="flex-1 p-5 overflow-y-auto">{<Outlet />}</section>
    </div>
  );
};
