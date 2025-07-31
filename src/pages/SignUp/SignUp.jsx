import { useState } from "react";
// import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
// import { Button } from "@/components/ui/button";
import "./SignUp.css";
// import { RadioGroup } from "@radix-ui/react-radio-group";
import * as RadioGroup from "@radix-ui/react-radio-group";
import Dropdown from "../../components/Dropdown";
import { MdLogout } from "react-icons/md";
import { HiOutlineCheckCircle } from "react-icons/hi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styles
import ImageUpload from "../../components/ImageUpload";
import PersonalDetails from "./signUpSteps/PersonalDetails";
import AddressInformation from "./signUpSteps/AddressInformation";
import LabelVerification from "./signUpSteps/LabelVerification";
import DocumentUpload from "./signUpSteps/DocumentUpload";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/features/signUpDataHandleSlice/signUpDataHandleSlice";
const steps = [
  {
    title: "Personal Details",
    subline: "Fill your personal details to create account",
  },
  {
    title: "Address Information",
    subline: "Fill your personal details to create account",
  },
  {
    title: "Label Verification",
    subline: "Verify your label by submitting channel details.",
  },
  {
    title: "Document Upload",
    subline: "Upload required documents for final verification.",
  },
];
const SignUp = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [phone, setPhone] = useState("");
  const [stateDropdown, setStateDropdown] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);


  const dispatch = useDispatch();
  const {step} = useSelector(state => state.signUpData);


  const [formData, setFormData] = useState({
    registerAs: "individual",
    firstName: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    channelName: "",
    channelURL: "",
    subscribers: "",
    videos: "",
    profilePicture: null,
    governmentID: null,
  });

  const handleNext = () => {
    if (step < steps.length - 1) {
      dispatch(setStep(step + 1));
    }
    setIsSubmitted(false);
  };

  const handlePrev = () => {
    if (step > 0) {
      dispatch(setStep(step - 1));
    }
    setIsSubmitted(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
        <div className="signup-wrapper ">
          <div className="sineUp-step-sidebar">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <img src="src/assets/Logo.png" alt="Logo" />
            </div>
            {steps.map((item, index) => (
              <div
                key={index}
                className={`signup-step ${step >= index ? "step-active" : ""}`}
              >
                <HiOutlineCheckCircle />{" "}
                <div>
                  <p>{item.title}</p>
                  <small>{item.subline}</small>
                </div>
              </div>
            ))}
            <button
              className="theme-btn2"
              style={{
                margin: "20px",
                position: "absolute",
                bottom: "0",
                width: "90%",
              }}
            >
              Already have an account? sign in
            </button>
          </div>
          <div
            className={`signUp-form-container ${step === 3 ? "step-3" : ""}`}
          >
            <button className="logout-btn">
              <MdLogout /> Log Out
            </button>

            <div className="signUp-form">
              
                <>
                  <div className="form-title-txt">
                    <h1>{steps[step].title}</h1>
                    <p>{steps[step].subline}</p>
                  </div>
                  {step === 0 && (
                    <PersonalDetails/>
                  )}
                  {step === 1 && (
                    <AddressInformation/>
                  )}
                  {step === 2 && (
                    <LabelVerification/>
                  )}
                  {step === 3 && (
                    <DocumentUpload/>
                  )}
                  <div className="signUp-buttons">
                    {step > 0 && (
                      <button className="theme-btn2" onClick={handlePrev}>
                        Back
                      </button>
                    )}
                    {step < steps.length - 1 ? (
                      <button className="signUp-next-btn" onClick={handleNext}>
                        Next
                      </button>
                    ) : (
                      <button
                        className="signUp-next-btn"
                        onClick={() => {
                          setIsSubmitted(true);
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </>
            </div>
          </div>
        </div>
    </>
  );
};

export default SignUp;
