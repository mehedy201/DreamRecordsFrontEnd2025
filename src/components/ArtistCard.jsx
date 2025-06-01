import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import artistDemoImg from '../assets/artists/artist4.png'

const ArtistCard = ({ artistsItems }) => {
  return (
    <div className="artists-container" style={{ display: "flex" }}>
      {artistsItems?.map((item, index) => (
        <Link
          to={`/artist-details/${item?._id}/1/10/All`}
          state={{ artist: item }}
          key={index}
          className="artists-card"
          style={{ cursor: "pointer" }}
        >
          <img style={{width: '148px', height: '148px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center'}} src={item?.imgUrl ? item?.imgUrl : artistDemoImg} alt={item?.artistName} />
          <p>{item?.artistName}</p>
        </Link>
      ))}
    </div>
  );
};

ArtistCard.propTypes = {
  artistsItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArtistCard;
