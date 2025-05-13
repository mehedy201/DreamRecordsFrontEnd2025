import PropTypes from "prop-types";
import ImageUpload from "../../../components/ImageUpload";
import { useState } from "react";
import demoImg from '../../../assets/artists/artist1.png'


function EditSingleArtist({ data }) {
  console.log(data)
  const [artistSocialUrl, setArtistSocialUrl] = useState(data.socialLinks);
  const [officialName, setOfficialName] = useState(data?.officialName);
  const [image, setImage] = useState(data?.image);

  const handleInputChange = (index, newUrl) => {
    const updatedItems = [...artistSocialUrl];
    updatedItems[index].url = newUrl;
    setArtistSocialUrl(updatedItems);
    localStorage.setItem("artistSocialUrl", JSON.stringify(updatedItems));
  };


  const getAllArtistData = () => {
    const data = {socialLink: artistSocialUrl, officialName, image}
    console.log(data)
  }

  return (
    <div className="main-content">
      <div className="artist-editImg-div">
        {" "}
        <ImageUpload
          setImage={setImage}
          image={image}
          title="Artist’s Image"
          description="This will be displayed on Artist’s profile"
          placeholderImg="upload-img.png"
          placeholderTxt="Drop your image here"
        />
      </div>

      <div className="editArtist-info" style={{ marginRight: 0 }}>
        <h4>Basic Information</h4>
        <label htmlFor="" style={{ marginBottom: "5px", display: "block" }}>
          Official name
        </label>
        <input defaultValue={officialName} onChange={(e) =>setOfficialName(e.target.value)} type="text" style={{ width: "100%" }} />
      </div>
      <br />
      <div className="singleArtist-social-div" style={{ marginRight: 0 }}>
        <h4>Artist Profiles</h4>
        {artistSocialUrl.map((item, index) => (
          <div key={index} className="add-atrist">
            <div>
              {" "}
              <img src={`src/assets/social/${item.img}`} alt={item.name} />
            </div>
            <input
              type="text"
              placeholder={item.placeholder}
              className="social-input"
              value={item.url}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={() => getAllArtistData()} className="imgUpload-save-btn">Save</button>
    </div>
  );
}
EditSingleArtist.propTypes = {
  artistSocialItems: PropTypes.array.isRequired,
};
export default EditSingleArtist;
