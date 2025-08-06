import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormSubmitLoading from "../../components/FormSubmitLoading";
import useDebounce from "../../hooks/useDebounce";
import toast from "react-hot-toast";

const SignUpFirstPage = () => {
  const navigate = useNavigate();

  // const {signUpFirstStep} = useSelector(state => state.signUpData);

  const [userName, setUserName] = useState();
  const [availability, setAvailability] = useState(null);
  const debouncedUsername = useDebounce(userName, 600);
  const [regaxErr, setRegaxErr] = useState();

  useEffect(() => {
    const checkUsername = async () => {
      const regex = /^[a-zA-Z0-9]+$/;
      setAvailability(""); // reset
      setRegaxErr(""); // reset
      if (debouncedUsername === "") return;
      // Step 1: validate regex
      if (!regex.test(debouncedUsername)) {
        setRegaxErr(
          "Only letters and numbers are allowed (no spaces or symbols)"
        );
        return;
      }
      if (debouncedUsername?.length < 3) {
        setAvailability(null); // Not valid username yet
        return;
      }
      try {
        const res = await axios.post(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/check-existing-user`,
          { userName: debouncedUsername }
        );
        if (res.data.message === "Exist User") {
          setAvailability("unavailable");
        } else if (res.data.message === "Continue") {
          setAvailability("available");
        } else {
          setAvailability(null); // unexpected
        }
      } catch (err) {
        console.error("API Error:", err.message);
        setAvailability(null);
      }
    };
    checkUsername();
  }, [debouncedUsername]);

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMassage, setErrorMassage] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const onSubmit = (data) => {
    setUserNameErr("");
    setErrorMassage("");
    setLoading(true);
    if (!userName) {
      setUserNameErr("User Name Required");
    }
    let password;
    if (data.password1 === data.password2) {
      password = data.password1;
    } else {
      setErrorMassage("Password Not Match");
    }
    if (availability !== "available") {
      return;
    }

    // /common/api/v1/authentication/register-user
    // /common/api/v1/authentication/verify-user-otp
    // /common/api/v1/authentication/get-temp-user/:id

    const payload = {
      userName: userName,
      email: data.email,
      password: password,
      roll: "User",
      status: "Pending",
    };
    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/register-user`,
        payload
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          console.log(res.status);
          // localStorage.setItem("token", res.data.token);
          toast.success(res.data.message);
          navigate(`/email-verification/${res.data.id}`);
          setLoading(false);
        } else {
          setErrorMassage(res.data.message);
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <div className="logIn-pg">
        <div className="login-sideimg-div"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="login-form-section">
          <div style={{ textAlign: "center" }}>
            <img src="src/assets/Logo.png" alt="" />
          </div>
          <h5>
            Sign Up to release and distribute your content, check to streamline
            data & revenue.
          </h5>
          <label>User Name</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
          {availability === "available" && (
            <p style={{ color: "green", fontSize: "8px", marginTop: "-15px" }}>
              Username available
            </p>
          )}
          {availability === "unavailable" && (
            <p style={{ color: "red", fontSize: "8px", marginTop: "-15px" }}>
              Username taken
            </p>
          )}
          {userNameErr && (
            <p style={{ color: "red", marginTop: "-10px" }}>{userNameErr}</p>
          )}
          {regaxErr && (
            <p style={{ color: "red", marginTop: "-10px" }}>{regaxErr}</p>
          )}
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && (
            <p style={{ color: "red", marginTop: "-10px" }}>Email Required</p>
          )}

          <label>Password:</label>
          <input
            type="text"
            {...register("password1", { required: true })}
            className="password-input"
          />
          {errors.password1 && (
            <p style={{ color: "red", marginTop: "-10px" }}>
              Password Required
            </p>
          )}

          <label>Confirm Password:</label>
          <input
            type="text"
            {...register("password2", { required: true })}
            className="password-input"
          />
          {errors.password2 && (
            <p style={{ color: "red", marginTop: "-10px" }}>
              Confirm Password Required
            </p>
          )}
          {loading && <FormSubmitLoading />}
          {errorMassage && (
            <p style={{ color: "red", marginTop: "-10px" }}>{errorMassage}</p>
          )}

          <button
            type="submit"
            className="theme-btn"
            style={{ width: "100%", margin: "0 0 24px 0" }}
          >
            Sign Up
          </button>
          <button onClick={() => navigate("/login")} className="theme-btn2">
            Already have an account? Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpFirstPage;
