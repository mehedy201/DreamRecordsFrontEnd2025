import ImageUpload from "../../../components/ImageUpload";
import * as RadioGroup from "@radix-ui/react-radio-group";
import SearchDropdown from "../../../components/SearchDropdown";

import PropTypes from "prop-types";
import { useState } from "react";
import SelectDropdown from "../../../components/SelectDropdown";

function AlbumInformation({ artistsItems, LablesItems }) {
  const [isVariousArtists, setIsVariousArtists] = useState("no");
  const [isUPC, setIsUPC] = useState("yes");

  return (
    <div>
      <h3 className="create-release-heading">Fill Album Information</h3>
      <div className="createRelease-content-div">
        {" "}
        <ImageUpload
          title="Album Artwork *"
          description="This will be displayed on Release profile"
          placeholderImg="upload-img.png"
          placeholderTxt="Drop your image here"
        />
        <br />
        <label>Release Tittle *</label>
        <input type="text" name="firstName" />
        <label>Version/subtittle</label>
        <input type="text" name="firstName" />
        <div className="form-grid release-form-grid">
          <div>
            <label htmlFor="">
              Is this a compilation of various artists? *
            </label>
            <RadioGroup.Root
              className="radio-group"
              value={isVariousArtists}
              onValueChange={setIsVariousArtists}
            >
              <label className="radio-label">
                <span>
                  <RadioGroup.Item className="radio-item" value="no" />
                  &nbsp; No
                </span>
              </label>
              <label className="radio-label">
                <span>
                  <RadioGroup.Item className="radio-item" value="yes" />
                  &nbsp; Yes
                </span>
              </label>
            </RadioGroup.Root>
          </div>
          {isVariousArtists === "yes" ? (
            <div>
              <label htmlFor="">Select Artist *</label>

              <SearchDropdown
                items={artistsItems}
                itemKey="name"
                imagePath="artists/"
                imageKey="img"
                searchTxt="Search and select artist"
                itemName="Artist"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <label htmlFor="">Featuring</label>
        <SearchDropdown
          items={artistsItems}
          itemKey="name"
          imagePath="artists/"
          imageKey="img"
          itemName="Artist"
          searchTxt="Search and select Genre"
        />
        <div className="form-grid release-form-grid">
          <div>
            <label htmlFor="">Genre *</label>

            <SelectDropdown
              options={["Option 1", "Option 2", "Option 3"]}
              placeholder="Select genre..."
              className="createRelease-dropdown"
            />
          </div>
          <div>
            <label htmlFor="">Sub-Genre *</label>
            <SelectDropdown
              options={["Option 1", "Option 2", "Option 3"]}
              placeholder="Select sub-genre..."
              className="createRelease-dropdown"
            />
          </div>
        </div>
        <label htmlFor="">Label Name *</label>
        <SearchDropdown
          items={LablesItems}
          itemKey="name"
          imagePath="lables/"
          imageKey="img"
          itemName="Label"
          searchTxt="Search and select label"
        />
        <div className="form-grid release-form-grid">
          <div>
            <label htmlFor="">Production Year *</label>
            <SelectDropdown
              options={["Option 1", "Option 2", "Option 3"]}
              placeholder="Select a year..."
              className="createRelease-dropdown"
            />
          </div>
          <div>
            <label htmlFor="">Physical/Original release date *</label>
            <input
              type="date"
              style={{
                width: "auto",
                height: "40px",
                padding: "0 !important",
              }}
            />
          </div>
        </div>
        <div className="form-grid release-form-grid">
          <div>
            <label htmlFor="">℗ line *</label>

            <input type="text" />
          </div>
          <div>
            <label htmlFor="">© line *</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-grid release-form-grid">
          <div>
            <label htmlFor="">Do you already have a UPC/EAN? *</label>

            <RadioGroup.Root
              className="radio-group"
              value={isUPC}
              onValueChange={setIsUPC}
            >
              <label className="radio-label">
                <span>
                  <RadioGroup.Item className="radio-item" value="no" />
                  &nbsp; No
                </span>
              </label>
              <label className="radio-label">
                <span>
                  <RadioGroup.Item className="radio-item" value="yes" />
                  &nbsp; Yes
                </span>
              </label>
            </RadioGroup.Root>
          </div>
          {isUPC === "yes" && (
            <div>
              <label htmlFor="">UPC/EAN *</label>
              <input type="text" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
AlbumInformation.propTypes = {
  artistsItems: PropTypes.array.isRequired,
  LablesItems: PropTypes.array.isRequired,
};
export default AlbumInformation;
