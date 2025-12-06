

// Product Basic Infomation

// css
import '../../../assets/style/add_productbasic.css'

// states
import { useRef,useState } from "react";

// Icons
import { Upload,X ,Check} from 'lucide-react'

// global variable
const MAX_IMAGES = 4  // at max 4 images can be uploaded only 

export function ProductBasic({setStep}) {

  let [productImages,setImages] = useState([])
  let fileInputRef = useRef(null)

  let handleFiles=(e)=>{
    const incomingFile = Array.from(e.target.files)

    if(productImages.length + incomingFile.length > MAX_IMAGES ){
       alert(`You can upload only up to ${MAX_IMAGES} images.`)
       return
    }

    let mappedFile = incomingFile.map((file)=>({
      file,
      url:URL.createObjectURL(file)

    }))
     setImages((prev) => [...prev, ...mappedFile]);  // FIXED!
  }

  console.log("product images length:",productImages.length)

  console.table("product images Array TAble:",productImages)


  let handleFilePicker=()=>{
    fileInputRef.current.click()
  }
  
  let removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };



  return (
    <div className="basicProductWrapper">

      {/* LEFT: IMAGE UPLOAD */}
      <div className="productImageSection">

        <h2>Product Images</h2>
        <p className="subtext">
          Upload up to <strong>8 images</strong>.  
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
        {productImages.map((img, index) => (
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
          <input type="text" placeholder="Enter product name" />
        </div>

        <div className="formGroup">
          <label>Category</label>
          <select>
            <option value="">Select category</option>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="formGroup">
          <label>Brand</label>
          <input type="text" placeholder="Brand name (optional)" />
        </div>

        <div>
          <button className="nextBtn" onClick={()=>setStep(1)}>Next</button>
        </div>
      </div>
    </div>
  );
}


// Product Price And Discount
export function ProductDetails(){
  return(
    <>
    
    </>
  )
}

// Product Category Men Female Or Kid
export function Varients(){
  return(
    <>
    
    </>
  )
}
