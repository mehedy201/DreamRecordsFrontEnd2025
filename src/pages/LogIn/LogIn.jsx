import { Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import "./logIn.css";
// import auth from "../../../firebase.config";
// import { useAuthState, useSignInWithEmailAndPassword, useSignOut, } from 'react-firebase-hooks/auth';

function LogIn() {


  // const [
  //   signInWithEmailAndPassword,
  //   user,
  //   loading,
  //   error,
  // ] = useSignInWithEmailAndPassword(auth);
  // const [signOut] = useSignOut(auth);
  // const [user1, loading1] = useAuthState(auth);


  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const email = data.email;
    const password = data.password;
    console.log(email, password)
    // const loginUser = signInWithEmailAndPassword(email, password)
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
        {/* {
          loading && <p>Loading.....</p>
        }
        {
          user1 && <h1 style={{cursor: 'pointer'}} onClick={() => signOut()}>sign out</h1>
        } */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })}/>
          {errors.email && <span>Email Required</span>}
          <Flex className="d-flex">
            {" "}
            <label>Password</label>
            <label
              style={{
                marginLeft: "auto",
              }}
            >
              Forget Password?
            </label>
          </Flex>
          <input type="password" className="password-input" {...register("password", { required: true })}/>
          {errors.password && <span>Password Required</span>}
          <button
            type="submit"
            className="theme-btn"
            style={{ width: "100%", margin: "0 0 24px 0" }}
          >
            Log In
          </button>
        </form>
        <button className="theme-btn2">Don’t have an account? sign up</button>
      </div>
    </div>
  );
}

export default LogIn;
