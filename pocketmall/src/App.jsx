import './App.css'
// Router
import { Routes,Route } from "react-router-dom"

// components
import Base from "./layout/Base"
import Overview from "./components/Overview"
import ProductDetails from "./components/ProductDetails"
import BillboardSlider from "./components/Billboard"
import ShoppingWindow from "./pages/ShoppingWindow"
import AdminDashboard from './components/Admindashboard'
import AdminOverview from './components/AdminOverview'
import ProductCreation from './pages/ProductCreation'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div> <Base/>  </div>}>
           <Route index element={<div> <BillboardSlider/> <Overview/> </div>}/>
           <Route path="buyNow" element={<ProductDetails/>}/>
           <Route path="shopping" element={<ShoppingWindow/>}/>
        </Route>

        <Route path="adminDashboard" element={<AdminDashboard/>}>
          <Route index element={<AdminOverview/>} />
          <Route path="products" element={<ProductCreation/>} />

        </Route>

         
            
          

      </Routes>
    </>
  )
}

export default App
