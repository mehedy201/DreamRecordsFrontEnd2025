import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { X } from "lucide-react";
import axios from "axios";
import demoImg from "../assets/icons/upload-img.png";
import { cdnLink } from "../hooks/cdnLink";

const ReleaseImgUpload = ({
  link,
  imgLink,
  setImgLink,
  className,
  setUploadedImage,
  uploadedImage,
}) => {
  const [error, setError] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleFileChange = (e) => {
    setError("");
    setUploadLoading(true);
    const file = e.target.files[0];
    // Check image Type ___________________________________
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setError("Please Select JPEG, JPG and PNG file");
      uploadLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Check image size ___________________________________
    if (file) {
      const img = new window.Image();
      img.onload = function () {
        if (this.width === 3000 && this.height === 3000) {
          setError("");
          axios
            .post(link, formData)
            .then((res) => {
              if (res.status == 200) {
                setImgLink(res.data.data.key);
                setUploadedImage(res.data.data);
                setUploadLoading(false);
              }
            })
            .catch((er) => console.log(er));
        } else {
          setError("Please upload an image with dimensions 3000x3000 pixels.");
          if (event.target) {
            event.target.value = ""; // Clear the input field
          }
          setUploadLoading(false);
          return;
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const deleteFile = (key) => {
    if (key) {
      axios
        .delete(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/delete-file?key=${key}`
        )
        .then((res) => {
          if (res.status == 200) {
            setUploadedImage("");
            setImgLink("");
          }
        })
        .catch((er) => console.log(er));
    }
  };

  return (
    <div className="upload-container">
      <div className={`upload-box ${className || ""}`}>
        {imgLink ? (
          <div className="image-preview">
            <img src={cdnLink(imgLink)} alt="Uploaded" className="uploaded-img" />
            <button
              className="img-upload-remove-btn"
              onClick={() => deleteFile(uploadedImage.key)}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label
            style={{
              height: "256px",
              width: "256px",
              margin: "auto",
              position: "relative",
              overflow: "hidden",
            }}
            className="upload-label"
          >
            {uploadLoading ? (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  borderRadius: "10px",
                }}
              >
                <div className="upload-spinner-span"></div>
                <p style={{ marginTop: "10px" }}>Uploading...</p>
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <img src={demoImg} alt="upload-img" className="upload-icon" />
                <p>
                  Drop your image here or &nbsp;
                  <span className="browse-file">Browse File</span>
                </p>
              </div>
            )}

            <input
              style={{ height: "256px", width: "256px", opacity: "0" }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="img-upload-info">
        <h3 style={{ fontWeight: "500" }}>Album Artwork *</h3>
        <p style={{ color: "#838383" }}>
          This will be displayed on Release profile
        </p>
      </div>
    </div>
  );
};

// ✅ Add PropTypes validation
ReleaseImgUpload.propTypes = {
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

export default ReleaseImgUpload;
