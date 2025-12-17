import axios from "axios"
import localforage from "localforage"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ProductCreate from '../../components/product/create/ProductCreate'

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
    discount_percent: 0,
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
    disocunt_percent: "",
    is_active: true,
  })

  let navigate = useNavigate()

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

  let finish = (e) => {
    e.preventDefault();

    let formToSend = new FormData();

    formToSend.append("name", formData.product_name);
    formToSend.append("category", formData.product_category);
    formToSend.append("description", formData.description);
    formToSend.append("price", formData.price);
    formToSend.append("discount_percent", formData.discount_percent);
    formToSend.append("discount_price", formData.discount_price);
    formToSend.append("brand", formData.brand);
    formToSend.append("is_active", formData.is_active);
    formToSend.append("variants", JSON.stringify(formData.variants));

    formData.images.forEach((img) => {
      formToSend.append("images", img.file);
    });

    axios.post("http://127.0.0.1:8000/api/products/", formToSend)
      .then((res) => {
        localforage.clear()
        console.log("%cProduct Created", "color:green", res.data)
        navigate('/adminDashboard')
      })
      .catch((err) => {
        console.group("%c🔥 BACKEND ERROR", "color:red");
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.log("Headers:", err.response?.headers);
        console.groupEnd();
      })



  };



  return (
    <div className="creationContainer">

      {/* Stepper */}


      {/* Step Content */}
      <div className="stepContent">

        <ProductCreate />


      </div>
    </div>
  )
}

export default ProductCreation
