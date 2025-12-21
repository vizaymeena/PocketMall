import "./../../../assets/style/userdashboard/cart/mycart.css"
import { Trash2 } from "lucide-react"

export default function MyCart() {
  const cartItems = [
    {
      id: 1,
      name: "Nike Air Max 90",
      price: 8999,
      qty: 1,
      status: "pending",
      image: "https://via.placeholder.com/80"
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 12999,
      qty: 2,
      status: "confirmed",
      image: "https://via.placeholder.com/80"
    }
  ]

  return (
    <div className="ud_cart">

      {/* Header */}
      <div className="ud_cart_header">
        <h2>My Cart</h2>
        <span>{cartItems.length} items</span>
      </div>

      {/* Table Head */}
      <div className="ud_cart_table_head">
        <span>Product</span>
        <span>Price</span>
        <span>Qty</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      {/* Rows */}
      <div className="ud_cart_table_body">
        {cartItems.map(item => (
          <div className="ud_cart_row" key={item.id}>

            <div className="ud_cart_product">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>
            </div>

            <div className="ud_cart_price">
              ₹{item.price * item.qty}
            </div>

            <div className="ud_cart_qty">
              {item.qty}
            </div>

            <div className={`ud_cart_status ${item.status}`}>
              {item.status}
            </div>

            <button className="ud_cart_remove">
              <Trash2 size={16} />
            </button>

          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="ud_cart_footer">
        <span>Total</span>
        <strong>₹34,997</strong>
      </div>

    </div>
  )
}
