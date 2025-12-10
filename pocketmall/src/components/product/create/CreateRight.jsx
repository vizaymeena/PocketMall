import React from 'react'
import { Plus, Pencil, Trash2, Percent,  IndianRupee} from "lucide-react"
function CreateRight({
    form,
    handleInput,
    SIZE_OPTIONS,
    updatePriceLogic,
    variant,
    setVariant,
    editVariant,
    saveVariant,
    removeVariant}) {
  return (
    <>
     {/* PRICING SECTION */}
          <div className="card">
            <div className="card-header">
              <h3><IndianRupee size={20} /> Pricing</h3>
            </div>
            <div className="card-body">
              <div className="price-grid">
                <div className="form-group">
                  <label>Base Price *</label>
                  <div className="input-with-icon">
                    <IndianRupee size={18} />
                    <input name="price" type="number" value={form.price} onBlur={updatePriceLogic} onChange={handleInput} placeholder="0.00" min="0" step="0.01" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Discount Price</label>
                  <div className="input-with-icon">
                    <IndianRupee size={18} />
                    <input name="discount_price" type="number" value={form.discount_price} 
                    onBlur={updatePriceLogic} onChange={handleInput} placeholder="0.00" min="0" step="0.01" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Discount %</label>
                  <div className="input-with-icon">
                    <Percent size={18} />
                    <input name="discount_percent" type="number" value={form.discount_percent} 
                    onBlur={updatePriceLogic} onChange={handleInput} placeholder="0" min="0" max="100" />
                  </div>
                </div>

                {form.price && form.discount_price && (
                  <div className="price-summary">
                    <div className="original-price">Rs.{form.price}</div>
                    <div className="discount-price">Rs.{form.discount_price}</div>
                    <div className="savings">
                      You save: Rs.{(form.price - form.discount_price).toFixed(2)} 
                       ({form.discount_percent}%)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

         {/* VARIANTS SECTION */}
           <div className="card">
            <div className="card-header">
              <h3>Product Variants</h3>
              <span className="card-subtitle">Add size, color, and stock variations</span>
            </div>
            <div className="card-body">
              <div className="variant-inputs">
                <div className="form-group">
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

                <div className="form-group">
                  <label>Color</label>
                  <input placeholder="e.g., Red, Blue, Black" value={variant.color} onChange={(e) => setVariant({ ...variant, color: e.target.value })} />
                </div>

                <div className="form-group">
                  <label>Stock</label>
                  <input placeholder="Quantity" type="number" value={variant.stock} onChange={(e) => setVariant({ ...variant, stock: e.target.value })} min="0" />
                </div>

                <div className="form-group">
                  <label>&nbsp;</label>
                  <button onClick={saveVariant} className="variant-add-btn">
                    {variant.editIndex !== null ? (
                      <>
                        <Pencil size={16} />
                        Update 
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Add 
                      </>
                    )}
                  </button>
                </div>
              </div>

              {form.variants.length > 0 && (
                <div className="variants-table">
                  <div className="table-header">
                    <span>Size</span>
                    <span>Color</span>
                    <span>Stock</span>
                    <span>Actions</span>
                  </div>

                  <div className="table-body">
                    {form.variants.map((v, i) => (
                      <div className="table-row" key={i}>
                        <span className="variant-size">{v.size}</span>
                        <span className="variant-color">
                          <span className="color-badge">{v.color}</span>
                        </span>
                        <span className="variant-stock">
                          <span className={`stock-badge ${v.stock <= 10 ? 'low' : v.stock <= 50 ? 'medium' : 'high'}`}>
                            {v.stock} units
                          </span>
                        </span>
                        <div className="variant-actions">
                          <button className="icon-btn edit" onClick={() => editVariant(i)}>
                            <Pencil size={16} />
                          </button>
                          <button className="icon-btn delete" onClick={() => removeVariant(i)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
    </>
  )
}

export default CreateRight