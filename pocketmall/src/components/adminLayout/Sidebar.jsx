import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { LayoutGrid, Package, Users, BarChart3, Settings } from "lucide-react";
import { useRef,useState,useEffect } from "react";

export default function Sidebar() {
    let productNavRef = useRef(null)
    let productSubNavRef = useRef(null)

    let [openProducts,setOpenProducts] = useState(false)

    useEffect(() => {
      gsap.set(productSubNavRef.current, { height: 0, opacity: 0, overflow: "hidden" });
    }, []);

  let handleProducts = () => {
    let items = productSubNavRef.current.querySelectorAll("a");

    setOpenProducts((prev) => !prev);

  

    if (!openProducts) {
      // OPEN MAIN CONTAINER
      gsap.to(productNavRef.current,{
           x:12,
           duration:0.15,
           ease:"power1.in"
       })
      gsap.to(productSubNavRef.current, {
        height: "auto",
        opacity: 1,
        delay:0.3,
        duration: 0.35,
        ease: "power2.out",
      });

      // CHILDREN SLIDE IN
      gsap.fromTo(
        items,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.1,
        }
      );
    } else {
      // CHILDREN SLIDE OUT FIRST
      gsap.to(items, {
        x: -20,
        opacity: 0,
        duration: 0.25,
        stagger: 0.06,
        ease: "power2.in",
      });

      // THEN CLOSE THE MENU
      gsap.to(productSubNavRef.current, {
        height: 0,
        opacity: 0,
        ease: "power2.in",
        duration: 0.25,
        delay: 0.15,
      });

      gsap.to(productNavRef.current,{
        x:0,
        duration:0.10,
        ease:"power2.out"
      })
    }
  };


  return (
    <aside className="sidebar">

      <div className="sidebarLogo">Pocket Mall</div>

      <nav className="sidebarNav">

        <NavLink to="/adminDashboard" end className="navItem">
          <LayoutGrid /> <span>Overview</span>
        </NavLink>

        <div className="navGroup">
          <div ref={productNavRef} onClick={handleProducts} className="navItem">
            <Package /> <span>Products</span>
          </div>
          <div ref={productSubNavRef} className="subNav">
            <NavLink to="/adminDashboard/products/add">Add Product</NavLink>
            <NavLink to="/adminDashboard/products/list">List Products</NavLink>
          </div>
        </div>

        <div className="navGroup">
          <div className="navItem">
            <Users /> <span>Users</span>
          </div>
          <div className="subNav">
            <NavLink to="/adminDashboard/users">All Users</NavLink>
            <NavLink to="/adminDashboard/users/admins">Admins</NavLink>
          </div>
        </div>

        <NavLink to="/adminDashboard/reports" className="navItem">
          <BarChart3 /> <span>Reports</span>
        </NavLink>

        <NavLink to="/adminDashboard/settings" className="navItem">
          <Settings /> <span>Settings</span>
        </NavLink>

      </nav>

    </aside>
  );
}
