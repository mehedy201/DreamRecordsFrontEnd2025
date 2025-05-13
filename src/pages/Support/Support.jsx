import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import SearchDropdown from "../../components/SearchDropdown";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import PropTypes from "prop-types";
import ImageUpload from "../../components/ImageUpload";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectDropdown from "../../components/SelectDropdown";
const supportColumns = [
  { label: "ID", key: "id" },
  { label: "Title", key: "title" },
  { label: "Created At", key: "date" },
  { label: "Last Activity", key: "activity" },
  { label: "Status", key: "status" },
];

const renderSupportCell = (key, row) => {
  if (key === "id" || key === "title" || key === "date" || key === "activity") {
    return (
      <Link
        to="/SupportMessageBox"
        style={{ color: "#1C2024", textDecoration: "none" }}
        state={{ messageBox: row }}
      >
        {key === "id"
          ? row.id
          : key === "title"
          ? row.title
          : key === "date"
          ? row.date
          : row.activity}
      </Link>
    );
  }
  if (key === "status") {
    return (
      <Link
        to="/SupportMessageBox"
        className={`status ${row.status.toLowerCase()}`}
        style={{ fontSize: "11px", textDecoration: "none" }}
        state={{ messageBox: row }}
      >
        {row.status}
      </Link>
    );
  }
  return row[key];
};

function Support({ Release_Claim, support }) {
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
        <Dialog.Root>
          <Dialog.Trigger className="theme-btn">+ Create New</Dialog.Trigger>
          <Modal title="Support Box">
            <div className="support-modal">
              <p className="modal-description">
                If you have a complaint or opinion about something, you can let
                us know. We will try to answer your message as soon as possible
              </p>
              <p style={{ fontSize: "12px" }}>Support Subject *</p>{" "}
              <input type="text" placeholder="Issue name here" />
              <p style={{ fontSize: "12px" }}>Choose Release *</p>
              <SearchDropdown
                items={Release_Claim}
                itemKey="release"
                imageKey="img"
              />
              <p style={{ fontSize: "12px" }}>Describe issue here *</p>{" "}
              <textarea
                type="text"
                placeholder="Write your issue here"
              ></textarea>
              <p style={{ fontSize: "12px" }}>Attach issue image</p>{" "}
              <ImageUpload
                placeholderImg="upload-file.png"
                placeholderTxt="Click to Upload "
                className="supportImgUpload"
              />
            </div>
            <Dialog.Close className="close-button">Submit</Dialog.Close>
          </Modal>
        </Dialog.Root>
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
      <Table
        Table
        columns={supportColumns}
        data={support}
        renderCell={renderSupportCell}
      />
      <Pagination />
    </div>
  );
}
Support.propTypes = {
  support: PropTypes.array.isRequired,
  Release_Claim: PropTypes.array.isRequired,
};
export default Support;
