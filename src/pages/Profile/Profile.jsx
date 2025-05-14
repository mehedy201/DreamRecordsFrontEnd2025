import { useEffect, useState } from "react";
import { Flex } from "@radix-ui/themes";
import "./Profile.css";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCamera } from "react-icons/fa";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";


const security = [
  { title: "Security Info" },

  { label: "Email:", value: "johndoe@gmail.com" },
  {
    label: "Password:",
    value: "*********",
  },
];

function Profile() {
  const [image, setImage] = useState(null);

  // const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userData);
  console.log(userData)

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
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
        <Dialog.Root>
          <Dialog.Trigger className="profile-pass-btn">
            Change Password
          </Dialog.Trigger>
          <Modal title="Change Password">
            <div className="prodile-modal">
              <label>Enter current Password</label>
              <input type="text" placeholder="************" />
              <label>Enter New Password</label>
              <input type="text" placeholder="************" />
              <label>Confirm New Password</label>
              <input type="text" placeholder="************" />
            </div>
            <Dialog.Close className="close-button">
              Change Password
            </Dialog.Close>
          </Modal>
        </Dialog.Root>
      </div>
    </div>
  );
}

export default Profile;
