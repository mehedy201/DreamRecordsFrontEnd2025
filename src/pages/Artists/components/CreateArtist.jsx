import ImageUpload from "../../../components/ImageUpload";
import { useState } from "react";
import facbookIcon from '../../../assets/social/facebook.png'
import appleIcon from '../../../assets/social/apple-music.png'
import instaIcon from '../../../assets/social/instagram.png'
import spotifyIcon from '../../../assets/social/spotify-icon.png'
import youtubeIcon from '../../../assets/social/youtube-icon.png'
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function CreateArtist() {

  const navigate = useNavigate();
  const {userNameIdRoll} = useSelector(state => state.userData)
  const [imgLink, setImgLink] = useState(imgUrl);
  const [uploadedImage, setUploadedImage] = useState({imgUrl, key});


  const {register, handleSubmit, formState: {errors}} = useForm()
  const onSubmit = async (data) => {
      const date = new Date().toISOString();
      const formData = {...data, ...uploadedImage, masterUserId: userNameIdRoll[1], userName: userNameIdRoll[0], date};
      axios.post(`http://localhost:5000/api/v1/artist/create-artist`, formData)
      .then(res => {
          if(res.status == 200){
            setUploadedImage()
            navigate('/artist/1/10')
          }
      })
      .catch(er => console.log(er))    
  }

  return (
    <div className="main-content">
      <div className="artist-editImg-div">
        {" "}
        <ImageUpload
          link={`http://localhost:5000/api/v1/artist/upload-artist-img`}
          setImgLink={setImgLink}
          imgLink={imgLink}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          title="Artist’s Image"
          description="This will be displayed on Artist’s profile"
          placeholderTxt="Drop your image here"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="editArtist-info" style={{ marginRight: 0 }}>
          <h4>Basic Information</h4>
          <label htmlFor="" style={{ marginBottom: "5px", display: "block" }}>
            Official name
          </label>
          <input {...register("artistName", { required: true})} type="text" style={{ width: "100%" }} />
          {errors.artistName && <span>Artist Name Required</span>}
        </div>
        <br />
        <div className="singleArtist-social-div" style={{ marginRight: 0 }}>
          <h4>Artist Profiles</h4>
          <div className="add-atrist">
              <div><img src={spotifyIcon} alt={''} /></div><input
                type="text"
                placeholder='eg. 6kXwOyEW4VffTqJut6h7J6'
                className="social-input"
                {...register("spotifyId")}
              />
          </div>
          <div className="add-atrist">
              <div><img src={appleIcon} alt={''} /></div><input
                type="text"
                placeholder='eg. 123456789'
                className="social-input"
                {...register("appleId")}
              />
          </div>
          <div className="add-atrist">
              <div><img src={facbookIcon} alt={''} /></div><input
                type="text"
                placeholder='eg. facebook.com/username'
                className="social-input"
                {...register("facebook")}
              />
          </div>
          <div className="add-atrist">
              <div><img src={instaIcon} alt={''} /></div><input
                type="text"
                placeholder='eg. username'
                className="social-input"
                {...register("instagramId")}
              />
          </div>
          <div className="add-atrist">
              <div><img src={youtubeIcon} alt={''} /></div><input
                type="text"
                placeholder='eg. youtube.com/username'
                className="social-input"
                {...register("youtube")}
              />
          </div>
        </div>

        <button type="submit" className="imgUpload-save-btn">Save</button>
      </form>
    </div>
  );
}

export default CreateArtist;
