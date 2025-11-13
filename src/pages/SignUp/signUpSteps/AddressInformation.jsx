import { useState } from "react";
import { CountrySelect } from "react-country-state-city";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormSubmitLoading from "../../../components/FormSubmitLoading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../../../redux/features/userDataHandleSlice/userDataHandleSlice";
import { CiLogout } from "react-icons/ci";

const AddressInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userNameIdRoll, userData } = useSelector((state) => state.userData);

  // Country State Select____________________________________________________
  const [country, setCountry] = useState();
  const [countryError, setCountryError] = useState("");

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    if (!country) {
      setCountryError("Please select your Country");
      return;
    }

    const label = {
      labelName: "Dream Records",
      imgUrl:
        "https://dream-records-2024.s3.ap-south-1.amazonaws.com/release-image/1754129130799-119804724-Dream%20Records%20Logo%20%28Dark%29.png",
      status: "Approved",
      instagram: "",
      facebook: "",
      youtube: "",
      email: userData?.email || "",
      date: new Date().toISOString(),
      masterUserId: userData?._id || userNameIdRoll[1],
      userName: userData?.userName || userNameIdRoll[0],
    };

    const payload = { ...data, country, status: "Active" };

    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/create-labels`,
        label
      )
      .then((res) => {
        console.log(res);
      });

    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/${userData?._id}`,
        payload
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          navigate("/");
          const ud = { ...payload, ...userData };
          dispatch(setUserData(ud));
        }
      });
  };

  return (
    <div className="signup-wrapper ">
      <div className="signUp-form">
        <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', marginTop: '20px'}}>
          <button 
            className="logout-btn-initial-page"
            onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
            style={{
              padding: '10px 40px', 
              border: '1px solid lightgray', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap:'10px',
              fontSize: '14px',
              backgroundColor: '#1f2d5c',
              color: 'white',
              cursor: 'pointer',
              }}> <CiLogout style={{ fontWeight: 'bold', fontSize: '1.2rem' }}/> Log Out</button>
        </div>
        <div className="form-title-txt">
          <h1>Address Information</h1>
          <p>Fill your personal details to create account</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Address Line 1 *</label>
            <input
              type="text"
              {...register("addressLine1", { required: true })}
            />
            {errors.addressLine1 && (
              <p style={{ color: "red", marginTop: "-10px" }}>
                Address Line 1 Required
              </p>
            )}

            <label htmlFor="">Address Line 2</label>
            <input type="text" {...register("addressLine2")} />

            <div className="signUp-form-grid">
              <div>
                <label htmlFor="">Select Country *</label>
                <CountrySelect
                  onChange={(e) => {
                    // setCountryid(e.id);
                    const name = e.name;
                    const emoji = e.emoji;
                    const v = { name, emoji, countryId: e.id };
                    setCountry(v);
                  }}
                  defaultValue={country}
                  placeHolder="Select Country"
                />
                {countryError && (
                  <p className="text-red-600 pb-2">{countryError}</p>
                )}
              </div>
              <div>
                <label htmlFor="">Select State *</label>
                <input type="text" {...register("state", { required: true })} />
                {errors.state && (
                  <p style={{ color: "red", marginTop: "-10px" }}>
                    State Required
                  </p>
                )}
                {/* <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setState(e);
                  }}
                  defaultValue={state}
                  placeHolder="Select State"
                />
                {stateError && (
                  <p className="text-red-600 pb-2">{stateError}</p>
                )} */}
              </div>
              <div>
                <label htmlFor="">City *</label>
                <input type="text" {...register("city", { required: true })} />
                {errors.city && (
                  <p style={{ color: "red", marginTop: "-10px" }}>
                    City Required
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="">Postal Code *</label>
                <input
                  type="text"
                  {...register("postalCode", { required: true })}
                />
                {errors.postalCode && (
                  <p style={{ color: "red", marginTop: "-10px" }}>
                    Postal Code Required
                  </p>
                )}
              </div>
            </div>
            <div className="signUp-buttons">
              <button
                className="theme-btn2"
                onClick={() => {
                  navigate("/sign-up-profile-info");
                  console.log("object");
                }}
              >
                Back
              </button>
              <button style={{display: "flex", justifyContent: "center", alignItems: "center", gap: '10px'}} className="signUp-next-btn" type="submit">
                {loading && <span className="btn-spinner-span"></span>}
                Continue
              </button>
            </div>
          </form>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              padding: "36px 0",
            }}
          >
            <span
              style={{
                width: "124px",
                height: "4px",
                backgroundColor: "#EA3958",
                borderRadius: "5px",
              }}
            ></span>
            <span
              style={{
                width: "124px",
                height: "4px",
                backgroundColor: "#EA3958",
                borderRadius: "5px",
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInformation;
