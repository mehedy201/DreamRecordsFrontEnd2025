import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Popover from "@radix-ui/react-popover";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "./Modal";
import CreateArtist from "../pages/Artists/components/CreateArtist";
import CreateLabel from "../pages/Lables/components/CreateLabel";
import demoImg from "../assets/artists/artist4.png";
import CreateRelease from "../pages/Release/components/CreateRelease";

const AnalyticsSearchDropwon = ({
  items,
  onSelect,
  value,
  searchTxt = "Search...",
  selectRelease,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState(value ? value : []);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setSelectedItems(value ? value : []);
  }, [value]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(true);

    // 🧠 If user clears the input manually, remove the selected item
    if (value === "") {
      setSelectedItems([]);
      onSelect([]);
    }
  };
  const handleItemClick = (item) => {
    if (!selectedItems.some((selectedItem) => selectedItem._id === item._id)) {
      if (selectRelease && selectRelease === "Single") {
        setSelectedItems([item]);
        onSelect([item]);
      } else {
        const newItems = [...selectedItems, item];
        setSelectedItems(newItems);
        onSelect(newItems);
      }
    }
    setTimeout(() => {
      setSearchQuery("");
      setShowResults(false);
    }, 0);
  };

  const handleRemoveItem = (keyValue) => {
    const updatedItems = selectedItems.filter((item) => item._id !== keyValue);
    setSelectedItems(updatedItems);
    onSelect(updatedItems);
  };

  const filteredItems = items?.filter((item) =>
    item.releaseTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", position: "relative", width: "100%" }}>
        <input
          type="text"
          value={
            searchQuery ||
            (selectedItems.length > 0 ? selectedItems[0].releaseTitle : "")
          }
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
            {items?.map((item, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleItemClick(item)}
              >
                <span>{item?.releaseTitle}</span>
              </div>
            ))}
          </Popover.Content>
        </Popover.Root>

        {/* Search results dropdown */}
        {searchQuery && showResults && (
          <div className="search-results-dropdown">
            {filteredItems?.length > 0 ? (
              filteredItems?.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item?.releaseTitle}</span>
                </div>
              ))
            ) : (
              <div className="searchDropdown-notFound-div">
                <p className="no-items">Release Not Found ?</p>
                <Dialog.Root>
                  <Dialog.Trigger className="theme-btn">
                    Create New Release +
                  </Dialog.Trigger>
                  <Modal className="searchDropdown-modal-content">
                    <CreateRelease />
                  </Modal>
                </Dialog.Root>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ❌ Removed the old selected-items-list display completely */}
    </div>
  );
};

// ✅ PropTypes
AnalyticsSearchDropwon.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      artistName: PropTypes.string,
      labelName: PropTypes.string,
      imgUrl: PropTypes.string,
      _id: PropTypes.string,
    })
  ).isRequired,
  itemKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  searchTxt: PropTypes.string,
  itemName: PropTypes.string,
};

export default AnalyticsSearchDropwon;
