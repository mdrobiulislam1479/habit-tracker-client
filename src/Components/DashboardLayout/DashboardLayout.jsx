import { Outlet } from "react-router";
import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen lg:flex bg-base-100">
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 lg:ml-64">
        <DashboardNav className/>
        <div>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
