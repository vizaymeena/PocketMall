import "../../../assets/style/userdashboard/transaction.css"
import productImg from "../../../assets/images/bluetshirt.jpg"

export default function TransactionHistory() {

  let transactions = [
    {
      id: 1,
      status: "pending",
      name: "Men Winter Jacket",
      price: 1200,
      date: "12 Sep 2025",
      payment: "Pending",
      img: productImg
    },
    {
      id: 2,
      status: "paid",
      name: "Women Hoodie",
      price: 2200,
      date: "10 Sep 2025",
      payment: "Paid",
      img: productImg
    },
    {
      id: 3,
      status: "delivered",
      name: "Kids Jacket",
      price: 1800,
      date: "02 Sep 2025",
      payment: "Completed",
      img: productImg
    }
  ]

  return (
    <div className="transactionSection">

      <div className="transactionHeader">
        <h2 className="transactionTitle">Transaction History</h2>
        <span className="transactionSubtitle">
          Pending, paid and delivered orders
        </span>
      </div>

      <div className="transactionList">
        {transactions.map(item => (
          <div
            key={item.id}
            className={`transactionCard ${item.status}`}
          >
            <div className="transactionLeft">
              <img
                src={item.img}
                alt={item.name}
                className="transactionImage"
              />

              <div className="transactionDetails">
                <h4 className="transactionName">{item.name}</h4>
                <span className="transactionDate">{item.date}</span>
              </div>
            </div>

            <div className="transactionRight">
              <span className="transactionPrice">₹ {item.price}</span>
              <span className="transactionPayment">
                {item.payment}
              </span>
              <button className="transactionActionBtn">
                View
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
