import * as Collapsible from "@radix-ui/react-collapsible";
import "./Analytics.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as Tabs from "@radix-ui/react-tabs";
// import Chart from "../../components/Chart";
// import Table from "../../../components/Table";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectDropdown from "../../components/SelectDropdown";
import SearchDropdown from "../../components/SearchDropdown";
import PieChartComponent from "./components/PieChartComponent";
import Table from "../../components/Table";
import PaddingPieChart from "./components/PaddingPieChart";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Chart from "../Release/components/Chart";
import axios from "axios";
import { useSelector } from "react-redux";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import AnalyticsPageTableDSPandTerritoryTable from "../../components/analyticsPageTableDSPandTerritoryTable";
const analyticsStorageColumn = [
  { label: "Stores", key: "Stores" },
  { label: "Streams", key: "Streams" },
  { label: "Revenue", key: "Revenue" },
];
const analyticsTerritoriesColumn = [
  { label: "Territories", key: "Territories" },
  { label: "Streams", key: "Streams" },
  { label: "Revenue", key: "Revenue" },
];

function Analytics({
  chartData,
  artistsItems,
  analyticsStorageTable,
  analyticsTerritoriesTable,
}) {

    const {userData} = useSelector((state) => state.userData);
    const { yearsList } = useSelector((state) => state.yearsAndStatus);





  const [analyticsCollapse, setAnalyticsCollapse] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownItem = (
    <>
      <SelectDropdown
        options={["Option 1", "Option 2"]}
        placeholder="All Release"
        className="analytics-filter-flex-item"
      />
      <div className="d-flex analytics-filter-flex">
        <div className="analytics-filter-flex-item">
          <SearchDropdown
            items={artistsItems}
            itemKey="name"
            imagePath="artists/"
            imageKey="img"
            searchTxt="Search and select artist"
            itemName="Artist"
          />
        </div>
        <SelectDropdown
          options={["Option 1", "Option 2", "Option 3"]}
          placeholder="All time"
          className="analytics-filter-flex-item"
        />
        <button className="theme-btn analytics-filter-btn analytics-filter-flex-item">
          Filter
        </button>
      </div>
    </>
  );


  // Analytics Table Componet Data Process_________________
    // const [tableColumn, setTableColumn] = useState(dspColumn);
    const [tableData, setTableData] = useState();
    const [dspTableData, setDspTableData] = useState();
    const [territoryTableData, setTerritoryTableData] = useState();
    const [totalSummary, setTotalSummary] = useState();
    const dspAndTerittoriGet = (data) => {
      // ========== DSP Aggregation ==========
      const dspMap = {};
      data?.forEach((entry) => {
        entry.byDSP.forEach((dsp) => {
          if (!dspMap[dsp.dsp]) {
            dspMap[dsp.dsp] = { revenue: 0, streams: 0 };
          }
          dspMap[dsp.dsp].revenue += dsp.revenue;
          dspMap[dsp.dsp].streams += dsp.streams;
        });
      });
  
      let byDsp = Object.entries(dspMap).map(([dsp, { revenue, streams }]) => ({
        dsp,
        revenue: Number(revenue.toFixed(2)),
        streams,
      }));
  
      // sort dsp data (highest first)
      byDsp.sort(
        (a, b) => b.revenue - a.revenue
      );
  
      // add total row for dsp
    //   const totalDsp = byDsp.reduce(
    //     (acc, item) => {
    //       acc.streams += item.streams;
    //       acc.revenue += item.revenue;
    //       return acc;
    //     },
    //     // { dsp: "TOTAL", streams: 0, revenue: 0 }
    //   );
    //   totalDsp.revenue = Number(totalDsp.revenue.toFixed(2));
    //   byDsp.push(totalDsp);
  
      // ========== Territory Aggregation ==========
      const territoryMap = {};
      data?.forEach((entry) => {
        entry.byTerritory.forEach((t) => {
          if (!territoryMap[t.territory]) {
            territoryMap[t.territory] = { revenue: 0, streams: 0 };
          }
          territoryMap[t.territory].revenue += t.revenue;
          territoryMap[t.territory].streams += t.streams;
        });
      });
  
      let byTerritory = Object.entries(territoryMap).map(
        ([territory, { revenue, streams }]) => ({
          territory,
          revenue: Number(revenue.toFixed(2)),
          streams,
        })
      );
  
      // sort territory data (highest first)
      byTerritory.sort(
        (a, b) => b.revenue - a.revenue
      );
  
      // add total row for territory
    //   const totalTerritory = byTerritory.reduce(
    //     (acc, item) => {
    //       acc.streams += item.streams;
    //       acc.revenue += item.revenue;
    //       return acc;
    //     },
    //     // { territory: "TOTAL", streams: 0, revenue: 0 }
    //   );
    //   totalTerritory.revenue = Number(totalTerritory.revenue.toFixed(2));
    //   byTerritory.push(totalTerritory);
  
      // ========== Global Total Summary ==========
      const totalSummaryData = data?.reduce(
        (acc, entry) => {
          acc.streams += entry?.totalStreams || 0;
          acc.revenue += entry?.totalRevenue || 0;
          return acc;
        },
        { total: "TOTAL", streams: 0, revenue: 0 }
      );
  
      totalSummaryData.revenue = Number(totalSummaryData.revenue.toFixed(2));
  
      // ========== Save State ==========
      console.log('by dsp',byDsp);
      console.log('by dsp',byDsp);
      console.log('by territory',byTerritory);
      console.log('by totalSumary',[totalSummaryData]);
    //   setTableData(byDsp);
      setDspTableData(byDsp);
      setTerritoryTableData(byTerritory);
      setTotalSummary([totalSummaryData]);
    };





  // Getting Analytics Chart and Table Data From API ________
  const [chartDataStreams, setChartDataStreams] = useState();
  const [chartDataRevenue, setChartDataRevenue] = useState();
  const [years, setYears] = useState(Math.max(...yearsList));
  const [dataNotFound, setDataNotFound] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState();
  const [totalStreams, setTotalStreams] = useState();
  useEffect(() => {
    setAnalyticsLoading(true);
    setDataNotFound(false);
    if (userData) {
      axios
        .get(
          `http://localhost:5000/common/api/v1/analytics-and-balance/masterUserId-analytics/?id=${userData._id}&years=${years}`
        )
        .then((res) => {
          // console.log(res);
          console.log('res.data.data', res.data)
          if (res.status === 200) {
            if (isEmptyArray(res?.data?.data)) setDataNotFound(true);
            dspAndTerittoriGet(res?.data?.data);

            setTotalRevenue(res?.data?.totalRevenue)
            setTotalStreams(res?.data?.totalStreams)

            const rawData = res?.data?.monthlyTotals;
            const streamsData = rawData
              ?.map((item) => ({
                month: item.reportsDate,
                Streams: item.totalStreams,
              }))
              .sort((a, b) => new Date(a.month) - new Date(b.month));

            const revenewData = rawData
              ?.map((item) => ({
                month: item.reportsDate,
                Revenue: item.totalRevenue,
              }))
              .sort((a, b) => new Date(a.month) - new Date(b.month));

            setChartDataStreams(streamsData);
            setChartDataRevenue(revenewData);
            setAnalyticsLoading(false);
          }
        });
    }
  }, [userData, years]);






  return (
    <div className="main-content analytics-pg">
      <div className="release-analytics">
        <Collapsible.Root
          open={analyticsCollapse} // Use object state
          onOpenChange={() => setAnalyticsCollapse(!analyticsCollapse)}
        >
          <Collapsible.Trigger asChild>
            <div className="">
              <div className="d-flex">
                <h5 style={{ marginBottom: "10px" }}>Analytics</h5>
                <div style={{ marginLeft: "auto" }}>
                  {analyticsCollapse ? (
                    <IoIosArrowUp
                      className="release-album-arrowIcon"
                      style={{ marginRight: "17px" }}
                    />
                  ) : (
                    <IoIosArrowDown
                      className="release-album-arrowIcon"
                      style={{ marginRight: "17px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Collapsible.Trigger>

          <Collapsible.Content>
            <div className="analytics-filter-div">
              {isMobile ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      className="dropdown-trigger"
                      style={{
                        width: "56px",
                        justifyContent: "center",
                        marginLeft: "auto",
                      }}
                    >
                      <HiOutlineAdjustmentsHorizontal
                        style={{ width: "24px", height: "24px" }}
                      />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content
                    align="left"
                    side="bottom"
                    className="dropdown-content"
                  >
                    <div style={{ marginRight: "30px" }}>{dropdownItem}</div>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              ) : (
                dropdownItem
              )}
            </div>

            <div className="analytics-card-row">
              <div className="analytics-card">
                <h6>Total Streams</h6>
                <h2>{totalStreams}</h2>
              </div>
              <div className="analytics-card">
                <h6>Total Revenue</h6>
                <h2>&#8377; {totalRevenue}</h2>
              </div>
            </div>
            <Tabs.Root
              className="tabs-root singleRelease-tabs"
              defaultValue="TrackDetails"
            >
              <Tabs.List className="tabs-list">
                <div className="singleRelease-tabsList">
                  <Tabs.Trigger className="tabs-trigger" value="TrackDetails">
                    Streams
                  </Tabs.Trigger>
                  <Tabs.Trigger className="tabs-trigger" value="Credits">
                    Revenue
                  </Tabs.Trigger>
                </div>
              </Tabs.List>

              <Tabs.Content className="tabs-content" value="TrackDetails">
                <Chart chartData={chartDataStreams} value='Streams'/>
              </Tabs.Content>
              <Tabs.Content className="tabs-content" value="Credits">
                <Chart chartData={chartDataRevenue} value='Revenue'/>
              </Tabs.Content>
            </Tabs.Root>
            <br />
            <br />
            <div className="analytics-pie-grid">
              <PieChartComponent data={dspTableData}/>
              <div className="analytics-table">
                <AnalyticsPageTableDSPandTerritoryTable
                  columns={analyticsStorageColumn}
                  data={dspTableData}
                />
              </div>
            </div>

            <div className="analytics-pie-grid">
              <PaddingPieChart data={territoryTableData}/>
              <div className="analytics-table">
                <AnalyticsPageTableDSPandTerritoryTable
                  columns={analyticsTerritoriesColumn}
                  data={territoryTableData}
                />
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
}
Analytics.propTypes = {
  chartData: PropTypes.array.isRequired,
  artistsItems: PropTypes.array.isRequired,
  analyticsStorageTable: PropTypes.array.isRequired,
  analyticsTerritoriesTable: PropTypes.array.isRequired,
};
export default Analytics;