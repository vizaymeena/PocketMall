import axios from "axios"
import { useEffect, useState } from "react"
import "../../assets/style/get_list.css"
import { SkeletonCard } from "../../utils/Skeleton"

let API_BASE = "http://127.0.0.1:8000"

function ProductList() {
  let [products, setProducts] = useState([])
  let [loading, setLoading] = useState(true)
  let [showEdit, setShowEdit] = useState(false)
  let [editData, setEditData] = useState(null)

  let getImage=(product)=>{
    let image = product?.images?.[0]?.image
    if(!image) return "product image"
    else{
      return image
    }
  }
  console.log(products[0])

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    setLoading(true)

    axios.get(`${API_BASE}/api/products/`)
      .then(res => {
        setProducts(res.data.results || [])
      })
      .catch(err => {
        console.error(err.response?.data || err.message)
      })
      .finally(() => setLoading(false))
  }, [showEdit])

  /* ---------------- ACTIONS ---------------- */
  let handleEdit = (product) => {
    setEditData({
      ...product,
      variants: product.variants.map(v => ({ ...v })),
      images: product.images || [],
      deleted_images: []
    })
    setShowEdit(true)
  }

  let removeProduct = (id) => {
    axios.delete(`${API_BASE}/api/products/${id}/`)
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id))
      })
      .catch(err => console.error(err.response?.data))
  }

  /* ---------------- RENDER ---------------- */
  if (loading) {
    return (
      <div className="listBox">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="listPageTitle">
        <p>Product List</p>
      </div>

      <div className="listBox">
        {products.map(product => {

          let sizes = [...new Set(product.variants.map(v => v.size))]
          let colors = [...new Set(product.variants.map(v => v.color))]
          let stock = product.variants.reduce((s, v) => s + v.stock, 0)

          return (
            <div className="listItem" key={product.id}>
              <div className="left">
                <img
                  src={getImage(product)}
                  alt={product.name}
                />
              </div>

              <div className="center">
                <h2>{product.name}</h2>
                <p>Sizes: {sizes.join(" | ")}</p>
                <p>Colors: {colors.join(" | ")}</p>
                <p className="stock">Stock: {stock}</p>
                <p className="cat">Category: {product.category}</p>
              </div>

              <div className="right">
                <p className="editBtn" onClick={() => handleEdit(product)}>EDIT</p>
                <p className="delBtn" onClick={() => removeProduct(product.id)}>DEL</p>
              </div>
            </div>
          )
        })}
      </div>

      {showEdit && (
        <EditProduct
          editData={editData}
          setEditData={setEditData}
          close={() => setShowEdit(false)}
        />
      )}
    </>
  )
}

export default ProductList



/* =============================  */
/* EDIT PRODUCT LIST COMPONENT  */
/* ============================  */

