// import ImageUpload from "../../../components/ImageUpload";
// import { useEffect, useState } from "react";
// import facbookIcon from '../../../assets/social/facebook.png'
// import appleIcon from '../../../assets/social/apple-music.png'
// import instaIcon from '../../../assets/social/instagram.png'
// import spotifyIcon from '../../../assets/social/spotify-icon.png'
// import youtubeIcon from '../../../assets/social/youtube-icon.png'
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { setReFetchArtist } from "../../../redux/features/reFetchDataHandleSlice/reFetchDataHandleSlice";

// function CreateArtist({fromReleaseForm, openModal, setSearchQuery, selectedItems, onSelect}) {

//   const { reFetchArtist } = useSelector(state => state.reFetchSlice);
//   const dispatch = useDispatch();

//   const navigate = useNavigate();
//   const {userNameIdRoll} = useSelector(state => state.userData)
//   const [imgLink, setImgLink] = useState();
//   const [uploadedImage, setUploadedImage] = useState();

//   const {register, handleSubmit, reset, formState: {errors}} = useForm()
//   const onSubmit = async (data) => {
//       const date = new Date().toISOString();
//       const formData = {...data, ...uploadedImage, masterUserId: userNameIdRoll[1], userName: userNameIdRoll[0], date};
//       axios.post(`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/create-artist`, formData)
//       .then(res => {
//           if(res.status == 200){
//             setUploadedImage()
//             if(fromReleaseForm){
//               const selectItem = [...selectedItems, formData];
//               onSelect(selectItem)
//               setSearchQuery('')
//               openModal(false)
//               const re = reFetchArtist + 1;
//               dispatch(setReFetchArtist(re))
//               reset();
//             }else{
//               navigate('/artist/1/10')
//               reset();
//             }
//           }
//       })
//       .catch(er => console.log(er))
//   }

//   return (
//     <div className="main-content">
//       <div className="artist-editImg-div">
//         {" "}
//         <ImageUpload
//           link={`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/upload-artist-img`}
//           setImgLink={setImgLink}
//           imgLink={imgLink}
//           uploadedImage={uploadedImage}
//           setUploadedImage={setUploadedImage}
//           title="Artist’s Image"
//           description="This will be displayed on Artist’s profile"
//           placeholderTxt="Drop your image here"
//         />
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="editArtist-info" style={{ marginRight: 0 }}>
//           <h4>Basic Information</h4>
//           <label htmlFor="" style={{ marginBottom: "5px", display: "block" }}>
//             Official name
//           </label>
//           <input {...register("artistName", { required: true})} type="text" style={{ width: "100%" }} />
//           {errors.artistName && <span>Artist Name Required</span>}
//         </div>
//         <br />
//         <div className="singleArtist-social-div" style={{ marginRight: 0 }}>
//           <h4>Artist Profiles</h4>
//           <div className="add-atrist">
//               <div><img src={spotifyIcon} alt={''} /></div><input
//                 type="text"
//                 placeholder='eg. 6kXwOyEW4VffTqJut6h7J6'
//                 className="social-input"
//                 {...register("spotifyId")}
//               />
//           </div>
//           <div className="add-atrist">
//               <div><img src={appleIcon} alt={''} /></div><input
//                 type="text"
//                 placeholder='eg. 123456789'
//                 className="social-input"
//                 {...register("appleId")}
//               />
//           </div>
//           <div className="add-atrist">
//               <div><img src={facbookIcon} alt={''} /></div><input
//                 type="text"
//                 placeholder='eg. facebook.com/username'
//                 className="social-input"
//                 {...register("facebook")}
//               />
//           </div>
//           <div className="add-atrist">
//               <div><img src={instaIcon} alt={''} /></div><input
//                 type="text"
//                 placeholder='eg. username'
//                 className="social-input"
//                 {...register("instagramId")}
//               />
//           </div>
//           <div className="add-atrist">
//               <div><img src={youtubeIcon} alt={''} /></div><input
//                 type="text"
//                 placeholder='eg. youtube.com/username'
//                 className="social-input"
//                 {...register("youtube")}
//               />
//           </div>
//         </div>

//         <button type="submit" className="imgUpload-save-btn">Save</button>
//       </form>
//     </div>
//   );
// }

// export default CreateArtist;

import ImageUpload from "../../../components/ImageUpload";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setReFetchArtist } from "../../../redux/features/reFetchDataHandleSlice/reFetchDataHandleSlice";

import facbookIcon from "../../../assets/social/facebook.png";
import appleIcon from "../../../assets/social/apple-music.png";
import instaIcon from "../../../assets/social/instagram.png";
import spotifyIcon from "../../../assets/social/spotify-icon.png";
import youtubeIcon from "../../../assets/social/youtube-icon.png";

