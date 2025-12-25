import { useState, useRef, useEffect } from "react"
import axios from "axios"
import localforage from "localforage"
import { Globe, Save } from "lucide-react"

import "../../../assets/style/create_product.css"
import CreateLeft from "./CreateLeft"
import CreateRight from "./CreateRight"
import { useNavigate } from "react-router-dom"



let MAX_IMAGES = 4
let SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"]

export default function ProductCreate() {
  
  let fileRef = useRef(null)
  let navigate = useNavigate()
  let [form, setForm] = useState({
    name: "",
    brand: "",
    category: "mens",
    description: "",
    price: 0,
    discount_price: Number(0).toFixed(2),
    discount_percent: 0,
    tags: [],
    is_active: true,
    images: [],
    variants: [],
  })

  let [variant, setVariant] = useState({
    size: "M",
    color: "",
    stock: 0,
    editIndex: null,
  })

  let [tagInput, setTagInput] = useState("")


  // EFFECTS
  useEffect(()=>{
    async function loadDraft () {
       let draftForm = await localforage.getItem("draftForm")
       if(draftForm){ 
          setForm((prev)=>({...prev,...draftForm})) 
       } 
      }
    loadDraft()
  },[])

  useEffect(()=>{
    let t = setTimeout(()=>{
      localforage.setItem("draftForm",form)
    },1000)

    return () => clearTimeout(t)
  },[form])

  // IMAGE UPLOAD

  let handleFiles = (e) => {
    let files = Array.from(e.target.files)

    if (form.images.length + files.length > MAX_IMAGES)
      return alert("Maximum 4 images allowed")

    let mapped = files.map((image) => ({
      image,
      url: URL.createObjectURL(image),
    }))

    setForm((p) => ({ ...p, images: [...p.images, ...mapped] }))
  }

  let removeImage = (index) => {
    setForm((p) => ({
      ...p,
      images: p.images.filter((_, i) => i !== index),
    }))
  }


  // BASIC INPUT HANDLER

  let handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // PRICE & DISCOUNT AUTO CALC

  let updatePriceLogic = () => {
    let price = Number(form.price)
    let dp = Number(form.discount_price)
    let dpp = Number(form.discount_percent)

    if (price <= 0) return alert("Price cannot be zero")

    // If discount price given , calculate percent
    if (dp > 0) {
      if (dp >= price) return alert("Discount price must be less than price")

      let percent = (((price - dp) / price) * 100)
      setForm((p) => ({ ...p, discount_percent: percent }))
      return
    }

    // If percent given , calculate discount price
    if (dpp > 0) {
      if (dpp >= 100) return alert("Discount cannot be 100%")

      let newDP = price - (price * dpp) / 100
      setForm((p) => ({ ...p, discount_price: newDP.toFixed(2) }))
    }
  }

  // TAG HANDLING

  let handleAddTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput)) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  let handleRemoveTag = (index) => {
    let newTags = form.tags.filter((_, i) => i !== index)
    setForm({ ...form, tags: newTags })
  }


  // VARIANTS
 
  let saveVariant = () => {
    if (!variant.color.trim()) return alert("Color required")

    if (variant.stock === "" || variant.stock < 0)
      return alert("Stock must be positive")

    // EDIT MODE
    if (variant.editIndex !== null) {
      let updated = [...form.variants]
      updated[variant.editIndex] = {
        size: variant.size,
        color: variant.color,
        stock: variant.stock,
      }

      setForm((p) => ({ ...p, variants: updated }))
      setVariant({ size: "M", color: "", stock: 0, editIndex: null })
      return
    }

    // NEW VARIANT
    let exists = form.variants.some(
      (v) =>
        v.size === variant.size &&
        v.color.toLowerCase() === variant.color.toLowerCase()
    )

    if (exists) return alert("Variant already exists")

    setForm((p) => ({
      ...p,
      variants: [...p.variants, variant],
    }))

    setVariant({ size: "M", color: "", stock: 0, editIndex: null })
  }

  let removeVariant = (index) => {
    setForm((p) => ({
      ...p,
      variants: p.variants.filter((_, i) => i !== index),
    }))
  }

  let editVariant = (i) => {
    let v = form.variants[i]
    setVariant({
      size: v.size,
      color: v.color,
      stock: v.stock,
      editIndex: i,
    })
  }

  // SUBMIT
  let handleCreate = () => {
    let formToSend = new FormData()

    formToSend.append("name",form.name)
    formToSend.append("brand",form.brand)
    formToSend.append("category",form.category)
    formToSend.append("description",form.description)
    formToSend.append("price",form.price)
    formToSend.append("discount_price",form.discount_price)
    formToSend.append("discount_percent",Number(form.discount_percent).toFixed(2))
    formToSend.append("is_active",form.is_active)

    formToSend.append("variants",JSON.stringify(form.variants))
    
    form.images.forEach((file,_)=>{
      formToSend.append("images",file.image)
      console.log("Images appending to FormToSend",file.image)
    })

    axios.post(`http://127.0.0.1:8000/api/products/`,formToSend)
    .then((res)=>{
      console.log("%cPRODUCT SUCCESSFULLY CREATED","color:green",res.data)    
      // console.log(`Product created at database ${formToSend}`)
      navigate("/adminDashboard")
      localforage.clear()
    })
    .catch((error)=>console.log("%cPRODUCT FAILED : 'The Error is' :","color:red",error.response.data))


  }

  let handleSaveDraft = () => {
    alert("Product saved as draft")
  }

  return (
    <div className="admin-product-create">
      {/* HEADER */}
      <div className="create-header">
        <div className="header-title">
          <h1>Create New Product</h1>
          <p>Add a new product to your inventory</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleSaveDraft}>
            <Save size={18} />
            Save as Draft
          </button>
          <button className="btn-primary" onClick={handleCreate}>
            Publish Product
          </button>
        </div>
      </div>

      <div className="create-container">
        {/* LEFT PANEL — IMAGES & BASIC INFO */}
        <CreateLeft 
          form={form}
          fileRef={fileRef}
          MAX_IMAGES={MAX_IMAGES}

          handleFiles={handleFiles}
          removeImage={removeImage}
         
          handleInput={handleInput}

          tagInput={tagInput}
          setTagInput={setTagInput}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        
        />
        

        {/* RIGHT PANEL — PRICING & VARIANTS */}
        <div className="right-panel">
         <CreateRight 
          form={form}
          handleInput={handleInput} 
          updatePriceLogic={updatePriceLogic}

          SIZE_OPTIONS={SIZE_OPTIONS}
          variant={variant}
          setVariant={setVariant}
          saveVariant={saveVariant}
          editVariant ={editVariant}
          removeVariant={removeVariant}
         />

         
         

          {/* SETTINGS SECTION */}
          <div className="card">
            <div className="card-header">
              <h3><Globe size={20} /> Product Status</h3>
            </div>
            <div className="card-body">
              <div className="status-settings">
                <div className="status-toggle">
                  <div className="toggle-label">
                    <h4>Product Status</h4>
                    <p>Set product visibility on your store</p>
                  </div>
                  <div
                    className={`toggle-switch ${form.is_active ? "active" : ""}`}
                    onClick={() => setForm((p) => ({ ...p, is_active: !p.is_active }))}
                  >
                    <div className="toggle-handle"></div>
                    <span className="toggle-label-text">
                      {form.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="publish-info">
                  <p>
                    {form.is_active 
                      ? "This product will be visible to customers immediately."
                      : "This product will be hidden from customers."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}