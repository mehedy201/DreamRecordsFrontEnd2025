import { Flex, TextArea } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Support.css";
import { RiAttachment2 } from "react-icons/ri";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoPaperPlaneOutline } from "react-icons/io5";
function SupportMessageBox() {
  const location = useLocation();
  const [messageBox, setMessageBox] = useState(null);
  useEffect(() => {
    if (location.state?.messageBox) {
      setMessageBox(location.state.messageBox);
    }
  }, [location.state]);
  return (
    <div className="main-content msgBox-section">
      {messageBox ? (
        <Flex className="msgBox-top-section">
          <div>
            <p>{messageBox.title}</p>
            <small>ID:{messageBox.id}</small>
          </div>
          <div className="support-status-div">
            <small>Created on: {messageBox.date}, 17:24</small>
            <p style={{ paddingTop: "8px" }}>
              <small>
                Status:&nbsp;&nbsp;
                <span
                  className={`status support-status ${messageBox.status.toLowerCase()}`}
                >
                  {messageBox.status}
                </span>
              </small>
            </p>
          </div>
        </Flex>
      ) : (
        <p>No message found! Try selecting an list first.</p>
      )}
      <div className="messageBox1">
        <Flex className="d-flex messageBox-release-flex">
          <Link
            to="/ReleaseOverview"
            state={{ supportMessage: location.pathname }}
          >
            <div className="d-flex messageBox-release">
              <img src="src/assets/release.png" alt="" />
              <div>
                <p>Buker Bhitor DJ Baje</p>
                <small>UPC: 43050570716</small>
              </div>
            </div>
          </Link>
          <Link
            to="/ReleaseOverview"
            state={{ supportMessage: location.pathname }}
          >
            <div className="d-flex messageBox-release">
              <img src="src/assets/release.png" alt="" />
              <div>
                <p>Buker Bhitor DJ Baje</p>
                <small>UPC: 43050570716</small>
              </div>
            </div>
          </Link>
        </Flex>
        <div className="messageBox1-msg">
          <p>
            Hello,
            <br /> My album, "Moonlit Dreams," is live, but one of the tracks,
            "Silent Echoes," has the wrong title displayed as "Silent Eagles."
            Can you assist me in correcting this error?Best,
          </p>
        </div>
        <Flex className="d-flex">
          <div className="messageBox1-attachment">
            <img src="src/assets/support-attachment.png" alt="" />
            <div>
              <p>Attachment</p>
              <small>Screenshot 22_01_2025.png</small>
            </div>
          </div>
        </Flex>
      </div>
      <p className="messageBox-time">21 Jan 2025, 19:25</p>
      <div className="messageBox2">
        <p>
          Hello,
          <br />
          Thank you for reaching out to us regarding the incorrect title of your
          track. We sincerely apologize for the inconvenience this has caused.
          We have reviewed your album "Moonlit Dreams" and identified the issue
          with the track "Silent Echoes" being displayed as "Silent Eagles." To
          resolve this, we will update the metadata and ensure the correct title
          is reflected on all streaming platforms.
        </p>
        <p>
          If you have any additional requests or updates, feel free to reply to
          this email. We’ll notify you once the correction has been completed.
          Thank you for your patience and for choosing our platform! Best
          regards,
          <br />
          Team Dream Records
        </p>
      </div>
      <p className="messageBox-time">21 Jan 2025, 19:25</p>

      <br />
      <br />

      <div className="message-type-section">
        <TextArea placeholder="Type your message here..." />
        <Flex className="d-flex " style={{ alignItems: "center" }}>
          <RiAttachment2 />
          <TiMicrophoneOutline />
          <button>
            Send Message <IoPaperPlaneOutline />
          </button>
        </Flex>
      </div>
    </div>
  );
}

export default SupportMessageBox;
