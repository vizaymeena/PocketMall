import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

import product_1 from "../assets/images/unsplash.avif";
import product_2 from "../assets/images/milada-vigerova-p8Drpg_duLw-unsplash.jpg";
import product_3 from "../assets/images/felipe-galvan-AhfrA5VQNpM-unsplash.jpg";

import "../assets/style/productDetails.css";

export default function ProductDetails() {
  const products = [
    { id: 1, img: product_1, title: "Scarlet Prestige Overcoat", price: 1200 },
    { id: 2, img: product_2, title: "Ivory Opulence Coat", price: 1200 },
    { id: 3, img: product_3, title: "Azure Grace Blouse", price: 1200 },
  ];

  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const handleSelection = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="documentationMain">
      {/* Top section: product images + details */}
      <div className="productKeyInsights">
        {/* Left: product image gallery */}
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
          <p className="price">₹{selectedProduct.price}</p>

          <div className="options">
            <label>
              Size:
              <select>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </label>

            <label>
              Color:
              <select>
                <option>Red</option>
                <option>Blue</option>
                <option>Yellow</option>
              </select>
            </label>
          </div>

          <div className="buttons">
            <button className="buyNow">Buy Now</button>
            <button className="addToCart">
              Add to Cart <ShoppingCart />
            </button>
          </div>

          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            commodo euismod urna, sed dapibus justo.
          </p>
        </div>
      </div>

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
