import React, { useState } from 'react'
import '../assets/style/shopping.css'
import { Search,ShoppingCart } from "lucide-react"
import SideFilterBar from '../layout/SideFilterBar'

// images
import p_1 from '../assets/images/darkbluesweatthisrt.jpg'

function ShoppingWindow() {

  let [isBarOpen,setBarOpen] = useState(true)
  return (
    <div className='category'>

      <div>
        <div className='searchBox'>
          <input type="search" placeholder='Search Items' />
          <button><Search color='gray'/></button>
        </div>
      </div>

      <div className="shoppingBlock">
      
        {/* LEFT FILTER PANEL */}
        <SideFilterBar 
        setBarOpen={setBarOpen}
        isBarOpen={isBarOpen}
        />

        {/* RIGHT PRODUCT DISPLAY */}
        <main className="productItems">
          <div className="productsGrid">
            {/* product card */}
            <div className='productCard'>
              <div className='productOverview'>
                <div className='productTop'>
                  <img src={p_1} alt="" />

                  <div className="addedItem">1</div>

                   {/* <span> IN STOCK</span> */}

                  <div className='cartIcon'>
                    <ShoppingCart/>
                  </div>
                </div>
                <div className='productBottom'>
                    <p>Rs 1500</p>
                    <h1>Super Limited Edition Ultra Coziest…</h1>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>

     

     

    </div>
  )
}

export default ShoppingWindow