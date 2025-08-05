import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const TestPage = () => {
  const analyticsUplaod = (e) => {
    const file = e[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/analytics-and-balance`,
        formData
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <input
        type="file"
        accept=".xls, .xlsx"
        id="fileInput"
        name="image"
        onChange={(e) => analyticsUplaod(e.target.files)}
      />
    </div>
  );
};

export default TestPage;
