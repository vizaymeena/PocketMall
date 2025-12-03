import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ChevronLeft,ChevronRight } from "lucide-react"
import "../assets/style/sidebar.css"

function SideFilterBar({ isBarOpen, setBarOpen }) {
  const sideBarRef = useRef(null)

  useEffect(() => {
    if (isBarOpen) {
      gsap.to(sideBarRef.current, {
        x: 0,
        duration: 0.55,
        ease: "power3.out",
      })
    } else {
      gsap.to(sideBarRef.current, {
        x: "-260px",
        duration: 0.55,
        ease: "power3.inOut",
      })
    }
  }, [isBarOpen])

  return (
    <>
      {/* SIDEBAR */}
      <aside className="sideBarHead" ref={sideBarRef}>
        <div className="theFilters">

          <div className="sizeFilter">
            <span className="filterTitle">Size :</span>
            <div className="sizeChoices">
              <span>S</span>
              <span>M</span>
              <span>L</span>
              <span>XL</span>
            </div>
          </div>

          <div className="priceFilter">
            <span className="filterTitle">Price :</span>
            <div className="priceRange">
              <input className="rangeInput" type="range" min={500} max={5000} />
              <div className="priceTag">
                <span>500</span>
                <span>5000</span>
              </div>
            </div>
          </div>

          <div className="applyFilter">
            <button>Apply</button>
          </div>

        </div>

         {/* BUTTON — ALWAYS VISIBLE */}
      <button
        className={`sideToggleBtn`}
        onClick={() => setBarOpen(prev => !prev)}
      >
        {isBarOpen ? <ChevronLeft /> :<ChevronRight />}
      </button>
      </aside>

     
    </>
  )
}

export default SideFilterBar
