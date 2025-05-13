import { Flex } from "@radix-ui/themes";
import SelectDropdown from "../../components/SelectDropdown";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import ArtistCard from "../../components/ArtistCard";
import PropTypes from "prop-types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Link } from "react-router-dom";
const Artists = ({ artistsItems }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownItem = (
    <SelectDropdown
      options={["Account", "Profile", "Settings"]}
      placeholder="All Time"
    />
  );

  return (
    <div className="main-content">
      <Flex className="page-heading">
        <h2>Artists</h2>
        <Link
          to="/create-artist"
          className="theme-btn"
          style={{
            textDecoration: "none",
            marginRight: 0,
            marginLeft: "auto",
            width: "185px",
            textAlign: "center",
          }}
        >
          + Create New
        </Link>
      </Flex>

      <div className="search-setion">
        <input type="text" placeholder="Search..." style={{ width: "87%" }} />
        {/* First Dropdown */}
        {isMobile ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="dropdown-trigger"
                style={{
                  width: "56px",
                  justifyContent: "center",
                  marginRight: "0",
                }}
              >
                <HiOutlineAdjustmentsHorizontal
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="center"
              side="bottom"
              className="dropdown-content"
            >
              {dropdownItem}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          dropdownItem
        )}
      </div>
      <br />
      <ArtistCard artistsItems={artistsItems} />
      <Pagination />
    </div>
  );
};
Artists.propTypes = {
  artistsItems: PropTypes.array.isRequired, // Ensure artistsItems is an array
};
export default Artists;
