import axios from "axios"
import { Plus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import "../../assets/style/get_list.css"
import SkeletonCard from "../../utils/Skeleton"

function ProductList() {
  let [productList, setProductList] = useState([])
  let [showEdit, setShowEdit] = useState(false)
  let [editData, setEditData] = useState({
    name: "",
    price: "",
    category: "",
    variants: [],
    images: []
  })


  let [editProduct, setEditProduct] = useState(null)
  let [loading, setLoading] = useState(true)
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
    return () => clearTimeout(t)
  }, [])



  let handleEdit = (item,code) => {
    if (!item.id) return
    try {
      setShowEdit(true)
      setEditData((pv) => ({
        ...pv,
        productCode:code,
        name: item.name,
        price: item.price,
        category: item.category,
        variants: item.variants.filter(v=>({...v})),
        images: item.images
      }))
    } catch (error) {
      console.log("Edit Product Functional Error :", error)
    }
  }


  let RemoveProduct = (id) => {
    console.log("ID", id)
    if (!id) return alert("Value of id is :", id)
    axios.delete(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => {
        console.log("DELETED PRODUCT", res.data)
        setTimeout(() => {
          setProductList((prev) => prev.filter((el) => el.id !== id))
        }, 300)
      })
      .catch((err) => console.log("Backend Error", err.response.data))
  }


  // close edit box
  let closeEdit = () => {
    setShowEdit(false)
  }

  return (
    <>
      <div className="listPageTitle">
        <p>Product List</p>
      </div>

      <div className="listBox">
        {loading ?
          <>
            {skeleton()}
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
                    {item.variants?.map(v => v.color).join(" | ")}
                  </p>

                  <p className="stock">
                    Stock: {item.variants?.reduce((sum, v) => sum + v.stock, 0)}
                  </p>

                  <p className="cat">Category: {item.category}</p>
                </div>


                {/* RIGHT - Buttons */}
                <div className="right">
                  <p className="editBtn" onClick={() => handleEdit(item,item.product_code)}>EDIT </p>

                  <p className="delBtn" onClick={() => RemoveProduct(item.id)}>DEL</p>
                </div>
              </div>
            ))}</>}
      </div>

      {/* Edit Form */}
      {showEdit && <EditProduct
        setShowEdit={setShowEdit}
        editData={editData}
        setEditData={setEditData}
        close={closeEdit}

      />}
    </>
  )
}

export default ProductList




/* =============================  */
/* EDIT PRODUCT LIST COMPONENT  */
/* ============================  */

import { Save, Upload, X } from 'lucide-react'

