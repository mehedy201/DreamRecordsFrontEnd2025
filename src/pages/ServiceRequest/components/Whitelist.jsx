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
import { useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as Select from "@radix-ui/react-select";
import SearchDropdownRelease from "../../../components/SearchDropdownRelease";
import NotFoundComponent from "../../../components/NotFoundComponent";
import { Check, ChevronDown } from "lucide-react";


const WhiteListColumns = [
  { label: "Release", key: "release" },
  { label: "Whitelist Link", key: "url" },
  { label: "Created At", key: "date" },
  { label: "Status", key: "status" },
  { label: "Action", key: "reason" },
];
function Whitelist({ 
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
  const {userNameIdRoll} = useSelector((state) => state.userData);
  const { reFetchArtist, reFetchLabel } = useSelector(state => state.reFetchSlice);



  const [releaseData, setReleaseData] = useState();
  useEffect( () => {
    if(userNameIdRoll){
      axios.get(`http://localhost:5000/api/v1/release/${userNameIdRoll[1]}?page=1&limit=1000&status=All`)
        .then( res => {
          if(res.status == 200){
            setReleaseData(res.data.data);
          }
        })
        .catch(er => console.log(er));
    }
  },[userNameIdRoll]);

  // Artist Data Get Form API ____________________________
  const [artist, setArtist] = useState()
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/artist/for-release/${userNameIdRoll ? userNameIdRoll[1]: ''}`)
    .then(res => {
        setArtist(res.data.data)
    })
  }, [userNameIdRoll, reFetchArtist])

  // Label Data Get Form API ____________________________
  const [lebel, setLabel] = useState()
  useEffect(() => {
    if(userNameIdRoll){
      axios.get(`http://localhost:5000/api/v1/labels/for-release/${userNameIdRoll[1]}`)
      .then(res => {
          setLabel(res.data.data);
      })
    }
  }, [userNameIdRoll, reFetchLabel])





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
  const [isOpen, setIsOpen] = useState(false);
  // Form  ____________________________________________________
  const {register, handleSubmit, setValue, watch, control, formState: {errors}} = useForm()
  const onSubmit = (data) => {
    console.log(data)
    setIsOpen(false)
  }




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
              <input
                type="text"
                value='Whitelist'
                className="service-modal-input"
                {...register("claimOption", { required: true})}
                readOnly
              />
              {errors.claimOption && <span style={{color: '#ea3958'}}>Whitelist Required</span>}

              <p style={{ fontSize: "12px" }}>Type</p>
              <Select.Root 
                onValueChange={e => setValue('type', e, { shouldValidate: true })}
                defaultValue="Youtube"
              >
                <Select.Trigger className='dropdown-trigger Service-modal-dropdown-trigger'>
                  <Select.Value/>
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
                      <Select.Item value='Youtube' className="select-item">
                        <Select.ItemText>Youtube</Select.ItemText>
                        <Select.ItemIndicator className="select-item-indicator">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item value='Facebook' className="select-item">
                        <Select.ItemText>Facebook</Select.ItemText>
                        <Select.ItemIndicator className="select-item-indicator">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item value='Instagram' className="select-item">
                        <Select.ItemText>Instagram</Select.ItemText>
                        <Select.ItemIndicator className="select-item-indicator">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              {errors.type && <span style={{color: '#ea3958'}}>Type Required</span>}

              <p style={{ fontSize: "12px" }}>Choose Artist*</p>
              <SearchDropdown
                items={artist}
                searchTxt="Search and select artist"
                itemName="Artist"
                register={{...register("artist", { required: true})}}
                onSelect={(items) => setValue("artist", items, { shouldValidate: true })}
                value={watch("artist")}
              />
              {errors.artist && <span style={{color: '#ea3958'}}>Please Select Artist</span>}

              <p style={{ fontSize: "12px" }}>Label Name *</p>
              <SearchDropdown
                items={lebel}
                itemName="Label"
                searchTxt="Search and select label"
                onSelect={(items) => setValue("labels", items, { shouldValidate: true })}
                register={{...register("labels", { required: true})}}
                value={watch("labels")}
              />
              {errors.labels && <span style={{color: '#ea3958'}}>Please Select Label</span>}

              <p style={{ fontSize: "12px" }}>Choose 10 Release below</p>
              <SearchDropdownRelease
                items={releaseData}
                searchTxt="Search and select Release"
                onSelect={(items) => setValue("release", items, { shouldValidate: true })}
                register={{...register("release", { required: true})}}
                value={watch("release")}
              />
              {errors.release && <span style={{color: '#ea3958'}}>Release Required</span>}

              <p style={{ fontSize: "12px" }}>Give the link to whitelist *</p>
              <input
                type="text"
                placeholder="Paste link here"
                className="service-modal-input"
                {...register("whiteListLink", { required: true})}
              />
              {errors.artistProfileLink && <span style={{color: '#ea3958'}}>Whitelist Link Required</span>}
              <button type="submit" className="close-button">Submit</button>
            </div>
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
          tableFor="Whitelist"
        />
      }
      {
        notFound && <NotFoundComponent/> 
      }
    </div>
  );
}
Whitelist.propTypes = {
  modalReleaseDropdown1: PropTypes.bool.isRequired,
  setModalReleaseDropdown1: PropTypes.func.isRequired,
  Release_Claim: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,

  artistsItems: PropTypes.array.isRequired,
};
export default Whitelist;
