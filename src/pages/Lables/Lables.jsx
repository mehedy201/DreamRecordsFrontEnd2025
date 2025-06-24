import { Flex } from "@radix-ui/themes";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import "./Lables.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectDropdown from "../../components/SelectDropdown";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import axios from "axios";
import labelDemoImg from '../../assets/lables/lables-placeholder.png'
import useStatusStyle from "../../hooks/useStatusStyle";
import localDate from "../../hooks/localDate";
const Lables = () => {

  // Get Data Form Redux ________________________
  const {userNameIdRoll} = useSelector((state) => state.userData);
  const { yearsList,labelStatusList } = useSelector(state => state.yearsAndStatus);
  // Main Params ________________________________
  const {pageNumber, perPageItem, status} = useParams();
  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get('search') || '';
  const years = filterParams.get('years') || '';

  const filterByYear = (yearValue) => {
    navigateWithParams(`/labels/1/10/${status}`, { search: search, years: yearValue });
  }
  const filterByStatus = (statusValue) => {
    navigateWithParams(`/labels/1/10/${statusValue}`, { search: search, years: years });
  }






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
        options={labelStatusList}
        placeholder={status}
        filterByYearAndStatus={filterByStatus}
      />
    </>
  );




   // Fatch Artist Data _______________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [labelData, setLabelData] = useState()
  const [totalCount, setTotalCount] = useState();
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  useEffect( () => {
    if(userNameIdRoll){
      axios.get(`http://localhost:5000/api/v1/labels/${userNameIdRoll[1]}?page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${search}&years=${years}`)
        .then( res => {
          if(res.status == 200){
            setLabelData(res.data.data);
            setTotalCount(res.data.totalCount);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
          }
        })
        .catch(er => console.log(er));
    }
  },[userNameIdRoll, pageNumber, perPageItem, search, years]);

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/labels/${page}/${perPageItem}/${status}`, { search: search, years: years });
  }
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigateWithParams(`/labels/1/${perPageItem}/${status}`, { search: searchText, years: years });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/labels/${pageNumber}/${perPageItem}/${status}`, { search: search, years: years });
  }






  return (
    <div className="main-content">
      <Flex className="page-heading">
        <h2>Lables</h2>
        <Link
          to="/create-label"
          className="theme-btn"
          style={{
            textDecoration: "none",
            marginLeft: "auto",
            width: "185px",
            textAlign: "center",
          }}
        >
          + Create New
        </Link>
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
      <div className="lables-container">
        { labelData && labelData.map((item, index) => (
          <Link
            to={`/labels/${item._id}/1/10/All`}
            state={{ lable: item }}
            key={index}
            className="lables-card"
          >
            <img
              style={{width: '148px', height: '148px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center'}}
              src={item?.imgUrl ? item.imgUrl : labelDemoImg}
              alt={item.labelName}

            />
            <Flex style={{ display: "flex" }}>
              <div
                className="card-type-txt"
                style={{...useStatusStyle(item?.status)}}
              >
                {item.status}
              </div>
              <div className="card-date-txt">{item?.date ? localDate(item.date) : '01-01-2024'}</div>
            </Flex>
            <p style={{ fontWeight: "500" }}>{item.labelName}</p>
          </Link>
        ))}
      </div>
      <Pagination 
        totalDataCount={filteredCount} 
        totalPages={totalPages}
        currentPage={currentPage} 
        perPageItem={perPageItem} 
        setCurrentPage={setCurrentPage} 
        handlePageChange={handlePageChange}
        customFunDropDown={handlePerPageItem}/>
    </div>
  );
};

export default Lables;


