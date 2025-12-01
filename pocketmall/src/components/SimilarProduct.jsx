import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../assets/style/similarproducts.css";

export default function SimilarProducts({ products }) {

  return (
    <div className="similar_container">
      <h2 className="similar_title">Similar Products</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={5}
        navigation
        className="similar_slider"
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="similar_card">
              <img src={p.img} alt={p.title} />

              <div className="similar_info">
                <h4>{p.title}</h4>
                <p>Rs {p.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
