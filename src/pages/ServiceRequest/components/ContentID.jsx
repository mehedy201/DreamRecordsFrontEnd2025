import { Flex } from "@radix-ui/themes";
import Modal from "../../../components/Modal";
import SearchDropdown from "../../../components/SearchDropdown";
import * as Dialog from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import Table from "../../../components/Table";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import SelectDropdown from "../../../components/SelectDropdown";
const contentIDColumns = [
  { label: "Release", key: "release" },
  { label: "Created At", key: "date" },
  { label: "Status", key: "status" },
  { label: "Reason", key: "reason" },
];
function ContentID({
  // modalReleaseDropdown1,
  // setModalReleaseDropdown1,
  Release_Claim,
  renderReleaseCell,
  // setSelectedOption2,
  // setSelectedOption1,
  // selectedOption1,
  // selectedOption2,
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
  const ProcessContent_Id = Release_Claim.map((item, index) => ({
    ...item,
    reason:
      item.reason === "info_icon" ? (
        <Dialog.Root key={index}>
          <Dialog.Trigger className="serviceRequest-view-trigger">
            <IoEyeOutline style={{ width: "24px", height: "24px" }} />
          </Dialog.Trigger>
          <Modal title="Content ID">
            <div className=" serviceRequest-tableModal-info">
              <div className="d-flex">
                <p>Tittle:</p>
                <p>{item.release}</p>
              </div>
              <div className="d-flex">
                <p>UPC:</p>
                <p>{item.release_sample}</p>
              </div>
              <div className="d-flex">
                <p>Created At:</p>
                <p>{item.date}</p>
              </div>
              <div className="d-flex">
                <p>Change Status: </p>
                <p>{item.status}</p>
              </div>
              {item.status === "REJECTED" && (
                <>
                  <p style={{ fontSize: "14px", color: "#838383" }}>
                    Reject Reason
                  </p>
                  <ul>
                    <li>Reason 1</li>
                    <li>Reason 2</li>
                    <li>Reason 3</li>
                    <li>Reason 4</li>
                    <li>Reason 5</li>
                    <li>Reason 6</li>
                  </ul>
                </>
              )}
            </div>
          </Modal>
        </Dialog.Root>
      ) : (
        item.reason
      ),
  }));
  return (
    <div>
      {" "}
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
                placeholder="Content ID"
                className="Service-modal-dropdown-trigger"
              />

              <p style={{ fontSize: "12px" }}>Choose Release</p>
              <SearchDropdown
                items={Release_Claim}
                itemKey="release"
                imageKey="img"
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
        columns={contentIDColumns}
        data={ProcessContent_Id}
        renderCell={renderReleaseCell}
      />
    </div>
  );
}
ContentID.propTypes = {
  modalReleaseDropdown1: PropTypes.bool.isRequired,
  setModalReleaseDropdown1: PropTypes.func.isRequired,
  Release_Claim: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,
};
export default ContentID;
