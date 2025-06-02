import { Button, Flex } from "@radix-ui/themes";
import { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReleaseCard from "../../../components/ReleaseCard";
import Dropdown from "../../../components/Dropdown";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { GoPencil } from "react-icons/go";
import Modal from "../../../components/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import { ChevronRight } from "lucide-react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useSelector } from "react-redux";
import useQueryParams from "../../../hooks/useQueryParams";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import demoLabelImage from "../../../assets/lables/lables-placeholder.png"
import threedotPng from '../../../assets/icons/vertical-threeDots.png'
import instagramImg from '../../../assets/social/instagram.png';
import facebookImg from '../../../assets/social/facebook.png';
import youtubeImg from '../../../assets/social/youtube-icon.png'
import localDate from "../../../hooks/localDate";
import useStatusStyle from "../../../hooks/useStatusStyle";


function SingleLable() {
  const navigate = useNavigate();
  const {id, pageNumber, perPageItem, status} = useParams();
  const { yearsList, releaseStatusList } = useSelector(state => state.yearsAndStatus);

  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get('search') || '';
  const years = filterParams.get('years') || '';

  const [label, setLabel] = useState({labelName: 'label'});
  const [deleteLoading, setDeleteLoading] = useState(false)
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/labels/single-labels/${id}`)
      .then(res => {
        if(res.status == 200) {
          setLabel(res.data.data[0])
          console.log(res.data.data[0])
        }
      })
  },[id, deleteLoading])

  // Delete Label________________________
  const deleteLabel = (id, imgKey) => {
      setDeleteLoading(true)
      axios.delete(`http://localhost:5000/api/v1/artist/delete-artist/${id}?imgKey=${imgKey}`)
      .then( res => {
          if(res.status == 200){
              setDeleteLoading(false)
              navigate('/labels/1/10/All')
          }else{
            setDeleteLoading(false)
          }
      })
      .catch(er => console.log(er));
  }

  // Release Under Label __________________________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [releaseData, setReleaseData] = useState();
  const [totalCount, setTotalCount] = useState();
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  // Get Release List ______________________________________________________________
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/release/labels/${id}?page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${search ? search : ''}&years=${years ? years: ''}`)
      .then( res => {
        if(res.status == 200){
          setTotalCount(res.data.totalCount)
          setFilteredCount(res.data.filteredCount)
          setReleaseData(res.data.data);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch(er => console.log(er));
  }, [pageNumber, status, id, perPageItem, search, years]);

  // Responsive Code __________________________________________________
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Years and status Dropdown__________________________
  const handleYearDropDown = (yearValue) => {
    navigateWithParams(`/labels/${id}/1/${perPageItem}/${status}`, { search: search, years: yearValue });
  }
  const handleStatusDropDown = (statusValue) => {
    navigateWithParams(`/labels/${id}/1/${perPageItem}/${statusValue}`, { search: search, years: years });
  }
  const dropdownItem = (
    <>
      <Dropdown
        label={years ? years : "All Time"}
        options={yearsList}
        customFunDropDown={handleYearDropDown}
      />
      {isMobile && <br />}
      <Dropdown
        label={status}
        options={releaseStatusList}
        customFunDropDown={handleStatusDropDown}
      />
    </>
  );

  //  This Function For Label Release Section 
  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/labels/${id}/${page}/${perPageItem}/${status}`, { search: search, years: years });
  }
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigateWithParams(`/labels/${id}/1/${perPageItem}/${status}`, { search: searchText, years: years });
    }
  };
  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItemValue) => {
    navigateWithParams(`/labels/${id}/${pageNumber}/${perPageItemValue}/${status}`, { search: search, years: years });
  }

   


  return (
    <div className="main-content">
      <div className="lable-details">
        {label ? (
          <>
            {label?.status === "Rejected" && (
              <>
                <div className="home-notice" style={{ fontSize: "12px" }}>
                  <InfoCircledIcon />
                  <p>
                    {label?.actionRequired}
                  </p>
                </div>
                <br />
              </>
            )}
            <Flex className="lable-img-row">
              <div>
                {" "}
                <img
                  style={{width: '148px', height: '148px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center'}}
                  src={label?.imgUrl ? label.imgUrl : demoLabelImage}
                  className="singleLabel-image"
                  alt={label?.labelName}
                />
              </div>
              <div className="lable-img-txt">
                <br />
                <span
                  className="card-type-txt"
                  style={{...useStatusStyle(label?.status)}}
                >
                  {label.status}
                </span>
                <div style={{ margin: "auto auto auto 0" }}>
                  <h1>{label?.labelName}</h1>
                  <h4>Created on {label?.date ? localDate(label.date) : 'Date Not Found'}</h4>
                </div>
              </div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="dropdown-trigger singleLabel-dropdown-btn">
                    <img src={threedotPng} />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                  align="left"
                  side="bottom"
                  className="dropdown-content singleArtist-dropdown-content"
                >
                  <DropdownMenu.Item className="dropdown-item">
                    <Link
                      to="/edit-lable"
                      style={{
                        cursor: "pointer",
                        color: "#202020",
                        textDecoration: "none",
                      }}
                    >
                      <GoPencil /> Edit Label
                    </Link>
                  </DropdownMenu.Item>
                  <hr />

                  <DropdownMenu.Item
                    className="dropdown-item"
                    onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
                  >
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <span>
                          <AiOutlineDelete /> Delete Artist
                        </span>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                          <Modal title="Delete Artist Profile?">
                            <p className="modal-description">
                              Are you sure you want to delete this artist
                              profile? This action is irreversible, and all
                              associated data, including music releases and
                              analytics, will be permanently removed.
                            </p>
                            <br />
                            <div className="singleArtist-deleteModal-btns">
                              <Button>No</Button>
                              <Button>Yes, Delete</Button>
                            </div>
                          </Modal>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
            <div className="singleLabel-social-row">
              <div className="singleArtist-info" style={{ marginBottom: 0 }}>
                <h4>Total Releases</h4>
                <h1>{totalCount}</h1>
                <Button onClick={() => navigate('/release/1/10/All')} style={{cursor: 'pointer'}} className="singleArtist-pg-allRelease-btn">
                  All Releases &nbsp;&nbsp; <ChevronRight />
                </Button>
              </div>
              <div
                className="singleArtist-social-div"
                style={{ marginBottom: 0 }}
              >
                <h4>label Profiles</h4>
                <div className="d-flex single-pg-social">
                    {
                        label?.instagramId &&
                        <a className="social-div" target='_blank' href={`https://www.instagram.com/${label.instagramId}`}><img src={instagramImg} alt={''} /></a>
                    }
                    {
                        label?.facebook &&
                        <a className="social-div" target='_blank' href={label.facebook}><img src={facebookImg} alt={''} /></a>
                    }
                    {
                        label?.youtube &&
                        <a className="social-div" target='_blank' href={label.youtube}><img src={youtubeImg} alt={''} /></a>
                    }
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No artist found! Try selecting an label first.</p>
        )}
      </div>
      <h4
        style={{
          color: "#838383",
          fontSize: "20px",
          fontWeight: "500",
          margin: "24px 0 0 0",
        }}
      >
        Releases under this artist
      </h4>
      <div className="search-setion">
        <input onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)}  type="text" placeholder="Search..." />
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
      <ReleaseCard releaseData={releaseData} />
      <Pagination 
        totalDataCount={filteredCount} 
        totalPages={totalPages}
        currentPage={currentPage} 
        perPageItem={perPageItem} 
        setCurrentPage={setCurrentPage} 
        handlePageChange={handlePageChange}
        customFunDropDown={handlePerPageItem}/>
      <br />
      <br />
    </div>
  );
}

export default SingleLable;
