import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { X } from "lucide-react";
import placeholderImg from "../../../assets/icons/upload-img.png";
import axios from "axios";

const SignUpImgIdUpload = ({
  link,
  imgLink,
  setImgLink,
  placeholderTxt,
  setUploadedImage,
  uploadedImage,
}) => {
  const [error, setError] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleFileChange = (e) => {
    setError("");
    setUploadLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    // Check image size ___________________________________
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2 MB.");
      setUploadLoading(false);
      return;
    }
    axios
      .post(link, formData)
      .then((res) => {
        if (res.status == 200) {
          setImgLink(res.data.data.imgUrl);
          setUploadedImage(res.data.data);
          setUploadLoading(false);
        }
      })
      .catch((er) => console.log(er));
  };

  const deleteFile = (key) => {
    if (key) {
      axios
        .delete(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/delete-file?key=${key}`
        )
        .then((res) => {
          if (res.status == 200) {
            setUploadedImage();
            setImgLink();
          }
        })
        .catch((er) => console.log(er));
    }
  };

  const uploadedBox = {
    width: "100%",
    height: "180px",
    border: "2px dashed #d9d9d9",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    backgroundColor: "white",
  };

  return (
    <div>
      <div style={{ width: "100%", marginTop: "6px" }}>
        <div style={uploadedBox}>
          <label
            style={{
              height: "180px",
              width: "100%",
              margin: "auto",
              position: "relative",
            }}
            className="upload-label"
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={placeholderImg}
                alt="upload-img"
                className="upload-icon"
              />
              <p>
                {placeholderTxt} or &nbsp;
                <span className="browse-file">Browse File</span>
              </p>
              <p style={{ color: "#BBBBBB" }}>Max. File size: 2MB</p>
            </div>
            {uploadLoading && (
              <div
                style={{
                  height: "180px",
                  width: "100%",
                  borderRadius: "10px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "black",
                  opacity: "0.5",
                }}
              ></div>
            )}
            <input
              style={{ height: "180px", width: "100%", opacity: "0" }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}
      {imgLink && (
        <div
          style={{
            display: "flex",
            gap: "5px",
            margin: "10px 0px",
            alignItems: "start",
          }}
        >
          <img
            src={imgLink}
            alt="Uploaded"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "10px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <button
            style={{ cursor: "pointer", border: "none" }}
            onClick={() => deleteFile(uploadedImage.key)}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

// ✅ Add PropTypes validation
SignUpImgIdUpload.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholderImg: PropTypes.string,
  placeholderTxt: PropTypes.string,
  imageLink: PropTypes.string,
  setImageLink: PropTypes.func,
  setUploadedImage: PropTypes.func,
  uploadedImage: PropTypes.object,
};

export default SignUpImgIdUpload;
