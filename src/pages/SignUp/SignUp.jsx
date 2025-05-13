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

  const [step, setStep] = useState(0);
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
      setStep(step + 1);
    }
    setIsSubmitted(false);
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
    setIsSubmitted(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      {isSignUp ? (
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
              {isSubmitted ? (
                <div className="signUp-pending-div">
                  <img src="src/assets/icons/clock.png"></img>
                  <h3>Your Account is Pending Approval</h3>
                  <p>
                    Your request has been submitted for verification and will be
                    reviewed by an admin. Approval may take up to{" "}
                    <b>24-48 hours</b>. Once approved, you’ll receive a
                    confirmation email, and you’ll be able to log in and access
                    your account.
                  </p>
                </div>
              ) : (
                <>
                  <div className="form-title-txt">
                    <h1>{steps[step].title}</h1>
                    <p>{steps[step].subline}</p>
                  </div>
                  {step === 0 && (
                    <div>
                      <label>Account Type*</label>
                      <RadioGroup.Root
                        className="signUp-radio-group radio-group"
                        value={formData.registerAs}
                        onValueChange={(value) =>
                          setFormData({ ...formData, registerAs: value })
                        }
                      >
                        <label
                          className="radio-label signUp-label"
                          style={{
                            border:
                              formData?.registerAs === "individual" &&
                              "1px solid #dc3e42",
                          }}
                        >
                          <RadioGroup.Item
                            className="radio-item"
                            value="individual"
                          />
                          Individual
                        </label>
                        <label
                          className="radio-label signUp-label"
                          style={{
                            border:
                              formData?.registerAs === "Distributor" &&
                              "1px solid #dc3e42",
                          }}
                        >
                          <RadioGroup.Item
                            className="radio-item"
                            value="Distributor"
                          />
                          Distributor
                        </label>
                        <label
                          className="radio-label signUp-label"
                          style={{
                            border:
                              formData?.registerAs === "IndividualArtist" &&
                              "1px solid #dc3e42",
                          }}
                        >
                          <RadioGroup.Item
                            className="radio-item"
                            value="IndividualArtist"
                          />
                          Individual Artist
                        </label>
                      </RadioGroup.Root>
                      <label>First Name *</label>

                      <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                      />
                      <label>Last Name *</label>

                      <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                      />
                      <label>Phone *</label>
                      <PhoneInput
                        country={"in"} // Default country
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        inputClass="phone-input-field"
                        buttonClass="phone-dropdown"
                        className="signUp-phone-input"
                      />
                    </div>
                  )}
                  {step === 1 && (
                    <div>
                      <label htmlFor="">Address Line 1 *</label>
                      <input
                        type="text"
                        name="addressLine1"
                        onChange={handleChange}
                      />
                      <label htmlFor="">Address Line 2</label>
                      <input
                        type="text"
                        name="addressLine2"
                        onChange={handleChange}
                      />
                      <div className="signUp-form-grid">
                        <div>
                          <label htmlFor="">Select Country *</label>
                          <Dropdown
                            label="India"
                            options={["Option 1", "Option 2", "Option 3"]}
                            onSelect={setCountryDropdown}
                            select={countryDropdown}
                            className="signUp-dropdown-trigger"
                          />
                        </div>
                        <div>
                          <label htmlFor="">Select State *</label>
                          <Dropdown
                            label="West Bengal"
                            options={["Option 1", "Option 2", "Option 3"]}
                            onSelect={setStateDropdown}
                            select={stateDropdown}
                            className="signUp-dropdown-trigger"
                          />
                        </div>
                        <div>
                          <label htmlFor="">City *</label>

                          <input
                            type="text"
                            name="state"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="">Postal Code *</label>
                          <input
                            type="text"
                            name="postalCode"
                            className="input-field"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <label htmlFor="">Channel Name *</label>
                      <input
                        type="text"
                        name="channelName"
                        onChange={handleChange}
                      />
                      <label htmlFor="">Channel URL *</label>
                      <input
                        type="text"
                        name="channelURL"
                        onChange={handleChange}
                      />
                      <div className="signUp-form-grid">
                        <div>
                          <label htmlFor="">Subscribers Count *</label>

                          <input
                            type="text"
                            name="subscribers"
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="">Videos Count *</label>
                          <input
                            type="text"
                            name="videos"
                            className="input-field"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="">
                      {" "}
                      <label htmlFor="">Upload Profile Picture *</label>
                      <ImageUpload
                        placeholderImg="upload-img.png"
                        placeholderTxt="Drop your image here"
                        className="signUp-imgUpload"
                      />
                      <label htmlFor="">Upload Government ID *</label>
                      <div className="row">
                        <div className="col-6">
                          <div
                            style={{
                              marginRight:
                                window.innerWidth <= 420 ? "5px" : "10px",
                            }}
                          >
                            <ImageUpload
                              placeholderImg="identity.png"
                              placeholderTxt="Drop Front Side of ID here"
                              className="signUp-identity-imgUpload"
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div style={{ marginLeft: "10px" }}>
                            <ImageUpload
                              placeholderImg="identity.png"
                              placeholderTxt="Drop Back Side of ID here"
                              className="signUp-identity-imgUpload"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
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
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="logIn-pg">
          <div className="login-sideimg-div"></div>
          <div className="login-form-section">
            <div style={{ textAlign: "center" }}>
              <img src="src/assets/Logo.png" alt="" />
            </div>
            <h5>
              Sign Up to release and distribute your content, check to
              streamline data & revenue.
            </h5>
            <label>Email</label>

            <input type="text" name="firstName" />
            <label>Password:</label>

            <input type="text" name="firstName" className="password-input" />
            <label>Confirm Password:</label>

            <input type="text" name="firstName" className="password-input" />
            <button
              className="theme-btn"
              style={{ width: "100%", margin: "0 0 24px 0" }}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Sign Up
            </button>
            <button className="theme-btn2">
              Already have an account? Log In
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
