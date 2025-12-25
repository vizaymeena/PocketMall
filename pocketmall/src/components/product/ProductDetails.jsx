import { ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "../../assets/style/productDetails.css"

import CustomerReviews from "../reviews/Reviews"
import { useAuth } from '../../contexts/userContext/LoginContext'
import { useCart } from '../../contexts/userContext/CartContext'
import axios from "axios"

export default function ProductDetails() {
  let location = useLocation()
  let navigate = useNavigate()
  let { user } = useAuth()
  let { saveCart } = useCart()

  /* UI State */
  let [activeSize, setActiveSize] = useState("s")
  let [activeColor, setActiveColor] = useState("blue")
  let [qty, setQty] = useState(1)

  /* Product State */
  let [product, setProduct] = useState(null)
  let [added,setAdded] = useState(false)

  /* Purchase State */
  let [buy, setBuying] = useState({
    proId:null,
    proName: "",
    proDescription: "",
    proSize: "s",
    proColor: "black",
    proQuantity: 1,
    proPrice: 0,
    proStatus: "pending",
    proCheckoutAt: new Date().toISOString()
  })

  /* Get product from navigation */
  useEffect(() => {
    let navProduct = location?.state?.buyProduct
  
    if (!navProduct) {
      navigate("/", { replace: true })
      return
    }
    setProduct(navProduct)
  }, [location, navigate])

  /* Sync buy state when product or quantity changes */
  useEffect(() => {
    if (!product) return
    setBuying(prev => ({
      ...prev,
      proId:product.id || null,
      proName: product.name || product.title,
      proDescription: product.description || "",
      proQuantity: qty,
      proPrice: qty * product.price
    }))
    setAdded(false)

  }, [product, qty])
  
  useEffect(() => {
    setAdded(false)
  }, [activeSize, activeColor])

  // size function
  let handleSize = (e) => {
    let el = e.target.closest("span")
    if (!el) return

    let size = el.dataset.size
    setActiveSize(size)

    setBuying(prev => ({
      ...prev,
      proSize: size
    }))
  }
  // color function 
  let handleColor = (e) => {
    let el = e.target.closest("span")
    if (!el) return

    let color = el.dataset.color
    setActiveColor(color)

    setBuying(prev => ({
      ...prev,
      proColor: color
    }))
  }

  if (!product) return null

  /* ============================================================================ */
              /* Purchase api call to backend */
  /* ============================================================================ */


  // let buyProduct = () => {
  //   try{
  //     axios.post(`http://127.0.0.1:8000/api/buyitem/${product?.id}`,{
  //       "user":user
  //     })
  //   }
  //   catch(error){
  //     console.log(error?.reponse?.data)
  //   }
  // }

  /* ============================================================================ */

  // add to cart 
  let handleCartButton = () => {
    if(added) return
     saveCart({
      productId: product.id,
      name: product.name,
      image: product.images?.[0]?.image,
      price: product.price,
      size: buy.proSize,
      color: buy.proColor,
      quantity: qty,
      totalPrice: product.price * qty
    })
    setAdded(true)
  }

  return (
    <div className="documentationMain">
      {/* Breadcrumb */}
      <div className="routes">
        <span onClick={() => navigate("/")}>Home</span>
        <span> / Product</span>
      </div>

      {/* Product Section */}
      <div className="productKeyInsights">
  
        <div className="productImages">
          <div className="mainImage">
            <img
              src={product?.images?.[0]?.image || product?.image}
              alt={product?.name || product?.title}
            />
          </div>
        </div>

        {/* Details */}
        <div className="productbriefing">
          <h2>{product?.name || product?.title}</h2>

          <p className="description">
            {product?.description || "Premium quality product"}
          </p>

          <p className="price">₹ {product?.price}</p>

          {/* Options */}
          <div className="options">
            {/* Size */}
            <div className="optSize">
              <label>Size</label>
              <div className="sizeChoice" onClick={handleSize}>
                {["s", "m", "l", "xl", "xxl"].map(size => (
                  <span
                    key={size}
                    data-size={size}
                    className={activeSize === size ? "sizeActive" : ""}
                  >
                    {size.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="optColors">
              <label>Color</label>
              <div className="colorChoice" onClick={handleColor}>
                {["blue", "red", "black"].map(color => (
                  <span
                    key={color}
                    data-color={color}
                    className={activeColor === color ? "colorActive" : ""}
                  >
                    {color.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="quantityBlock">
            <label className="quantityLabel">
              Quantity <span>(1-10)</span>
            </label>

            <div className="quantityControl">
              <button
                className="qtyBtn"
                onClick={() => setQty(q => Math.max(1, q - 1))}
                disabled={qty === 1}
              >
                -
              </button>

              <span className="qtyValue">{qty}</span>

              <button
                className="qtyBtn"
                onClick={() => setQty(q => Math.min(10, q + 1))}
                disabled={qty === 10}
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="buttons">
            <button
              className="buyNow"
              disabled={!buy.proSize || !buy.proColor}
            >
              Buy Now
            </button>

            <button
              className="addToCart"
              disabled={!buy.proSize || !buy.proColor}
              onClick={handleCartButton}
            >
              {added ? "Added ✓" : <>Add to Cart <ShoppingCart /></>}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviewsSection">
        <CustomerReviews />
      </div>
    </div>
  )
}
