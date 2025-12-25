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
import AdminDashboard from "./components/adminLayout/AdminDashboard";
import ProductCreation from "./pages/admin/ProductCreation";
import ProductList from "./pages/admin/ProductList";
import UserDashboard from "./components/user/user_dashboard/UserDashboard";
import MyCart from "./components/user/mycart/MyCart";
import DashboardOverview from "./components/user/mycart/UserDashDefault";
import Delivery from "./components/user/user_dashboard/Delivery";
import TransactionHistory from "./components/user/user_dashboard/Transaction";
import AdminHome from "./pages/admin/AdminHome";

function App() {
  return (
    <>
        {/* MAIN ROUTING OF THIS WEB APP */}
        <Routes>

          {/* AUDIENCE ROUTES */}
            <Route path="/" element={ <div> <BaseLayout/> </div> }>

               <Route index element={<div> <BillboardSlider/> <Overview/> </div>}/>
               <Route path="buyNow" element={ <ProductDetails/> }/>
               <Route path="shopping" element={ <ShoppingWindow/> }/>
               
            </Route>
          
          {/* USERDASHBOARD ROUTES */}
          <Route path="userdashboard" element={<UserDashboard/>}>
            <Route index element={<DashboardOverview/>}/>
            <Route path="mycart" element={<MyCart/>}/>
            <Route path="delivery" element={<Delivery/>}/>
            <Route path="transactions" element={<TransactionHistory/>}/>

          </Route>
        

          {/* ADMIN ROUTES */}
          <Route path="adminDashboard" element={ <AdminDashboard/> }>

            <Route index element={ <AdminHome/> }/>
            <Route path="products/add/" element={ <ProductCreation/> }/>
            <Route path="products/list/" element={ <ProductList/> } />

          </Route>

        </Routes>
    </>
  )
}

export default App
