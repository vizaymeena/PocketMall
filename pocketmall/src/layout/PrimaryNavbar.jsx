
import '../assets/style/primarynav.css'
import { FaShoppingBag, FaBell } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import GoogleLoginButton from '../components/google-login-button/GoogleLoginButton'

import { useAuth } from '../contexts/userContext/LoginContext'

import { FaSignOutAlt } from "react-icons/fa"

import { useCart } from '../contexts/userContext/CartContext'

export function PrimaryNavbar() {
  const { user, isAuthenticated, loggedOut } = useAuth()
  const { cartItems } = useCart()

  const navigate = useNavigate()
  
  return (
    <header className="pm_navbar">
      {/* Logo */}
      <div className="pm_logo" onClick={() => navigate("/")}>
        Pocket<span>Mall</span>
      </div>

      {/* Right Section */}
      <div className="pm_right">
        {!isAuthenticated ? (
          <GoogleLoginButton />
        ) : (
          <div className="pm_user_panel">
            {/* Notification */}
            <div className="pm_icon_wrap">
              <FaBell />
              <span className="pm_badge">{cartItems.length}</span>
            </div>

            {/* Cart */}
            <div className="pm_icon_wrap">
              <FaShoppingBag />
            </div>

            {/* User Info */}
            <div className="pm_profile">
              <div className="pm_avatar">
                {/* {user.toUpperCase()} */}
              </div>
              <span className="pm_username">
                {user.split("@")[0]}
              </span>
            </div>

            {/* Logout */}
            <button className="pm_logout" onClick={loggedOut} >
              <FaSignOutAlt />
              Logout
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