import { Save, Upload, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom' 

function EditProduct({ setShowEdit,editData, setEditData, close }) {

  let navigate = useNavigate();
  let fileRef = useRef(null)

  useEffect(() => {
    console.log("delete_images changed:", editData.delete_images);
  }, [editData.delete_images]);


  // UPDATING PRODUCTS TOP MOST FIELDS
  let handleEditChange = (e) => {
    let { name, value } = e.target

    setEditData((prev) => {

      let updated = {
        ...prev,
        [name]: value
      }

      let dp;
      let price = name == "price" ? value : updated.price;
      let discount_price = name == "discount_price" ? value : updated.discount_price;


      if (Number(price) > 0 && discount_price > 0 && discount_price < price) {
        updated.discount_percent = (discount_price / price) * 100
      }
      else {
        updated.discount_price = "";
      }

      return updated
    })

  }

  // HANDLING IMAGES INPUT FROM FILELIST
  let handleFiles = (e) => {

    let files = Array.from(e.target.files);

    setEditData(prev => {
      let existing = prev.images || [];
      if (existing.length + files.length > 4) {
        alert("Maximum 4 images allowed");
        return prev;
      }

      let mapped = files.map(file => ({
        file, // for upload later
        image: URL.createObjectURL(file), // for preview
        is_new:true
      }));

      return {
        ...prev,
        images: [...existing, ...mapped]
      };
    });
    e.target.value = ""
    fileRef.current = null;
  };

  // REMOVE IMAGE// REMOVE IMAGE
  let removeImage = (remove_id,rmIndex) => {

      setEditData(prev => {
        let images = [...prev.images];
        let img = images[rmIndex];
      
        // Revoke blob URL ONLY for newly added images
        if (img?.is_new && img.image?.startsWith("blob:")) {
          URL.revokeObjectURL(img.image);
        }
      
        // Prepare delete_images array safely
        let delete_images = [...(prev.delete_images || [])];
      
        // If image already exists in backend, mark it for deletion
        if (!img?.is_new && img?.id && !delete_images.includes(remove_id)) {
          delete_images.push(remove_id);
        }
        
        console.log("Push Delete Id:", remove_id)

        // Remove image from UI list
        images.splice(rmIndex, 1);
       
        // Return updated state
        return {
          ...prev,
          images,
          delete_images
        };
      });
    };
  
    
   
 

   let calcDiscount=(price,dp)=>{
    return ((dp/price)*100)
  }

  // API PATCH REQ FOR PRODUCT UPDATE
  let productUpdate = (id) => {
    console.log("Disocunt :",calcDiscount(editData.price,editData.discount_price))
    let sendToForm = new FormData;

    sendToForm.append("name", editData.name)
    sendToForm.append("price", editData.price)
    sendToForm.append("discount_percent", editData.discount_percent || '0.00')
    sendToForm.append("discount_price", editData.discount_price || '0.00') 
    sendToForm.append("category", editData.category)

    editData?.images.forEach(image => {
      if(image.is_new){
        sendToForm.append("images", image.file)
      }
      else{

      }
    });

    try {
      axios.patch(`http://127.0.0.1:8000/api/products/${id}/`, sendToForm)
        .then(res =>{
           console.log("Created:",res.data) 

           setEditData(prev => ({ ...prev }));
           setShowEdit(false)
           navigate("/adminDashboard/products/list");  
       }).catch(error => (console.log("Failed:",error.response.data)))

    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className="editOverlay">
      <div className="editContainer">

        {/* Header */}
        <div className="editHeader">
          <h2 className="editTitle">Edit Product</h2>
          <button className="closeBtn">
            <X size={24} onClick={() => close()} />
          </button>
        </div>

        {/* Content */}
        <div className="editContent">

          {/* LEFT & RIGHT GRID */}
          <div className="editGrid">

            {/* ✓ Product Details */}
            <div className="productDetails">
              <h3 className="sectionTitle">Product Details</h3>
              <h2 className="productCode"><span>Product Code : </span> <span>{editData?.product_code?.slice(0, editData?.product_code.length)}</span></h2>

              <div className="formGroup">
                <label>Product Name <span>*</span></label>
                <input type="text" value={editData?.name} name="name" className="inputField" placeholder="Enter product name" onChange={handleEditChange} />
              </div>

              <div className="formTwoCols">
                <div className="formGroup">
                  <label>Price <span>*</span></label>
                  <input type="number" value={editData?.price} name="price" className="inputField" placeholder="0.00" onChange={handleEditChange} />
                </div>

                <div className="formGroup">
                  <label>Discount Price (optional)</label>
                  <input type="number" value={editData?.discountPrice} name="discount_price" className="inputField" placeholder="0.00" onChange={handleEditChange} />
                </div>
              </div>

              <div className="formGroup">
                <label>Brand</label>
                <input type="text" className="inputField" value={editData?.brand} placeholder="Brand name" onChange={handleEditChange} />
              </div>

              <div className="formGroup">
                <label>Category <span>*</span></label>
                <select value={editData.category} name="category" onChange={handleEditChange}   
                  className="inputField">
                  <option value="mens">Mens</option>
                  <option value="womens">Womens</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </div>

          </div>

          {/* ✓ Images Section (Full Width) */}
          <div className="imagesSection">
            <h3 className="sectionTitle">Product Images <span>*</span></h3>

            <div className="imagesGrid">

              {/* Upload */}
              <label onClick={() => fileRef.current.click()} className="uploadBox">
                <input ref={fileRef.current} multiple accept="image/*" type="file" onChange={handleFiles} className="fileInput" style={{
                  display: "none",
                  opacity: editData?.images?.length >= 4 ? 0.5 : 1,
                  pointerEvents: editData?.images?.length >= 4 ? "none" : "auto"
                }} />
                <Upload size={32} className="uploadIcon" />
                <span>Upload Image</span>
                
              </label>

              {/* Preview Item */}
              <div className="imageItem">
                {editData?.images.length > 0 ? editData?.images?.map((el, i) => (
                  <div className="keepImage" key={i}>
                    <img src={el.image} alt="product_img" className="previewImg" />
                    <button onClick={() => removeImage(el.id,i)} className="deleteImageBtn">
                      <X size={16} />
                    </button>
                  </div>
                )) : "No images for this product to show"}
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="editFooter">
          <button className="cancelBtn">Cancel</button>
          <button onClick={() => productUpdate(editData.id)} className="primaryBtn">
            <Save size={18} /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}


