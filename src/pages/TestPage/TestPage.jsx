// import React from 'react';

// const TestPage = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default TestPage;

import React, { useState } from 'react';

// Track input form
const TrackForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow mb-4">
      <input
        type="text"
        name="title"
        placeholder="Track Title"
        value={formData.title || ''}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g., 04:23)"
        value={formData.duration || ''}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist Name"
        value={formData.artist || ''}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

// Track card component
const TrackCard = ({ data, onEdit, isExpanded }) => {
  return (
    <div className="border p-4 mb-2 rounded shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">{data.title}</p>
          <p className="text-sm text-gray-600">{data.artist} - {data.duration}</p>
        </div>
        <button onClick={onEdit} className="text-blue-600 underline text-sm">
          {isExpanded ? 'Collapse' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

// Main release upload page
const TestPage = () => {
  const [mode, setMode] = useState('single');
  const [tracks, setTracks] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setTracks([]);
    setShowForm(true);
    setEditIndex(null);
  };

  const handleTrackSubmit = (formData) => {
    if (editIndex !== null) {
      const updated = [...tracks];
      updated[editIndex] = formData;
      setTracks(updated);
      setEditIndex(null);
    } else {
      setTracks([...tracks, formData]);
    }
    setShowForm(false);
  };

  return (
    <>
    {tracktFormat === "Singles" ? (
          <>
            {" "}

            <ReleaseAudioUpload/>
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
                {/* <label>Tittle *</label>
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
                <br /> */}
              </>
            ) : (
              <>
                {/* <label>Tittle *</label>
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
                <br /> */}
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
        )}</>
  );
};

export default TestPage;

