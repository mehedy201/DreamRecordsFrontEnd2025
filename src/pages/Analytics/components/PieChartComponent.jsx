import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";


const COLORS_STATUS = ["#0099ff", "#00e4a5", "#ffb129", "#ff4f4f", "#8e44ad"];

function PieChartComponent({data}) {

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
            <p><strong>DSP:</strong> {data.dsp}</p>
            <p><strong>Streams:</strong> {data?.streams.toLocaleString() || 0}</p>
            <p><strong>Revenue:</strong> &#8377;{data?.revenue.toFixed(2) || 0}</p>
        </div>
        );
    }
    return null;
    };

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
        const topDSP = sorted.slice(0, topN);
        const others = sorted.slice(topN);
    
        // Calculate "Others" total
        const othersTotalRevenue = others.reduce((acc, cur) => acc + cur.revenue, 0);
        const othersTotalStriems = others.reduce((acc, cur) => acc + cur.streams, 0);
    
        if (others.length > 0) {
          topDSP.push({
            dsp: "Others",
            revenue: othersTotalRevenue,
            streams: othersTotalStriems,
          });
        }
    
        return topDSP;
      };
    
      // Get color for each territory
      const getColorForDSP = (dsp, index) => {
        if (dsp === "Others") return "#888888";
        if (index < COLORS_STATUS.length) return COLORS_STATUS[index];
        return getRandomColor();
      };
    
      // Usage in PieChart
      useEffect(() => {
        if(data) {
          const processedDataForChart = preparePieData(data, 5);
          setProcessedData(processedDataForChart)
        }
      },[data])

  return (
    <div className="chart-card">
      <h4 className="chart-title">Top Stores</h4>
      <div
        className="second-pie-div"
        style={{ display: "flex", maxWidth: "100%", alignItems: 'center' }} // flex container
      >
        {/* PieChart */}
        <PieChart  width={300} height={250}>
          <Pie
            data={processedData}
            dataKey="revenue"
            nameKey="dsp"
            cx="50%"
            cy="50%"
            outerRadius={95}
            style={{ cursor: "pointer" }}
          >
            {processedData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColorForDSP(entry.dsp, index)} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>

        {/* Scrollable Legend */}
        <div
          style={{
            height: "180px",
            width: "250px",
            overflowY: "auto",
            overflowX: "auto",
            marginLeft: "20px",
            position: "relative",
          }}
        >
          <Legend
            layout="vertical"
            verticalAlign="top"
            align="left"
            payload={processedData?.map((item, index) => ({
              id: item.dsp,
              value: item.dsp,
              color: getColorForDSP(item.dsp, index),
            }))}
          />
        </div>
      </div>
    </div>
  );
}

export default PieChartComponent;