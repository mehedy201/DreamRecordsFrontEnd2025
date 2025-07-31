import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import './SignUp.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpVerificationEmail() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // allow digits only
    if (value.length <= 4) {
      setOtp(value);
    }
  };


  const styles = {
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    zIndex: 10,
    backgroundColor: "transparent",
    color: "transparent",
    width: "220px",
    marginTop: '4px !important',
    // height: "48px",
    fontSize: "24px",
    letterSpacing: "48px",
    outline: "none",
    border: "none",
    caretColor: "black", // cursor color
  },
  boxWrapper: {
    display: "flex",
    justifyContent: "space-between",
    width: "220px",
    zIndex: 0,
  },
  box: {
    width: "40px",
    height: "40px",
    fontSize: "24px",
    fontWeight: "bold",
    border: "1px solid rgba(0, 9, 50, 0.12)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    boxShadow: 'inset 0 1.5px 2px rgba(0, 9, 50, 0.12)',
  },
};


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
        <div style={{padding: '50px 0px'}}>
          <div style={styles.container}>
            {/* Transparent Input */}
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={otp}
              onChange={handleChange}
              autoFocus
              style={styles.hiddenInput}
            />

            {/* Visual Boxes */}
            <div style={styles.boxWrapper}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={styles.box}>
                  {otp[i] || ""}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="theme-btn"
          style={{ width: "100%", margin: "0 0 0px 0" }}
          onClick={() => navigate('/sign-up-info')}
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
