import '../../assets/style/admindashboard/adminalerts.css'

export default function AdminAlerts() {
  return (
    <div className="adminAlerts">
      <div className="alertCard danger">
        <h4>Cancelled Orders</h4>
        <span>8</span>
      </div>

      <div className="alertCard warning">
        <h4>Payment Failures</h4>
        <span>5</span>
      </div>

      <div className="alertCard info">
        <h4>Pending Approvals</h4>
        <span>12</span>
      </div>
    </div>
  )
}
