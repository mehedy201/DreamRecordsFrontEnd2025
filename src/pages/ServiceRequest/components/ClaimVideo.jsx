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
const ClaimVideoColumns = [
  { label: "Release", key: "release" },
  { label: "Video Link", key: "url" },
  { label: "Created At", key: "date" },
  { label: "Status", key: "status" },
  { label: "Action", key: "reason" },
];
function ClaimVideo({
  Release_Claim,

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
  const ProcessClaimVideo = Release_Claim.map((item, index) => ({
    ...item,
    reason:
      item.reason === "info_icon" ? (
        <Dialog.Root key={index}>
          <Dialog.Trigger className="serviceRequest-view-trigger">
            <IoEyeOutline style={{ width: "24px", height: "24px" }} />
          </Dialog.Trigger>
          <Modal title="Claim Video">
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
                <p>URL:</p>
                <p>{item.url}</p>
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
              {/* <Dropdown
                label="Claim Video"
                options={["Option 1", "Option 2", "Option 3"]}
                onSelect={setModalReleaseDropdown1}
                select={modalReleaseDropdown1}
                className="Service-modal-dropdown-trigger"
              /> */}
              <SelectDropdown
                options={[
                  "Option 1",
                  "Option 2",
                  "Option 3",
                  "Option 4",
                  "Option 5",
                  "Option 6",
                ]}
                placeholder="Claim Video"
                className="Service-modal-dropdown-trigger"
              />

              <p style={{ fontSize: "12px" }}>Choose Release</p>
              <SearchDropdown
                items={Release_Claim}
                itemKey="release"
                imageKey="img"
                searchTxt="Search & select release"
              />
              <p style={{ fontSize: "12px" }}>Video link*</p>
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
        tableFor='ClaimVideo'
        columns={ClaimVideoColumns}
        data={ProcessClaimVideo}
        renderCell={renderReleaseCell}
      />
    </div>
  );
}
ClaimVideo.propTypes = {
  Release_Claim: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,
};
export default ClaimVideo;