function CreateArtist({
  fromReleaseForm,
  openModal,
  setSearchQuery,
  selectedItems,
  setSelectedItems,
  onSelect,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userNameIdRoll, userData } = useSelector((state) => state.userData);
  const { reFetchArtist } = useSelector((state) => state.reFetchSlice);

  const [imgLink, setImgLink] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formData, setFormData] = useState({
    artistName: "",
    spotifyId: "",
    appleId: "",
    facebook: "",
    instagramId: "",
    youtube: "",
  });
  const [errors, setErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.artistName.trim())
      newErrors.artistName = "Artist Name is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    setButtonLoading(true);

    setTimeout(() => {
      setButtonLoading(false);
      const validationErrors = validate();
      if (Object.keys(validationErrors).length) {
        setErrors(validationErrors);
        return;
      }

      const payload = {
        ...formData,
        ...uploadedImage,
        masterUserId: userNameIdRoll[1],
        email: userData?.email,
        userName: userData?.userName || userNameIdRoll[0],
        date: new Date().toISOString(),
      };

      try {
        axios
          .post(
            `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/create-artist`,
            payload
          )
          .then((res) => {
            if (res.status === 200) {
              const createdArtist = res.data.data.insertedId;
              const formData = { ...payload, _id: createdArtist };

              if (fromReleaseForm) {
                const updatedSelectedItems = [...selectedItems, formData];
                console.log(updatedSelectedItems);
                setSelectedItems(updatedSelectedItems);
                onSelect(updatedSelectedItems);
                setSearchQuery("");
                openModal(false);
                dispatch(setReFetchArtist(reFetchArtist + 1));
              } else {
                navigate("/artist/1/10");
              }

              // Clear form
              setFormData({
                artistName: "",
                spotifyId: "",
                appleId: "",
                facebook: "",
                instagramId: "",
                youtube: "",
              });
              setUploadedImage("");
            }
          })
          .catch((error) => {
            console.error("Failed to create artist:", error);
          });
      } catch (error) {
        console.error("Failed to create artist:", error);
      }
    }, 700);
  };

  return (
    <div className="main-content">
      <div className="artist-editImg-div">
        <ImageUpload
          link="https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/upload-artist-img"
          setImgLink={setImgLink}
          imgLink={imgLink}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          title="Artist’s Image"
          description="This will be displayed on Artist’s profile"
          placeholderTxt="Drop your image here"
        />
      </div>

      <div className="editArtist-info" style={{ marginRight: 0 }}>
        <h4>Basic Information</h4>
        <label
          htmlFor="artistName"
          style={{ marginBottom: "5px", display: "block" }}
        >
          Official name
        </label>
        <input
          type="text"
          name="artistName"
          value={formData.artistName}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        {errors.artistName && (
          <span className="error">{errors.artistName}</span>
        )}
      </div>

      <br />

      <div className="singleArtist-social-div" style={{ marginRight: 0 }}>
        <h4>Artist Profiles</h4>

        <div className="add-atrist">
          <div>
            <img src={spotifyIcon} alt="spotify" />
          </div>
          <input
            type="text"
            name="spotifyId"
            value={formData.spotifyId}
            onChange={handleChange}
            placeholder="eg. 6kXwOyEW4VffTqJut6h7J6"
            className="social-input"
          />
        </div>

        <div className="add-atrist">
          <div>
            <img src={appleIcon} alt="apple" />
          </div>
          <input
            type="text"
            name="appleId"
            value={formData.appleId}
            onChange={handleChange}
            placeholder="eg. 123456789"
            className="social-input"
          />
        </div>

        <div className="add-atrist">
          <div>
            <img src={facbookIcon} alt="facebook" />
          </div>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="eg. facebook.com/username"
            className="social-input"
          />
        </div>

        <div className="add-atrist">
          <div>
            <img src={instaIcon} alt="instagram" />
          </div>
          <input
            type="text"
            name="instagramId"
            value={formData.instagramId}
            onChange={handleChange}
            placeholder="eg. username"
            className="social-input"
          />
        </div>

        <div className="add-atrist">
          <div>
            <img src={youtubeIcon} alt="youtube" />
          </div>
          <input
            type="text"
            name="youtube"
            value={formData.youtube}
            onChange={handleChange}
            placeholder="eg. youtube.com/username"
            className="social-input"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="imgUpload-save-btn createArtist-save-btn btn-spinner"
        disabled={buttonLoading}
        style={{
          opacity: buttonLoading ? 0.9 : 1,
          cursor: buttonLoading ? "not-allowed" : "pointer",
        }}
      >
        {buttonLoading && <span className="btn-spinner-span"></span>} Save
      </button>
    </div>
  );
}

export default CreateArtist;
