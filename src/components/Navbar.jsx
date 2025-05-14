import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./Global.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
import axios from "axios";

const Navbar = ({ toggleMobileMenu }) => {
  const [open, setOpen] = useState(false);
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const [userFirstName, setUserFirstName] = useState()

  useEffect(() => {
    if (user) {
      const userNameIdRoll = user?.displayName?.split("'__'");
      console.log(userNameIdRoll[1])
      axios.get(`http://localhost:5000/api/v1/users/${userNameIdRoll[1]}`)
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.data;
            console.log(data)
            setUserFirstName(res.data.data.first_name);
            const formData = { ...data, lastLogin: date };
            axios.put(`http://localhost:5000/api/v1/users/${userNameIdRoll[1]}`,formData);
          }
        });
    }
  }, [user]);

  return (
    <div className="navbar">
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <Menu />
      </div>
      <DropdownMenu.Root onOpenChange={setOpen}>
        <DropdownMenu.Trigger style={{ border: "none", background: "none" }}>
          <button className="nav-dropdown">{userFirstName?.slice(0,1)}</button>{" "}
          <ChevronDown className={`${open ? "rotate" : ""}`} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="dropdown-content navbar-dropdown-content">
          <div className="d-flex">
          <button className="nav-dropdown">{userFirstName?.slice(0,1)}</button>
            <div>
              <p>{userFirstName}</p>
              <small>{user?.email}</small>
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
            onClick={() => signOut()}
          >
            <div>
              <img src="src/assets/icons/logout.png" width="16px" alt="" />
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
