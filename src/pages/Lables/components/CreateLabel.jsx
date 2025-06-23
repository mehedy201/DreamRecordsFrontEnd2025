// import ImageUpload from "../../../components/ImageUpload";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import facbookIcon from '../../../assets/social/facebook.png'
// import instaIcon from '../../../assets/social/instagram.png'
// import youtubeIcon from '../../../assets/social/youtube-icon.png'
// import { useForm } from "react-hook-form";
// import axios from "axios";

// function CreateLabel({fromReleaseForm, openModal, setSearchQuery, selectedItems, onSelect}) {
//   const navigate = useNavigate();
//   const {userNameIdRoll} = useSelector(state => state.userData)
//   const [imgLink, setImgLink] = useState();
//   const [uploadedImage, setUploadedImage] = useState();

//   const {register, handleSubmit, reset, formState: {errors}} = useForm()
//   const onSubmit = async (data) => {
//       const date = new Date().toISOString();
//       const formData = {...data, ...uploadedImage, masterUserId: userNameIdRoll[1], userName: userNameIdRoll[0], status: 'Pending', date};
//       console.log(formData)
//       axios.post(`http://localhost:5000/api/v1/labels/create-labels`, formData)
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
//               return;
//             }else{
//               navigate('/labels/1/10')
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
//           link={`http://localhost:5000/api/v1/labels/upload-labels-img`}
//           setImgLink={setImgLink}
//           imgLink={imgLink}
//           uploadedImage={uploadedImage}
//           setUploadedImage={setUploadedImage}
//           title="Label Image"
//           description="This will be displayed on label profile"
//           placeholderImg="upload-img.png"
//           placeholderTxt="Drop your image here"
//         />
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="editLable-info">
//             <h4>Basic Information</h4>
//             <label>Label name</label>
//             <input {...register("labelName", { required: true})} type="text" />   
//             {errors.labelName && <span>Label Name Required</span>}
//         </div>
//         <br />
//         <div className="singleLable-social-div" style={{ marginLeft: 0 }}>
//             <h4>Label Profiles</h4>
//             <div className="add-atrist">
//                 <div style={{ margin: "auto" }}><img src={facbookIcon} alt='facebook' /></div>
//                 <input
//                     type="text"
//                     placeholder='eg. facebook.com/username'
//                     className="social-input"
//                     {...register('facebook')}
//                 />
//             </div>
//             <div className="add-atrist">
//                 <div style={{ margin: "auto" }}><img src={instaIcon} alt='facebook' /></div>
//                 <input
//                     type="text"
//                     placeholder='eg. username'
//                     className="social-input"
//                     {...register('instagram')}
//                 />
//             </div>
//             <div className="add-atrist">
//                 <div style={{ margin: "auto" }}><img src={youtubeIcon} alt='facebook' /></div>
//                 <input
//                     type="text"
//                     placeholder='eg. youtube.com/username'
//                     className="social-input"
//                     {...register('youtube')}
//                 />
//             </div>
//         </div>
//         <br />
//         <button type="submit" className="imgUpload-save-btn">Save</button>
//       </form>
//     </div>
//   );
// }

// export default CreateLabel;


import ImageUpload from "../../../components/ImageUpload";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import facbookIcon from '../../../assets/social/facebook.png';
import instaIcon from '../../../assets/social/instagram.png';
import youtubeIcon from '../../../assets/social/youtube-icon.png';
import axios from "axios";
import { setReFetchLabel } from "../../../redux/features/reFetchDataHandleSlice/reFetchDataHandleSlice";
import toast from "react-hot-toast";

function CreateLabel({ fromReleaseForm, openModal, setSearchQuery }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userNameIdRoll } = useSelector(state => state.userData);
  const { reFetchLabel } = useSelector(state => state.reFetchSlice);

  const [imgLink, setImgLink] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formData, setFormData] = useState({
    labelName: "",
    facebook: "",
    instagram: "",
    youtube: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.labelName.trim()) newErrors.labelName = "Label Name is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      ...uploadedImage,
      masterUserId: userNameIdRoll[1],
      userName: userNameIdRoll[0],
      status: "Pending",
      date: new Date().toISOString(),
    };

    axios.post(`http://localhost:5000/api/v1/labels/create-labels`, payload)
      .then(res => {
        if (res.status === 200) {
          if (fromReleaseForm) {
            toast.success("Successfully created the Label, but you can't add it now. Because it is pending now!")
            setSearchQuery('');
            dispatch(setReFetchLabel(reFetchLabel + 1));
            openModal(false);
          } else {
            navigate('/labels/1/10/All');
          }

          // Reset form
          setFormData({
            labelName: "",
            facebook: "",
            instagram: "",
            youtube: ""
          });
        }
        setUploadedImage('');
      })
      .catch(error => {
        console.error("Failed to create label:", error);
      });
  };

  return (
    <div className="main-content">
      <div className="artist-editImg-div">
        <ImageUpload
          link={`http://localhost:5000/api/v1/labels/upload-labels-img`}
          setImgLink={setImgLink}
          imgLink={imgLink}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          title="Label Image"
          description="This will be displayed on label profile"
          placeholderImg="upload-img.png"
          placeholderTxt="Drop your image here"
        />
      </div>

      <div className="editLable-info">
        <h4>Basic Information</h4>
        <label>Label name</label>
        <input
          type="text"
          name="labelName"
          value={formData.labelName}
          onChange={handleChange}
        />
        {errors.labelName && <span style={{ color: "red" }}>{errors.labelName}</span>}
      </div>

      <br />

      <div className="singleLable-social-div" style={{ marginLeft: 0 }}>
        <h4>Label Profiles</h4>

        <div className="add-atrist">
          <div style={{ margin: "auto" }}><img src={facbookIcon} alt="facebook" /></div>
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
          <div style={{ margin: "auto" }}><img src={instaIcon} alt="instagram" /></div>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="eg. username"
            className="social-input"
          />
        </div>

        <div className="add-atrist">
          <div style={{ margin: "auto" }}><img src={youtubeIcon} alt="youtube" /></div>
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

      <br />
      <button onClick={handleSubmit} className="imgUpload-save-btn">Save</button>
    </div>
  );
}

CreateLabel.propTypes = {
  fromReleaseForm: PropTypes.bool,
  openModal: PropTypes.func,
  setSearchQuery: PropTypes.func,
  selectedItems: PropTypes.array,
  onSelect: PropTypes.func
};

export default CreateLabel;

