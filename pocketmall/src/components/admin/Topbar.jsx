import { Search, Bell, Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function Topbar() {

  let [dark, setDark] = useState(false);

  return (
    <header className="topbar">

      {/* Search Box */}
      {/* <div className="searchBox">
        <Search size={18} />
        <input placeholder="Search products, users, reports..." />
      </div> */}

      <div className="topbarActions">

        {/* Notifications */}
        <div className="iconBtn">
          <Bell size={20} />
        </div>

        {/* Dark Mode Toggle */}
        <div className="iconBtn" onClick={() => setDark(!dark)}>
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </div>

        {/* Admin Box */}
        <div className="adminProfile">
          <img src="/admin.png" alt="admin" />
          <div>
            <h4>Admin</h4>
            <p>admin@shop.com</p>
          </div>
        </div>

      </div>
    </header>
  );
}
