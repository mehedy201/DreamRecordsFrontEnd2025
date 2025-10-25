import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import formatNumber from "../hooks/formatNumber";


const COLORS_TYPE = ["#00e4a5", "#0099ff"];
const COLORS_STATUS = ["#0099ff", "#00e4a5", "#ffb129", "#ff4f4f", "#8e44ad"];

function PieChartComponent({ releaseSummary }) {
  const [pieTextVisibleSide, setPieTextVisibleSide] = useState(
    getInitialCount()
  );
  function getInitialCount() {
    const width = window.innerWidth;
    if (width > 940 && width <= 1160) {
      return true;
    } else if (width > 830 && width <= 940) {
      return false;
    } else if (width > 700 && width <= 830) {
      return true;
    } else if (width <= 472) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    const handleResize = () => {
      setPieTextVisibleSide(getInitialCount());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h4 className="chart-title">Release by type</h4>
        <div className="second-pie-div">
          <div>
            <p className="chart-subtitle">Total Releases</p>
            <h2 className="chart-count">
              {formatNumber(releaseSummary?.totalRelease)}
            </h2>
          </div>
          <ResponsiveContainer
            width="100%"
            height={200}
            className="pieChart-container"
          >
            <PieChart>
              <Pie
                data={releaseSummary?.releaseBasedType}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                style={{ cursor: "pointer" }}
              >
                {releaseSummary?.releaseBasedType?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_TYPE[index % COLORS_TYPE.length]}
                  />
                ))}
              </Pie>
              <Tooltip />

              <Legend
                layout="vertical"
                verticalAlign="middle"
                align={pieTextVisibleSide ? "left" : "right"}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h4 className="chart-title">Release by status</h4>
        <div className="second-pie-div">
          <div>
            <p className="chart-subtitle">Total Tracks</p>
            <h2 className="chart-count">
              {formatNumber(releaseSummary?.totalTrack)}
            </h2>
          </div>
          <ResponsiveContainer
            width="100%"
            height={200}
            className="pieChart-container"
          >
            <PieChart>
              <Pie
                data={releaseSummary?.releaseByStatus}
                dataKey="count"
                cx="50%"
                cy="50%"
                style={{ cursor: "pointer" }}
                outerRadius={80}
              >
                {releaseSummary?.releaseByStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_STATUS[index % COLORS_STATUS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align={pieTextVisibleSide === true ? "left" : "right"}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default PieChartComponent;
