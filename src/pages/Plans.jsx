import * as React from "react"
import { useNavigate } from "react-router-dom"
import SectionHeading from "../components/SectionHeading.jsx"
import PricingCarousel from "../components/PricingCarousel.jsx"
import PlanConfirmationModal from "../components/PlanConfirmationModal.jsx"
import { plans } from "../data/plans.js"
import { useOrder } from "../context/OrderContext.jsx"
import "./Plans.css"

export default function Plans() {
  const [pendingPlan, setPendingPlan] = React.useState(null)
  const { selectPlan } = useOrder()
  const navigate = useNavigate()

  function handleChoose(plan) {
    setPendingPlan(plan)
  }

  function handleCancel() {
    setPendingPlan(null)
  }

  function handleContinue(plan) {
    selectPlan(plan.id) // resets order state and stores the chosen plan id
    setPendingPlan(null)
    navigate("/project-brief")
  }

  return (
    <div className="avn-page">
      <div className="avn-container">
        <SectionHeading title="Choose Your Plan" subtitle="Choose the creative plan that fits your project." />
      </div>

      <PricingCarousel plans={plans} onChoose={handleChoose} />

      <div className="avn-container">
        <h2 className="avn-plans-subheading">How It Works</h2>
        <div className="avn-plans-steps">
          <div className="avn-card avn-plans-step">
            <span className="avn-plans-step-num">01</span>
            <div>
              <strong>Choose a plan</strong>
              <p>Pick the plan that matches what you need.</p>
            </div>
          </div>
          <div className="avn-card avn-plans-step">
            <span className="avn-plans-step-num">02</span>
            <div>
              <strong>Tell us what you need</strong>
              <p>Share your project details and reference links.</p>
            </div>
          </div>
          <div className="avn-card avn-plans-step">
            <span className="avn-plans-step-num">03</span>
            <div>
              <strong>Discuss the project</strong>
              <p>AVNEDIT follows up over Gmail to finalise everything.</p>
            </div>
          </div>
        </div>

        <div className="avn-plans-notes">
          <p>
            Unlimited services are handled one active request at a time and are subject to project
            scope and communication.
          </p>
          <p>
            Payment is discussed directly with AVNEDIT after reviewing your project requirements. No
            online payment is required at this stage.
          </p>
        </div>
      </div>

      <PlanConfirmationModal plan={pendingPlan} onCancel={handleCancel} onContinue={handleContinue} />
    </div>
  )
}
