import { useRef, useState } from "react";
import { Flex } from "@radix-ui/themes";
import "./Profile.css";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCamera } from "react-icons/fa";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import defultUserImg from '../../assets/artists/artist4.png'
import localDate from "../../hooks/localDate";
import axios from "axios";
import toast from "react-hot-toast";
import FormSubmitLoading from "../../components/FormSubmitLoading";
import localTime from "../../hooks/localTime";


function Profile() {

  // const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.userData);

  // Handle Image Upload
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Modal Open Close ________________________
  const [open, setOpen] = useState(false);
  // Update Password Function ________________
  const [passMatchErr, setPassMatchErr] = useState('');
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: {errors}} = useForm();
  const onSubmit = async (data) => {
    setPassMatchErr('');
    setLoading(true);
    // First check if new passwords match
    if (data.pass1 !== data.pass2) {
        setPassMatchErr('New passwords do not match');
        setLoading(false);
        return;
    }

    const token = localStorage.getItem('token')

    const payload = {newPassword: data.pass1, token}
    axios.patch(`http://localhost:5000/common/api/v1/authentication/change-password`, payload)
    .then(res => {
      if(res.data.status === 200){
        toast.success(res.data.message)
        setLoading(false)
        setOpen(false)
      }else{
        toast.error(res.data.message)
        setOpen(false)
        setLoading(false)
      }
    })
  }


  const emailCloseRef = useRef(null);
  const [email, setEmail] = useState();
  const [emailErr, setEmailErr] = useState();
  const [emailChangeLoading, setEmailChangeLoading] = useState(false);
  const changeEmailFunc = () => {
    setEmailChangeLoading(true)
    setEmailErr('')
    if(!email){
      setEmailErr('Email required')
    }
    const token = localStorage.getItem('token')

    const payload = {newEmail: email, token}
    axios.patch(`http://localhost:5000/common/api/v1/authentication/change-email`, payload)
    .then(res => {
      console.log(res)
      if(res.data.status === 200){
        toast.success(res.data.message)
        setEmailChangeLoading(false)
        emailCloseRef.current?.click();
      }else{
        // toast.error(res.data.message.message)
        setEmailErr(res.data.message.message)
        setEmailChangeLoading(false)
      }
    })

  }




  return (
    <div className="main-content profile-content">
      <Flex className="profile-img-flex">
        <div className="profile-img">
          {image ? (
            <>
              <img src={image} alt="Uploaded" className="uploaded-img" />{" "}
              <div onClick={() => document.getElementById("fileInput").click()}>
                <FaCamera />
              </div>
            </>
          ) : (
            <>
              <img
                src={userData?.photoURL ? userData?.photoURL : defultUserImg}
                alt="Profile"
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                value={image}
              />
              <div onClick={() => document.getElementById("fileInput").click()}>
                <FaCamera />
              </div>
            </>
          )}
        </div>
        <div className="profile-img-txt">
          <h1>{userData?.first_name} {userData?.last_name}</h1>
          <h3>{userData?.userName}</h3>
        </div>
      </Flex>
      {/* Personal Information ________________________________ */}
      <div className="profile-info">
        <h5>Personal Information</h5>
        <div style={{marginTop: '14px'}} className="d-flex">
          <p>Registered As:</p>
          <p className="profile-value-text ">{userData?.roll == "User" ? "Individual" : userData?.roll}</p>
        </div>
        <div className="d-flex">
          <p>First Name:</p>
          <p className="profile-value-text ">{userData?.first_name}</p>
        </div>
        <div className="d-flex">
          <p>Last Name:</p>
          <p className="profile-value-text ">{userData?.last_name}</p>
        </div>
        <div className="d-flex">
          <p>Phone:</p>
          <p className="profile-value-text ">{userData?.phone}</p>
        </div>
        <div className="d-flex">
          <p>Created Date &amp; Time:</p>
          <p className="user-value-text">
            {userData?.openingDateISO
              ? localDate(userData?.openingDateISO)
              : userData?.openingDate}{" "}
            {userData?.openingDateISO
              ? localTime(userData?.openingDateISO)
              : ""}
          </p>
        </div>
      </div>

      {/* Address ________________________________ */}
      <div className="profile-info">
          <div>
            <h5>Address</h5>
            <div style={{marginTop: '14px'}} className="d-flex">
              <p>Address Line 1:</p>
              <p className="profile-value-text">{userData?.addressLine1}</p>
            </div>
            <div className="d-flex">
              <p>Address Line 1:</p>
              <p className="profile-value-text">{userData?.addressLine2}</p>
            </div>
            <div className="d-flex">
              <p>Postal Code:</p>
              <p className="profile-value-text">{userData?.postalCode}</p>
            </div>
            <div className="d-flex">
              <p>City:</p>
              <p className="profile-value-text">{userData?.city}</p>
            </div>
            <div className="d-flex">
              <p>State:</p>
              <p className="profile-value-text">{userData?.state?.name}</p>
            </div>
            <div className="d-flex">
              <p>Country:</p>
              <p className="profile-value-text">{userData?.country?.name}</p>
            </div>
          </div>
      </div>

      {/* <div className="row profile-download-row">
        <div className="col-6">
          <div className="profile-info">
            <h5>Label Info</h5>
                <div style={{marginTop: '14px'}}>
                  <div className="d-flex">
                    <p className="profile-downloadRow-label">Label Name:</p>
                    <p className="profile-value-text">demo</p>
                  </div>
                  <div className="d-flex">
                    <p className="profile-downloadRow-label">Channel Name:</p>
                    <p className="profile-value-text">demo</p>
                  </div>
                  <div className="d-flex">
                    <p className="profile-downloadRow-label">Channel URL:</p>
                    <p className="profile-value-text">demo</p>
                  </div>
                  <div className="d-flex">
                    <p className="profile-downloadRow-label">Subscriber Count:</p>
                    <p className="profile-value-text">1</p>
                  </div>
                  <div className="d-flex">
                    <p className="profile-downloadRow-label">Videos Count:</p>
                    <p className="profile-value-text">11</p>
                  </div>
                </div>
          </div>
        </div>



        <div className="col-6">
          <div className="profile-info" style={{ marginLeft: "16px" }}>
            <h5 style={{ marginBottom: "10px" }}>Documents</h5>
            <span
              className="profile-downloadRow-label"
              style={{ fontSize: "14px" }}
            >
              Government ID
            </span>
            <div className="d-flex">
              <div className="profile-info-download-div">
                <p>Front Page.PDF</p>
                <button>Download</button>
              </div>
              <div className="profile-info-download-div">
                <p>Front Page.PDF</p>
                <button>Download</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      
      <div className="profile-info d-flex">
        <div style={{ width: "80%" }}>
            <div >
              <h5>Security Info</h5>

              <div style={{marginTop: '14px'}} className="d-flex">
                <p>Email:</p>
                <p className="profile-value-text">{userData?.email}</p>
              </div>
            </div>
        </div>
        <Dialog.Root>
          <Dialog.Trigger className="profile-pass-btn">
            Change Email
          </Dialog.Trigger>
          <Modal title="Change Email">
              <div className="prodile-modal">
                  <label>New Email</label>
                  <input type="email" onChange={e => setEmail(e.target.value)}/>
                  {errors.currentPass && <p>Current Password Required</p>}
                  {
                    emailChangeLoading && <FormSubmitLoading/>
                  }
                  {
                    emailErr && <p style={{color: 'red'}}>{emailErr}</p>
                  }
              </div>
              <button onClick={changeEmailFunc} className="close-button">
                Change Email
              </button>

              {/* Hidden Dialog.Close for programmatic close */}
              <Dialog.Close asChild>
                <button
                  ref={emailCloseRef}
                  style={{ display: "none" }}
                />
              </Dialog.Close>
          </Modal>
        </Dialog.Root>
      </div>
      <div style={{margin: '0px'}} className="profile-info d-flex">
        <div style={{ width: "80%" }}>
            <div >
              <div className="d-flex">
                <p>Password:</p>
                <p className="profile-value-text">*********</p>
              </div>
            </div>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="profile-pass-btn">
            Change Password
          </Dialog.Trigger>
          <Modal title="Change Password">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="prodile-modal">
                  {/* <label>Enter current Password</label>
                  <input type="password" placeholder="************" {...register('currentPass', {required: true})}/>
                  {errors.currentPass && <p>Current Password Required</p>} */}
                  <label>Enter New Password</label>
                  <input type="password" placeholder="************" {...register('pass1', {required: true})}/>
                  {errors.pass1 && <p>Password Required</p>}
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="************" {...register('pass2', {required: true})}/>
                  {errors.pass2 && <p>Password Required</p>}
                  {
                    loading && <p>Loading ......</p>
                  }
                  {
                    passMatchErr && <p>{passMatchErr}</p>
                  }
              </div>
              <button type="submit" className="close-button">
                Change Password
              </button>
            </form>
          </Modal>
        </Dialog.Root>
      </div>
    </div>
  );
}

export default Profile;
