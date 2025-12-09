import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import '../../assets/style/adminoverview.css'

export default function AdminOverview() {
  let [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.response?.data));
  }, []);

  console.log("DATA:", data);

  return (
    <div className="adminOverviewPage">

      <div className="productsListed">
        <h2 className="sectionTitle">Products Listed</h2>

        <div className="tableWrapper">
          {data.length > 0 ? (
            <table className="adminTable">

              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((product, i) => (
                  <tr key={i}>
                    <td className="data_productCode">{product.product_code}</td>
                    <td className="data_productName">{product.name}</td>
                    <td className="data_productPrice">₹{product.price}</td>
                    <td className="data_productDiscount">{product.discount_percent}%</td>

                    {/* Stock Sum */}
                    <td>
                      {product.variants
                        ? product.variants.reduce((sum, v) => sum + v.stock, 0)
                        : 0}
                    </td>

                    {/* Action Buttons */}
                    <td>
                      <button className="editBtn">
                        <Pencil size={18} />
                      </button>
                      <button className="deleteBtn">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          ) : (
            <p className="loadingText">Loading products...</p>
          )}
        </div>
      </div>

    </div>
  );
}
