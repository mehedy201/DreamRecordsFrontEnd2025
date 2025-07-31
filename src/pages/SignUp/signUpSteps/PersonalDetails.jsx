import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalDetails, setStep } from "../../../redux/features/signUpDataHandleSlice/signUpDataHandleSlice";

const PersonalDetails = () => {

    const dispatch = useDispatch();
    const {step} = useSelector(state => state.signUpData);

    const [phone, setPhone] = useState("");
    const [phoneErr, setPhoneErr] = useState('');
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
      setLoading(true)
      if(!phone){
        setPhoneErr('Phone number required')
      }
      const payload = {...data, phone}
      dispatch(setPersonalDetails(payload))
      dispatch(setStep(step +1))
      console.log(data)
      // navigate('/email-verification')
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First Name *</label>
                <input type="text" {...register("first_name", { required: true })} />
                {errors.first_name && <p style={{color: 'red', marginTop: '-10px'}}>First Name Required</p>}

                <label>Last Name *</label>
                <input type="text" {...register("last_naem", { required: true })} />
                {errors.last_naem && <p style={{color: 'red', marginTop: '-10px'}}>Last Name Required</p>}

                <label>Phone *</label>
                <PhoneInput
                  country={"in"} // Default country
                  value={phone}
                  onChange={(phone) => {setPhone(phone); setPhoneErr('')}}
                  inputClass="phone-input-field"
                  buttonClass="phone-dropdown"
                  className="signUp-phone-input"
                />
                {
                  phoneErr && <p style={{color: 'red'}}>{phoneErr}</p>
                }
                <div className="signUp-buttons">
                    <button className="signUp-next-btn" type="submit">
                      Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalDetails;