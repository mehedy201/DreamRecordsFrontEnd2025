import { Flex } from "@radix-ui/themes";
import SelectDropdown from "../../components/SelectDropdown";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import ArtistCard from "../../components/ArtistCard";
import PropTypes from "prop-types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const Artists = () => {

  const navigate = useNavigate();
  const {userNameIdRoll} = useSelector((state) => state.userData);
  const {pageNumber, perPageArtist, search} = useParams()
 

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dropdownItem = (
    <SelectDropdown
      options={["Account", "Profile", "Settings"]}
      placeholder="All Time"
    />
  );

  // Fatch Artist Data _______________________________________________
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [artistData, setArtistData] = useState()
  useEffect( () => {
    if(userNameIdRoll){
      if(!search){
        axios.get(`http://localhost:5000/api/v1/artist/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageArtist}`)
          .then( res => {
            if(res.status == 200){
              setArtistData(res.data.data);
              const p = Math.max(1, Math.ceil(res.data.dataCount / parseInt(perPageArtist)));
              setTotalPages(p)
            }
          })
          .catch(er => console.log(er));
      }else{
        axios.get(`http://localhost:5000/api/v1/artist/search/662b71650a78738b0334837f?page=${pageNumber}&limit=${perPageArtist}&search=${search}`)
          .then( res => {
            if(res.status == 200){
              setArtistData(res.data.data);
              const p = Math.max(1, Math.ceil(res.data.dataCount / parseInt(perPageArtist)));
              setTotalPages(p)
              console.log('with Search', res.data.data)
            }
          })
          .catch(er => console.log(er));
      }
    }
  },[userNameIdRoll])

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    if(!search){
      navigate(`/artist/${page}/${perPageArtist}`)
    }else{
      navigate(`/artist/${page}/${perPageArtist}/${search}`)
    }
  }
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`/artist/1/${perPageArtist}/${searchText}`)
    }
  };


  return (
    <div className="main-content">
      <Flex className="page-heading">
        <h2>Artists</h2>
        <Link
          to="/create-artist"
          className="theme-btn"
          style={{
            textDecoration: "none",
            marginRight: 0,
            marginLeft: "auto",
            width: "185px",
            textAlign: "center",
          }}
        >
          + Create New
        </Link>
      </Flex>

      <div className="search-setion">
        <input onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..." style={{ width: "87%" }} />
        {/* First Dropdown */}
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
      <br />
      <ArtistCard artistsItems={artistData} />
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} handlePageChange={handlePageChange}/>
    </div>
  );
};

export default Artists;
