import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import "./Profile.css";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCamera } from "react-icons/fa";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import auth from "../../../firebase.config";
import { EmailAuthProvider, updatePassword, reauthenticateWithCredential } from "firebase/auth";


function Profile() {

  // const dispatch = useDispatch();
  const {userData, userNameIdRoll} = useSelector((state) => state.userData);

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

    const user = auth.currentUser;
    try {
        // 1. Verify current password
      const credential = EmailAuthProvider.credential(
        user.email, 
        data.currentPass
      );
      // 2. Reauthenticate user
      await reauthenticateWithCredential(user, credential);
        // If reauthentication succeeds, update password
        await updatePassword(user, data.pass1);
        setPassMatchErr('');
        setLoading(false);
        setOpen(false)
        alert('Password updated successfully');
    } catch (error) {
        setLoading(false);
        if (error.code === 'auth/wrong-password') {
            setError('Current password is incorrect');
        } 
        else if (error.code === 'auth/requires-recent-login') {
            setError('Session expired. Please sign in again.');
            // You might want to redirect to login here
        }
        else {
            setError('Password update failed: ' + error.message);
        }
    }
    setOpen(false)
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
                src={userData?.image}
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
      </div>

      {/* Address ________________________________ */}
      <div className="profile-info">
          <div>
            <h5>Address</h5>
            <div style={{marginTop: '14px'}} className="d-flex">
              <p>Address Line 1:</p>
              <p className="profile-value-text">{userData?.address}</p>
            </div>
            <div className="d-flex">
              <p>Address Line 1:</p>
              <p className="profile-value-text">{userData?.address2}</p>
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

      <div className="row profile-download-row">
        <div className="col-6">
          <div className="profile-info">
            <h5>Label Info</h5>
            {/* {userData?.label &&  */}
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
            {/* } */}
          </div>
        </div>
        {/* Govorment Document _________________________________ */}
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
      </div>
      <div className="profile-info d-flex">
        <div style={{ width: "80%" }}>
            <div >
              <h5>Security Info</h5>

              <div style={{marginTop: '14px'}} className="d-flex">
                <p>Email:</p>
                <p className="profile-value-text">{userData?.email}</p>
              </div>
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
                  <label>Enter current Password</label>
                  <input type="password" placeholder="************" {...register('currentPass', {required: true})}/>
                  {errors.currentPass && <p>Current Password Required</p>}
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
