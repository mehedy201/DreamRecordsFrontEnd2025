import { useEffect, useState } from "react";
import { Flex } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../../components/Modal";
import SearchDropdown from "../../../components/SearchDropdown";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import PropTypes from "prop-types";
import Table from "../../../components/Table";
import { IoEyeOutline } from "react-icons/io5";
import SelectDropdown from "../../../components/SelectDropdown";
const OACColumns = [
  { label: "Release", key: "release" },
  { label: "Topic Channel Link", key: "url" },
  { label: "Created At", key: "date" },
  { label: "Status", key: "status" },
  { label: "Action", key: "reason" },
];
function OAC({
  Release_Claim,

  artistsItems,
  renderReleaseCell,
}) {
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
  const ProcessOAC = Release_Claim.map((item) => ({
    ...item,
    reason:
      item.reason === "info_icon" ? (
        <IoEyeOutline style={{ width: "24px", height: "24px" }} />
      ) : (
        item.reason
      ),
  }));
  return (
    <div>
      <Flex className="page-heading serviceRequest-heading">
        <h2>Service Request</h2>
        <Dialog.Root>
          <Dialog.Trigger className="theme-btn">+ Create New</Dialog.Trigger>
          <Modal title="Create New Service Request">
            <div className="serviceRequest-modal-content">
              <p className="modal-description">
                If you want to claim a service request, please fill the details
                below for associated tracks with appropriate links.
              </p>
              <p style={{ fontSize: "12px" }}>Service Request</p>

              <SelectDropdown
                options={["Option 1", "Option 2", "Option 3"]}
                placeholder="OAC"
                className="Service-modal-dropdown-trigger"
              />

              <p style={{ fontSize: "12px" }}>Choose Artist</p>

              <SearchDropdown
                items={artistsItems}
                itemKey="name"
                imagePath="artists/"
                searchTxt="Search & select artist"
                imageKey="img"
              />
              <p style={{ fontSize: "12px" }}>Choose 5 Release below</p>

              <SearchDropdown
                items={Release_Claim}
                itemKey="release"
                imageKey="img"
                searchTxt="Search & select release"
              />
              <p style={{ fontSize: "12px" }}>Artists Topic channel link *</p>
              <input
                type="text"
                placeholder="Paste link here"
                className="service-modal-input"
              />
              <p style={{ fontSize: "12px" }}>Artists YoutTube channel link*</p>
              <input
                type="text"
                placeholder="Paste link here"
                className="service-modal-input"
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
        tableFor='OAC'
        columns={OACColumns}
        data={ProcessOAC}
        renderCell={renderReleaseCell}
      />
    </div>
  );
}
OAC.propTypes = {
  modalReleaseDropdown1: PropTypes.bool.isRequired,
  setModalReleaseDropdown1: PropTypes.func.isRequired,
  Release_Claim: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,

  artistsItems: PropTypes.array.isRequired,
};
export default OAC;
