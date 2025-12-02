import React, { useState } from 'react';
import '../assets/style/primarynav.css';
import { FaShoppingBag, FaBell } from 'react-icons/fa';
import { User } from "lucide-react"
import { useNavigate } from 'react-router-dom';

function PrimaryNavbar() {
  // State to simulate logged-in vs logged-out
  const [loggedIn, setLoggedIn] = useState(true);
  let navigate = useNavigate()
  const user = {
    name: "Vizay Meena",
    profilePic: <User/>// replace with actual profile pic URL
  };

  return (
    <header className="primary_nav">
      <div className="nav_left">
        <h3 className="app_name" onClick={()=>navigate("/")}>Pocket Mall</h3>
      </div>

      <div className="nav_right">
        {!loggedIn ? (
          <div className="auth_buttons">
            <button className="login_btn">Login</button>
            <button className="register_btn">Register</button>
          </div>
        ) : (
          <div className="user_info">
            <FaBell className="icon" />
            <FaShoppingBag className="icon" />
            <div className="profile">
              <img src={user.profilePic} alt="profile" />
              <span>{user.name}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function SecondaryNavbar() {
  return (
    <div >Secondary Primary</div>
  )
}


import "../assets/style/footer.css";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">

        {/* Brand + About */}
        <div className="footer_col">
          <h3>Pocket Mall</h3>
          <p>
            Your one-stop destination for premium fashion.  
            Discover curated clothing with unmatched quality,
            crafted for the modern lifestyle.
          </p>

          <div className="footer_social">
            <FaInstagram />
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer_col">
          <h4>Quick Links</h4>
          <ul>
            <li>Mens Wear</li>
            <li>Womens Wear</li>
            <li>Kids Collection</li>
            <li>Winter Essentials</li>
            <li>New Arrivals</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="footer_col">
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
        <div className="footer_col">
          <h4>Stay Updated</h4>
          <p>Subscribe for exclusive deals and new collection alerts.</p>

          <div className="newsletter">
            <input type="email" placeholder="Enter email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer_bottom">
       Ecommerce project made by vijay meena
      </div>
    </footer>
  );
}


export { PrimaryNavbar, SecondaryNavbar,Footer };