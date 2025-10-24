import { Flex } from "@radix-ui/themes";
import PropTypes from "prop-types";
import "./Global.css";
import { Link } from "react-router-dom";
import useStatusStyle from "../hooks/useStatusStyle";
import releaseDemoImage from "../assets/release-placeholder.png"
import localDate from "../hooks/localDate";
import { cdnLink } from "../hooks/cdnLink";
const ReleaseCard = ({ releaseData }) => {

  return (
    <div className="release-container">
      { releaseData && releaseData?.map((item, index) => (
        <Link
          to={`/release/${item._id}`}
          state={{ release: item }}
          key={index}
          className="release-card"
        >
          <img src={item?.key ? cdnLink(item?.key) : releaseDemoImage} alt="" />
          <div style={{ paddingTop: "12px" }}>
            <Flex style={{ display: "flex" }}>
              <div
                className="card-type-txt"
                style={{...useStatusStyle(item.status)}}
              >
                {item?.status}
              </div>
              <div className="card-date-txt">{item?.date ? localDate(item?.date) : 'Date'}</div>
            </Flex>
            <small>{item?.releaseTitle}</small>
            <br />
            <span>
              <small>
                {
                  [...new Set(
                    item?.tracks?.flatMap(track =>
                      track?.artist?.map(a => a.artistName)
                    )
                  )].join(', ')
                  }
                  {
                    [...new Set(
                      item?.tracks?.flatMap(track =>
                        track?.primaryArtist?.map(a => a.artistName)
                      )
                    )].join(', ')
                  }
              </small>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
ReleaseCard.propTypes = {
  releaseItems: PropTypes.arrayOf(
    PropTypes.shape({
      releaseTitle: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      artist: PropTypes.arrayOf(
        PropTypes.shape({
          artistName: PropTypes.string
        })
      )
    })
  ).isRequired,
};
export default ReleaseCard;
