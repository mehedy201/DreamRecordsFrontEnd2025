import SearchDropdown from "../../../components/SearchDropdown";

import { useState } from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";

import PropTypes from "prop-types";
import ImageUpload from "../../../components/ImageUpload";
import SelectDropdown from "../../../components/SelectDropdown";

function AlbumTrackList({ artistsItems }) {
  const [addAlbumSong, setAddAlbumSong] = useState([]);
  // const [productionYearDropdown, setProductionYearDropdown] = useState(false);

  const addForm = () => {
    setAddAlbumSong((prevForms) => [
      ...prevForms,
      { id: Date.now(), instrumental: "No" },
    ]);
  };
  const handleInstrumentalChange = (id, value) => {
    setAddAlbumSong((prevForms) =>
      prevForms.map((form) =>
        form.id === id ? { ...form, instrumental: value } : form
      )
    );
  };

  const removeForm = (id) => {
    setAddAlbumSong((prevForms) => prevForms.filter((form) => form.id !== id));
  };
  return (
    <div>
      {" "}
      <div className={addAlbumSong ? "add-album-div" : ""}>
        {addAlbumSong.map((form) => (
          <div key={form.id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4>Fill Track Meta Data</h4>
              <button
                onClick={() => removeForm(form.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "-15px",
                }}
              >
                ❌
              </button>
            </div>
            <ImageUpload
              placeholderImg="upload-img.png"
              placeholderTxt="Drop your image here"
              className="release-img-upload"
            />
            <label htmlFor="">Instrumental *</label>
            <RadioGroup.Root
              className="radio-group"
              value={form.instrumental}
              onValueChange={(value) =>
                handleInstrumentalChange(form.id, value)
              }
            >
              <label className="radio-label">
                <span>
                  <RadioGroup.Item className="radio-item" value="No" />
                  &nbsp; No
                </span>
              </label>
              <label className="radio-label">
                <span>
                  <RadioGroup.Item className="radio-item" value="Yes" />
                  &nbsp; Yes
                </span>
              </label>
            </RadioGroup.Root>
            {form.instrumental === "No" ? (
              <>
                <label>Tittle *</label>
                <input type="text" />
                <label>Version/Subtittle</label>
                <input type="text" />
                <div className="form-grid release-form-grid">
                  <div>
                    <label htmlFor="">Primary Artist *</label>

                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select primary artist"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Featuring</label>

                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select featuring"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Lyricist *</label>

                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select lyricist"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Composer *</label>

                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select composer"
                    />
                  </div>
                  <div>
                    <label>Arranger</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Producer</label>
                    <input type="text" />
                  </div>
                </div>
                <label>Publisher</label>
                <input type="text" />
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
                  <div>
                    <label>℗ line *</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Production Year *</label>
                    <SelectDropdown
                      options={["Option 1", "Option 2", "Option 3"]}
                      placeholder="Select a year..."
                      className="createRelease-dropdown"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Do you already have a ISRC? *</label>
                    <RadioGroup.Root className="radio-group" defaultValue="Yes">
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item className="radio-item" value="No" />
                          &nbsp; No
                        </span>
                      </label>
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item className="radio-item" value="Yes" />
                          &nbsp; Yes
                        </span>
                      </label>
                    </RadioGroup.Root>
                  </div>
                  <div>
                    <label>ISRC *</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Parental advisory *</label>
                    <RadioGroup.Root className="radio-group" defaultValue="Yes">
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item className="radio-item" value="No" />
                          &nbsp; No
                        </span>
                      </label>
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item className="radio-item" value="Yes" />
                          &nbsp; Yes
                        </span>
                      </label>
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item
                            className="radio-item"
                            value="Cleaned"
                          />
                          &nbsp; Cleaned
                        </span>
                      </label>
                    </RadioGroup.Root>
                  </div>
                  <div>
                    <label htmlFor="">Preview start </label>
                    <input type="number" />
                  </div>
                </div>
                <label htmlFor="">Lyrics Language *</label>
                <SelectDropdown
                  options={["Option 1", "Option 2", "Option 3"]}
                  placeholder="Select language..."
                  className="createRelease-dropdown"
                />

                <label htmlFor="">Lyrics</label>
                <textarea></textarea>
                <br />
                <br />
              </>
            ) : (
              <>
                <label>Tittle *</label>
                <input type="text" />
                <label>Version/Subtittle</label>
                <input type="text" />
                <div className="form-grid release-form-grid">
                  <div>
                    <label htmlFor="">Primary Artist *</label>

                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select primary artist"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Featuring</label>

                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select featuring"
                    />
                  </div>
                </div>
                <label htmlFor="">Composer *</label>

                <SearchDropdown
                  items={artistsItems}
                  itemKey="name"
                  imagePath="artists/"
                  imageKey="img"
                  searchTxt="Search and select composer"
                />
                <div className="form-grid release-form-grid">
                  <div>
                    <label htmlFor="">Arranger </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Producer </label>
                    <input type="text" />
                  </div>
                </div>
                <label htmlFor="">Publisher </label>
                <input type="text" />
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
                  <div>
                    <label>℗ line *</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Production Year *</label>
                    <SelectDropdown
                      options={["Option 1", "Option 2", "Option 3"]}
                      placeholder="Select a year..."
                      className="createRelease-dropdown"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Do you already have a ISRC? *</label>
                    <RadioGroup.Root className="radio-group" defaultValue="Yes">
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item className="radio-item" value="No" />
                          &nbsp; No
                        </span>
                      </label>
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item className="radio-item" value="Yes" />
                          &nbsp; Yes
                        </span>
                      </label>
                    </RadioGroup.Root>
                  </div>
                  <div>
                    <label>ISRC *</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Parental advisory *</label>
                    <RadioGroup.Root className="radio-group" defaultValue="Yes">
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item className="radio-item" value="No" />
                          &nbsp; No
                        </span>
                      </label>
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item className="radio-item" value="Yes" />
                          &nbsp; Yes
                        </span>
                      </label>
                      <label className="radio-label">
                        <span>
                          <RadioGroup.Item
                            className="radio-item"
                            value="Cleaned"
                          />
                          &nbsp; Cleaned
                        </span>
                      </label>
                    </RadioGroup.Root>
                  </div>
                  <div>
                    <label htmlFor="">Preview start </label>
                    <input type="number" />
                  </div>
                </div>
                <label htmlFor="">Lyrics Language *</label>
                <SelectDropdown
                  options={["Option 1", "Option 2", "Option 3"]}
                  placeholder="Select language..."
                  className="createRelease-dropdown"
                />

                <label htmlFor="">Lyrics</label>
                <textarea></textarea>
                <br />
                <br />
              </>
            )}
            {/* add album  track Instrumental yes no section end */}
          </div>
        ))}

        <button
          className="theme-btn"
          style={{ width: "100%", margin: "0" }}
          onClick={addForm}
        >
          Add Track +
        </button>
      </div>
    </div>
  );
}
AlbumTrackList.propTypes = {
  artistsItems: PropTypes.array.isRequired,
  LablesItems: PropTypes.array.isRequired,
};
export default AlbumTrackList;
