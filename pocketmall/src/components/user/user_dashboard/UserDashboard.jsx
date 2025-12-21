import '../../../assets/style/userdashboard/userdashboard.css'
import { NavLink, Outlet } from "react-router-dom"
import {
  LayoutDashboard,
  ShoppingCart,
  Clock,
  Truck,
  CreditCard,
  Settings,
  LogOut
} from "lucide-react"

import { useAuth } from '../../../contexts/userContext/LoginContext'

export default function UserDashboard() {

  let { user } = useAuth()

  return (
    <div className="ud_layoutWrapper">

      {/* ========== SIDEBAR ========== */}
      <aside className="left ud_sidebar">

        {/* Brand / Profile */}
        <div className="ud_sidebar_header">
          <h2 className="ud_brand">Pocket <span>Mall</span> </h2>
          <p className="ud_user">{user?.split("@")?.[0]}</p>
        </div>

        {/* Navigation */}
        <nav className="ud_nav">
          <NavLink to="" end className="ud_nav_item">
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </NavLink>

          <NavLink to="mycart" className="ud_nav_item">
            <ShoppingCart size={18} />
            <span>My Cart</span>
          </NavLink>

          <NavLink to="pending" className="ud_nav_item">
            <Clock size={18} />
            <span>Pending Orders</span>
          </NavLink>

          <NavLink to="delivery" className="ud_nav_item">
            <Truck size={18} />
            <span>In Delivery</span>
          </NavLink>

          <NavLink to="transactions" className="ud_nav_item">
            <CreditCard size={18} />
            <span>Transactions</span>
          </NavLink>
        </nav>

        {/* Footer actions */}
        <div className="ud_sidebar_footer">
          <NavLink to="settings" className="ud_nav_item">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>

          <button className="ud_logout_btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* ========== MAIN BODY ========== */}
      <main className="right ud_body">

        {/* Top bar */}
        <header className="ud_topbar">
          <h1 className="ud_page_title"></h1>

          <div className="ud_topbar_right">
            <div className="ud_balance_card">
              <span>Total Cart</span>
              <strong>₹12,450</strong>
            </div>
          </div>
        </header>

        {/* Outlet Area */}
        <section className="ud_outlet">
          <Outlet />
        </section>

      </main>

    </div>
  )
}
