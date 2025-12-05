import { useState } from "react";
// import BasicInfo from "./steps/BasicInfo";
// import Pricing from "./steps/Pricing";
// import Images from "./steps/Images";
// import Variants from "./steps/Variants";
// import ReviewSubmit from "./steps/ReviewSubmit";
import "../assets/style/stepper.css";

export default function ProductStepper() {

  const [step, setStep] = useState(1);

  // Central form state (collected across steps)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    discount_price: "",
    images: [],
    variants: [],
  });

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  return (
    <div className="stepper_wrapper">
      
      {/* Stepper Head */}
      <div className="stepper_header">
        {["Basic Info", "Pricing", "Images",].map((label, i) => (
          <div key={i} className={`step_item ${step === i+1 ? "active" : step > i+1 ? "completed" : ""}`}>
            <span>{i + 1}</span>
            <p>{label}</p>
          </div>
          
        ))}
      </div>

      {/* Step Content */}
      <div className="step_content">
        {/* {step === 1 && <BasicInfo formData={formData} setFormData={setFormData} next={next} />}
        {step === 2 && <Pricing formData={formData} setFormData={setFormData} next={next} back={back} />}
        {step === 3 && <Images formData={formData} setFormData={setFormData} next={next} back={back} />}
        {step === 4 && <Variants formData={formData} setFormData={setFormData} next={next} back={back} />}
        {step === 5 && <ReviewSubmit formData={formData} back={back} />} */}
      </div>

    </div>
  );
}
