import React, { useRef } from 'react'
import { Upload,Package,Hash,Tag } from 'lucide-react'
function CreateLeft({handleFiles,fileRef,form,MAX_IMAGES,handleInput,tagInput,setTagInput,handleAddTag,removeImage}) {
   
  return (
    
    <div className="left-panel">
          {/* IMAGES SECTION */}
          <div className="card">
            <div className="card-header">
              <h3><Upload size={20} /> Product Images</h3>
              <span className="card-subtitle">Upload up to 4 images. First image will be used as thumbnail.</span>
            </div>
            <div className="card-body">
              <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: "none" }} onChange={handleFiles}/>

              <div
                className={`upload-area ${form.images.length >= MAX_IMAGES ? "disabled" : ""}`}
                onClick={() => fileRef.current.click()}
              >
                <div className="upload-icon">
                  <Upload size={48} />
                </div>
                <div className="upload-content">
                  <h4>Drop files here or click to upload</h4>
                  <p>Upload product images (PNG, JPG, WebP up to 5MB each)</p>
                </div>
              </div>

              {form.images.length > 0 && (
                <div className="preview-section">
                  <div className="preview-header">
                    <span>Uploaded Images ({form.images.length}/{MAX_IMAGES})</span>
                  </div>
                  <div className="preview-grid">
                    {form.images.map((img, i) => (
                      <div className="preview-item" key={i}>
                        <div className="preview-image">
                          <img src={img.url} alt="preview" />
                          <div className="preview-overlay">
                            <span>{i === 0 ? "Thumbnail" : `Image ${i + 1}`}</span>
                          </div>
                        </div>
                        <button className="remove-btn" onClick={() => removeImage(i)}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DESCRIPTION SECTION */}
          <div className="card">
            <div className="card-header">
              <h3>Product Description</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Product Name *</label>
                <div className="input-with-icon">
                  <Package size={18} />
                  <input name="name" value={form.name} onChange={handleInput}placeholder="Enter product name" />
                </div>
              </div>

              <div className="form-group">
                <label>Brand *</label>
                <div className="input-with-icon">
                  <Hash size={18} />
                  <input name="brand" value={form.brand} onChange={handleInput}placeholder="Enter brand name"  />
                </div>
              </div>

              <div className="form-group">
                <label>Category *</label>
                <div className="select-wrapper">
                  <select name="category" value={form.category} onChange={handleInput}>
                    <option value="mens">Men's Fashion</option>
                    <option value="womens">Women's Fashion</option>
                    <option value="kids">Kids & Babies</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home & Living</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea name="description" value={form.description} onChange={handleInput} placeholder="Describe your product in detail..." rows={6} />
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tags-container">
                  <div className="tags-input">
                    <Tag size={18} />
                    <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTag()} placeholder="Add tags and press Enter" />
                    <button className="tag-add-btn" onClick={handleAddTag}>+ Add</button>
                  </div>
                  {form.tags.length > 0 && (
                    <div className="tags-list">
                      {form.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                          <button onClick={() => handleRemoveTag(index)}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

  )
}

export default CreateLeft