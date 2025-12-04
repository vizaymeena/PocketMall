import { Outlet, NavLink } from "react-router-dom"
import { Menu, LogOut, Settings, LayoutGrid, Users, Package, BarChart3 } from "lucide-react"
import { useState } from "react"
import "../assets/style/admindashboard.css"

export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`proAdminLayout ${collapsed ? "collapsed" : ""}`}>
      
      {/* Sidebar */}
      <aside className="proSidebar">
        <div className="proSidebarTop">
          <div className="proLogo">A D M I N</div>
          <Menu className="proToggle" onClick={() => setCollapsed(!collapsed)} />
        </div>

        <nav className="proNav">
          <NavLink to="/adminDashboard" end>
            <LayoutGrid /> <span>Overview</span>
          </NavLink>
          <NavLink to="/adminDashboard/products">
            <Package /> <span>Products</span>
          </NavLink>
          <NavLink to="/adminDashboard/users">
            <Users /> <span>Users</span>
          </NavLink>
          <NavLink to="/adminDashboard/reports">
            <BarChart3 /> <span>Reports</span>
          </NavLink>
          <NavLink to="/adminDashboard/settings">
            <Settings /> <span>Settings</span>
          </NavLink>
        </nav>

        <div className="proSidebarBottom">
          <button className="logoutBtn">
            <LogOut /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="proMain">
        <header className="proTopbar">
          <div className="searchBox">
            <input type="search" placeholder="Search anything..." />
          </div>
          <div className="proUser">
            <img src="https://i.pravatar.cc/40" />
            <div className="userInfo">
              <h4>Admin</h4>
              <p>Superuser</p>
            </div>
          </div>
        </header>

        <section className="proContent">
          <Outlet />
        </section>
      </main>

    </div>
  )
}
