import { Routes, Route } from "react-router-dom";

// layout
import BaseLayout from "./layout/BaseLayout";

// homepage blocks
import BillboardSlider from "./components/banners/Billboard";
import Overview from "./components/overview/Overview";

// product
import ProductDetails from "./components/product/ProductDetails";

// pages
import ShoppingWindow from "./pages/shopping/ShoppingWindow";

// admin
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminOverview from "./components/admin/AdminOverview";
import ProductCreation from "./pages/admin/ProductCreation";
import ProductList from "./pages/admin/ProductList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div> <BaseLayout/>  </div>}>
           <Route index element={<div> <BillboardSlider/> <Overview/> </div>}/>
           <Route path="buyNow" element={<ProductDetails/>}/>
           <Route path="shopping" element={<ShoppingWindow/>}/>
        </Route>

        <Route path="adminDashboard" element={<AdminDashboard/>}>
          <Route index element={<AdminOverview/>} />
          <Route path="products/add/" element={<ProductCreation/>} />
          <Route path="products/list/" element={<ProductList/>} />

        </Route>

         
            
          

      </Routes>
    </>
  )
}

export default App
