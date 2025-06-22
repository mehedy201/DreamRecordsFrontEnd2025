import React from 'react';
import { useForm } from 'react-hook-form';

const TestPage = () => {
  // প্রতিটি ফর্মের জন্য আলাদা useForm হুক
  const { register: form1Register, handleSubmit: handleForm1Submit, formState: { errors: form1Errors }, trigger: form1Trigger } = useForm();
  const { register: form2Register, handleSubmit: handleForm2Submit, formState: { errors: form2Errors }, trigger: form2Trigger } = useForm();
  const { register: form3Register, handleSubmit: handleForm3Submit, formState: { errors: form3Errors }, trigger: form3Trigger } = useForm();

  // প্রতিটি ফর্মের সাবমিট হ্যান্ডলার
  const onSubmitForm1 = (data) => {
    console.log('Form 1 Data:', data);
    return data;
  };

  const onSubmitForm2 = (data) => {
    console.log('Form 2 Data:', data);
    return data;
  };

  const onSubmitForm3 = (data) => {
    console.log('Form 3 Data:', data);
    return data;
  };

  // মূল সাবমিট বাটন হ্যান্ডলার
  const handleGlobalSubmit = async () => {
    // সব ফর্মের ভ্যালিডেশন ট্রিগার
    const isForm1Valid = await form1Trigger();
    const isForm2Valid = await form2Trigger();
    const isForm3Valid = await form3Trigger();

    if (isForm1Valid && isForm2Valid && isForm3Valid) {
      // সব ফর্ম সাবমিট করুন
      handleForm1Submit(onSubmitForm1)();
      handleForm2Submit(onSubmitForm2)();
      handleForm3Submit(onSubmitForm3)();
      
      // অথবা একসাথে সব ডাটা প্রসেস করতে চাইলে:
      // const form1Data = form1GetValues();
      // const form2Data = form2GetValues();
      // const form3Data = form3GetValues();
      // console.log('All Data:', { form1Data, form2Data, form3Data });
    } else {
      console.log('সব ফর্মের প্রয়োজনীয় তথ্য পূরণ করুন');
    }
  };

  return (
    <div>
      {/* ফর্ম ১ */}
      <form>
        <h2>ফর্ম ১</h2>
        <div>
          <label>নাম (আবশ্যক)</label>
          <input {...form1Register('name', { required: 'নাম আবশ্যক' })} />
          {form1Errors.name && <p style={{ color: 'red' }}>{form1Errors.name.message}</p>}
        </div>
        
        <div>
          <label>ইমেইল</label>
          <input {...form1Register('email')} />
        </div>
      </form>

      {/* ফর্ম ২ */}
      <form>
        <h2>ফর্ম ২</h2>
        <div>
          <label>ঠিকানা (আবশ্যক)</label>
          <input {...form2Register('address', { required: 'ঠিকানা আবশ্যক' })} />
          {form2Errors.address && <p style={{ color: 'red' }}>{form2Errors.address.message}</p>}
        </div>
      </form>

      {/* ফর্ম ৩ */}
      <form>
        <h2>ফর্ম ৩</h2>
        <div>
          <label>ফোন নম্বর (আবশ্যক)</label>
          <input {...form3Register('phone', { required: 'ফোন নম্বর আবশ্যক' })} />
          {form3Errors.phone && <p style={{ color: 'red' }}>{form3Errors.phone.message}</p>}
        </div>
      </form>

      {/* গ্লোবাল সাবমিট বাটন */}
      <button onClick={handleGlobalSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>
        সব ফর্ম সাবমিট করুন
      </button>
    </div>
  );
};

export default TestPage;