import '../../assets/style/admindashboard/adminhome.css'
import AdminAlerts from "./AdminAlert"
import PopularProducts from "./PopularProducts"

export default function AdminHome() {
  return (
    <div className="adminHome">

      {/* Header */}
      <div className="adminHomeHeader">
        <h1>Dashboard Overview</h1>
        <p>Quick insights and system status</p>
      </div>

      {/* Alerts */}
      <AdminAlerts />

      {/* Stats */}
      <div className="adminStats">
        <div className="statCard">
          <h3>Total Users</h3>
          <span>1,248</span>
        </div>
        <div className="statCard">
          <h3>Total Orders</h3>
          <span>3,512</span>
        </div>
        <div className="statCard">
          <h3>Revenue</h3>
          <span>₹4.8L</span>
        </div>
        <div className="statCard warning">
          <h3>Pending Issues</h3>
          <span>12</span>
        </div>
      </div>

      {/* Popular Products */}
      <PopularProducts />

    </div>
  )
}
