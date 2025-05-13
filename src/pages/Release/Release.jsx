import { Flex } from "@radix-ui/themes";
import "./Release.css";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";

import ReleaseCard from "../../components/ReleaseCard";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectDropdown from "../../components/SelectDropdown";

const Release = ({ releaseItems }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownItem = (
    <>
      <SelectDropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="All time"
      />

      {isMobile && <br />}
      <SelectDropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="All Releases"
      />
    </>
  );

  return (
    <div className="main-content">
      <Flex className="page-heading">
        <h2>Releases</h2>
        <Link
          className="theme-btn"
          to="/create-release"
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
        <input type="text" placeholder="Search..." />
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
      <ReleaseCard releaseItems={releaseItems} />
      <Pagination />
    </div>
  );
};
Release.propTypes = {
  releaseItems: PropTypes.array.isRequired,
};
export default Release;
