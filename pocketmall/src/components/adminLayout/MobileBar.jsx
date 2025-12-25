import { useState } from "react"
import { Menu, X, Package, Users, LogOut } from "lucide-react"
import { NavLink } from "react-router-dom"
import '../../assets/style/admindashboard/mobileadminnavbar.css'

export default function AdminMobileTopbar() {
  let [menuOpen, setMenuOpen] = useState(false)
  let [productOpen, setProductOpen] = useState(false)
  let [userOpen, setUserOpen] = useState(false)

  return (
    <>
      {/* Topbar */}
      <div className="mobileTopbar">
        <button className="hamburgerBtn" onClick={() => setMenuOpen(true)}>
          <Menu />
        </button>
        <span className="brandName">Pocket Mall</span>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="menuOverlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Slide Menu */}
      <aside className={`mobileMenu ${menuOpen ? "open" : ""}`}>
        <div className="menuHeader">
          <span>vizaymeena</span>
          <button onClick={() => setMenuOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="menuNav">
          {/* Products */}
          <div
            className="menuItem"
            onClick={() => setProductOpen(!productOpen)}
          >
            <Package /> <span>Products</span>
          </div>

          {productOpen && (
            <div className="subMenu">
              <NavLink to="/adminDashboard/products/list">All Products</NavLink>
              <NavLink to="/adminDashboard/products/add">Add Product</NavLink>
            </div>
          )}

          {/* Users */}
          <div
            className="menuItem"
            onClick={() => setUserOpen(!userOpen)}
          >
            <Users /> <span>Users</span>
          </div>

          {userOpen && (
            <div className="subMenu">
              <NavLink to="/adminDashboard/users">All Users</NavLink>
              <NavLink to="/adminDashboard/users/new">New Users</NavLink>
            </div>
          )}

          {/* Logout */}
          <div className="menuItem logout">
            <LogOut /> <span>Logout</span>
          </div>
        </nav>
      </aside>
    </>
  )
}
