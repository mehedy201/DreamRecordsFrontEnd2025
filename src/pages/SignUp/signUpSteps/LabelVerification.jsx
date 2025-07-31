import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setLabelVerification, setStep } from '../../../redux/features/signUpDataHandleSlice/signUpDataHandleSlice';
import FormSubmitLoading from '../../../components/FormSubmitLoading';

const LabelVerification = () => {

  const dispatch = useDispatch();
  const {step, labelVerification} = useSelector(state => state.signUpData);

  const [loading, setLoading] = useState(false)
      const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: labelVerification});
      const onSubmit = data => {
        setLoading(true)
        dispatch(setLabelVerification(data))
        dispatch(setStep(step +1))
        console.log(data)
        // navigate('/email-verification')
      };
  
  
      const handlePrev = () => {
        dispatch(setStep(step-1))
      }



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Channel Name *</label>
                <input type="text" {...register("labelName", { required: true })} />
                {errors.labelName && <p style={{color: 'red', marginTop: '-10px'}}>Channel Name Required</p>}

                <label htmlFor="">Channel URL *</label>
                <input type="text" {...register("youtube", { required: true })} />
                {errors.youtube && <p style={{color: 'red', marginTop: '-10px'}}>Channel URL Required</p>}

                <div className="signUp-form-grid">
                  <div>
                    <label htmlFor="">Subscribers Count *</label>
                    <input type="text" {...register("subscribersCount", { required: true })} />
                    {errors.subscribersCount && <p style={{color: 'red', marginTop: '-10px'}}>Subscribers Count Required</p>}
                  </div>
                  <div>
                    <label htmlFor="">Videos Count *</label>
                    <input type="text" {...register("videosCount", { required: true })} />
                    {errors.videosCount && <p style={{color: 'red', marginTop: '-10px'}}>Videos Count Required</p>}

                  </div>
                </div>
                {
                  loading && <FormSubmitLoading/>
                }
                <div className="signUp-buttons">
                    <button className="theme-btn2" onClick={handlePrev}>Back</button>
                    <button className="signUp-next-btn" type='submit'>Next</button>
                </div>
            </form>
        </div>
    );
};

export default LabelVerification;