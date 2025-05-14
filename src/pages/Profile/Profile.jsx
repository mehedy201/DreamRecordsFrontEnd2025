import { useEffect, useState } from "react";
import { Flex } from "@radix-ui/themes";
import "./Profile.css";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCamera } from "react-icons/fa";
import Modal from "../../components/Modal";
const personalInfo = [
  { title: "Address:" },
  { label: "Registered As:", value: "Individual" },
  { label: "First Name:", value: "John" },
  { label: "Last Name:", value: "Doe" },
  { label: "Phone:", value: "+91 8001134466" },
];
const Address = [
  { title: "Address" },
  {
    label: "Address Line 1:",
    value: "H.No 10 Ward No. Jharpuri Road Dungeja",
  },
  { label: "Address Line 2:", value: "Pinanagwan, Punhana, Nuh" },
  { label: "Postal Code:", value: "122508" },
  { label: "City:", value: "Gurgaon" },
  { label: "State:", value: "Haryana" },
  { label: "Country:", value: "India" },
];
const LabelInfo = [
  { title: "Label Info" },
  { label: "Channel Name:", value: "AKMDigital" },
  {
    label: "Channel URL:",
    value:
      "https://open.spotify.com/?flow_ctx=7aa5a067-6601-4e29-9794-07af35e39eee%3A1738420603",
  },
  { label: "Subscriber Count:", value: "124616956" },
  { label: "Videos Count:", value: "92357" },
];
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
                src="src/assets/artists/artist1.png"
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
          <h1>John Doe</h1>
          <h3>johndoe</h3>
        </div>
      </Flex>
      <div className="profile-info">
        {personalInfo.map((item, index) => (
          <div key={index}>
            <h5>{item.title}</h5>
            <div className="d-flex">
              <p>{item.label}</p>
              <p className="profile-value-text ">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="profile-info">
        {Address.map((item, index) => (
          <div key={index}>
            <h5>{item.title}</h5>
            <div className="d-flex">
              <p>{item.label}</p>
              <p className="profile-value-text">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="row profile-download-row">
        <div className="col-6">
          <div className="profile-info">
            {LabelInfo.map((item, index) => (
              <div key={index}>
                <h5>{item.title}</h5>

                <div className="d-flex">
                  <p className="profile-downloadRow-label">{item.label}</p>
                  {item.label === "Channel URL:" ? (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-value-text"
                    >
                      {item.value.slice(0, 35) + "..."}
                    </a>
                  ) : (
                    <p className="profile-value-text">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
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
            {/* <div>
                <span>Agreement</span>
                <div
                  className="profile-info-download-div"
                  style={{ marginRight: "0" }}
                >
                  <p>Front Page.PDF</p>
                  <button>Download</button>
                </div>
              </div> */}
          </div>
        </div>
      </div>
      <div className="profile-info d-flex">
        <div style={{ width: "80%" }}>
          {security.map((item, index) => (
            <div key={index}>
              <h5>{item.title}</h5>

              <div className="d-flex">
                <p>{item.label}</p>
                <p className="profile-value-text">{item.value}</p>
              </div>
            </div>
          ))}
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
