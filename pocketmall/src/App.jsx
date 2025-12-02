import React from "react";
import { PrimaryNavbar } from "./layout/Navbar";
import Overview from "./components/Overview";
import './App.css'
import ProductDetails from "./components/ProductDetails";
import { Routes,Route } from "react-router-dom";
import Base from "./layout/Base";
import BillboardSlider from "./components/Billboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div> <Base/>  </div>}>
           <Route index element={<div> <BillboardSlider/> <Overview/> </div>}/>
           <Route path="buyNow" element={<ProductDetails/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
