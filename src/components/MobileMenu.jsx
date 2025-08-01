import { NavLink } from "react-router-dom";
import "./Global.css";
import PropTypes from "prop-types";

import logo from '../assets/Logo.png'

import homeIcon from '../assets/icons/home.png'
import releaseIcon from '../assets/icons/Releases.png'
import groupIcon from '../assets/icons/group.png'
import labelsIcon from '../assets/icons/Labels.png'
import serviceRequestIcon from '../assets/icons/Service Request.png'
import transactionsIcon from '../assets/icons/indian-rupee.png'
import supportIcon from '../assets/icons/Support.png'
import helpIcon from '../assets/icons/Help.png'
import profileIcon from '../assets/icons/Profile.png'
import settingsIcon from '../assets/icons/Settings.png'


const menuItems = [
  { name: "Home", path: "/", icon: homeIcon },
  { name: "Releases", path: "/releases/1/10/All", icon: releaseIcon },
  { name: "Artists", path: "/artist/1/10", icon: groupIcon },
  { name: "Lables", path: "/labels/1/10/All", icon: labelsIcon},
  { name: "Service Request", path: "/service-request/Release-Claim/1/10/All", icon: serviceRequestIcon,},
  { name: "Transactions", path: "/transaction/1/10/All", icon: transactionsIcon },
  { name: "Support", path: "/support", icon: supportIcon, divider: true },
  { name: "Help", path: "/help", icon: helpIcon },
  { name: "Profile", path: "/profile", icon: profileIcon, divider: true },
  { name: "My Settings", path: "/settings", icon: settingsIcon },
];

const MobileMenu = ({ closeMenu }) => {
  
  

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
          src={logo}
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
              src={item.icon}
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
