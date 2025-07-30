import { useState } from "react";
import "./logIn.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) return setMessage("Please enter your email.");

    
  };


  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async data => {
    console.log(data)

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/common/api/v1/authentication/forgot-password", { email: data.email });

      if (res.data.message) {
        setMessage("OTP sent to your email. Please check.");
        navigate(`/newpassword/${data.email}`)
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };





  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src="src/assets/Logo.png" alt="" />
        </div>
        <h5> We will email you instructions on how to reset your password.</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input type="email" {...register("email", { required: true })}/>
            {errors.email && <span>Email Required</span>}
            {
              loading && <p>Loading.....</p>
            }
            {
              message && <p>{message}</p>
            }
            <button
              type="submit"
              className="theme-btn"
              style={{ width: "100%", margin: "0 0 24px 0" }}
            >
              Reset Password
            </button>
          </form>

        <button className="theme-btn2">Return to login</button>
      </div>
    </div>
  );
}

export default ResetPassword;
