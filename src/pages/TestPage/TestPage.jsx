import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const TestPage = () => {


  const AprilReportKey = 'analytics-file/1754464632012-278081147-April 2025 (Believe) .csv'
  const AprilReportUrl = 'https://dream-records-2024.s3.ap-south-1.amazonaws.com/analytics-file/1754464632012-278081147-April+2025+%28Believe%29+.csv'

  const mayReoportKey = 'analytics-file/1754464786299-349115047-May 2025 (Believe).xlsx';
  const mayReportUrl = 'https://dream-records-2024.s3.ap-south-1.amazonaws.com/analytics-file/1754464786299-349115047-May+2025+%28Believe%29.xlsx'



  const analyticsUplaod = (e) => {
    const file = e[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(
        `http://localhost:5000/common/api/v1/analytics-and-balance/excel-upload`,
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
        accept=".xls, .xlsx, .csv"
        id="fileInput"
        name="image"
        onChange={(e) => analyticsUplaod(e.target.files)}
      />
    </div>
  );
};

export default TestPage;
