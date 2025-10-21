import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Tooltip, Legend } from "recharts";

export default function PaddingPieChart({ data }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        >
          <p>
            <strong>Territory:</strong> {data.territory}
          </p>
          <p>
            <strong>Streams:</strong> {data?.streams?.toLocaleString() || 0}
          </p>
          <p>
            <strong>Revenue:</strong> &#8377;{data?.revenue?.toFixed(2) || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  const COLORS_STATUS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8e44ad"];
  const [processedData, setProcessedData] = useState([]);
  // Function to generate a distinct random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to prepare PieChart data
  const preparePieData = (data, topN = 5) => {
    // Sort by revenue (desc)
    const sorted = [...data].sort((a, b) => b.revenue - a.revenue);

    // Slice topN
    const topTerritories = sorted.slice(0, topN);
    const others = sorted.slice(topN);

    // Calculate "Others" total
    const othersTotalRevenue = others.reduce(
      (acc, cur) => acc + cur.revenue,
      0
    );
    const othersTotalStriems = others.reduce(
      (acc, cur) => acc + cur.streams,
      0
    );

    if (others.length > 0) {
      topTerritories.push({
        territory: "Others",
        revenue: othersTotalRevenue,
        streams: othersTotalStriems,
      });
    }

    return topTerritories;
  };

  // Get color for each territory
  const getColorForTerritory = (territory, index) => {
    if (territory === "Others") return "#888888";
    if (index < COLORS_STATUS.length) return COLORS_STATUS[index];
    return getRandomColor();
  };

  // Usage in PieChart
  useEffect(() => {
    if (data) {
      const processedDataForChart = preparePieData(data, 5);
      setProcessedData(processedDataForChart);
    }
  }, [data]);

  return (
    <div className="chart-card">
      <h4 className="chart-title">Top Territories</h4>
      <div
        className="analytics-pie-div"

        // style={{ display: "flex", maxWidth: "100%", alignItems: "center" }}
      >
        {/* PieChart */}
        <PieChart width={250} height={250}>
          <Pie
            data={processedData}
            // cx={100}
            // cy={110}
            innerRadius={70}
            outerRadius={95}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="revenue"
          >
            {processedData.map((entry, index) => (
              <Cell
                key={index}
                fill={getColorForTerritory(entry.territory, index)}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>

        {/* Scrollable Legend */}
        {/* <div
          style={{
            height: "210px",
            width: "220px",
            overflowY: "auto",
            overflowX: "auto",
            marginLeft: "20px",
            position: "relative",
          }}
        > */}
        <Legend
          layout="vertical"
          verticalAlign="top"
          align="left"
          payload={processedData?.map((item, index) => ({
            id: item.territory,
            value: item.territory,
            color: getColorForTerritory(item.territory, index, item?.length),
          }))}
        />
        {/* </div> */}
      </div>
    </div>
  );
}
