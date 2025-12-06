import  { useRef, useState } from 'react'

import '../../assets/style/shopping.css'
import { Search,ShoppingCart,IndianRupee  } from "lucide-react"

// gsap
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
// images
import p_1 from '../../assets/images/creamsweatshirt.jpg'

function ShoppingWindow() {

  let [isBarOpen,setBarOpen] = useState(false)
  let [loading,setLoading]=useState(false)

  let buyIconRefs = useRef([])
  let addedItemRef = useRef([])
  let navigate = useNavigate()

  let listOfProducts = [
    {name:"Super Limited Edition Ultra Coziestâ€¦",image:p_1,price:1200},
    {name:"Super Limited Edition Ultra Coziestâ€¦",image:p_1,price:1200},
    {name:"Super Limited Edition Ultra Coziestâ€¦",image:p_1,price:1200},
    {name:"Super Limited Edition Ultra Coziestâ€¦",image:p_1,price:1200},
    {name:"Super Limited Edition Ultra Coziestâ€¦",image:p_1,price:1200},
  ]

  // Add to Cart Icon animation function
 let animateAddItem = (index) => {
      gsap.fromTo(addedItemRef.current[index],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
      )
      gsap.to(addedItemRef.current[index],{
        y:0,
        opacity:0,
        duration:.3,
        delay:1
      })
  }

  // Buy Now button Logic 
  let buyNow=(product,idx)=>{
    setLoading(true)

    // animation on ruppe icon 
    let icon = buyIconRefs.current[idx]
    gsap.fromTo(icon,
      { y: 0, rotation: 0, scale: 1 },
      { 
        y: -10,
        duration: 0.12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 6 
      }
    )

    // Go to product detail page
    setTimeout(() => {
     if(loading){
       navigate('/buyNow',{
        state:{
          item:product
        }
      })
      setLoading(false)
     }
     else{
      console.log("buy now icon not working as intended")
     }
    }, 1500)

  }



  return (
    <div className='category'>
      <div>
        <div className='searchBox'>
          <input type="search" placeholder='Search Items' />
          <button><Search color='white'/></button>
        </div>
      </div>

      <div className="shoppingBlock">
      
        {/* LEFT FILTER PANEL */}
       
        {/* RIGHT PRODUCT DISPLAY */}
        <main className="productItems">
          <div className="productsGrid">
            {/* product card */}
             {listOfProducts.length > 0 ? (
              listOfProducts.map((el,index)=>{ return(
                 <div key={index} className='productCard'>
                   <div className='productOverview'>
                  <div className='productTop'>
                    <img src={el.image} alt="" />

                    <div ref={el=>addedItemRef.current[index]=el} className="addedItem">1</div>
                     {/* <span> IN STOCK</span> */}

                    <div 
                      ref={el => buyIconRefs.current[index] = el}
                      onClick={()=>buyNow(el,index)} 
                      className='buynow'>
                      <IndianRupee/>
                    </div>
                    <div onClick={() => animateAddItem(index)} className='cartIcon'>
                      <ShoppingCart/>
                    </div>
                  </div>
                  <div className='productBottom'>
                      <p>Rs {el.price}</p>
                      <h1>{el.name}</h1>
                  </div>
                  
                </div>
              </div>
            )})
           ):("No Available Products")}
          </div>
        </main>

      </div>
    </div>
  )
}

export default ShoppingWindow
