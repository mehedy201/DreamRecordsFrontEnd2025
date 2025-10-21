import { NavLink, useNavigate } from "react-router-dom";

import homeIcon from "../assets/icons/home.png";
import releaseIcon from "../assets/icons/Releases.png";
import groupIcon from "../assets/icons/group.png";
import labelsIcon from "../assets/icons/Labels.png";

const MobileFooter = () => {
  const navigate = useNavigate();
  return (
    <div className="mobile-footer">
      <NavLink to="/" className="footer-item">
        <img src={homeIcon} alt="Home" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/releases/1/10/All" className="footer-item">
        <img src={releaseIcon} alt="Releases" />
        <span>Releases</span>
      </NavLink>

      <div
        onClick={() => navigate("/create-release")}
        className="footer-add-button"
      >
        <button>+</button>
      </div>

      <NavLink to="/artist/1/10" className="footer-item">
        <img src={groupIcon} alt="Artists" />
        <span>Artists</span>
      </NavLink>

      <NavLink to="/labels/1/10/All" className="footer-item">
        <img src={labelsIcon} alt="Labels" />
        <span>Labels</span>
      </NavLink>
    </div>
  );
};

export default MobileFooter;
