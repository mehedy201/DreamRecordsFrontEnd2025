import PropTypes from "prop-types";
import Table from "../../../components/Table";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../../components/Modal";
import { Flex } from "@radix-ui/themes";
import SearchDropdown from "../../../components/SearchDropdown";
import { IoEyeOutline } from "react-icons/io5";
import SelectDropdown from "../../../components/SelectDropdown";
import { useSelector } from "react-redux";
import NotFoundComponent from "../../../components/NotFoundComponent";
import Pagination from "../../../components/Pagination";
import { useParams } from "react-router-dom";
function ReleaseClaim({
  years,
  notFound,
  filterByYear,
  filterByStatus,
  handleKeyPress,
  setSearchText,
}) {

  const {status} = useParams();
  const {serviceRequestData} = useSelector((state) => state.serviceRequestPageSlice);
  const { yearsList } = useSelector(state => state.yearsAndStatus);

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
        options={yearsList}
        placeholder={`${years ? years : 'All Time'}`}
        filterByYearAndStatus={filterByYear}
      />

      {isMobile && <br />}
      <SelectDropdown
        options={['All', 'Pending', 'Solved','Rejected']}
        placeholder={status}
        filterByYearAndStatus={filterByStatus}
      />
    </>
  );

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
                placeholder="Release Claim"
                className="Service-modal-dropdown-trigger"
              />

              <p style={{ fontSize: "12px" }}>Type</p>
              <SelectDropdown
                options={["Option 1", "Option 2", "Option 3"]}
                placeholder="YouTube"
                className="Service-modal-dropdown-trigger"
              />

              <p style={{ fontSize: "12px" }}>Choose Release</p>
              <SearchDropdown
                items={[]}
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
        <input onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..." />
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

      {
        serviceRequestData &&
        <Table
          serviceRequestData={serviceRequestData}
          tableFor="ReleaseClaim"
        />
      }
      {
        notFound && <NotFoundComponent/> 
      }
    </div>
  );
}
ReleaseClaim.propTypes = {
  Release_Claim: PropTypes.array.isRequired,

  releaseColumns: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,
  filterByYear: PropTypes.func.isRequired,
  filterByStatus: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
};

export default ReleaseClaim;
