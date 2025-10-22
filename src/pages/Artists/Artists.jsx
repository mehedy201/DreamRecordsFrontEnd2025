import { Flex } from "@radix-ui/themes";
import SelectDropdown from "../../components/SelectDropdown";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import ArtistCard from "../../components/ArtistCard";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";
const Artists = () => {
  // Get Data Form Redux ________________________
  const { userNameIdRoll } = useSelector((state) => state.userData);
  const { yearsList } = useSelector((state) => state.yearsAndStatus);
  // Main Params ________________________________
  const { pageNumber, perPageItem } = useParams();
  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get("search") || "";
  const years = filterParams.get("years") || "";
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleCreate = () => {
    setButtonLoading(true);

    setTimeout(() => {
      setButtonLoading(false);
      navigate("/create-artist");
    }, 700);
  };
  // Responsive Code ____________________________
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filterByYear = (yearValue) => {
    navigateWithParams("/artist/1/10", { search: search, years: yearValue });
  };

  const dropdownItem = (
    <SelectDropdown
      options={yearsList}
      placeholder={`${years ? years : "All Time"}`}
      filterByYearAndStatus={filterByYear}
    />
  );

  // Fatch Artist Data _______________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [artistData, setArtistData] = useState();
  const [totalCount, setTotalCount] = useState();
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    if (userNameIdRoll) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageItem}&search=${search}&years=${years}`
        )
        .then((res) => {
          if (res.status == 200) {
            setArtistData(res.data.data);
            setTotalCount(res.data.totalCount);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
          }
        })
        .catch((er) => console.log(er));
    }
  }, [userNameIdRoll, pageNumber, perPageItem, search, years]);

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/artist/${page}/${perPageItem}`, {
      search: search,
      years: years,
    });
  };
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateWithParams(`/artist/1/${perPageItem}`, {
        search: searchText,
        years: years,
      });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/artist/${pageNumber}/${perPageItem}`, {
      search: search,
      years: years,
    });
  };

  return (
    <div className="main-content">
      <Flex className="page-heading">
        <h2 style={{ display: "flex", gap: "10px", alignItems: "start" }}>
          Artists{" "}
          <span
            style={{
              fontSize: "16px",
              border: "1px solid #ea3958",
              padding: "2px 8px",
              borderRadius: "5px",
            }}
          >
            {filteredCount || 0}
          </span>
        </h2>
        <Link
          // to="/create-artist"
          onClick={handleCreate}
          className="theme-btn btn-spinner"
          disabled={buttonLoading}
          style={{
            opacity: buttonLoading ? 0.9 : 1,
            cursor: buttonLoading ? "not-allowed" : "pointer",

            textDecoration: "none",
            marginRight: 0,
            marginLeft: "auto",
            width: "185px",
            textAlign: "center",
          }}
        >
          {buttonLoading && <span className="btn-spinner-span"></span>} + Create
          New
        </Link>
      </Flex>

      <div className="search-setion">
        <input
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search..."
          style={{ width: "87%" }}
        />
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
      <Pagination
        totalDataCount={filteredCount}
        totalPages={totalPages}
        currentPage={currentPage}
        perPageItem={perPageItem}
        setCurrentPage={setCurrentPage}
        handlePageChange={handlePageChange}
        customFunDropDown={handlePerPageItem}
      />
    </div>
  );
};

export default Artists;
