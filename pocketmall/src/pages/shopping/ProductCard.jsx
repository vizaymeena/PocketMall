
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import { IndianRupee,ShoppingCart } from "lucide-react"

import { useCart } from "../../contexts/userContext/CartContext"

export default function ProductCard({ product }) {
  const [showImage, setShowImage] = useState(false)
  const navigate = useNavigate()

  const { saveCart } = useCart()   // 👈 get cart function from context

  useEffect(() => {
    const t = setTimeout(() => setShowImage(true), 300)
    return () => clearTimeout(t)
  }, [])

  const includeInCart = () => {
    saveCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.image
    })
  }

  return (
    <div className="productCard">
      <div className="productOverview">
        <div className="productTop">
          {showImage ? (
            <img src={product.images[0]?.image} alt={product.name} />
          ) : (
            <div className="skeleton-img" />
          )}

          <div
            className="buynow"
            onClick={() =>
              navigate("/buyNow", { state: { item: product } })
            }
          >
            <IndianRupee />
          </div>

          <div className="cartIcon" onClick={includeInCart}>
            <ShoppingCart />
          </div>
        </div>

        <div className="productBottom">
          <p>₹ {product.price}</p>
          <h1>{product.name}</h1>
        </div>
      </div>
    </div>
  )
}