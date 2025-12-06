import { Outlet } from "react-router-dom"

import '../../assets/style/stepper.css'

import { useState } from "react"

import ProductStepper from "../../components/product/stepper/ProductStepper"
import { ProductBasic } from "../../components/product/stepper/Steps"


function ProductCreation() {

  let [currentStep,setCurrentStep] = useState(0)

  return (
    <div className='creationContainer'>
        <div className='stepper'>
            <ProductStepper 
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
            
            />
        </div>

        <div>
            {currentStep == 0 && <ProductBasic setStep={setCurrentStep}/>}
            {currentStep == 1 && <Product/> }
        </div>

    </div>
  )
}

export default ProductCreation
