import React, { useState } from 'react'
import '../assets/style/primarynav.css'
import { FaShoppingBag, FaBell } from 'react-icons/fa'
import { User } from "lucide-react"
import { useNavigate } from 'react-router-dom'

function PrimaryNavbar() {
  // State to simulate logged-in vs logged-out
  const [loggedIn, setLoggedIn] = useState(false)
  let navigate = useNavigate()
  const user = {
    name: "Vizay Meena",
    profilePic: <User/>// replace with actual profile pic URL
  }

  return (
    <header className="pm_navbar">

  {/* Left Branding */}
  <div className="pm_left">
    <h2 className="pm_logo" onClick={() => navigate("/")}>
      Pocket <span>Mall</span>
    </h2>
  </div>

  {/* Right Navigation Area */}
  <div className="pm_right">

    {!loggedIn ? (
      <div className="pm_auth">
        <button className="pm_btn pm_login">Login</button>
        <button className="pm_btn pm_register">Register</button>
      </div>
    ) : (
      <div className="pm_user_panel">

        {/* Notifications */}
        <div className="pm_icon_wrap">
          <FaBell className="pm_icon" />
          <span className="pm_badge">3</span>
        </div>

        {/* Cart */}
        <div className="pm_icon_wrap">
          <FaShoppingBag className="pm_icon" />
        </div>

        {/* Profile */}
        <div className="pm_profile">
         {user.profilePic} 
          <span>{user.name}</span>
        </div>

      </div>
    )}

  </div>

</header>

  )
}

function SecondaryNavbar() {
  return (
    <div >Secondary Primary</div>
  )
}


import "../assets/style/footer.css"
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa"
function Footer() {
  return (
    <footer className="pm_footer_new">

      <div className="pm_footer_content">

        {/* Brand */}
        <div className="pm_col brand">
          <h2>PocketMall</h2>
          <p>Where fashion meets quality. Designed for everyday comfort and premium style.</p>

          <div className="pm_socials">
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
          </div>
        </div>

        {/* Links */}
        <div className="pm_col">
          <h4>Shop</h4>
          <ul>
            <li>Mens Wear</li>
            <li>Womens Wear</li>
            <li>Kids Collection</li>
            <li>Winter Essentials</li>
            <li>New Arrivals</li>
          </ul>
        </div>

        <div className="pm_col">
          <h4>Customer Care</h4>
          <ul>
            <li>Track Order</li>
            <li>Shipping Policy</li>
            <li>Return & Refunds</li>
            <li>Help Center</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="pm_col">
          <h4>Stay Updated</h4>
          <p>Join our newsletter for early access to drops and exclusive offers.</p>

          <div className="pm_input_row">
            <input type="email" placeholder="Email Address" />
            <button>â†’</button>
          </div>
        </div>

      </div>

      <div className="pm_footer_bottom">
        E-Commerce Project Made by Vijay Meena
      </div>
    </footer>
  )
}

export default Footer



export { PrimaryNavbar, SecondaryNavbar,Footer }
