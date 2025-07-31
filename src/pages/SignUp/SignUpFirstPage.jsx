import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpFirstPage = () => {

  const navigate = useNavigate();

  // const {signUpFirstStep} = useSelector(state => state.signUpData);

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMassage, setErrorMassage] = useState('');
  const [userName, setUserName] = useState();
  const [userNameErr, setUserNameErr] = useState('');
  const onSubmit = data => {
    setUserNameErr('')
    setErrorMassage('')
    setLoading(true)
    if(!userName){
      setUserNameErr('User Name Required')
    }
    let password;
    if(data.password1 === data.password2){
      password = data.password1
    }else{
      setErrorMassage('Password Not Match')
    }

    const payload = {userName: 'userName', email: data.email, password: password}
    console.log(payload)
    navigate('/email-verification')
    // axios.post(`http://localhost:5000/common/api/v1/authentication/user-login`, data)
    // .then(res => {
    //   console.log(res)
    //   if(res.data.status === 200){
    //     console.log(res.status)
    //     localStorage.setItem("token", res.data.token);
    //     toast.success(res.data.message)
    //     navigate('/email-verification')
    //     setLoading(false)
    //   }else{
    //     setErrorMassage(res.data.message)
    //     setLoading(false)
    //   }
    // })
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
              Sign Up to release and distribute your content, check to
              streamline data & revenue.
            </h5>
            <label>User Name</label>
            <input type="text" onChange={e => {setUserName(e.target.value); setUserNameErr('')}} />
            {
              userNameErr && <p style={{color: 'red', marginTop: '-10px'}}>{userNameErr}</p>
            }
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
            {errors.email && <p style={{color: 'red', marginTop: '-10px'}}>Email Required</p>}

            <label>Password:</label>
            <input type="text" {...register("password1", { required: true })} className="password-input" />
            {errors.password1 && <p style={{color: 'red', marginTop: '-10px'}}>Password Required</p>}

            <label>Confirm Password:</label>
            <input type="text" {...register("password2", { required: true })} className="password-input" />
            {errors.password2 && <p style={{color: 'red', marginTop: '-10px'}}>Confirm Password Required</p>}
            {
              loading && <p style={{ marginTop: '-10px'}}>Loadin.......</p>
            }
            {
              errorMassage && <p style={{color: 'red', marginTop: '-10px'}}>{errorMassage}</p>
            }

            <button
              type="submit"
              className="theme-btn"
              style={{ width: "100%", margin: "0 0 24px 0" }}
            >
              Sign Up
            </button>
            <button onClick={() => navigate('/login')} className="theme-btn2">
              Already have an account? Log In
            </button>
          </form>
        </div>
        </div>
    );
};

export default SignUpFirstPage;