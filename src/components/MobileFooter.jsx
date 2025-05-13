import { NavLink } from "react-router-dom";

const MobileFooter = () => {
  return (
    <div className="mobile-footer">
      <NavLink to="/" className="footer-item">
        <img src="/src/assets/icons/home.png" alt="Home" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/releases" className="footer-item">
        <img src="/src/assets/icons/Releases.png" alt="Releases" />
        <span>Releases</span>
      </NavLink>

      <div className="footer-add-button">
        <button>+</button>
      </div>

      <NavLink to="/artists" className="footer-item">
        <img src="/src/assets/icons/group.png" alt="Artists" />
        <span>Artists</span>
      </NavLink>

      <NavLink to="/lables" className="footer-item">
        <img src="/src/assets/icons/Labels.png" alt="Labels" />
        <span>Labels</span>
      </NavLink>
    </div>
  );
};

export default MobileFooter;
