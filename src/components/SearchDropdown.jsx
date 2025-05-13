import { useState } from "react";
import PropTypes from "prop-types";
import * as Popover from "@radix-ui/react-popover";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "./Modal";
import EditSingleArtist from "../pages/Artists/components/EditSingleArtist";
import EditLable from "../pages/Lables/components/EditLable";
const SearchDropdown = ({
  items,
  itemKey,
  imageKey,
  onSelect,
  imagePath = "",
  searchTxt = "Search...",
  itemName,
  artistSocialItems,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  // const handleItemClick = (item) => {
  //   if (
  //     !selectedItems.some(
  //       (selectedItem) => selectedItem[itemKey] === item[itemKey]
  //     )
  //   ) {
  //     const newSelectedItems = [...selectedItems, item];
  //     setSelectedItems(newSelectedItems);
  //     onSelect(newSelectedItems);
  //   }
  //   setSearchQuery("");
  //   setShowResults(false);

  // };
  const handleItemClick = (item) => {
    if (
      !selectedItems.some(
        (selectedItem) => selectedItem[itemKey] === item[itemKey]
      )
    ) {
      setSelectedItems([...selectedItems, item]);
    }

    // Slight delay to ensure input is cleared properly
    setTimeout(() => {
      setSearchQuery("");
      setShowResults(false);
    }, 0);
  };
  const handleRemoveItem = (keyValue) => {
    const updatedItems = selectedItems.filter(
      (item) => item[itemKey] !== keyValue
    );
    setSelectedItems(updatedItems);
    onSelect(updatedItems);
  };

  const filteredItems = items.filter((item) =>
    item[itemKey]?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(selectedItems);
  return (
    <div>
      <div style={{ display: "flex", position: "relative", width: "100%" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={searchTxt}
          className="service-modal-search"
        />
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="service-modal-search-trigger dropdown-trigger">
              <ChevronDown />
            </button>
          </Popover.Trigger>

          <Popover.Content className="popover-content">
            {items.map((item, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleItemClick(item)}
              >
                <span>{item[itemKey]}</span>
              </div>
            ))}
          </Popover.Content>
        </Popover.Root>
        {/* Search results dropdown */}
        {searchQuery && showResults && (
          <div className="search-results-dropdown">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item[itemKey]}</span>
                </div>
              ))
            ) : (
              <div className="searchDropdown-notFound-div">
                <p className="no-items">{itemName} Not Found ?</p>
                {itemName === "Artist" ? (
                  <Dialog.Root>
                    <Dialog.Trigger className="theme-btn">
                      Create New {itemName} +
                    </Dialog.Trigger>
                    <Modal className="searchDropdown-modal-content">
                      <EditSingleArtist socialItems={artistSocialItems} />
                    </Modal>
                  </Dialog.Root>
                ) : itemName === "Label" ? (
                  <Dialog.Root>
                    <Dialog.Trigger className="theme-btn">
                      Create New {itemName} +
                    </Dialog.Trigger>
                    <Modal className="searchDropdown-modal-content">
                      <EditLable />
                    </Modal>
                  </Dialog.Root>
                ) : (
                  <button className="theme-btn">Create New {itemName} +</button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Display selected items */}
      {selectedItems.length > 0 && (
        <div className="selected-items-list">
          <div className="selected-items">
            {selectedItems.map((item, index) => (
              <div key={index} className="selected-item">
                {imageKey && (
                  <img
                    src={`src/assets/${imagePath}/${item[imageKey]}`}
                    alt={item[itemKey]}
                    className="item-image"
                  />
                )}
                <div className="item-details">
                  <p>{item[itemKey]}</p>
                  <small>{item?.release_sample}</small>
                </div>
                <span onClick={() => handleRemoveItem(item[itemKey])}>
                  <Cross1Icon />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Add PropTypes validation
SearchDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      release: PropTypes.string,
      name: PropTypes.string,
      img: PropTypes.string,
    })
  ).isRequired,
  itemKey: PropTypes.string.isRequired,
  imageKey: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  imagePath: PropTypes.string,
  searchTxt: PropTypes.string,
  itemName: PropTypes.string,
  artistSocialItems: PropTypes.array.isRequired,
};

export default SearchDropdown;
