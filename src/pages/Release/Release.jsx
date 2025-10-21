import { Flex } from "@radix-ui/themes";
import "./Release.css";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";

import ReleaseCard from "../../components/ReleaseCard";
import Pagination from "../../components/Pagination";
import { Link, useParams, useSearchParams } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectDropdown from "../../components/SelectDropdown";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";

const Release = () => {
  // Get Data Form Redux ________________________
  const { userNameIdRoll } = useSelector((state) => state.userData);
  const { yearsList, releaseStatusList } = useSelector(
    (state) => state.yearsAndStatus
  );
  // Main Params ________________________________
  const { pageNumber, perPageItem, status } = useParams();
  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get("search") || "";
  const years = filterParams.get("years") || "";

  const filterByYear = (yearValue) => {
    navigateWithParams(`/releases/1/10/${status}`, {
      search: search,
      years: yearValue,
    });
  };
  const filterByStatus = (statusValue) => {
    navigateWithParams(`/releases/1/10/${statusValue}`, {
      search: search,
      years: years,
    });
  };

  // Responsive Code ______________________________________________
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Years and Status Dropdown______________________________________
  const dropdownItem = (
    <>
      <SelectDropdown
        options={yearsList}
        placeholder={`${years ? years : "All Time"}`}
        filterByYearAndStatus={filterByYear}
      />

      {isMobile && <br />}
      <SelectDropdown
        options={releaseStatusList}
        placeholder={status}
        filterByYearAndStatus={filterByStatus}
      />
    </>
  );

  // Fatch Release Data _______________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [releaseData, setReleaseData] = useState();
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (userNameIdRoll) {
      setLoading(true);
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${search}&years=${years}`
        )
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.data);
            setReleaseData(res.data.data);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
            setLoading(false);
          }
        })
        .catch((er) => console.log(er));
    }
    setLoading(false);
  }, [userNameIdRoll, pageNumber, perPageItem, search, years]);

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/releases/${page}/${perPageItem}/${status}`, {
      search: search,
      years: years,
    });
  };
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateWithParams(`/releases/1/${perPageItem}/${status}`, {
        search: searchText,
        years: years,
      });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/releases/${pageNumber}/${perPageItem}/${status}`, {
      search: search,
      years: years,
    });
  };

  return (
    <>
      {loading === true && <LoadingScreen />}
      <div className="main-content">
        <Flex className="page-heading">
          <h2
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "start",
            }}
          >
            Releases{" "}
            <span
              style={{
                fontSize: "16px",
                border: "1px solid #ea3958",
                padding: "2px 8px",
                borderRadius: "5px",
                marginTop: "4px",
                marginRight: "8px",
              }}
            >
              {filteredCount || 0}
            </span>
          </h2>
          <Link
            className="theme-btn"
            to="/create-release"
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
        <ReleaseCard releaseData={releaseData} />
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
    </>
  );
};
Release.propTypes = {
  releaseItems: PropTypes.array.isRequired,
};
export default Release;
