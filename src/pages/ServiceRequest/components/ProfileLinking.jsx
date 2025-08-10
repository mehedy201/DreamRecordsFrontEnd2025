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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as Select from "@radix-ui/react-select";
import SearchDropdownRelease from "../../../components/SearchDropdownRelease";
import NotFoundComponent from "../../../components/NotFoundComponent";
import { useForm } from "react-hook-form";
import { Check, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { setReFetchServiceRequest } from "../../../redux/features/reFetchDataHandleSlice/reFetchDataHandleSlice";

function ProfileLinking({
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
  const { reFetchArtist } = useSelector((state) => state.reFetchSlice);
  const { reFetchServiceRequest } = useSelector((state) => state.reFetchSlice);
  const dispatch = useDispatch();

  // const [releaseData, setReleaseData] = useState();
  // useEffect(() => {
  //   if (userNameIdRoll) {
  //     axios
  //       .get(
  //         `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/${userNameIdRoll[1]}?page=1&limit=1000&status=Live`
  //       )
  //       .then((res) => {
  //         if (res.status == 200) {
  //           setReleaseData(res.data.data);
  //         }
  //       })
  //       .catch((er) => console.log(er));
  //   }
  // }, [userNameIdRoll]);

  // Artist Data Get Form API ____________________________
  const [artist, setArtist] = useState();
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/for-release/${
          userNameIdRoll ? userNameIdRoll[1] : ""
        }`
      )
      .then((res) => {
        setArtist(res.data.data);
      });
  }, [userNameIdRoll, reFetchArtist]);

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
    if(data.release.length < 5) {
      toast.error("Please select 5 releases");
      return;
    }
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


  const artistData = watch("artist");
  const [releaseData, setReleaseData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (artistData) {
      setLoading(true);
      axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/artist/${artistData[0]?._id}?page=1&limit=1000&status=Live`
      )
      .then((res) => {
        if (res.status == 200) {
          setReleaseData(res.data.data);
          setLoading(false);
        }
      })
      .catch((er) => setLoading(false));
    }
  }, [artistData]);

  return (
    <div>
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
              <p style={{ fontSize: "12px" }}>Service Request</p>
              <input
                type="text"
                value="Profile Linking"
                className="service-modal-input"
                {...register("claimOption", { required: true })}
                readOnly
              />
              {errors.claimOption && (
                <span style={{ color: "#ea3958" }}>
                  Profile Linking Required
                </span>
              )}

              <p style={{ fontSize: "12px" }}>Type</p>
              <Select.Root
                onValueChange={(e) =>
                  setValue("type", e, { shouldValidate: true })
                }
                defaultValue="Instagram"
              >
                <Select.Trigger className="dropdown-trigger Service-modal-dropdown-trigger">
                  <Select.Value />
                  <Select.Icon className="select-icon">
                    <ChevronDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    className="dropdown-content"
                    style={{ padding: 0, overflowY: "auto" }}
                  >
                    <Select.Viewport>
                      {/* <Select.Item value="Youtube" className="select-item">
                        <Select.ItemText>Youtube</Select.ItemText>
                        <Select.ItemIndicator className="select-item-indicator">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item value="Facebook" className="select-item">
                        <Select.ItemText>Facebook</Select.ItemText>
                        <Select.ItemIndicator className="select-item-indicator">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item> */}
                      <Select.Item value="Instagram" className="select-item">
                        <Select.ItemText>Instagram</Select.ItemText>
                        <Select.ItemIndicator className="select-item-indicator">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              {errors.type && (
                <span style={{ color: "#ea3958" }}>Type Required</span>
              )}

              <p style={{ fontSize: "12px" }}>Choose Artist</p>
              <SearchDropdown
                items={artist}
                searchTxt="Search and select artist"
                selectArtist='Single'
                itemName="Artist"
                register={{ ...register("artist", { required: true }) }}
                onSelect={(items) =>
                  setValue("artist", items, { shouldValidate: true })
                }
                value={watch("artist")}
              />
              {errors.artist && (
                <span style={{ color: "#ea3958" }}>Please Select Artist</span>
              )}
              <p style={{ fontSize: "12px" }}>Choose 5 Release below</p>
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
              <p style={{ fontSize: "12px" }}>Artists Profile Link *</p>
              <input
                type="text"
                placeholder="Paste link here"
                className="service-modal-input"
                {...register("artistProfileLink", { required: true })}
              />
              {errors.artistProfileLink && (
                <span style={{ color: "#ea3958" }}>
                  Artists Profile Link Required
                </span>
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
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
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
        <Table
          serviceRequestData={serviceRequestData}
          tableFor="ProfileLinking"
        />
      )}
      {notFound && <NotFoundComponent />}
    </div>
  );
}
ProfileLinking.propTypes = {
  modalReleaseDropdown1: PropTypes.bool.isRequired,
  setModalReleaseDropdown1: PropTypes.func.isRequired,
  Release_Claim: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,

  artistsItems: PropTypes.array.isRequired,
};
export default ProfileLinking;
