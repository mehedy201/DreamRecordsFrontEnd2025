import { useState } from 'react';
import Dropdown from '../../../components/Dropdown';
import { CountrySelect, StateSelect } from 'react-country-state-city';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressInformation, setStep } from '../../../redux/features/signUpDataHandleSlice/signUpDataHandleSlice';

const AddressInformation = () => {

    const dispatch = useDispatch();
    const {step, addressInformation} = useSelector(state => state.signUpData);

    // Country State Select 
    const [countryid, setCountryid] = useState(0);
    const [country, setCountry] = useState(addressInformation?.country);
    const [state, setState] = useState(addressInformation?.state)
    const [countryError, setCountryError] = useState('');
    const [stateError, setStateError] = useState('')


    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
      setLoading(true)
      if(!country){
        setCountryError('Please select your Country')
      }
      if(!state){
        setStateError('Please select your State')
      }
      const payload = {...data, country, state}
      dispatch(setAddressInformation(payload))
      dispatch(setStep(step +1))
      console.log(payload)
      // navigate('/email-verification')
    };


    const handlePrev = () => {
      dispatch(setStep(step-1))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Address Line 1 *</label>
                <input type="text" {...register("addressLine1", { required: true })} />
                {errors.addressLine1 && <p style={{color: 'red', marginTop: '-10px'}}>Address Line 1 Required</p>}

                <label htmlFor="">Address Line 2</label>
                <input type="text" {...register("addressLine2")} />

                <div className="signUp-form-grid">
                  <div>
                    <label htmlFor="">Select Country *</label>
                    <CountrySelect
                        onChange={(e) => {
                            setCountryid(e.id);
                            const name = e.name;
                            const emoji = e.emoji;
                            const v = {name, emoji}
                            setCountry(v)
                        }}
                        defaultValue={country}
                        placeHolder="Select Country"
                    />
                    {
                        countryError && <p className="text-red-600 pb-2">{countryError}</p>
                    }
                  </div>
                  <div>
                    <label htmlFor="">Select State *</label>
                    <StateSelect
                        countryid={countryid}
                        onChange={(e) => {
                            setState(e)
                        }}
                        defaultValue={state}
                        placeHolder="Select State"
                    />
                    {
                        stateError && <p className="text-red-600 pb-2">{stateError}</p>
                    }
                  </div>
                  <div>
                    <label htmlFor="">City *</label>
                    <input type="text" {...register("city", { required: true })} />
                    {errors.city && <p style={{color: 'red', marginTop: '-10px'}}>City Required</p>}
                  </div>
                  <div>
                    <label htmlFor="">Postal Code *</label>
                    <input type="text" {...register("postalCode", { required: true })} />
                    {errors.postalCode && <p style={{color: 'red', marginTop: '-10px'}}>Postal Code Required</p>}
                  </div>
                </div>
                <div className="signUp-buttons">
                    <button className="theme-btn2" onClick={handlePrev}>Back</button>
                    <button className="signUp-next-btn" type='submit'>Next</button>
                </div>
            </form>
        </div>
    );
};

export default AddressInformation;