// css
import "./../../../assets/style/userdashboard/cart/mycart.css"

// icons
import { Trash2 } from "lucide-react"
import { useCart } from "../../../contexts/userContext/CartContext"

export default function MyCart() {
  let { cartItems, removeCart } = useCart()

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

      {/* Body */}
      <div className="ud_cart_table_body">
        {cartItems.length === 0 && (
          <p className="ud_cart_empty">Your cart is empty</p>
        )}

        {cartItems.map(item => (
          <div className="ud_cart_row" key={`${item.id}-${item.size}-${item.color}`}>

            <div className="ud_cart_product">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <small>{item.size.toUpperCase()} • {item.color.toUpperCase()}</small>
              </div>
            </div>

            <div className="ud_cart_price">
              ₹{item.price * item.quantity}
            </div>

            <div className="ud_cart_qty">
              {item.quantity}
            </div>

            <div className="ud_cart_status pending">
              pending
            </div>

            <button
              className="ud_cart_remove"
              onClick={() =>
                removeCart(item.id, item.size, item.color)
              }
            >
              <Trash2 size={16} />
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}
