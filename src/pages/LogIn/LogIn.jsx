import { Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import "./logIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import FormSubmitLoading from "../../components/FormSubmitLoading";

function LogIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMassage, setErrorMassage] = useState("");
  const onSubmit = (data) => {
    setLoading(true);
    setErrorMassage("");
    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/user-login`,
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          axios.patch(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/last-log-in/${userId}`
          );
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.message);
          navigate("/");
          setLoading(false);
        } else {
          setErrorMassage(res.data.message);
          setLoading(false);
        }
      });
  };

  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>

      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src="src/assets/Logo.png" alt="" />
        </div>
        <h5>
          Login to release and distribute your content, check to streamline data
          & revenue.
        </h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span style={{ color: "red" }}>Email Required</span>}
          <Flex className="d-flex">
            {" "}
            <label>Password</label>
            <label
              style={{
                marginLeft: "auto",
                cursor: "pointer",
              }}
              onClick={() => navigate("/resetpassword")}
            >
              Forget Password?
            </label>
          </Flex>
          <input
            type="password"
            className="password-input"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Password Required</span>}
          {loading && <FormSubmitLoading />}
          {errorMassage && <p style={{ color: "red" }}>{errorMassage}</p>}
          <button
            type="submit"
            className="theme-btn"
            style={{ width: "100%", margin: "0 0 24px 0" }}
          >
            Log In
          </button>
        </form>
        <button onClick={() => navigate("/sign-up")} className="theme-btn2">
          Don’t have an account? sign up
        </button>
      </div>
    </div>
  );
}

export default LogIn;
