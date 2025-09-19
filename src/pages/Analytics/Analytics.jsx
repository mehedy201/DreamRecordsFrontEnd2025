import * as Collapsible from "@radix-ui/react-collapsible";
import "./Analytics.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PieChartComponent from "./components/PieChartComponent";
import PaddingPieChart from "./components/PaddingPieChart";
import Chart from "../Release/components/Chart";
import axios from "axios";
import { useSelector } from "react-redux";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import AnalyticsPageTableDSPandTerritoryTable from "../../components/analyticsPageTableDSPandTerritoryTable";
import AnalyticsPageTopReleaseTable from "../../components/AnalyticsPageTopReleaseTable";
import LoadingScreen from "../../components/LoadingScreen";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import SearchDropdownRelease from "../../components/SearchDropdownRelease";
import formatStreamsNumber from "../../hooks/formatStreamsNumber";

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

const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const releaseColumns = [
    { label: "Release", key: "releaseName" },
    { label: "Label", key: "label" },
    { label: "UPC", key: "upc" },
    { label: "Total Streams", key: "Total Streams" },
    { label: "Total Revenue", key: "Total Revenue" },
]

function Analytics() {

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


  // Analytics Table Componet Data Process_________________
    // const [tableColumn, setTableColumn] = useState(dspColumn);
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
  const [releaseData, setReleaseData] = useState();
  useEffect(() => {
    setAnalyticsLoading(true);
    setDataNotFound(false);
    if (userData) {
        setAnalyticsLoading(true);
        axios
        .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/analytics-and-balance/masterUserId-analytics/?id=${userData._id}&years=${years}`
        )
        .then((res) => {
        // console.log(res);
          // console.log('res.data.data', res.data)
        if (res.status === 200) {
            if (isEmptyArray(res?.data?.data)) setDataNotFound(true);
            dspAndTerittoriGet(res?.data?.data);

            setTotalRevenue(res?.data?.totalRevenue.toFixed(2))
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


        axios.get(`https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/analytics-and-balance/top-release-based-revenue/${userData._id}`)
        .then(res => {
            setReleaseData(res.data.data)
        })

    }
  }, [userData, years]);




  // Filter Function___________________
  const {
      register,
      handleSubmit,
      setValue,
      watch,
      control,
      formState: { errors },
    } = useForm({
        defaultValues: {
            // type: "Release",
        }
    });

    const filterType = watch('type')


    const onSubmit = (data) =>{
        console.log('data', data)
        const date = `${data.mounth} ${data.years}`;
        setAnalyticsLoading(true)
        axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/analytics-and-balance/upc-analytics?UPC=${data?.release[0]?.UPC}&date=${date}`
        )
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            if (isEmptyArray(res?.data?.data)) setDataNotFound(true);
            dspAndTerittoriGet(res?.data?.data);
            setTotalRevenue(data?.release[0]?.totalRevenue?.toFixed(2))
            setTotalStreams(data?.release[0]?.totalStreams)

            const rawData = res?.data?.data;
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

        axios
        .get(
            `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/release/${data?.release[0]?._id}`
        )
        .then((res) => {
            if (res.status === 200) {
            setReleaseData([res.data.data]);
            }
        });
    }



  if(analyticsLoading){
    return <LoadingScreen/>
  }




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
              <form className="analytics_filter_div_grid" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller
                    name="type"
                    control={control}
                    placeholder="All Release"
                    rules={{ required: "Type Required" }}
                    render={({ field }) => (
                        <>
                        <Select.Root
                            {...field}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                        >
                            <Select.Trigger className="dropdown-trigger Service-modal-dropdown-trigger">
                            <Select.Value placeholder="All Release" />
                            <Select.Icon className="select-icon">
                                <ChevronDown />
                            </Select.Icon>
                            </Select.Trigger>

                            <Select.Portal>
                            <Select.Content
                                className="dropdown-content"
                                style={{ padding: 0, overflowY: "auto" }}
                            >
                                <Select.Viewport>
                                <Select.Item value="Release" className="select-item">
                                    <Select.ItemText>Release</Select.ItemText>
                                    <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                                </Select.Viewport>
                            </Select.Content>
                            </Select.Portal>
                        </Select.Root>

                        {errors.type && (
                            <span style={{ color: "#ea3958" }}>{errors.type.message}</span>
                        )}
                        </>
                    )}
                    />
                </div>

                {
                    (filterType === 'Release' || !filterType) && 
                    <div>
                        <SearchDropdownRelease
                            items={releaseData}
                            searchTxt="Search and select Release"
                            selectRelease='Single'
                            onSelect={(items) =>setValue("release", items, { shouldValidate: true })}
                            register={{ ...register("release", { required: true }) }}
                            value={watch("release")}
                        />
                        {errors.release && (
                          <span style={{ color: "#ea3958" }}>Release Required</span>
                        )}
                    </div>
                }

                <div>
                    <Controller
                    name="years"
                    control={control}
                    rules={{ required: "Years Required" }} // 👈 Validation rule
                    render={({ field }) => (
                        <Select.Root
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                        >
                        <Select.Trigger className="dropdown-trigger Service-modal-dropdown-trigger">
                            <Select.Value placeholder="Select Year">
                                {watch("years") || yearsList[0]}
                            </Select.Value>
                            <Select.Icon className="select-icon">
                            <ChevronDown />
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content
                            className="dropdown-content"
                            style={{ padding: 0, overflowY: "auto" }}
                            >
                            <Select.Viewport>
                                {yearsList.map((year) => (
                                <Select.Item key={year} value={year} className="select-item">
                                    <Select.ItemText>{year}</Select.ItemText>
                                    <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                                ))}
                            </Select.Viewport>
                            </Select.Content>
                        </Select.Portal>
                        </Select.Root>
                    )}
                    />

                    {errors.years && (
                    <span style={{ color: "#ea3958" }}>{errors.years.message}</span>
                    )}
                </div>
                <div>
                    <Controller
                    name="mounth"
                    control={control}
                    rules={{ required: "Mounth Required" }} // 👈 Validation rule
                    render={({ field }) => (
                        <Select.Root
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                        >
                        <Select.Trigger className="dropdown-trigger Service-modal-dropdown-trigger">
                            <Select.Value placeholder="Select Month">
                                {watch("mounth") || 'Jan'}
                            </Select.Value>
                            <Select.Icon className="select-icon">
                            <ChevronDown />
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content
                            className="dropdown-content"
                            style={{ padding: 0, overflowY: "auto" }}
                            >
                            <Select.Viewport>
                                {monthList.map((mounth) => (
                                <Select.Item key={mounth} value={mounth} className="select-item">
                                    <Select.ItemText>{mounth}</Select.ItemText>
                                    <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                    </Select.ItemIndicator>
                                </Select.Item>
                                ))}
                            </Select.Viewport>
                            </Select.Content>
                        </Select.Portal>
                        </Select.Root>
                    )}
                    />

                    {errors.mounth && (
                    <span style={{ color: "#ea3958" }}>{errors.mounth.message}</span>
                    )}
                </div>
                <div>
                    <button type="submit" style={{width: '100%'}} className="theme-btn analytics-filter-btn analytics-filter-flex-item">
                        Filter
                    </button>
                </div>
              </form>
            </div>

            <div className="analytics-card-row">
              {/* <div className="analytics-card">
                <h6>Total Streams</h6>
                <h2>{formatStreamsNumber(totalStreams) || 0}</h2>
              </div> */}
              <div className="analytics-card">
                <h6>All Time Revenue</h6>
                <h2>&#8377; {totalRevenue || 0}</h2>
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

            <div style={{padding: '16px'}}>
                <div>
                    <h4 className="chart-title" style={{marginBottom: '10px'}}>Top Releases</h4>
                    <div className="analytics-table">
                        <AnalyticsPageTopReleaseTable columns={releaseColumns} data={releaseData}/>
                    </div>
                </div>
            </div>

            <br />

            <div className="analytics-pie-grid">
                <div>
                    <PieChartComponent data={dspTableData}/>
                </div>
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