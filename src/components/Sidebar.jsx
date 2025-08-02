import { NavLink, useNavigate } from "react-router-dom";
import "./Global.css";

import logo from '../assets/Logo.png'

import homeIcon from '../assets/icons/home.png'
// import userIcon from '../assets/icons/users.png'
import releaseIcon from '../assets/icons/Releases.png'
import groupIcon from '../assets/icons/group.png'
import labelsIcon from '../assets/icons/Labels.png'
// import analyticsIcon from '../assets/icons/analytics.png'
import serviceRequestIcon from '../assets/icons/Service Request.png'
import transactionsIcon from '../assets/icons/indian-rupee.png'
import supportIcon from '../assets/icons/Support.png'
import helpIcon from '../assets/icons/Help.png'
import profileIcon from '../assets/icons/Profile.png'
import settingsIcon from '../assets/icons/Settings.png'

import beleveIcon from '../assets/believe.png'

const menuItems = [
  { name: "Home", path: "/", icon: homeIcon },
  { name: "Releases", path: "/releases/1/10/All", icon: releaseIcon },
  { name: "Artists", path: "/artist/1/10", icon: groupIcon },
  { name: "Lables", path: "/labels/1/10/All", icon: labelsIcon},
  { name: "Service Request", path: "/service-request/Release-Claim/1/10/All", icon: serviceRequestIcon,},
  { name: "Transactions", path: "/transaction/1/10/All", icon: transactionsIcon },
  { name: "Support", path: "/", icon: supportIcon, divider: true },
  { name: "Help", path: "/", icon: helpIcon },
  { name: "Profile", path: "/profile", icon: profileIcon, divider: true },
  { name: "My Settings", path: "/settings", icon: settingsIcon },
];

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="Dream Records Logo" width={86} />
      </div>

      {/* Create Button */}

      <button onClick={() => navigate('/create-release')} className="theme-btn">+ Create</button>

      {/* Navigation Links */}
      <nav className="nav">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.divider && <hr className="divider" />}
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <img
                src={item.icon}
                alt={item.name}
                className="nav-icon"
              />
              {item.name}
            </NavLink>
          </div>
        ))}
      </nav>
      <div className="sidebar-bottomTxt-div">
        <p>Powered by</p>
        <img src={beleveIcon} alt="" />
      </div>
    </aside>
  );
};

export default Sidebar;
