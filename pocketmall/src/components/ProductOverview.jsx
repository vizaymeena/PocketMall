import "../assets/style/overviewproduct.css";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import product_1 from "../assets/images/unsplash.avif";
import product_2 from "../assets/images/milada-vigerova-p8Drpg_duLw-unsplash.jpg"
import product_3 from "../assets/images/felipe-galvan-AhfrA5VQNpM-unsplash.jpg"
import product_4 from "../assets/images/faith-yarn-Wr0TpKqf26s-unsplash.jpg"
import product_5 from "../assets/images/faith-yarn-Wr0TpKqf26s-unsplash.jpg"
import product_6 from "../assets/images/engin-akyurt-TDOClniEwmI-unsplash.jpg"
import product_7 from "../assets/images/caio-coelho-QRN47la37gw-unsplash.jpg"
import product_8 from "../assets/images/clement-vatte-o5-3txB1M3w-unsplash.jpg"

// icons
import { ShoppingCart } from "lucide-react"



const products = [
    { id: 0, img: product_1,title:"Scarlet Prestige Overcoat",price:1200,description:"" },
    { id: 1, img: product_2,title:"Ivory Opulence Coat",price:1200,description:"" },
    { id: 2, img: product_3,title:"Azure Grace Blouse",price:1200,description:"" },
    { id: 3, img: product_4,title:"Blush Reverie Dress",price:1200,description:"" },
    { id: 4, img: product_5,title:"Midnight Majesty Overcoat",price:1200,description:"" },
    { id: 5, img: product_6,title:"Coral Allure Shirt",price:1200,description:"" },
    { id: 6, img: product_7,title:"Rosewood Charm Cardigan",price:1200,description:"" },
    { id: 7, img: product_8,title:"Sapphire Serenity Gown",price:1200,description:"" },

  ] 
export default function ProductOverview() {
    let [selectedProduct,setSelectedProduct] = useState(products[0])
  // Mock data
  

  let handleSelection=(product_id)=>{
    let filteredProduct = products.find((p)=> p.id == product_id)
    setSelectedProduct(filteredProduct)
  }

  return (
    <>
      <div className="the_product">


        <div className="left_sec">

            <div className="selected_product">
                <img src={selectedProduct.img}/>

                <div className="product_detail">
                    <div>
                        <h3>{selectedProduct.title}</h3>
                    </div>

                    <div className="buttons">
                        <button>Buy Now</button>
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
    </>
  );
}
