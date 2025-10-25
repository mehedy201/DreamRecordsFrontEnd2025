import React, { useEffect } from "react";
import logo from "../../assets/Logo.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SuspendPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/${id}`
      )
      .then((res) => {
        const isLocked = res.data?.data?.userLocked;
        if (!isLocked || res.data?.data?.status !== "Suspended") {
          navigate(`/`);
          return;
        }
      });
  }, [id]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={{ height: "100px", width: "auto. s" }} src={logo} alt="" />
        <p>
          Your account has been suspended. Please contact Dream Records Support.
        </p>
      </div>
    </div>
  );
};

export default SuspendPage;
