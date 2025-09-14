import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import LoadingScreen from "../components/LoadingScreen";
import {
  setUserData,
  setUserNameIdRoll,
} from "../redux/features/userDataHandleSlice/userDataHandleSlice";

const Authorization = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setChecking(true);

    const verifyUserAccess = async () => {
      try {
        const token = localStorage.getItem("token");

        // 1. If Token not available
        if (!token) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          navigate("/login");
          return;
        }

        const displayName = decoded.displayName;
        const userNameIdRoll = displayName?.split("'__'"); // ['username', 'id', 'role']
        const userId = userNameIdRoll[1];
        dispatch(setUserNameIdRoll(userNameIdRoll));

        if (!displayName) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/${userId}`
        );
        dispatch(setUserData(res.data.data));
        const isLocked = res.data?.data?.userLocked;
        if (isLocked || res.data?.data?.status === 'Suspended') {
          navigate(`/locked/${res?.data?.data?._id}`);
          return;
        }

        if(res?.data?.data?.password !== decoded.password){
          localStorage.removeItem("token");
          return navigate('/login');
        }

        if (!res?.data?.data.first_name && !res?.data?.data.first_name) {
          navigate("/sign-up-profile-info");
          return;
        }
        if(!res?.data?.data?.addressLine1 || !res?.data?.data?.address ){
            navigate('/sign-up-address-info')
            return
        }
        await axios.patch(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/last-log-in/${userId}`,
          {}
        );
      } catch (err) {
        console.error("Auth check failed:", err.message);
        // localStorage.removeItem("token");
        // navigate("/login");
      } finally {
        setChecking(false);
      }
    };

    verifyUserAccess();
  }, []);

  // 5. UI Decision based on auth check
  if (checking) {
    return <LoadingScreen />;
  }

  // 🔓 Auth success
  return children;
};

Authorization.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authorization;
