import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

import product_1 from "../assets/images/unsplash.avif";
import product_2 from "../assets/images/bluedenimjacket.jpg";
import product_3 from "../assets/images/bluetshirt.jpg";

import "../assets/style/productDetails.css";

import { useLocation } from "react-router-dom"

// Comoponents
import SimilarProducts from "../components/SimilarProduct"


export default function ProductDetails() {
  const products = [
    { id: 1, img: product_1, title: "Scarlet Prestige Overcoat", price: 1200,description:"Whether you're a corporate professional, an entrepreneur, a traveler, or someone who simply appreciates premium fashion—the Scarlet Prestige Overcoat is crafted to complement your lifestyle with elegance and warmth. Own the winter season with a coat that doesn’t just keep you warm, but makes you unforgettable." },
    { id: 2, img: product_2, title: "Ivory Opulence Coat", price: 1200,description:"" },
    { id: 3, img: product_3, title: "Azure Grace Blouse", price: 1200,description:"" },
  ];

  let [selectedProduct, setSelectedProduct] = useState(products[0]);
  let location = useLocation()

  let pathParts = location.pathname.split("/").filter(Boolean)
  let breadcrumb = pathParts.map((part)=>part.charAt(0).toUpperCase() + part.slice(1))

  let handleSelection = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="documentationMain">

      <div className="routes">
        <span>Home </span>
        {breadcrumb.map((item,key)=>(
          
          <span key={key}> {"/"} {item}</span>
        ))}

      </div>
     
      <div className="productKeyInsights">
        <div className="productImages">
          <div className="mainImage">
            <img src={selectedProduct.img} alt={selectedProduct.title} />
          </div>
          <div className="imageThumbnails">
            {products.map((p) => (
              <img
                key={p.id}
                src={p.img}
                alt={p.title}
                className={p.id === selectedProduct.id ? "active" : ""}
                onDoubleClick={() => handleSelection(p)}
              />
            ))}
          </div>
        </div>

        {/* Right: product brief / checkout */}
        <div className="productbriefing">
          <h2>{selectedProduct.title}</h2>
           <p className="description">
           {selectedProduct.description}
          </p>
          <p className="price">₹ : {selectedProduct.price}</p>

          <div className="options">
            <div className="optSize">
              <label>Size:</label>
              <div className="sizeChoice">
                <span>S</span>
                <span>L</span>
                <span>M</span>
                <span>XL</span>
                <span>XXL</span>
              </div>
            </div>

           <div className="optColors"> 
            <label >Color:</label>
            <div className="colorChoice">
              <span>Blue</span>
              <span>Red</span>
              <span>White</span>
            </div>
           </div>
          </div>

          <div className="buttons">
            <button className="buyNow">Buy Now</button>
            <button className="addToCart">
              Add to Cart <ShoppingCart />
            </button>
          </div>
        </div>
      </div>


      {/* Similar Product */}
      <SimilarProducts products={products}/>


      {/* Bottom section: reviews / feedback */}
      <div className="reviewsFeedbacks">
        <h3>Customer Reviews</h3>
        <div className="review">
          <strong>Jane D.</strong>
          <p>Love the fit and color! Will buy again.</p>
        </div>
        <div className="review">
          <strong>Maria S.</strong>
          <p>Fabric quality is great and very comfortable.</p>
        </div>
      </div>
    </div>
  );
}
