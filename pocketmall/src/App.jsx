import React from "react";
import { PrimaryNavbar } from "./layout/Navbar";
import ProductOverview from "./components/ProductOverview";
import './App.css'
import ProductDetails from "./components/ProductDetails";
import { Routes,Route } from "react-router-dom";
import Base from "./layout/Base";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div> <Base/> </div>}>
           <Route index element={<ProductOverview/>}/>
           <Route path="buyNow" element={<ProductDetails/>} />
        </Route>
      </Routes>
    
    </>
  );
}

export default App;
