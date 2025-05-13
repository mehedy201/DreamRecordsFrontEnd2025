import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import './SignUp.css'

function SignUpVerificationEmail() {
  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src="src/assets/Logo.png" alt="" />
        </div>
        <h5>Verification Email Sent!</h5>
        <div className="verificationEmail-txt">
          <p>We have sent you a 6 digit code to</p>
          <p style={{ color: "#202020" }}>subhamaykarjee@gmail.com</p>
        </div>
        <div>
          <input className="mehediInput" type="text" />
        </div>
        <div className="d-flex" style={{ justifyContent: "center" }}>
          <div className="verification-code"></div>
          <div className="verification-code"></div>
          <div className="verification-code"></div>
          <div className="verification-code"></div>
        </div>
        <button
          className="theme-btn"
          style={{ width: "100%", margin: "0 0 0px 0" }}
        >
          Continue
        </button>
        <p className="signUp-resend-txt">
          Didn’t received the link? &nbsp;
          <a href="#">
            Resend Link <MdOutlineKeyboardArrowRight />
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpVerificationEmail;
