import { useState, useEffect } from "react"
import localforage from "localforage"
import axios from "axios"

import "../../assets/style/stepper.css"

import ProductStepper from "../../components/product/stepper/ProductStepper"
import { ProductBasic, ProductAdvance,ProductVariants } from "../../components/product/stepper/Steps"

function ProductCreation() {

  let [currentStep, setCurrentStep] = useState(0)

  // FormData
  let [formData, setFormData] = useState({
    product_name: "",
    brand: "",
    product_category: "mens",
    description: "",
    price: 0,
    discount_price: 0,
    discount_percent:0,
    is_active: true,
    images: [],
    variants: []
  })

  // Error State
  let [prErrors, setErrors] = useState({
    product_name: "",
    brand: "",
    product_category: "",
    description: "",
    price: "",
    discount_price: "",
    disocunt_percent:"",
    is_active: true,
  })


  // Restore Data on page load
  useEffect(() => {
    async function loadDraft() {
        let savedForm = await localforage.getItem("productDraft")
        let savedStep = await localforage.getItem("currentStep")

        if (savedForm) {
          setFormData(savedForm)
        }

        if (savedStep !== null) {
          let restoredStep = Number(savedStep)
            setCurrentStep(restoredStep)
        }
    }

    loadDraft()
  }, [])

  // Auto Save Draft
  useEffect(() => {
    localforage.setItem("productDraft", formData)
  }, [formData])

  // Next Step
  let next = () => {
    localforage.setItem("currentStep", currentStep + 1)
    setCurrentStep((prev) => prev + 1)
  }

  // Prev Step
  let prev = () => {
    if (currentStep <= 0) return
    localforage.setItem("currentStep", currentStep - 1)
    setCurrentStep((prev) => prev - 1)
  }


  let finish = () => {



  }


  return (
    <div className="creationContainer">

      {/* Stepper */}
      <div className="stepper">
        <ProductStepper
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>

      {/* Step Content */}
      <div className="stepContent">
        
        {currentStep === 0 && (
          <ProductBasic
            formData={formData}
            setFormData={setFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            next={next}
            prErrors={prErrors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 1 && (
          <ProductAdvance
            formData={formData}
            setFormData={setFormData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            prev={prev}
            next={next}
            prErrors={prErrors}
            setErrors={setErrors}
          />
        )}

        
        {currentStep === 2 && (
          <ProductVariants 
            formData={formData} 
            setFormData={setFormData} 
            finish={finish} 
            prev={prev}
           
            />
        )}

      </div>
    </div>
  )
}

export default ProductCreation
