import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import FormSubmitLoading from "../../../components/FormSubmitLoading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../../../redux/features/userDataHandleSlice/userDataHandleSlice";

const PersonalDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {step, personalDetails} = useSelector(state => state.signUpData);
    const {userNameIdRoll} = useSelector(state => state.userData);
    console.log(userNameIdRoll)

    const [phone, setPhone] = useState(personalDetails?.phone ? personalDetails.phone : '');
    const [phoneErr, setPhoneErr] = useState('');
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        first_name: personalDetails?.first_name,
        last_name: personalDetails?.last_name
      }
    });
    const onSubmit = data => {
      setLoading(true)
      if (!phone || phone.length < 10) {
        setPhoneErr("Valid phone number required.");
        setLoading(false)
        return;
      }     
      const payload = {...data, phone}
      axios.patch(`http://localhost:5000/api/v1/users/${userNameIdRoll[1]}`, payload)
      .then(res => {
        if(res.data.status ==200){
          navigate('/sign-up-address-info')
          const ud = {...payload, ...userData}
          dispatch(setUserData(ud))
        }
      })
    };

    return (
          <div className="signup-wrapper ">
            <div className="signUp-form">  
              <div className="form-title-txt">
                <h1>Personal Details</h1>
                <p>Fill your personal details to create account</p>
              </div>
               <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <label>First Name *</label>
                      <input type="text" {...register("first_name", { required: true })} />
                      {errors.first_name && <p style={{color: 'red', marginTop: '-10px'}}>First Name Required</p>}

                      <label>Last Name *</label>
                      <input type="text" {...register("last_name", { required: true })} />
                      {errors.last_name && <p style={{color: 'red', marginTop: '-10px'}}>Last Name Required</p>}

                      <label>Phone *</label>
                      <PhoneInput
                        country={"in"} // Default country
                        onChange={(phone) => {setPhone(phone); setPhoneErr('')}}
                        inputClass="phone-input-field"
                        buttonClass="phone-dropdown"
                        className="signUp-phone-input"
                      />
                      {
                        phoneErr && <p style={{color: 'red'}}>{phoneErr}</p>
                      }
                      {
                        loading && <FormSubmitLoading/>
                      }
                      <div className="signUp-buttons">
                          <button className="signUp-next-btn" type="submit">
                            Continue
                          </button>
                      </div>
                  </form>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', padding: '36px 0'}}>
                    <span style={{width: '124px', height: '4px', backgroundColor: '#EA3958', borderRadius: '5px'}}></span>
                    <span style={{width: '124px', height: '4px', backgroundColor: '#E0E0E0', borderRadius: '5px'}}></span>
                  </div>
              </div>             
            </div>
        </div>
    );
};

export default PersonalDetails;