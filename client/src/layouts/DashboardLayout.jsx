import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <Topbar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-4 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;