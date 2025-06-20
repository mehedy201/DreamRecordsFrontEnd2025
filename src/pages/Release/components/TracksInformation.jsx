import PropTypes from "prop-types";
import ImageUpload from "../../../components/ImageUpload";
import * as RadioGroup from "@radix-ui/react-radio-group";
import SearchDropdown from "../../../components/SearchDropdown";
import { useState } from "react";
import AlbumTrackList from "./AlbumTrackList";
import { Collapsible } from "radix-ui";
import { Slider } from "radix-ui";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPlayCircleOutline } from "react-icons/io5";
import SelectDropdown from "../../../components/SelectDropdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReleaseAudioUpload from "../../../components/ReleaseAudioUpload";
function TracksInformation({ artistsItems, albumTrackList, step, setStep, steps, handleNext, handlePrev }) {
  const [tracktFormat, setTrackFormat] = useState("Singles");
  const [addAlbumInstrument, setAddAlbumInstrument] = useState("No");

  const [albumSongList, setAlbumSongList] = useState({});
  const toggleAlbum = (index) => {
    setAlbumSongList((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <>
      <h3 className="create-release-heading">Fill Tracks Meta Data</h3>
      <div className="createRelease-content-div">
        <label htmlFor="">Format</label>
        <RadioGroup.Root
          className="radio-group"
          value={tracktFormat}
          onValueChange={setTrackFormat}
        >
          <label className="radio-label">
            <span>
              <RadioGroup.Item className="radio-item" value="Singles" />
              &nbsp; Singles
            </span>
          </label>
          <label className="radio-label">
            <span>
              <RadioGroup.Item className="radio-item" value="Album" />
              &nbsp; Album
            </span>
          </label>
        </RadioGroup.Root>
        {tracktFormat === "Singles" ? (
          <>
            {" "}

            <ReleaseAudioUpload

            />
            <label htmlFor="">Instrumental *</label>
            <RadioGroup.Root
              className="radio-group"
              value={addAlbumInstrument}
              onValueChange={setAddAlbumInstrument}
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
            {addAlbumInstrument === "No" ? (
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
          </>
        ) : (
          <>
            {albumTrackList.map((album, index) => (
              <Collapsible.Root
                key={index}
                open={albumSongList[index] || false} // Use object state
                onOpenChange={() => toggleAlbum(index)}
              >
                <Collapsible.Trigger asChild>
                  <div className="release-album-list">
                    <IoPlayCircleOutline className="release-album-playIcon" />
                    <div>
                      <p>{album.title}</p>
                      <small>{album.artist}</small>
                    </div>
                    <div className="d-flex release-album-RangeDiv">
                      <p>{album.duration}</p>
                      <Slider.Root
                        className="rangeSliderRoot"
                        defaultValue={[50]}
                        max={100}
                        step={1}
                      >
                        <Slider.Track className="SliderTrack">
                          <Slider.Range className="SliderRange" />
                        </Slider.Track>
                        <Slider.Thumb
                          className="SliderThumb"
                          aria-label="Volume"
                        />
                      </Slider.Root>
                      {albumSongList[index] ? (
                        <IoIosArrowUp className="release-album-arrowIcon" />
                      ) : (
                        <IoIosArrowDown className="release-album-arrowIcon" />
                      )}
                    </div>
                  </div>
                </Collapsible.Trigger>

                <Collapsible.Content>
                  <span>line</span>
                </Collapsible.Content>
              </Collapsible.Root>
            ))}
            <AlbumTrackList artistsItems={artistsItems} />
          </>
        )}
      </div>
      {step === 4 || (
        <div className="createRelease-btns">
          {step > 0 && (
            <button
              className="theme-btn2"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={handlePrev}
            >
              <ArrowLeft />
              &nbsp; Back
            </button>
          )}
          <button
            style={{
              margin: "auto",
              background: "none",
              border: "none",
            }}
          >
            cancel
          </button>
          {step < steps.length - 1 ? (
            <button className="theme-btn" onClick={handleNext}>
              Next &nbsp; <ArrowRight />
            </button>
          ) : (
            <button className="theme-btn" onClick={() => setStep(4)}>
              Submit &nbsp; <ArrowRight />
            </button>
          )}
        </div>
      )}
    </>
  );
}
TracksInformation.propTypes = {
  artistsItems: PropTypes.array.isRequired,
  LablesItems: PropTypes.array.isRequired,
  albumTrackList: PropTypes.array.isRequired,
};
export default TracksInformation;
