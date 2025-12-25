import '../assets/style/primarynav.css'
import { FaShoppingBag, FaBell, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import GoogleLoginButton from "../components/google-login-button/GoogleLoginButton"
import { useAuth } from "../contexts/userContext/LoginContext"
import { useCart } from "../contexts/userContext/CartContext"
import { useState } from "react"

export function PrimaryNavbar() {
  let { user, isAuthenticated, loggedOut } = useAuth()
  let { cartItems } = useCart()
  let navigate = useNavigate()

  let [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="pm_navbar">
      {/* LEFT */}
      <div className="pm_left">
        <h2 className="pm_logo" onClick={() => navigate("/")}>
          Pocket<span>Mall</span>
        </h2>
      </div>

      {/* HAMBURGER */}
      <div className="pm_hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* RIGHT */}
      <div className={`pm_right ${menuOpen ? "open" : ""}`}>
        {!isAuthenticated ? (
          <GoogleLoginButton />
        ) : (
          <div className="pm_user_panel">

            <div className="pm_icon_wrap">
              <FaBell />
              <span className="pm_badge">{0}</span>
            </div>

            {/* Cart */}
            <div
              className="pm_icon_wrap"
              onClick={() => {
                navigate("/userdashboard")
                setMenuOpen(false)
              }}
            >
              <FaShoppingBag />
              {cartItems.length > 0 && (
                <span className="pm_badge">{cartItems.length}</span>
              )}
            </div>

            {/* Profile */}
            <div className="pm_profile">
              <div className="pm_avatar">
                {user[0].toUpperCase()}
              </div>
              <span className="pm_username">
                {user.split("@")[0]}
              </span>
            </div>

            {/* Logout */}
            <button
              className="pm_logout"
              onClick={() => {
                loggedOut()
                setMenuOpen(false)
              }}
            >
              <FaSignOutAlt />
              <span className="pm_logout_text">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}




import "../assets/style/footer.css"
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"


export function Footer() {
  return (
    <footer className="pm_footer">
      <div className="pm_footer_top">
        <div className="pm_footer_brand">
          <h3>PocketMall</h3>
          <p>Premium fashion for everyday comfort.</p>
          <div className="pm_socials">
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
          </div>
        </div>

        <div className="pm_footer_links">
          <h4>Shop</h4>
          <span>Mens</span>
          <span>Womens</span>
          <span>Kids</span>
          <span>New Arrivals</span>
        </div>

        <div className="pm_footer_links">
          <h4>Support</h4>
          <span>Track Order</span>
          <span>Returns</span>
          <span>Help Center</span>
        </div>
      </div>

      <div className="pm_footer_bottom">
        © 2025 PocketMall — Built by Vijay Meena
      </div>
    </footer>
  )
}

export default Footer
