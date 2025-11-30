import React, { useState } from 'react';
import '../assets/style/primarynav.css';
import { FaShoppingBag, FaBell } from 'react-icons/fa';
import { User } from "lucide-react"
function PrimaryNavbar() {
  // State to simulate logged-in vs logged-out
  const [loggedIn, setLoggedIn] = useState(true);
  const user = {
    name: "Vizay Meena",
    profilePic: <User/>// replace with actual profile pic URL
  };

  return (
    <header className="primary_nav">
      <div className="nav_left">
        <h3 className="app_name">Pocket Mall</h3>
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

export { PrimaryNavbar, SecondaryNavbar };