function EditProduct({ setShowEdit, editData, setEditData, close }) {

  let fileRef = useRef(null)

  let [isBtnActive, setBtnActive] = useState({
    addBtn: false,
  })

  let [images, setImages] = useState([{ image: " ", }])

  let [extraVariant, setExtraVariant] = useState({ size: "s", color: "", stock: 0 }) // extra variant object


  console.log("Data coming for editing :", editData)



  // UPDATING PRODUCTS TOP MOST FIELDS
  let handleEditChange = (e) => {

    let { name, value } = e.target

    setEditData((prev) => ({
      ...prev,
      [name]: value
    }))

  }
  // ADD DRAFTED VARIANTS INTO THE VARIANTS 

   let addExtraVariant = () => {
    setEditData(prev => {
      let exists = prev.variants.some(v =>
        v.size === extraVariant.size &&
        v.color.trim().toLowerCase() === extraVariant.color.trim().toLowerCase() &&
        Number(v.stock) === Number(extraVariant.stock)
      )

      if (exists) {
        return alert("Variant already exists in current product")
      }

      return {
        ...prev,
        variants: [...prev.variants, { ...extraVariant }]
      }
    })

    setExtraVariant({ size: "s", color: "", stock: 0 })
  }


  // DRAFT EXTRA VARIANTS 
  let DraftExtraVariant = (e) => {
    let { name, value } = e.target

     setExtraVariant((prev) => ({
      ...prev,
      [name]: value
    }))
   
  }

  // UPDATING VARIANTS 
  function editVariantsChange(index, e) {
    let { name, value } = e.target // name and their respective values

    setEditData((prev) => {
      let updated = [...prev.variants]  // copy existing variants array 

      // update the specific variant
      updated[index] = {
        ...updated[index],
        [name]: value
      }
      // returns updated array variant
      return {
        ...prev,
        variants: updated
      }
    })
  }
  // HANDLING IMAGES INPUT FROM FILELIST
  let handleFiles = (e) => {
    let files = Array.from(e.target.files)

    if (images.length + files.length > 4) return alert("maximum 4 images can be allowed")

    let mapped = files.map((file) => ({
      file,
      thumbnail: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...mapped])
  }

  // DELETE EXISTING VARIANT 
  let handleRemoveVariant = (delIndex) => {
    let updatedVariants;
    updatedVariants = editData.variants.filter((_, targetIndex) => (targetIndex !== delIndex))

    setEditData(prev => ({
      ...prev,
      variants: updatedVariants
    }))
  }


  // PATCH REQUEST FOR VARIANTS
  let updateVariants = (productCode) => {
    let updateVariants = editData?.variants

    try {
      if (!id) return alert("product id for variants not applied")

      axios.patch(`http://127.0.0.1:8000/api/variants/${productCode}`, updateVariants)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error.response.data))

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

              <div className="formGroup">
                <label>Product Name *</label>
                <input type="text" value={editData?.name} name="name" className="inputField" placeholder="Enter product name" onChange={handleEditChange} />
              </div>

              <div className="formTwoCols">
                <div className="formGroup">
                  <label>Price *</label>
                  <input type="number" value={editData?.price} name="price" className="inputField" placeholder="0.00" onChange={handleEditChange} />
                </div>

                <div className="formGroup">
                  <label>Discount Price</label>
                  <input type="number" value={editData?.discountPrice} name="discount_price" className="inputField" placeholder="0.00" onChange={handleEditChange} />
                </div>
              </div>

              <div className="formGroup">
                <label>Brand</label>
                <input type="text" className="inputField" value={editData?.brand} placeholder="Brand name" onChange={handleEditChange} />
              </div>

              <div className="formGroup">
                <label>Category *</label>
                <select value={editData.category} name="category" onChange={handleEditChange} className="inputField">
                  <option value="mens">Mens</option>
                  <option value="womens">Womens</option>
                  <option value="kids">Kids</option>
                </select>
              </div>
            </div>

            {/* ✓ Variants */}
            <div className="variantsBox">
              <h3 className="sectionTitle">Variants *</h3>

              {/* Add Variant */}
              <div className="variantAddBox">
                <div className="variantListEdit">
                  {editData?.variants?.map((variant, index) => (
                    <div className="variantEditRow" key={index}>

                      {/* SIZE */}
                      <select name="size" value={variant.size} onChange={(e) => editVariantsChange(index, e)} >
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                        <option value="xxl">XXL</option>
                      </select>

                      {/* COLOR */}
                      <input type="text" name="color" value={variant.color} onChange={(e) => editVariantsChange(index, e)} />

                      {/* STOCK */}
                      <input type="number" name="stock" value={variant.stock} onChange={(e) => editVariantsChange(index, e)} />

                      {/* DELETE BUTTON */}
                      <button onClick={() => handleRemoveVariant(index)}>Remove</button>
                    </div>
                  ))}
                </div>
                {/* ADD MORE VARIANTS */}
                <div className="variantListBox">
                  <div className="variantAddRow">
                    <select value={extraVariant.size} name="size" onChange={DraftExtraVariant}>
                      <option value="s">S</option>
                      <option value="l">L</option>
                      <option value="m">M</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                    </select>
                  </div>
                  <div className="variantAddRow">
                    <input value={extraVariant.color} name="color" onChange={DraftExtraVariant} type="text" placeholder="eg:Black,Green,Red" />
                  </div>
                  <div className="variantAddRow">
                    <input value={extraVariant.stock} name="stock" onChange={DraftExtraVariant} type="number" placeholder="eg:Quantity(200,300,1200)" />
                  </div>

                  <div className="variantAddRow extraAddVariantBtn" 
                        style = {{ 
                          pointerEvents: isBtnActive.addBtn ? "none":"auto", 
                          opacity:isBtnActive.addBtn ? 0.5 : 1 
                        }} 
                        onClick={addExtraVariant} >Add</div>
                </div>

                <button onClick={() => updateVariants(editData.id,editData.productCode)} className="primaryBtn fullBtn">
                  <Plus size={16} /> Update Variants
                </button>
              </div>

            </div>
          </div>

          {/* ✓ Images Section (Full Width) */}
          <div className="imagesSection">
            <h3 className="sectionTitle">Product Images *</h3>

            <div className="imagesGrid">

              {/* Upload */}
              <label onClick={() => fileRef.current.click()} className="uploadBox">
                <input ref={fileRef} multiple accept="image/*" type="file" onChange={handleFiles} className="fileInput" style={{
                  display: "none",
                  opacity: images.length >= 4 ? 0.5 : 1,
                  pointerEvents: images.length >= 4 ? "none" : "auto"
                }} />
                <Upload size={32} className="uploadIcon" />
                <span>Upload Image</span>
              </label>

              {/* Preview Item */}
              <div className="imageItem">
                {editData?.images.length > 0 ? editData?.images?.map((el, i) => (
                  <div className="keepImage" key={i}>
                    <img src={el?.image} alt="product_img" className="previewImg" />
                    <button className="deleteImageBtn">
                      <X size={16} />
                    </button>
                  </div>
                )) : ""}
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="editFooter">
          <button className="cancelBtn">Cancel</button>
          <button className="primaryBtn">
            <Save size={18} /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}


