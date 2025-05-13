import { Flex } from "@radix-ui/themes";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import "./Lables.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectDropdown from "../../components/SelectDropdown";
const Lables = ({ LablesItems }) => {
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
        <h2>Lables</h2>
        <Link
          to="/edit-lable"
          className="theme-btn"
          style={{
            textDecoration: "none",
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
      <div className="lables-container">
        {LablesItems.map((item, index) => (
          <Link
            to="/single-lable"
            state={{ lable: item }}
            key={index}
            className="lables-card"
          >
            <img
              src={`src/assets/lables/${item.img}`}
              alt={`src/assets/lables/${item.img}`}
            />
            <Flex style={{ display: "flex" }}>
              <div
                className="card-type-txt"
                style={
                  item.type == "Reject"
                    ? { background: "#FEEBEC", color: "#E5484D" }
                    : item.type == "Pending"
                    ? { background: "#FFEBD8", color: "#FFA552" }
                    : { background: "#E6F6EB", color: "#2B9A66" }
                }
              >
                {item.type}
              </div>
              <div className="card-date-txt">{item.date}</div>
            </Flex>
            <p style={{ fontWeight: "500" }}>{item.name}</p>
          </Link>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Lables;

Lables.propTypes = {
  LablesItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};
