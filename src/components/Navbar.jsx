import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./Global.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import logOutImg from '../assets/icons/logout.png'

const Navbar = ({ toggleMobileMenu }) => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {userData} = useSelector((state) => state.userData);


  return (
    <div className="navbar">
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <Menu />
      </div>
      <DropdownMenu.Root onOpenChange={setOpen}>
        <DropdownMenu.Trigger style={{ border: "none", background: "none", display: 'flex', alignItems:'center' }}>
          <p style={{display: 'flex', justifyContent:'center', alignItems:'center'}}  className="nav-dropdown">{userData?.first_name?.slice(0,1)}</p>{" "}
          <ChevronDown className={`${open ? "rotate" : ""}`} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="dropdown-content navbar-dropdown-content">
          <div className="d-flex">
          <p style={{display: 'flex', justifyContent:'center', alignItems:'center'}} className="nav-dropdown">{userData?.first_name?.slice(0,1)}</p>
            <div style={{paddingLeft: '5px'}}>
              <p>{userData?.first_name} {userData?.last_name}</p>
              <small>{userData?.email}</small>
            </div>
            <ChevronUp />
          </div>
          <br />
          <Link to="/Profile" style={{ textDecoration: "none", color: "#fff" }}>
            <DropdownMenu.Item className="theme-btn">
              <FaRegUser /> Profile
            </DropdownMenu.Item>
          </Link>
          <hr />
          <DropdownMenu.Item
            className="d-flex"
            style={{ marginLeft: "6px", cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem('token')
            navigate('/login')
          }}
          >
            <div>
              <img src={logOutImg} width="16px" alt="" />
            </div>
            &nbsp;&nbsp; <p>Logout</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
Navbar.propTypes = {
  toggleMobileMenu: PropTypes.array.isRequired,
};
export default Navbar;
