

// Product Basic Infomation

// css
import '../../../assets/style/add_productbasic.css'

// states
import { useRef,useState,useEffect } from "react"
import localforage from 'localforage'
// Icons
import { Upload,X ,Check} from 'lucide-react'

// global variable
let MAX_IMAGES = 4  // at max 4 images can be uploaded only 

// ---------------------- PRODUCT BASIC -------------------
export function ProductBasic({formData,setFormData,next,prErrors,setErrors}) {

  let [productImages,setImages] = useState([])
  let fileInputRef = useRef(null)



  let handleFiles=(e)=>{
    let incomingFile = Array.from(e.target.files)

    if(productImages.length + incomingFile.length > MAX_IMAGES ){
       alert(`You can upload only up to ${MAX_IMAGES} images.`)
       return
    }

    let mappedFile = incomingFile.map((file)=>({
      file,
      url:URL.createObjectURL(file)

    }))
  
   setImages((prev) => {
      let updated = [...prev, ...mappedFile]
      setFormData((p) => ({ ...p, images: updated }))
      return updated
   })
  }

  // Grab Files From Input
  let handleFilePicker=()=>{
    fileInputRef.current.click()
  }
  

  // Remove Image
  let removeImage = (index) => {

    setFormData((prev)=>{
      let updatedImage = formData.images.filter((_,image) => image!=index)
      let newForm = {...prev,images:updatedImage}
      localforage.setItem("productDraft",newForm)
      return newForm
    })
  }

  // handle Input 
  let handleChange=(e)=>{
    let {name,value} = e.target
    setFormData((prev)=>({...prev,[name]:value}))
  }

  // Validation before going to next step
  let handleNext=()=>{
    let hasErrors = false

    let newErrors = {}

    if(!formData.product_name.trim()){
      newErrors.product_name="Product name cannot be empty"
      hasErrors=true
    } 
    else if(formData.product_name.length < 6 ){
      newErrors.product_name="Product name should be in between 6-50 characters"
      hasErrors=true
    }
    else if(formData.product_name.length > 50){
      newErrors.product_name="Product name cannot exceed maximum character(50)"
      hasErrors=true
    }
    else if (!/^[A-Za-z0-9 ]+$/.test(formData.product_name.trim())) {
     newErrors.product_name = "Product name can contain only letters, numbers, and spaces"
     hasErrors=true
    }

    if(hasErrors){
      setErrors((p)=>({
        ...p,
        product_name:newErrors.product_name
      }))
     
      return 
    }

    setErrors((p)=>({...p,product_name:""}))
    next()

  }

  return (
    <div className="basicProductWrapper">

      {/* LEFT: IMAGE UPLOAD */}
      <div className="productImageSection">

        <h2>Product Images</h2>
        <p className="subtext">
          Upload up to <strong>4 images</strong>.  
          The first image will be used as the thumbnail.
        </p>

        {/* file input initally hidden triggers by a function */}
        <input type="file" ref={fileInputRef} multiple accept="image/*" onChange={handleFiles} style={{ display: "none" }} />

        <div onClick={handleFilePicker} className={`imageUploadBox ${productImages.length == 4 ? "uploadExceed":"" }`}>
           {productImages.length == 4 ? <Check size={32}/>:  <Upload size={32} />}
          <p >{productImages.length == 4 ? "Upload Limit Exceed":"Click or drag files here"}</p>
        </div>
       
        {/* Preview Grid */}
      <div className="previewContainer">
        {formData.images.map((img, index) => (
          <div className="previewImg" key={index}>
            
            <img src={img.url} alt="preview" />

            <span className="removeBtn" onClick={() => removeImage(index)}>
              <X size={16} />
            </span>

          </div>
        ))}
      </div>

      </div>

      {/* RIGHT: FORM FIELDS */}
      <div className="productFormSection">

        <h2>Basic Information</h2>

        <div className="formGroup">
          <label>Product Name</label>
          <input type="text" placeholder="Enter product name" name="product_name" value={formData.product_name} onChange={handleChange} />
          {prErrors.product_name !== "" ? <p className='stepErrors'>{prErrors.product_name}</p>:""}
        </div>

        <div className="formGroup">
          <label>Category</label>
          <select name='product_category' value={formData.product_category || "mens"} onChange={handleChange}>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="formGroup">
          <label>Brand</label>
          <input type="text" placeholder="Brand name (optional)" name='brand' value={formData.brand} onChange={handleChange} />
        </div>

        <div>
          <button className="nextBtn" onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}




// ---------------------- PRODUCT ADVANCE -------------------
import { ToggleLeft, ToggleRight } from "lucide-react"

export function ProductAdvance({formData,setFormData,next,prev,setErrors,prErrors}){
  
 
  let thumbnail = formData.images?.[0]?.url


  let handleNext=()=>{

    let discount = formData.discount_percent           // discount percent
    let productPrice = formData.price                 // initial price before any deduction
    let discountedPrice = formData.discount_price   // price after deducting discount


    if(discountedPrice<0) return alert(`discount percentage cannot be less than ${0}`)
    if(discountedPrice.length > 3) return alert(`disocunt percentage cannot exceed '${3}'digits`)
  
    if(productPrice < 0) return alert("price cannot be in negative")  
    if(productPrice.length > 5) return alert(`price cannot exceed ${5} digits`)

    
    if(!discount){
      discount = (((productPrice - discountedPrice) / productPrice) * 100).toFixed(2)

      setFormData((prev)=>({
      ...prev,
      price:productPrice,
      discount_price:discountedPrice,
      discount_percent:discount
    }))

    console.log("%cDicountSet :","color:beige",discount)
    }
    

    discountedPrice = productPrice - ( productPrice * (discount/100))
    
    setFormData((prev)=>({
      ...prev,
      price:productPrice,
      discount_price:discountedPrice,
      discount_percent:discount
    }))

    console.log("%cDiscounted Price:", "color: green font-weight: bold", discountedPrice)
    console.log("%cProduct Price:", "color: blue font-weight: bold", formData.price)
    console.log("%cDiscount %:", "color: red font-weight: bold", discount)
    next()
  }

  

  return (
    <div className="advanceWrapperPro">

      {/* LEFT SECTION (Thumbnail + Quick Info) */}
      <div className="advanceLeft">

        <div className="thumbCard">
          {thumbnail ? (
            <img src={thumbnail} alt="thumbnail" className="thumbImg" />
          ) : (
            <div className="thumbPlaceholder">No Image</div>
          )}
          <p className="thumbLabel">Product Thumbnail</p>
        </div>

        <div className="quickInfo">
          <p><strong>Name:</strong> {formData.product_name || "Not provided"}</p>
          <p><strong>Brand:</strong> {formData.brand || "Not provided"}</p>
          <p><strong>Category:</strong> {formData.product_category || "Not selected"}</p>
        </div>

      </div>

      {/* RIGHT SECTION (Form Fields) */}
      <div className="advanceRight">

        {/* Description */}
        <div className="formGroupPro">
          <label>Product Description</label>
          <textarea
            placeholder="Write detailed information about the product..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Pricing */}
        <div className="priceRow">

          <div className="formGroupPro">
            <label>Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              placeholder="Enter product price"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div className="formGroupPro">
            <label>Discount Price (Optional)</label>
            <input
              type="number"
              value={formData.discount_price}
              placeholder="Enter discounted price"
              onChange={(e) =>
                setFormData({ ...formData, discount_price: e.target.value })
              }
            />
          </div>

          <div className="formGroupPro">
            <label>Price Off%(Optional)</label>
            <input
              type="number"
              value={formData.discount_percent}
              placeholder="Enter discounted price"
              onChange={(e) =>
                setFormData({ ...formData, discount_percent: e.target.value })
              }
            />
          </div>


        </div>

        {/* Product Status */}
        <div className="statusCard">
          <label>Status</label>
          <div
            className={`statusTogglePro ${formData.is_active ? "active" : ""}`}
            onClick={() =>
              setFormData({ ...formData, is_active: !formData.is_active })
            }
          >
            {formData.is_active ? (
              <>
                <ToggleRight size={22} /> <span>Active</span>
              </>
            ) : (
              <>
                <ToggleLeft size={22} /> <span>Inactive</span>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="stepButtonsPro">
        <button onClick={prev} className="backBtnPro">Back</button>
        <button onClick={handleNext} className="nextBtnPro">Next</button>
      </div>

    </div>
  )
}



// Product Category Men Female Or Kid
import { Plus, Trash2,Pencil } from "lucide-react"

let SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"]

export function ProductVariants({ formData, setFormData, finish, prev }) {
  
  let [variant, setVariant] = useState({
    size: "M",
    color: "",
    stock: "",
    editIndex: null    
  })

  console.log("%cFormData:","color:red",formData.product_name)
  // Add Variant
  let addVariant = () => {
    if (!variant.color.trim()) return alert("Color cannot be empty")
    if (variant.stock === "" || variant.stock < 0)
      return alert("Stock must be a positive number")

    if(variant.editIndex != null){
    
      let updated = [...formData.varients]

      updated[variant.editIndex] = {
        size:variant.size,
        color:variant.color,
        stock:variant.stock, 
      }
      setFormData((p)=>({
        ...p,
        variants:updated
      }))

      setVariant({size:"M",color:"",stock:"",editIndex:null})
      return 
    }


    let exists = formData.variants.some(
      (v) =>
        v.size === variant.size &&
        v.color.toLowerCase() === variant.color.toLowerCase()
    )
    if (exists) return alert("This variant already exists!")

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, ...variant]
    }))

    setVariant({ size: "M", color: "", stock: "",editIndex:null })
  }

  let editVariant = (i) => {
    let v = formData.variants[i]
    setVariant({
      size: v.size,
      color: v.color,
      stock: v.stock,
      editIndex: i
    })
  }

  let removeVariant = (index) => {
    let updated = formData.variants.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, variants:updated }))
  }

  return (
    <div className="variantWrapper">

      <h2 className="variantTitle">Product Variants</h2>
      <p className="variantSub">Add size, color and stock combinations for this product.</p>

      {/* Input Card */}
      <div className="variantInputCard">

        <div className="inputGroupVar">
          <label>Size</label>
          <select
            value={variant.size}
            onChange={(e) => setVariant({ ...variant, size: e.target.value })}
          >
            {SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="inputGroupVar">
          <label>Color</label>
          <input
            type="text"
            value={variant.color}
            placeholder="Example: Black"
            onChange={(e) => setVariant({ ...variant, color: e.target.value })}
          />
        </div>

        <div className="inputGroupVar">
          <label>Stock</label>
          <input
            type="number"
            value={variant.stock}
            placeholder="Example: 10"
            onChange={(e) => setVariant({ ...variant, stock: e.target.value })}
          />
        </div>

        <button className="addVariantBtnPro" onClick={addVariant}>
          {variant.editIndex !=null ?  <><Pencil/> Update</> : <><Plus size={18} /> Add</>}
        </button>
      </div>

      {/* Variant Cards Grid */}
     <div className="variantGridPro">

  {formData.variants.length === 0 && (
    <p className="emptyMsgVar">No variants added yet.</p>
  )}

  {formData.variants.map((v, i) => (
    <div className="variantCardPro" key={i}>

      {/* TOP ROW: Size + Trash */}
      <div className="topRowVar">
        <span className="variantSize">{v.size}</span>

        <Trash2
          className="deleteVariantBtn"
          onClick={() => removeVariant(i)}
        />
      </div>

      {/* BOTTOM ROW: Color + Stock + Pencil */}
      <div className="bottomRowVar">

        <div className="variantInfo">
          <p className='varientProduct'>{formData.product_name}</p>
          <p className="variantColor">
            Color: <strong>{v.color}</strong>
          </p>
          <p className="variantStock">
            Stock: <strong>{v.stock}</strong>
          </p>
        </div>

        <Pencil
          className="editVariantBtn"
          onClick={() => editVariant(i)}
        />

      </div>

    </div>
  ))}
</div>


      {/* Buttons */}
      <div className="stepButtonsPro">
        <button className="backBtnPro" onClick={prev}>Back</button>
        <button className="nextBtnPro" onClick={finish}>Finish</button>
      </div>
    </div>
  )
}
