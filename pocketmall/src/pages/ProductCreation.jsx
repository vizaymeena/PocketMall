import { Outlet } from "react-router-dom"
import ProductStepper from "../components/ProductStepper"

function ProductCreation() {
  return (
    <div className='creationContainer'>
        <div className='stepper'>

            <ProductStepper/>


        </div>

        <div>
            <Outlet/>
        </div>

    </div>
  )
}

export default ProductCreation