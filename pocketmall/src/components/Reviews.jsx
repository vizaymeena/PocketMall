import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../assets/style/review.css";

export default function CustomerReviews() {
  const sliderRef = useRef(null);

  const feedbacks = [
    { name: "Aanya Sharma", stars: 5, feedback: "Absolutely loved the fabric quality! Worth every rupee." },
    { name: "Diya Kapoor", stars: 4, feedback: "Stylish and comfy. Shipping was super fast." },
    { name: "Ritika Das", stars: 5, feedback: "Perfect fit! The stitching feels premium." },
    { name: "Simran Kaur", stars: 4, feedback: "Looks exactly like the photos. Great purchase!" },
    { name: "Nisha Rao", stars: 5, feedback: "This is so classy! Got many compliments already." }
  ];

  const scrollingFeedbacks = [...feedbacks, ...feedbacks]; // duplicate for infinite scroll

  useEffect(() => {
    const slider = sliderRef.current;

    const tween = gsap.to(slider, {
      x: `-${slider.scrollWidth / 2}px`, // scroll distance
      duration: 40, // scroll duration
      ease: "linear",
      repeat: -1
    });

    // Pause on hover
    slider.addEventListener("mouseenter", () => tween.pause());
    slider.addEventListener("mouseleave", () => tween.resume());

    return () => tween.kill();
  }, []);

  return (
    <div className="reviewsSection">
      <h3>Customer Reviews</h3>
      <div className="reviewsSlider" ref={sliderRef}>
        <div className="reviewsTrack">
          {scrollingFeedbacks.map((f, index) => (
            <div className="reviewTicket" key={index}>
              <p className="feedback">"{f.feedback}"</p>
              <div className="stars">
                {"★".repeat(f.stars)}
                {"☆".repeat(5 - f.stars)}
                <strong className="name">- {f.name}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
