import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminMobileTopbar from "./MobileBar";

import "../../assets/style/admin_layout.css";

export default function AdminDashboardLayout() {
  return (
    <div className="adminLayout">

      {/* Mobile Topbar */}
      <div className="mobileOnly">
        <AdminMobileTopbar />
      </div>

      {/* Body Section */}
      <div className="adminBody">

        {/* Desktop Sidebar */}
        <div className="desktopOnly">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="mainArea">
          <Outlet />
        </div>

      </div>

    </div>
  );
}
