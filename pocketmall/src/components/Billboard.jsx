
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "../assets/style/billboard.css"

// images
import  billboard_1  from "../assets/images/billboard1.jpg"
import  billboard_3  from "../assets/images/billboard3.jpg"


const homeImages = [
  {
    image:billboard_1,
    tag: "New Arrivals",
    title: "Fresh Fashion for 2025",
    subtitle: "Clean, classy styles that stand out anywhere.",
    buttonText: "Shop Now"
  },
  {
    image: billboard_3,
    tag: "Winter Sale",
    title: "Up To 60% OFF!",
    subtitle: "Grab the warmest winter collection at crazy discounts.",
    buttonText: "Explore Deals"
  },
  {
    image: billboard_3,
    tag: "Trending",
    title: "Streetwear Essentials",
    subtitle: "Bold statements, fresh attitude.",
    buttonText: "Browse Collection"
  },
]


const BillboardSlider = () => {

    console.log("billboard one image :",billboard_1)

  return (
    <div className="billboard-container">
      <Swiper
        modules={[ Pagination]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true,
            el:".billboard-pagination"
         }}
        className="billboard-swiper"
      >
        {homeImages.map((item, index) => (
          <SwiperSlide key={index}>
              <div className="billboard-slide">
                <img src={item.image} className="bgImage" loading="lazy"/>
                <div className="billboard-content">
                  <span className="billboard-tag">{item.tag}</span>
                  <h1>{item.title}</h1>
                  <p>{item.subtitle}</p>
                  <button>{item.buttonText}</button>
                </div>
              </div>
          </SwiperSlide>
         

        ))}
      </Swiper>
        <div className="billboard-pagination"></div>
    </div>
  )
}

export default BillboardSlider
