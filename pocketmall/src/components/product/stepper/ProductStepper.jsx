// Steps And ProductStepper are two sub component which are child component of this component 
// Steps include 3 functional components for all 3 way step for creating a product 
// productstepper is the UI to make admin know the step he need to proceed


import React, { useEffect, useState } from 'react'

import { Info , IndianRupee , ListCollapse , Check} from 'lucide-react'

function ProductStepper({currentStep,setCurrentStep}) {

  const step = [
    {step:1,stepName:"Basic Info",stepIcon:<Info/>},
    {step:2,stepName:"Product Details",stepIcon:<ListCollapse/>},
    {step:3,stepName:"Price",stepIcon:<IndianRupee/>},
  ]



  return (
    <>
    <div className="stepWrapper">
      <div className="steps">

       <div className="stepBoxWrapper">
          {step.map((item, index) => (
            <React.Fragment key={index}>

              <div
                className={`stepBox 
                  ${currentStep === index ? "activeStep" : ""} 
                  ${currentStep > index ? "completedStep" : ""}`}
              >
                {currentStep < index+1 ? ( <div className="stepIcon">{item.stepIcon}</div>): (<div className="stepIcon"><Check/></div>)}
                <span className="stepLabel">{item.stepName}</span>
              </div>
                
             {index < step.length - 1 && (
                <div className={`stepConnector ${currentStep > index ? "stepConnectorCompleted" : ""}`} />
              )}
            </React.Fragment>
          ))}
        </div>
       </div>
    </div>
    </>
  )
}

export default ProductStepper