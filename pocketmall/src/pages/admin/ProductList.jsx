import "../../assets/style/get_list.css"
import axios from "axios"
import { Plus } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import SkeletonCard from "../../utils/Skeleton"

function ProductList() {
  let [productList, setProductList] = useState([])
  let [showEdit, setShowEdit] = useState(true)
 let [editData, setEditData] = useState({
    name: "",
    price: "",
    category: "",
    variants: []
  })


  let [editProduct, setEditProduct] = useState(null)
  let [loading,setLoading] = useState(true)
  const dialogRef = useRef(null)

 
 const skeleton = () => {
  return Array.from({ length: productList.length }, (_, i) => (
    <SkeletonCard key={i} />
  ))
}

console.log(productList)

  useEffect(() => {
    let t
      axios.get(`http://127.0.0.1:8000/api/products/`)
      .then((res) => {
        setProductList(res.data)
         t = setTimeout(() => {
            setLoading(false)
        }, 500)
      })
      .catch((err) => console.log(err.response?.data || err.message))
      return ()=>clearTimeout(t)
  }, [])



  let handleEdit = (item) => {
    if(!item.id) return
    try{
      setShowEdit(true)
      setEditData((pv)=>({...pv,
        name:item.name,
        price:item.price,
        category:item.category,
        variants: item.variants,
        images:item.images
      }))
    }catch(error){ 
        console.log("Edit Product Functional Error :",error)
     }
  }


  let RemoveProduct = (id) => {
    console.log("ID",id)
    if(!id) return alert("Value of id is :",id)
      axios.delete(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res)=>{
        console.log("DELETED PRODUCT",res.data)
         setTimeout(() => {
            setProductList((prev)=>prev.filter((el)=>el.id !== id))
         }, 300)
      })
      .catch((err)=>console.log("Backend Error",err.response.data))
  }

  return (
    <>
      <div className="listPageTitle">
        <p>Product List</p>
      </div>

      <div className="listBox">
       {loading ? 
         <>
         { skeleton()} 
         </> : 

        <>
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
                <p className="editBtn" onClick={()=>handleEdit(item)}>EDIT </p>

                <p className="delBtn" onClick={()=>RemoveProduct(item.id)}>DEL</p>
              </div>
            </div>
          ))}</>}
        </div>

        {/* Edit Form */}
        { showEdit && <EditProduct/> }
      </>
  )
}

export default ProductList





// EDIT COMPONENT 

function EditProduct () {

  return(<>
  
   <div className="dialogParent bgParent">
  <div className="editDialogBox">

    {/* GRID WRAPPER */}
    <div className="editGrid">

      {/* LEFT TOP — PRODUCT BASIC DETAILS */}
      <div className="section productDetails">
        <h3>Product Details</h3>

        <div className="field">
          <label>Name</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Price</label>
          <input type="number" />
        </div>

        <div className="field">
          <label>Discount Price</label>
          <input type="number" />
        </div>

        <div className="field">
          <label>Brand</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Category</label>
          <input type="text" />
        </div>
      </div>

      {/* RIGHT TOP — VARIANTS */}
      <div className="section variantsSection">
        <h3>Variants</h3>

        <div className="variantList">
          <div className="variantItem">
            <input type="text" placeholder="Size" />
            <input type="text" placeholder="Color" />
            <input type="number" placeholder="Stock" />
          </div>

          <button className="addVariantBtn">+ Add Variant</button>
        </div>
      </div>

      {/* FULL BOTTOM — IMAGES */}
      <div className="section imagesSection">
        <h3>Product Images</h3>

        <div className="imagesGrid">
          <div className="leftImages">
            <p>Upload Images</p>
            <div className="imageBox"> <Plus/>Upload Image</div>
          </div>

          <div className="rightImages">
            <p>Image Previews</p>
            <div className="imageBox">+ Upload</div>
            <div className="imageBox">+ Upload</div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>


  </>)

}




