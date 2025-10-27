import { Flex } from "@radix-ui/themes";
import Modal from "../../../components/Modal";
import SearchDropdown from "../../../components/SearchDropdown";
import * as Dialog from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import Table from "../../../components/Table";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useEffect, useState } from "react";
import SelectDropdown from "../../../components/SelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import NotFoundComponent from "../../../components/NotFoundComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchDropdownRelease from "../../../components/SearchDropdownRelease";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setReFetchServiceRequest } from "../../../redux/features/reFetchDataHandleSlice/reFetchDataHandleSlice";
const contentIDColumns = [
  { label: "Release", key: "release" },
  { label: "Created At", key: "date" },
  { label: "Status", key: "status" },
  { label: "Reason", key: "reason" },
];
function ContentID({
  years,
  notFound,
  filterByYear,
  filterByStatus,
  handleKeyPress,
  setSearchText,
}) {
  const { status } = useParams();
  const { serviceRequestData } = useSelector(
    (state) => state.serviceRequestPageSlice
  );
  const { yearsList } = useSelector((state) => state.yearsAndStatus);
  const { userNameIdRoll } = useSelector((state) => state.userData);
  const { reFetchServiceRequest } = useSelector((state) => state.reFetchSlice);
  const dispatch = useDispatch();

  const [releaseData, setReleaseData] = useState();
  useEffect(() => {
    if (userNameIdRoll) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/${userNameIdRoll[1]}?page=1&limit=1000&status=Live`
        )
        .then((res) => {
          if (res.status == 200) {
            setReleaseData(res.data.data);
          }
        })
        .catch((er) => console.log(er));
    }
  }, [userNameIdRoll]);

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
        placeholder={`${years ? years : "All Time"}`}
        filterByYearAndStatus={filterByYear}
      />

      {isMobile && <br />}
      <SelectDropdown
        options={["All", "Pending", "Solved", "Rejected"]}
        placeholder={status}
        filterByYearAndStatus={filterByStatus}
      />
    </>
  );

  const [isOpen, setIsOpen] = useState(false);
  // Form  ____________________________________________________
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const userName = userNameIdRoll[0];
    const masterUserId = userNameIdRoll[1];
    const status = "Pending";
    const isoDate = new Date().toISOString();
    const payload = { ...data, userName, masterUserId, status, isoDate };
    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/claim-release`,
        payload
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(setReFetchServiceRequest(reFetchServiceRequest + 1));
          toast.success("Successfully Submited");
        }
      });
    setIsOpen(false);
  };

  return (
    <div>
      {" "}
      <Flex className="page-heading serviceRequest-heading">
        <h2>Service Request</h2>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger className="theme-btn">+ Create New</Dialog.Trigger>
          <Modal title="Create New Service Request">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="serviceRequest-modal-content"
            >
              <p className="modal-description">
                If you want to claim a service request, please fill the details
                below for associated tracks with appropriate links.
              </p>
              {/* <p style={{ fontSize: "12px" }}>Service Request</p> */}

              <input
                style={{border: 'none', opacity: '0', position: 'absolute', top: '0px'}}
                type="text"
                value="Content ID"
                className="service-modal-input"
                {...register("claimOption", { required: true })}
                readOnly
              />
              {errors.claimOption && (
                <span style={{ color: "#ea3958" }}>Content ID Required</span>
              )}

              <p style={{ fontSize: "12px" }}>Choose Release</p>
              <SearchDropdownRelease
                items={releaseData}
                searchTxt="Search and select Release"
                onSelect={(items) =>
                  setValue("release", items, { shouldValidate: true })
                }
                register={{ ...register("release", { required: true }) }}
                value={watch("release")}
              />
              {errors.release && (
                <span style={{ color: "#ea3958" }}>Release Required</span>
              )}
              <button type="submit" className="close-button">
                Submit
              </button>
            </form>
          </Modal>
        </Dialog.Root>
      </Flex>
      <div className="search-setion">
        <input
          type="text"
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
        />
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
      {serviceRequestData && (
        <Table serviceRequestData={serviceRequestData} tableFor="ContentID" />
      )}
      {notFound && <NotFoundComponent />}
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
