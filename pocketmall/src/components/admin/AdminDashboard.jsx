import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../../assets/style/admin_layout.css";

export default function AdminDashboardLayout() {
  return (
    <div className="adminLayout">
      
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="mainArea">
        
        {/* Top Navigation Bar */}
        <Topbar />

        {/* Page Content */}
        <div className="pageContent">
          <Outlet />
        </div>

      </div>

    </div>
  );
}
