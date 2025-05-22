import { Button } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "./Dropdown";

const Pagination = ({totalPages, currentPage, perPageItem, setCurrentPage, handlePageChange, customFunDropDown}) => {

  
  const handlePrev = () => {
    if (currentPage > 1) {
      const p = currentPage - 1
      setCurrentPage(p);
      handlePageChange(p)
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const p = currentPage + 1
      setCurrentPage(p);
      handlePageChange(p)
    }
  };
  return (
    <div className="pagination-section">
      <Button className="pagination-btn" onClick={handlePrev}>
        <ChevronLeft /> Previous
      </Button>
      <nav>
        <ul className="pagination-ul">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={currentPage === index + 1 ? "pagination-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(index + 1);
                const p = index + 1;
                handlePageChange(p)
              }}
            >
              <a href="#">{index + 1}</a>
            </li>
          ))}

          <h3 style={{ margin: "0", padding: "3px 9px" }}>...</h3>
        </ul>
      </nav>
      <Button
        className="pagination-btn"
        style={{ paddingLeft: "12px" }}
        onClick={handleNext}
      >
        Next <ChevronRight />
      </Button>
      <div className="pagination-dropdown-div">
        <Dropdown
          label={`${perPageItem} Per Page`}
          options={[5,10, 20, 30, 40, 50,]}
          customFunDropDown={customFunDropDown}
        />
      </div>
    </div>
  );
};

export default Pagination;
