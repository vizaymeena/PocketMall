import { ShoppingCart, Clock, Truck, CreditCard } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../../contexts/userContext/CartContext"
import "../../../assets/style/userdashboard/cart/ud_default.css"

export default function DashboardOverview() {
  let navigate = useNavigate()
  let { cartItems } = useCart()

  let previewItems = cartItems.slice(0, 3)
 
  return (
    <div className="ud_overview">

      <div className="ud_stats">

        <div className="ud_stat_card">
          <ShoppingCart size={20} />
          <div>
            <p>Cart Items</p>
            <strong>{cartItems.length}</strong>
          </div>
        </div>

        <div className="ud_stat_card">
          <Clock size={20} />
          <div>
            <p>Pending Orders</p>
            <strong>1</strong>
          </div>
        </div>

        <div className="ud_stat_card">
          <Truck size={20} />
          <div>
            <p>In Delivery</p>
            <strong>2</strong>
          </div>
        </div>

        <div className="ud_stat_card">
          <CreditCard size={20} />
          <div>
            <p>Total Amount</p>
            <strong>₹{cartItems.reduce((sum,item) => sum + item.price * item.quantity ,0 )}</strong>
          </div>
        </div>

      </div>

      <div className="ud_cart_preview">

        <div className="ud_cart_preview_header">
          <h3>Included in Cart</h3>
          <span>{cartItems.length} items</span>
        </div>

        {previewItems.length === 0 && (
          <p className="ud_empty_state">
            Your cart is empty. Start shopping 👀
          </p>
        )}

        <div className="ud_cart_preview_list">
          {previewItems.map(item => (
            <div
              className="ud_cart_preview_item"
              key={`${item.id}-${item.size}-${item.color}`}
            >
              <img src={item.image} alt={item.name} />

              <div>
                <h4>{item.name}</h4>
                <p>
                  {item.size.toUpperCase()} • {item.color.toUpperCase()} • Qty {item.quantity}
                </p>
              </div>

              <strong>₹{item.price * item.quantity}</strong>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="ud_cart_preview_footer">
            <button onClick={() => navigate("mycart")}>
              Go to Cart
            </button>

            <button
              className="primary"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        )}

      </div>

    </div>
  )
}
