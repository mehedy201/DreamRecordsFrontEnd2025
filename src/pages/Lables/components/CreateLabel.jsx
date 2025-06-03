import ImageUpload from "../../../components/ImageUpload";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import facbookIcon from '../../../assets/social/facebook.png'
import instaIcon from '../../../assets/social/instagram.png'
import youtubeIcon from '../../../assets/social/youtube-icon.png'
import { useForm } from "react-hook-form";
import axios from "axios";

function CreateLabel() {
  const navigate = useNavigate();
  const {userNameIdRoll} = useSelector(state => state.userData)
  const [imgLink, setImgLink] = useState();
  const [uploadedImage, setUploadedImage] = useState();

  const {register, handleSubmit, formState: {errors}} = useForm()
  const onSubmit = async (data) => {
      const date = new Date().toISOString();
      const formData = {...data, ...uploadedImage, masterUserId: userNameIdRoll[1], userName: userNameIdRoll[0], status: 'Pending', date};
      console.log(formData)
      axios.post(`http://localhost:5000/api/v1/labels/create-labels`, formData)
      .then(res => {
          if(res.status == 200){
            setUploadedImage()
            navigate('/labels/1/10')
          }
      })
      .catch(er => console.log(er))    
  }

  return (
    <div className="main-content">
      <div className="artist-editImg-div">
        {" "}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="editLable-info">
            <h4>Basic Information</h4>
            <label>Label name</label>
            <input {...register("labelName", { required: true})} type="text" />   
            {errors.labelName && <span>Label Name Required</span>}
        </div>
        <br />
        <div className="singleLable-social-div" style={{ marginLeft: 0 }}>
            <h4>Label Profiles</h4>
            <div className="add-atrist">
                <div style={{ margin: "auto" }}><img src={facbookIcon} alt='facebook' /></div>
                <input
                    type="text"
                    placeholder='eg. facebook.com/username'
                    className="social-input"
                    {...register('facebook')}
                />
            </div>
            <div className="add-atrist">
                <div style={{ margin: "auto" }}><img src={instaIcon} alt='facebook' /></div>
                <input
                    type="text"
                    placeholder='eg. username'
                    className="social-input"
                    {...register('instagram')}
                />
            </div>
            <div className="add-atrist">
                <div style={{ margin: "auto" }}><img src={youtubeIcon} alt='facebook' /></div>
                <input
                    type="text"
                    placeholder='eg. youtube.com/username'
                    className="social-input"
                    {...register('youtube')}
                />
            </div>
        </div>
        <br />
        <button type="submit" className="imgUpload-save-btn">Save</button>
      </form>
    </div>
  );
}

export default CreateLabel;
