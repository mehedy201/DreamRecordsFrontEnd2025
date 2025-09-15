import { useEffect, useState } from "react";
import "./Settings.css";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, TrashIcon } from "@radix-ui/react-icons";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { userNameIdRoll } = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [bankInfo, setBankInfo] = useState();
  const [bankInfoReFetch, setBankInfoReFetch] = useState(1);
  const [notBankInfo, setNotBankInfo] = useState(true);
  useEffect(() => {
    if (userNameIdRoll) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/bank-info/${userNameIdRoll[1]}`
        )
        .then((res) => {
          if (res.status == 200) {
            if (isEmptyArray(res.data.data)) {
              setNotBankInfo(false);
            } else {
              setNotBankInfo(true);
            }
            const bankData = res.data.data[0];
            setBankInfo(bankData);
            reset(bankData);
            console.log(res.data.data[0]);
          }
        })
        .catch((er) => console.log(er));
    }
  }, [userNameIdRoll, bankInfoReFetch, reset]);

  // const [paymentMethod, setPaymentMethod] = useState("Bank Account");

  // const bankAccountType = watch("bankAccountType");

  const onSubmit = (data) => {
    if (bankInfo) {
      let payloadData = {
        ...data,
        // paymentMethod,
        masterUserId: userNameIdRoll[1],
        userName: userNameIdRoll[0],
        date: new Date().toISOString(),
      };
      axios
        .put(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/bank-info/${bankInfo._id}`,
          payloadData
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setBankInfoReFetch(bankInfoReFetch + 1);
          }
        });
    } else {
      let payloadData = {
        ...data,
        // paymentMethod,
        masterUserId: userNameIdRoll[1],
        userName: userNameIdRoll[0],
        date: new Date().toISOString(),
      };
      axios
        .post(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/bank-info`,
          payloadData
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setBankInfoReFetch(bankInfoReFetch + 1);
            navigate('/transaction/1/10/All');
          }
        });
    }
  };

  // const deleteBankInfo = (id) => {
  //   axios
  //     .delete(
  //       `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/bank-info/${id}`
  //     )
  //     .then((res) => {
  //       if (res.status == 200) {
  //         setBankInfoReFetch(bankInfoReFetch + 1);
  //         toast.success("Deleted the BankInfo");
  //       }
  //     })
  //     .catch((er) => console.log(er));
  // };

  return (
    <div className="main-content">
      {/* <h2 style={{ fontSize: "24px", fontWeight: "500" }}>Settings</h2> */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        <div className="settings-div">
          <h4>Payout Preference</h4>
          <p>Default Payout Method</p>
          <p style={{ fontWeight: "bold", fontSize: "16px" }}>Bank Account</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-container"
              style={{ position: "relative" }}
            >
              {/* Dynamic Form Fields */}
              {/* {paymentMethod === "Bank Account" ? ( */}
              <div>
                <p>Account Type *</p>
                <Controller
                  name="bankAccountType"
                  defaultValue="Savings"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup.Root
                      className="radio-group"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <label className="radio-label">
                        <RadioGroup.Item
                          className="radio-item"
                          value="Savings"
                        />
                        Savings
                      </label>
                      <label className="radio-label">
                        <RadioGroup.Item
                          className="radio-item"
                          value="Current"
                        />
                        Current
                      </label>
                    </RadioGroup.Root>
                  )}
                />

                <div className="settings-form-grid">
                  {/* {bankAccountType === "Savings" ? ( */}
                  <>
                    <div>
                      <label>Beneficiary Name *</label>
                      <input
                        {...register("account_holder_name", {
                          required: true,
                        })}
                        type="text"
                      />
                      {errors.account_holder_name && (
                        <span style={{ color: "#ea3958" }}>
                          Beneficiary Name Required *
                        </span>
                      )}
                    </div>
                    <div>
                      <label>Bank Name *</label>
                      <input
                        {...register("bank_name", { required: true })}
                        type="text"
                      />
                      {errors.bank_name && (
                        <span style={{ color: "#ea3958" }}>
                          Bank Name Required *
                        </span>
                      )}
                    </div>
                    <div>
                      <label>Account No. *</label>
                      <input
                        {...register("account_number", { required: true })}
                        type="text"
                      />
                      {errors.account_number && (
                        <span style={{ color: "#ea3958" }}>
                          Account No Required
                        </span>
                      )}
                    </div>
                    <div>
                      <label>IFSC Code/SWIFT Code *</label>
                      <input
                        {...register("IFSC", { required: true })}
                        type="text"
                      />
                    </div>
                    <div>
                      <label>UPI ID</label>
                      <input {...register("upiId")} type="text" />
                    </div>
                    <div>
                      <label>bKash No:</label>
                      <input className="remove_arrow" {...register("bKash")} type="number" />
                    </div>
                  </>
                </div>
              </div>
              {/* Save Button */}
              {notBankInfo ? (
                <button type="submit" className="settings-save-btn">
                  Edit
                </button>
              ) : (
                <button type="submit" className="settings-save-btn">
                  Save
                </button>
              )}
            </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;

// const ddd = {
//   IFSC: "",
//   account_holder_name: "mehedi",
//   account_number: "11111111",
//   bank_name: "Demo",
//   branch_name: "aaa",
//   masterUserId: "662b71650a78738b0334837f",
//   match_account_number: "11111111",
//   swift_code: "aaa",
//   _id: "67447266499cf486a8cb35c3",
// };

//  <div className="main-content">
//       <h2 style={{ fontSize: "24px", fontWeight: "500" }}>Settings</h2>
//       <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
//         <div className="settings-div">
//           <h4>Payout Preference</h4>
//           <p>Default Payout Method</p>
//           <p style={{fontWeight: 'bold', fontSize: '16px'}}>Bank Account</p>
//           {!notBankInfo && (
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="form-container"
//               style={{ position: "relative" }}
//             >
//               {/* Dynamic Form Fields */}
//               {paymentMethod === "Bank Account" ? (
//                 <div>
//                   <p>Account Type *</p>
//                   <Controller
//                     name="bankAccountType"
//                     defaultValue="Savings"
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                       <RadioGroup.Root
//                         className="radio-group"
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <label className="radio-label">
//                           <RadioGroup.Item
//                             className="radio-item"
//                             value="Savings"
//                           />
//                           Savings
//                         </label>
//                         <label className="radio-label">
//                           <RadioGroup.Item
//                             className="radio-item"
//                             value="Current"
//                           />
//                           Current
//                         </label>
//                       </RadioGroup.Root>
//                     )}
//                   />

//                   <div className="settings-form-grid">
//                     {bankAccountType === "Savings" ? (
//                       <>
//                         <div>
//                           <label>Beneficiary Name *</label>
//                           <input
//                             {...register("account_holder_name", {
//                               required: true,
//                             })}
//                             type="text"
//                           />
//                           {errors.account_holder_name && (
//                             <span style={{ color: "#ea3958" }}>
//                               Beneficiary Name Required *
//                             </span>
//                           )}
//                         </div>
//                         <div>
//                           <label>Bank Name *</label>
//                           <input
//                             {...register("bank_name", { required: true })}
//                             type="text"
//                           />
//                           {errors.bank_name && (
//                             <span style={{ color: "#ea3958" }}>
//                               Bank Name Required *
//                             </span>
//                           )}
//                         </div>
//                         <div>
//                           <label>Account No. *</label>
//                           <input
//                             {...register("account_number", { required: true })}
//                             type="text"
//                           />
//                           {errors.account_number && (
//                             <span style={{ color: "#ea3958" }}>
//                               Account No Required
//                             </span>
//                           )}
//                         </div>
//                         <div>
//                           <label>IFSC Code/SWIFT Code *</label>
//                           <input {...register("IFSC",  { required: true })} type="text" />
//                         </div>
//                         <div>
//                           <label>UPI ID</label>
//                           <input {...register("upiId")} type="text" />
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div>
//                           <label>Beneficiary Name *</label>
//                           <input
//                             {...register("account_holder_name", {
//                               required: true,
//                             })}
//                             type="text"
//                           />
//                           {errors.account_holder_name && (
//                             <span style={{ color: "#ea3958" }}>
//                               Beneficiary Name Required
//                             </span>
//                           )}
//                         </div>
//                         <div>
//                           <label>Bank Name *</label>
//                           <input
//                             {...register("bank_name", { required: true })}
//                             type="text"
//                           />
//                           {errors.bank_name && (
//                             <span style={{ color: "#ea3958" }}>
//                               Bank Name Required
//                             </span>
//                           )}
//                         </div>
//                         <div>
//                           <label>Account No. *</label>
//                           <input
//                             {...register("account_number", { required: true })}
//                             type="text"
//                           />
//                           {errors.account_number && (
//                             <span style={{ color: "#ea3958" }}>
//                               Account No Required
//                             </span>
//                           )}
//                         </div>
//                         <div>
//                           <label>IFSC Code/SWIFT Code *</label>
//                           <input {...register("IFSC",  { required: true })} type="text" />
//                         </div>

//                         <div>
//                           <label>UPI ID</label>
//                           <input {...register("upiId")} type="text" />
//                         </div>

//                         {/* Coment code in bottom_________ */}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ) : paymentMethod === "Payoneer" ? (
//                 <div className="settings-form-grid">
//                   <div>
//                     <label>Payoneer ID</label>
//                     <input
//                       {...register("payoneerID", { required: true })}
//                       type="text"
//                     />
//                     {errors.payoneerID && (
//                       <span style={{ color: "#ea3958" }}>
//                         Payoneer ID Required
//                       </span>
//                     )}
//                   </div>
//                   <div>
//                     <label>Payoneer Email</label>
//                     <input
//                       {...register("payoneerEmail", { required: true })}
//                       type="email"
//                     />
//                     {errors.payoneerEmail && (
//                       <span style={{ color: "#ea3958" }}>
//                         Payoneer Email Required
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ) : paymentMethod === "Paypal" ? (
//                 <div className="settings-form-grid">
//                   <div>
//                     <label>Paypal ID</label>
//                     <input
//                       {...register("paypalID", { required: true })}
//                       type="text"
//                     />
//                     {errors.paypalID && (
//                       <span style={{ color: "#ea3958" }}>
//                         Paypal ID Required
//                       </span>
//                     )}
//                   </div>
//                   <div>
//                     <label>Paypal Email</label>
//                     <input
//                       {...register("paypalEmail", { required: true })}
//                       type="email"
//                     />
//                     {errors.paypalEmail && (
//                       <span style={{ color: "#ea3958" }}>
//                         Paypal Email Required
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="settings-form-grid">
//                   <div>
//                     <label>Full Name (As per bKash Account)</label>
//                     <input
//                       {...register("bKashName", { required: true })}
//                       type="text"
//                     />
//                     {errors.bKashName && (
//                       <span style={{ color: "#ea3958" }}>
//                         Full Name (As per bKash Account) Required
//                       </span>
//                     )}
//                   </div>
//                   <div>
//                     <label>bKash ID</label>
//                     <input
//                       type="tel"
//                       {...register("bKashNumber", {
//                         required: true,
//                         pattern: {
//                           value: "/^(?:+?(88|91|92|977|975))?[0-9]{7,14}$/",
//                           message:
//                             "Invalid mobile number (e.g., +8801712345678, 917812345678)",
//                         },
//                       })}
//                     />
//                     {errors.bKashNumber && (
//                       <span style={{ color: "#ea3958" }}>
//                         bKash No Required
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Save Button */}
//               <button className="settings-save-btn">Save</button>
//             </form>
//           )}
//         </div>
//       </div>
//       <div>
//         <h4>Bank Information</h4>
//         {notBankInfo &&
//           bankInfo.map((bank) => (
//             <div
//               key={bank._id}
//               style={{ marginBottom: "10px" }}
//               className="modal-transaction-method"
//             >
//               <div>
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <p>
//                     {bank?.bank_name} {bank?.payoneerID ? `Payoneer` : ""}
//                     {bank?.paypalID ? `Paypal` : ""}
//                     {bank?.bKashName}
//                   </p>
//                   <TrashIcon
//                     onClick={() => deleteBankInfo(bank._id)}
//                     style={{ color: "#ea3958", cursor: "pointer" }}
//                   />
//                 </div>
//                 <small>
//                   {bank?.account_number &&
//                     `************${bank?.account_number.slice(-4)}`}{" "}
//                   {bank?.payoneerEmail} {bank?.paypalEmail}{" "}
//                   {bank?.bKashNumber && bank?.bKashNumber.toSlice(-4)}
//                 </small>
//               </div>
//               <div>
//                 <p>Account Holder/Beneficiary: {bank?.account_holder_name}</p>
//                 <p>Branch Name: {bank?.branch_name}</p>
//                 <p>Swift Code: {bank?.swift_code}</p>
//                 <p>IFSC: {bank?.IFSC}</p>
//                 <p>Account Type: {bank?.bankAccountType}</p>
//                 <p>Payment Method: {bank?.paymentMethod}</p>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>

// <div className="main-content">
//     <h2 style={{ fontSize: "24px", fontWeight: "500" }}>Settings</h2>
//     <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
//       <div className="settings-div">
//         <h4>Payout Preference</h4>
//         <p>Default Payout Method</p>
//         <Select.Root value={paymentMethod} onValueChange={setPaymentMethod}>
//           <Select.Trigger className="select-trigger">
//             <span>
//               {paymentMethod === "Bank Account"
//                 ? "Bank Account"
//                 : paymentMethod === "Payoneer"
//                 ? "Payoneer"
//                 : paymentMethod === "Paypal"
//                 ? "PayPal"
//                 : "bKash"}
//             </span>
//             <Select.Icon className="chevron-icon">
//               <ChevronDownIcon />
//             </Select.Icon>
//           </Select.Trigger>
//           <Select.Portal>
//             <Select.Content
//               className="settings-select-content"
//               position="popper"
//             >
//               <Select.Viewport>
//                 <Select.Item
//                   className="settings-select-item"
//                   value="Bank Account"
//                 >
//                   Bank Account
//                 </Select.Item>
//                 {/* <Select.Item className="settings-select-item" value="Payoneer">Payoneer</Select.Item>
//                   <Select.Item className="settings-select-item" value="Paypal">PayPal</Select.Item>
//                   <Select.Item className="settings-select-item" value="bKash">bKash</Select.Item> */}
//               </Select.Viewport>
//             </Select.Content>
//           </Select.Portal>
//         </Select.Root>
//         {!notBankInfo && (
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="form-container"
//             style={{ position: "relative" }}
//           >
//             {/* Dynamic Form Fields */}
//             {paymentMethod === "Bank Account" ? (
//               <div>
//                 <p>Account Type *</p>
//                 <Controller
//                   name="bankAccountType"
//                   defaultValue="Savings"
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <RadioGroup.Root
//                       className="radio-group"
//                       value={field.value}
//                       onValueChange={field.onChange}
//                     >
//                       <label className="radio-label">
//                         <RadioGroup.Item
//                           className="radio-item"
//                           value="Savings"
//                         />
//                         Savings
//                       </label>
//                       <label className="radio-label">
//                         <RadioGroup.Item
//                           className="radio-item"
//                           value="Current"
//                         />
//                         Current
//                       </label>
//                     </RadioGroup.Root>
//                   )}
//                 />

//                 <div className="settings-form-grid">
//                   {bankAccountType === "Savings" ? (
//                     <>
//                       <div>
//                         <label>Beneficiary Name *</label>
//                         <input
//                           {...register("account_holder_name", {
//                             required: true,
//                           })}
//                           type="text"
//                         />
//                         {errors.account_holder_name && (
//                           <span style={{ color: "#ea3958" }}>
//                             Beneficiary Name Required *
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <label>Bank Name *</label>
//                         <input
//                           {...register("bank_name", { required: true })}
//                           type="text"
//                         />
//                         {errors.bank_name && (
//                           <span style={{ color: "#ea3958" }}>
//                             Bank Name Required *
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <label>Account No. *</label>
//                         <input
//                           {...register("account_number", { required: true })}
//                           type="text"
//                         />
//                         {errors.account_number && (
//                           <span style={{ color: "#ea3958" }}>
//                             Account No Required
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <label>IFSC Code/SWIFT Code *</label>
//                         <input {...register("IFSC",  { required: true })} type="text" />
//                       </div>
//                       <div>
//                         <label>UPI ID</label>
//                         <input {...register("upiId")} type="text" />
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div>
//                         <label>Beneficiary Name *</label>
//                         <input
//                           {...register("account_holder_name", {
//                             required: true,
//                           })}
//                           type="text"
//                         />
//                         {errors.account_holder_name && (
//                           <span style={{ color: "#ea3958" }}>
//                             Beneficiary Name Required
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <label>Bank Name *</label>
//                         <input
//                           {...register("bank_name", { required: true })}
//                           type="text"
//                         />
//                         {errors.bank_name && (
//                           <span style={{ color: "#ea3958" }}>
//                             Bank Name Required
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <label>Account No. *</label>
//                         <input
//                           {...register("account_number", { required: true })}
//                           type="text"
//                         />
//                         {errors.account_number && (
//                           <span style={{ color: "#ea3958" }}>
//                             Account No Required
//                           </span>
//                         )}
//                       </div>
//                       <div>
//                         <label>IFSC Code/SWIFT Code *</label>
//                         <input {...register("IFSC",  { required: true })} type="text" />
//                       </div>

//                       <div>
//                         <label>UPI ID</label>
//                         <input {...register("upiId")} type="text" />
//                       </div>

//                       {/* Coment code in bottom_________ */}
//                     </>
//                   )}
//                 </div>
//               </div>
//             ) : paymentMethod === "Payoneer" ? (
//               <div className="settings-form-grid">
//                 <div>
//                   <label>Payoneer ID</label>
//                   <input
//                     {...register("payoneerID", { required: true })}
//                     type="text"
//                   />
//                   {errors.payoneerID && (
//                     <span style={{ color: "#ea3958" }}>
//                       Payoneer ID Required
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <label>Payoneer Email</label>
//                   <input
//                     {...register("payoneerEmail", { required: true })}
//                     type="email"
//                   />
//                   {errors.payoneerEmail && (
//                     <span style={{ color: "#ea3958" }}>
//                       Payoneer Email Required
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ) : paymentMethod === "Paypal" ? (
//               <div className="settings-form-grid">
//                 <div>
//                   <label>Paypal ID</label>
//                   <input
//                     {...register("paypalID", { required: true })}
//                     type="text"
//                   />
//                   {errors.paypalID && (
//                     <span style={{ color: "#ea3958" }}>
//                       Paypal ID Required
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <label>Paypal Email</label>
//                   <input
//                     {...register("paypalEmail", { required: true })}
//                     type="email"
//                   />
//                   {errors.paypalEmail && (
//                     <span style={{ color: "#ea3958" }}>
//                       Paypal Email Required
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <div className="settings-form-grid">
//                 <div>
//                   <label>Full Name (As per bKash Account)</label>
//                   <input
//                     {...register("bKashName", { required: true })}
//                     type="text"
//                   />
//                   {errors.bKashName && (
//                     <span style={{ color: "#ea3958" }}>
//                       Full Name (As per bKash Account) Required
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <label>bKash ID</label>
//                   <input
//                     type="tel"
//                     {...register("bKashNumber", {
//                       required: true,
//                       pattern: {
//                         value: "/^(?:+?(88|91|92|977|975))?[0-9]{7,14}$/",
//                         message:
//                           "Invalid mobile number (e.g., +8801712345678, 917812345678)",
//                       },
//                     })}
//                   />
//                   {errors.bKashNumber && (
//                     <span style={{ color: "#ea3958" }}>
//                       bKash No Required
//                     </span>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Save Button */}
//             <button className="settings-save-btn">Save</button>
//           </form>
//         )}
//       </div>
//     </div>
//     <div>
//       <h4>Bank Information</h4>
//       {notBankInfo &&
//         bankInfo.map((bank) => (
//           <div
//             key={bank._id}
//             style={{ marginBottom: "10px" }}
//             className="modal-transaction-method"
//           >
//             <div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <p>
//                   {bank?.bank_name} {bank?.payoneerID ? `Payoneer` : ""}
//                   {bank?.paypalID ? `Paypal` : ""}
//                   {bank?.bKashName}
//                 </p>
//                 <TrashIcon
//                   onClick={() => deleteBankInfo(bank._id)}
//                   style={{ color: "#ea3958", cursor: "pointer" }}
//                 />
//               </div>
//               <small>
//                 {bank?.account_number &&
//                   `************${bank?.account_number.slice(-4)}`}{" "}
//                 {bank?.payoneerEmail} {bank?.paypalEmail}{" "}
//                 {bank?.bKashNumber && bank?.bKashNumber.toSlice(-4)}
//               </small>
//             </div>
//             <div>
//               <p>Account Holder/Beneficiary: {bank?.account_holder_name}</p>
//               <p>Branch Name: {bank?.branch_name}</p>
//               <p>Swift Code: {bank?.swift_code}</p>
//               <p>IFSC: {bank?.IFSC}</p>
//               <p>Account Type: {bank?.bankAccountType}</p>
//               <p>Payment Method: {bank?.paymentMethod}</p>
//             </div>
//           </div>
//         ))}
//     </div>
//   </div>

// <div>
//                           <label>Business Entity Type</label>
//                           <Select.Root
//                             onValueChange={(e) =>
//                               setValue("bankBusinessTypeOption", e, {
//                                 shouldValidate: true,
//                               })
//                             }
//                             defaultValue="Private Limited Company"
//                           >
//                             <Select.Trigger className={`dropdown-trigger`}>
//                               <Select.Value />
//                               <Select.Icon className="select-icon">
//                                 <ChevronDown />
//                               </Select.Icon>
//                             </Select.Trigger>

//                             <Select.Portal>
//                               <Select.Content
//                                 className="dropdown-content"
//                                 style={{ padding: 0, overflowY: "auto" }}
//                               >
//                                 <Select.Viewport>
//                                   <Select.Item
//                                     value="Private Limited Company"
//                                     className="select-item"
//                                   >
//                                     <Select.ItemText>
//                                       Private Limited Company
//                                     </Select.ItemText>
//                                     <Select.ItemIndicator className="select-item-indicator">
//                                       <Check size={18} />
//                                     </Select.ItemIndicator>
//                                   </Select.Item>
//                                   <Select.Item
//                                     value="Private Limited Company 1"
//                                     className="select-item"
//                                   >
//                                     <Select.ItemText>
//                                       Private Limited Company 1
//                                     </Select.ItemText>
//                                     <Select.ItemIndicator className="select-item-indicator">
//                                       <Check size={18} />
//                                     </Select.ItemIndicator>
//                                   </Select.Item>
//                                   <Select.Item
//                                     value="Private Limited Company 2"
//                                     className="select-item"
//                                   >
//                                     <Select.ItemText>
//                                       Private Limited Company 2
//                                     </Select.ItemText>
//                                     <Select.ItemIndicator className="select-item-indicator">
//                                       <Check size={18} />
//                                     </Select.ItemIndicator>
//                                   </Select.Item>
//                                 </Select.Viewport>
//                               </Select.Content>
//                             </Select.Portal>
//                           </Select.Root>
//                         </div>
//                         <div>
//                           <label>GST Registered?</label>
//                           <Controller
//                             name="isGST"
//                             defaultValue="Yes"
//                             control={control}
//                             rules={{ required: true }}
//                             render={({ field }) => (
//                               <RadioGroup.Root
//                                 className="radio-group"
//                                 value={field.value}
//                                 onValueChange={field.onChange}
//                               >
//                                 <label className="radio-label">
//                                   <RadioGroup.Item
//                                     className="radio-item"
//                                     value="Yes"
//                                   />
//                                   Yes
//                                 </label>
//                                 <label className="radio-label">
//                                   <RadioGroup.Item
//                                     className="radio-item"
//                                     value="No"
//                                   />
//                                   No
//                                 </label>
//                               </RadioGroup.Root>
//                             )}
//                           />
//                         </div>
//                         <div>
//                           <label>GST Number</label>
//                           <input {...register("GSTNumber")} type="text" />
//                         </div>
