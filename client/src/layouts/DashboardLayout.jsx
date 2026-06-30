import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import { useState } from "react";
function DashboardLayout() {
const [isOpen, setIsOpen]=useState(true);
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar isOpen={isOpen} />

      <div className="flex-1">

        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;