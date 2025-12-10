import "../../assets/style/get_list.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import SkeletonCard from "../../utils/Skeleton";

function ProductList() {
  let [productList, setProductList] = useState([]);
  let [showEdit, setShowEdit] = useState(false);
 let [editData, setEditData] = useState({
    name: "",
    price: "",
    category: "",
    variants: []
  });


  let [editProduct, setEditProduct] = useState(null);
  let [loading,setLoading] = useState(true)
  let [perPage,setPerPage] = useState(0)
  const dialogRef = useRef(null);

 
 const skeleton = () => {
  return Array.from({ length: productList.length }, (_, i) => (
    <SkeletonCard key={i} />
  ));
};

console.log(productList)





  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/`)
      .then((res) => {
        setProductList(res.data)
        setPerPage(res.data.length)
        let t = setTimeout(() => {
            setLoading(false)
        }, 500);

        return ()=>clearTimeout(t)
    })
      .catch((err) => console.log(err.response.data));
  }, []);

  console.log(productList[0])
  // close dialog when clicking outside
  useEffect(() => {
    if (!showEdit) return;

    const handler = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        setShowEdit(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showEdit]);


  const loadEditData = (item) => {
  setEditData({
    name: item.name,
    price: item.price,
    category: item.category,
    variants: item.variants.map(v => ({
      size: v.size,
      color: v.color,
      stock: v.stock,
    }))
  });

  setShowEdit(true);
};

  return (
    <>
      <div className="listPageTitle">
        <p>Product List</p>
      </div>

      <div className="listBox">
       {loading ? <>{skeleton()}</> : <>
        {productList.map((item) => (
          <div className="listItem" key={item.id}>
            {/* LEFT - Image */}
            <div className="left">
              <img src={item.images?.[0]?.thumbnail} alt="productImage" loading="lazy" />
            </div>

            {/* CENTER - Info */}
            <div className="center">
              <h2>{item.name}</h2>

              <p className="sizes">
                {item.variants?.map(v => v.size).join(" | ")}
              </p>

              <p>
                 {item.variants?.map(v=>v.color).join(" | ")}
              </p>

              <p className="stock">
                Stock: {item.variants?.reduce((sum, v) => sum + v.stock, 0)}
              </p>

              <p className="cat">Category: {item.category}</p>
            </div>


            {/* RIGHT - Buttons */}
            <div className="right">
              <p className="editBtn">EDIT </p>

              <p className="delBtn" onClick={()=>RemoveProduct}>DEL</p>
            </div>
          </div>
        ))}</>}
      </div>
    </>
  );
}

export default ProductList;
