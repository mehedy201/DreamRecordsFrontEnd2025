import PropTypes from "prop-types";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Artists.css";
import { Button, Flex } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { GoPencil } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { ChevronRight } from "lucide-react";
import Dropdown from "../../../components/Dropdown";
import ReleaseCard from "../../../components/ReleaseCard";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../../components/Modal";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import appleImg from '../../../assets/social/apple-music.png';
import instagramImg from '../../../assets/social/instagram.png';
import spotifyImg from '../../../assets/social/spotify-icon.png';
import facebookImg from '../../../assets/social/facebook.png';
import youtubeImg from '../../../assets/social/youtube-icon.png'
import artistDemoImg from '../../../assets/artists/artist4.png'
import { useSelector } from "react-redux";
import useQueryParams from "../../../hooks/useQueryParams";
import threedotPng from '../../../assets/icons/vertical-threeDots.png'
import localDate from "../../../hooks/localDate";

const SingleArtist = () => {

  const navigate = useNavigate();
  const {id, pageNumber, perPageItem, status} = useParams();
  const { yearsList, releaseStatusList } = useSelector(state => state.yearsAndStatus);

  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get('search') || '';
  const years = filterParams.get('years') || '';

  const [artist, setArtist] = useState();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/artist/single-artist/${id}`)
      .then(res => {
        if(res.status == 200) {
          setArtist(res.data.data[0])
        }
      })
  },[id])

  // Release Under Artist __________________________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [releaseData, setReleaseData] = useState();
  const [totalCount, setTotalCount] = useState();
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  // Get Release List ______________________________________________________________
    useEffect(() => {
      axios.get(`http://localhost:5000/api/v1/release/artist/${id}?page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${search ? search : ''}&years=${years ? years: ''}`)
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
    navigateWithParams(`/artist-details/${id}/1/${perPageItem}/${status}`, { search: search, years: yearValue });
  }

  const handleStatusDropDown = (statusValue) => {
    navigateWithParams(`/artist-details/${id}/1/${perPageItem}/${statusValue}`, { search: search, years: years });
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


  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/artist-details/${id}/${page}/${perPageItem}/${status}`, { search: search, years: years });
  }
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigateWithParams(`/artist-details/${id}/1/${perPageItem}/${status}`, { search: searchText, years: years });
    }
  };
  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItemValue) => {
    navigateWithParams(`/artist-details/${id}/${pageNumber}/${perPageItemValue}/${status}`, { search: search, years: years });
  }

  return (
    <div className="main-content">
      <div className="artist-detail">
        {artist ? (
          <div>
            <Flex className="artist-image-row">
              <div>
                <img
                  style={{width: '148px', height: '148px', border: '1px solid #dbdbdb', padding: '4px'}}
                  className="singleArtist-image"
                  src={`${artist?.imgUrl ? artist.imgUrl : artistDemoImg}`}
                  alt={artist?.artistName}
                />
              </div>
              <div style={{ margin: "auto auto auto 0" }}>
                <h1>{artist?.artistName}</h1>
                {
                  artist?.date && 
                  <p>Created on {localDate(artist?.date) }</p>
                }
              </div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="dropdown-trigger singleArtist-dropdown-btn">
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
                      to="/edit-artist"
                      // state={{ artistSocialItems }}
                      style={{
                        cursor: "pointer",
                        color: "#202020",
                        textDecoration: "none",
                      }}
                    >
                      <GoPencil /> Edit Artist
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
            <div className="singleArtist-social-row">
              <div className="singleArtist-info">
                <h4>Total Releases</h4>
                <h1>{totalCount}</h1>
                <Button style={{cursor:'pointer'}} onClick={() => navigate('/release/1/10/All')} className="singleArtist-pg-allRelease-btn">
                  All Releases &nbsp;&nbsp; <ChevronRight />
                </Button>
              </div>
              <div className="singleArtist-social-div">
                <h4>Artist Profiles</h4>
                <div className="d-flex single-pg-social">
                  {
                      artist?.appleId &&
                      <a className="social-div" target='_blank' href={`https://music.apple.com/profile/${artist.appleId}`}><img src={appleImg} alt={appleImg} /></a>
                  }
                  {
                      artist?.spotifyId &&
                      <a className="social-div" target='_blank' href={`https://open.spotify.com/user/${artist.spotifyId}`}><img src={spotifyImg} alt={spotifyImg} /></a>
                  }
                  {
                      artist?.instagramId &&
                      <a className="social-div" target='_blank' href={`https://www.instagram.com/${artist.instagramId}`}><img src={instagramImg} alt={instagramImg} /></a>
                  }
                  {
                      artist?.facebook &&
                      <a className="social-div" target='_blank' href={artist.facebook}><img src={facebookImg} alt={facebookImg} /></a>
                  }
                  {
                      artist?.youtube &&
                      <a className="social-div" target='_blank' href={artist.youtube}><img src={youtubeImg} alt={youtubeImg} /></a>
                  }
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No artist found! Try selecting an artist first.</p>
        )}
      </div>
      <h4
        style={{
          color: "#838383",
          fontSize: "20px",
          fontWeight: "500",
          margin: "0",
        }}
      >
        Releases under this artist
      </h4>
      <div className="search-setion">
        <input onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..." />
        {isMobile ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="dropdown-trigger" style={{width: "56px", justifyContent: "center", marginRight: "0",}}
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
};
SingleArtist.propTypes = {
  releaseItems: PropTypes.array.isRequired,
  artistSocialItems: PropTypes.array.isRequired,
};
export default SingleArtist;
