
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import { IndianRupee,ShoppingCart } from "lucide-react"
import '../../assets/style/shopping.css'
import { useCart } from "../../contexts/userContext/CartContext"

export default function ProductCard({ product }) {
  let [showImage, setShowImage] = useState(false)
  let navigate = useNavigate()

  let { saveCart } = useCart()  

  useEffect(() => {
    let t = setTimeout(() => setShowImage(true), 300)
    return () => clearTimeout(t)
  }, [])

  let includeInCart = () => {
    saveCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.image,
      size:"m",
      color:'black',
      quantity:1,
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
              navigate("/buyNow", { state: { buyProduct: product } })
            }
          >
            <IndianRupee />
          </div>

          <div className="cartIcon" onClick={includeInCart}>
            <ShoppingCart />
          </div>
        </div>

        <div className="productBottom">
        
          <h1>{product.name}</h1>
          <p>₹ {product.price}</p>
        </div>
      </div>
    </div>
  )
}