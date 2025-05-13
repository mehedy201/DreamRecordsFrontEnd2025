import { NavLink } from "react-router-dom";
import "./Global.css";
import PropTypes from "prop-types";
const MobileMenu = ({ closeMenu }) => {
  const menuItems = [
    { name: "Profile", path: "/profile", icon: "Profile.png" },
    {
      name: "Service Request",
      path: "/ServiceRequest",
      icon: "Service Request.png",
    },
    { name: "Transactions", path: "/Transaction", icon: "Transactions.png" },
    { name: "Support", path: "/support", icon: "Support.png" },
    { name: "Help", path: "/help", icon: "Help.png" },
    { name: "My Settings", path: "/settings", icon: "Settings.png" },
    { name: "Log Out", path: "/logout", icon: "logout.png" },
  ];

  return (
    <div className="mobile-menu-overlay">
      <button
        className="close-btn"
        onClick={closeMenu}
        style={{ padding: "1rem" }}
      >
        ✕
      </button>
      <div className="mobile-menu">
        <img
          src="src/assets/Logo.png"
          alt="Logo"
          width={60}
          style={{ padding: "1rem" }}
        />
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="nav-item"
            onClick={closeMenu}
            style={{ borderBottom: "1px solid #D9D9D9" }}
          >
            <img
              src={`src/assets/icons/${item.icon}`}
              alt={item.name}
              className="nav-icon"
            />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
MobileMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};
export default MobileMenu;
