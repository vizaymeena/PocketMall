import React from "react"
import { ShoppingCart, CheckCircle } from "lucide-react"
import "../../../assets/style/userdashboard/cart/includedincart.css"

function IncludedInCart() {
  const includedItems = [
    {
      id: 1,
      name: "Nike Air Max 90",
      price: 8999,
      qty: 1,
      image: "https://via.placeholder.com/70"
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 12999,
      qty: 2,
      image: "https://via.placeholder.com/70"
    }
  ]

  return (
    <div className="ud_included_cart">

      {/* Header */}
      <div className="ud_included_header">
        <div className="ud_included_title">
          <ShoppingCart size={18} />
          <h3>Included in Cart</h3>
        </div>
        <span>{includedItems.length} items</span>
      </div>

      {/* Items */}
      <div className="ud_included_list">
        {includedItems.map(item => (
          <div className="ud_included_item" key={item.id}>

            <img src={item.image} alt={item.name} />

            <div className="ud_included_info">
              <h4>{item.name}</h4>
              <p>₹{item.price} × {item.qty}</p>
            </div>

            <div className="ud_included_status">
              <div className="child_one">
                <CheckCircle size={16} />
                <span>Added</span>
              </div>
              <span className="child_two">Remove</span>

            </div>

          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="ud_included_footer">
        <span>Proceed Checkout</span>
        <strong>
         Rs 12,000
        </strong>
      </div>

    </div>
  )
}

export default IncludedInCart
