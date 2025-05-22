import { Flex } from "@radix-ui/themes";
import PropTypes from "prop-types";
import "./Global.css";
import { Link } from "react-router-dom";
const ReleaseCard = ({ releaseData }) => {
  return (
    <div className="release-container">
      {releaseData?.map((item, index) => (
        <Link
          to="/single-release"
          state={{ release: item }}
          key={index}
          className="release-card"
        >
          <img src={`${item?.imgUrl}`} alt="" />
          <div style={{ paddingTop: "12px" }}>
            <Flex style={{ display: "flex" }}>
              <div
                className="card-type-txt"
                style={
                  item?.status == "Takedown"
                    ? { background: "#FEEBEC", color: "#E5484D" }
                    : item?.status == "Pending"
                    ? { background: "#FFEBD8", color: "#FFA552" }
                    : item?.status == "Review"
                    ? { background: "#D5EFFF", color: "#0090FF" }
                    : item?.status == "Error"
                    ? { background: "#E8E8E8", color: "#8D8D8D" }
                    : { background: "#E6F6EB", color: "#2B9A66" }
                }
              >
                {item?.status}
              </div>
              <div className="card-date-txt">date</div>
            </Flex>
            <small>{item?.releaseTitle}</small>
            <br />
            {
              item?.artist.map((a) => <span><small>{a?.artistName}</small></span>)
            }
          </div>
        </Link>
      ))}
    </div>
  );
};
ReleaseCard.propTypes = {
  releaseItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      // artist: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ReleaseCard;
