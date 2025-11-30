import "../assets/style/overviewproduct.css";
import { useState } from "react";

// Navigation
import { useNavigate } from "react-router-dom";


// Slider
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";


// Images
import product_1 from "../assets/images/unsplash.avif";
import product_2 from "../assets/images/redvelvet.jpg"
import product_3 from "../assets/images/whitetop.jpg"
import product_4 from "../assets/images/blacktshirt.jpg"
import product_5 from "../assets/images/bluedenimjacket.jpg"
import product_6 from "../assets/images/bluetshirt.jpg"
import product_7 from "../assets/images/creamsweatshirt.jpg"
import product_8 from "../assets/images/darkbluesweatthisrt.jpg"

// constant objects
const products = [
    { id: 1, img: product_1,title:"Scarlet Prestige Overcoat",price:1200,description:"" },
    { id: 2, img: product_2,title:"Ivory Opulence Coat",price:1200,description:"" },
    { id: 3, img: product_3,title:"Azure Grace Blouse",price:1200,description:"" },
    { id: 4, img: product_4,title:"Blush Reverie Dress",price:1200,description:"" },
    { id: 5, img: product_5,title:"Midnight Majesty Overcoat",price:1200,description:"" },
    { id: 6, img: product_6,title:"Coral Allure Shirt",price:1200,description:"" },
    { id: 7, img: product_7,title:"Rosewood Charm Cardigan",price:1200,description:"" },
    { id: 8, img: product_8,title:"Sapphire Serenity Gown",price:1200,description:"" },

  ] 


export default function ProductOverview() {
    let [selectedProduct,setSelectedProduct] = useState(products[0])
    let [loading,setLoading] = useState(false)

    let navigate = useNavigate()



  // Mock data
  
    // choose product 
  let handleSelection=(product_id)=>{
    let filteredProduct = products.find((p)=> p.id == product_id)
    setSelectedProduct(filteredProduct)
  }
  console.log("hey hey")

    // Forward to receipt page

    let handleBuyNow=(product_id)=>{
        if(!product_id) return ;
        setLoading(true)
        
        setTimeout(() => {
            setLoading(false)
            navigate("buyNow")
        }, 2000);
       
    }

  return (
    <>
      <div className="the_product">
        
        <div className="heading">
            <h3>WOMENS WINTER</h3>
            <hr className="line"/>
        </div>

        <div className="hero_section">
             <div className="left_sec">
                <div className="selected_product">
                    <img src={selectedProduct.img}/>
    
                    <div className="product_detail">
                        <div>
                            <h3>{selectedProduct.title}</h3>
                        </div>
    
                        <div className="buttons">
                            <button disabled={loading} onClick={()=>handleBuyNow(selectedProduct.id)}>  {loading ? "Processing..." : "Buy Now"}</button>
                            <button>Add To Cart</button> 
                        </div>
                    </div>
                </div>
              </div>

            <div className="right_sec">
                <Swiper
                  modules={[Grid, Pagination]}
                  slidesPerView={2}         // 3 columns
                  grid={{ rows: 2 }}        // 2 rows
                  spaceBetween={20}
                  pagination={{ clickable: true }}
                  className="display_product"
                >
                  {products.map((p) => (
                    <SwiperSlide key={p.id}>
                      <div className="product_item" onClick={()=>handleSelection(p.id)}>
                        <img src={p.img} alt="pic" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
            </div>
        </div>
      </div>
    </>
  );
}
