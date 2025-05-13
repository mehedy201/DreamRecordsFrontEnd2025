import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function SignUpVerificationEmailSent() {
  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src="src/assets/Logo.png" alt="" />
        </div>
        <h5>Verification Email Sent!</h5>
        <div className="verificationEmail-txt">
          <p>
            We have sent you an email with the verification link. Please check
            your inbox (and spam folder) and click the link to verify your
            account.
          </p>
        </div>
        <br />

        <button className="theme-btn2">Return to login</button>
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

export default SignUpVerificationEmailSent;
