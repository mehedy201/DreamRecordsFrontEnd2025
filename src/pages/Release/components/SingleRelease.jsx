import * as Collapsible from "@radix-ui/react-collapsible";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Tabs } from "radix-ui";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Chart from "./Chart";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";
import threeDotImg from "../../../assets/icons/vertical-threeDots.png";
import TrackViewCollapsSection from "./TrackViewCollapsSection";
import downloadImg from "../../../assets/icons/img-download.png";
import editImg from "../../../assets/icons/editIcon.png";
import { useSelector } from "react-redux";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import SingleReleasePageTable from "../../../components/singleReleasePageTable";
import isEmptyArray from "../../../hooks/isEmptyArrayCheck";
import NotFoundComponent from "../../../components/NotFoundComponent";

const dspColumn = [
  { label: "DSPs", key: "DSPs" },
  { label: "Streams", key: "Streams" },
  { label: "Revenue", key: "Revenue" },
];
const territoryColumn = [
  { label: "Territory", key: "Territory" },
  { label: "Streams", key: "Streams" },
  { label: "Revenue", key: "Revenue" },
];
const totalRevineuStreamColumn = [
  { label: "Total", key: "Total" },
  { label: "Streams", key: "Streams" },
  { label: "Revenue", key: "Revenue" },
];

function SingleRelease() {
  const { id } = useParams();
  const { yearsList } = useSelector((state) => state.yearsAndStatus);
  const [releaseData, setReleaseData] = useState();
  const [trackData, setTrackData] = useState();
  const [UPC, setUPC] = useState("");
  useEffect(() => {
    axios
      .get(`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/release/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data)
          setReleaseData(res.data.data);
          setTrackData(res?.data?.data?.tracks);
          setUPC(res?.data?.data?.UPC);
        }
      });
  }, [id]);

  // Analytics Table Componet Data Process_________________
  const [tableColumn, setTableColumn] = useState(dspColumn);
  const [tableData, setTableData] = useState();
  const [dspTableData, setDspTableData] = useState();
  const [territoryTableData, setTerritoryTableData] = useState();
  const [totalSummary, setTotalSummary] = useState();
  const dspAndTerittoriGet = (data) => {
    // DSP Aggregation
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

    const byDsp = Object.entries(dspMap).map(([dsp, { revenue, streams }]) => ({
      dsp,
      revenue: Number(revenue?.toFixed(2)),
      streams,
    }));

    // =============== Territory Aggregation ==============
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

    const byTerritory = Object.entries(territoryMap).map(
      ([territory, { revenue, streams }]) => ({
        territory,
        revenue: Number(revenue.toFixed(2)),
        streams,
      })
    );

    // ================= Total Summary =================
    const totalSummaryData = data?.reduce(
      (acc, entry) => {
        acc.streams += entry.summary?.streams || 0;
        acc.revenue += entry.summary?.revenue || 0;
        return acc;
      },
      { total: "Total", streams: 0, revenue: 0 }
    );
    console.log("totalSummaryData", totalSummaryData);
    totalSummaryData.revenue = Number(totalSummaryData?.revenue?.toFixed(2));

    setTableData(byDsp);
    setDspTableData(byDsp);
    setTerritoryTableData(byTerritory);
    setTotalSummary([totalSummaryData]);
  };

  // Getting Analytics Chart and Table Data From API ________
  const [chartDataStreams, setChartDataStreams] = useState();
  const [chartDataRevenue, setChartDataRevenue] = useState();
  const [totalStreams, setTotalStreams] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [years, setYears] = useState(Math.max(...yearsList));
  const [dataNotFound, setDataNotFound] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  useEffect(() => {
    setAnalyticsLoading(true);
    setDataNotFound(false);
    if (UPC) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/analytics-and-balance/upc-analytics?UPC=${UPC}&years=${years}`
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (isEmptyArray(res?.data?.data)) setDataNotFound(true);
            setTotalStreams(res?.data?.totalRevenue);
            setTotalRevenue(res?.data?.totalStreams);
            dspAndTerittoriGet(res?.data?.data);

            const rawData = res?.data?.data;
            const streamsData = rawData
              ?.map((item) => ({
                month: item.date,
                value: item.summary.streams,
              }))
              .sort((a, b) => new Date(a.month) - new Date(b.month));

            const revenewData = rawData
              ?.map((item) => ({
                month: item.date,
                value: item.summary.revenue,
              }))
              .sort((a, b) => new Date(a.month) - new Date(b.month));

            setChartDataStreams(streamsData);
            setChartDataRevenue(revenewData);
            setAnalyticsLoading(false);
          }
        });
    }
  }, [UPC, years]);

  const [analyticsCollapse, setAnalyticsCollapse] = useState(true);

  return (
    <div>
      <div
        className="main-content createRelease-content-div createRelease-overview-div"
        style={{ marginBottom: "20px" }}
      >
        {releaseData && releaseData ? (
          <>
            {releaseData?.rejectionReasons && (
              <>
                {" "}
                <div className="home-notice">
                  <FiAlertTriangle />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: releaseData?.actionRequired,
                    }}
                  ></p>
                </div>
                <br />
              </>
            )}
            {releaseData?.actionRequired && (
              <>
                {" "}
                <div className="home-notice">
                  <FiAlertTriangle />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: releaseData?.actionRequired,
                    }}
                  ></p>
                </div>
                <br />
              </>
            )}
            <div className="d-flex release-overview-img-div">
              <img
                src={releaseData?.imgUrl}
                alt=""
                className="release-overview-img"
              />
              <div className="d-flex" style={{ width: "100%" }}>
                <div>
                  <span
                    className="card-type-txt"
                    style={
                      releaseData?.status == "Takedown"
                        ? { background: "#FEEBEC", color: "#E5484D" }
                        : releaseData?.status == "QC Approval"
                        ? { background: "#FFEBD8", color: "#FFA552" }
                        : releaseData?.status == "Review"
                        ? { background: "#D5EFFF", color: "#0090FF" }
                        : releaseData?.status == "Action Required"
                        ? { background: "#E8E8E8", color: "#8D8D8D" }
                        : { background: "#E6F6EB", color: "#2B9A66" }
                    }
                  >
                    {releaseData?.status}
                  </span>
                  <br />
                  <h1>{releaseData?.releaseTitle}</h1>
                  <h2>
                    {
                      releaseData?.labels && 
                      releaseData?.labels?.map((label) => label.labelName).join(", ")
                    }
                  </h2>
                </div>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      className="dropdown-trigger singleArtist-dropdown-btn"
                      style={{ marginRight: 0 }}
                    >
                      <img src={threeDotImg} />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Content
                    align="left"
                    side="bottom"
                    className="dropdown-content singleRelease-dropdown-content"
                  >
                    <DropdownMenu.Item className="dropdown-item">
                      <Link
                        onClick={() => window.open(releaseData?.imgUrl)}
                        style={{
                          cursor: "pointer",
                          color: "#202020",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <img src={downloadImg} />
                        Download Artwork
                      </Link>
                      <Link
                        to="/edit-release"
                        style={{
                          cursor: "pointer",
                          color: "#202020",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img src={editImg} />
                        Edit Metadata
                      </Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </div>
            <hr />
            <h3 className="release-album-title">Album Info</h3>
            <div className="release-album-info-row">
              <div className="d-flex">
                <p>Release Tittle::</p>
                <p>{releaseData?.releaseTitle}</p>
              </div>
              <div className="d-flex">
                <p>Version/Subtittle:</p>
                <p>{releaseData?.subTitle}</p>
              </div>
              {/* <div className="d-flex">
                <p>Primary Artist:</p>
                <p>
                  {releaseData?.artist
                    ?.map((artist) => artist.artistName)
                    .join(", ")}
                </p>
              </div> */}
              <div className="d-flex">
                <p>Format:</p>
                <p>{releaseData?.format}</p>
              </div>
              <div className="d-flex">
                <p>Featuring:</p>
                <p>
                  {releaseData?.featuring
                    ?.map((artist) => artist.artistName)
                    .join(", ")}{" "}
                  {releaseData?.featureing
                    ?.map((artist) => artist.artistName)
                    .join(", ")}
                </p>
              </div>
              <div className="d-flex">
                <p>℗ line:</p>
                <p>{releaseData?.pLine}</p>
              </div>
              <div className="d-flex">
                <p>Genre:</p>
                <p>{releaseData?.genre}</p>
              </div>
              <div className="d-flex">
                <p>© line:</p>
                <p>{releaseData?.cLine}</p>
              </div>
              <div className="d-flex">
                <p>Sub Genre:</p>
                <p>{releaseData?.subGenre}</p>
              </div>
              <div className="d-flex">
                <p>Production Year:</p>
                <p>{releaseData?.productionYear}</p>
              </div>
              <div className="d-flex">
                <p>Label Name:</p>
                <p>
                  {releaseData?.labels
                    ?.map((label) => label.labelName)
                    .join(", ")}{" "}
                  {releaseData?.label
                    ?.map((label) => label.labelName)
                    .join(", ")}
                </p>
              </div>
              <div className="d-flex">
                <p>UPC/EAN</p>
                <p>{releaseData?.UPC}</p>
              </div>
              <div className="d-flex">
                <p>Release Date:</p>
                <p>{releaseData.releaseDate }</p>
              </div>
              {/* <div className="d-flex">
                <p>Producer Catalog Number:</p>
                <p>1111111111</p>
              </div> */}
            </div>
            <hr />
            <h3 className="release-album-title">Tracks</h3>
            <br />

            {trackData &&
              trackData?.map((track, index) => (
                <div key={index}>
                  <TrackViewCollapsSection track={track} index="" />
                </div>
              ))}
          </>
        ) : (
          <p>No release found! Try selecting an release first.</p>
        )}
      </div>
      {/* open={analyticsCollapse} // Use object state
          onOpenChange={() => setAnalyticsCollapse(!analyticsCollapse)} */}
      <div className="release-analytics">
        <Collapsible.Root
          defaultOpen={true}
          onOpenChange={setAnalyticsCollapse}
        >
          <Collapsible.Trigger asChild>
            <div className="">
              <div className="d-flex">
                <h5 className="release-album-title">Analytics</h5>
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
            <div className="analytics-card-row">
              <div className="analytics-card">
                <h6>Total Streams</h6>
                <h2>{totalStreams}</h2>
              </div>
              <div className="analytics-card">
                <h6>Total Revenue</h6>
                <h2>€{totalRevenue}</h2>
              </div>
            </div>
            <Tabs.Root
              className="tabs-root singleRelease-tabs"
              defaultValue="Streams"
            >
              <Tabs.List className="tabs-list">
                <div className="singleRelease-tabsList">
                  <Tabs.Trigger className="tabs-trigger" value="Streams">
                    Streams
                  </Tabs.Trigger>
                  <Tabs.Trigger className="tabs-trigger" value="Revenue">
                    Revenue
                  </Tabs.Trigger>
                  <div className="d-flex" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      {" "}
                      <label htmlFor="">Period</label>
                      <Select.Root
                        defaultValue={Math.max(...yearsList)}
                        onValueChange={(value) => setYears(value.toString())}
                      >
                        <Select.Trigger className={`dropdown-trigger`}>
                          <Select.Value />
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
                              {yearsList?.map((option, index) => (
                                <Select.Item
                                  key={index}
                                  value={option}
                                  className="select-item"
                                >
                                  <Select.ItemText>{option}</Select.ItemText>
                                  <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                    <div style={{ width: "100%" }}>
                      <label htmlFor="">By</label>
                      <Select.Root
                        defaultValue="DSP"
                        onValueChange={(value) => {
                          if (value === "DSP") {
                            setTableData(dspTableData);
                            setTableColumn(dspColumn);
                          }
                          if (value === "Territory") {
                            setTableData(territoryTableData);
                            setTableColumn(territoryColumn);
                          }
                          if (value === "Total") {
                            setTableData(totalSummary);
                            setTableColumn(totalRevineuStreamColumn);
                          }
                        }}
                      >
                        <Select.Trigger className={`dropdown-trigger`}>
                          <Select.Value placeholder="Filter by DSP/Territory" />
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
                              <Select.Item value="DSP" className="select-item">
                                <Select.ItemText>DSP</Select.ItemText>
                                <Select.ItemIndicator className="select-item-indicator">
                                  <Check size={18} />
                                </Select.ItemIndicator>
                              </Select.Item>
                              <Select.Item
                                value="Territory"
                                className="select-item"
                              >
                                <Select.ItemText>Territory</Select.ItemText>
                                <Select.ItemIndicator className="select-item-indicator">
                                  <Check size={18} />
                                </Select.ItemIndicator>
                              </Select.Item>
                              <Select.Item
                                value="Total"
                                className="select-item"
                              >
                                <Select.ItemText>Total</Select.ItemText>
                                <Select.ItemIndicator className="select-item-indicator">
                                  <Check size={18} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                  </div>
                </div>
              </Tabs.List>

              <Tabs.Content className="tabs-content" value="Streams">
                {dataNotFound === false && (
                  <>
                    <Chart chartData={chartDataStreams} />
                    <SingleReleasePageTable
                      columns={tableColumn}
                      data={tableData}
                    />
                  </>
                )}
                {dataNotFound === true && <NotFoundComponent />}
              </Tabs.Content>
              <Tabs.Content className="tabs-content" value="Revenue">
                {dataNotFound === false && (
                  <>
                    <Chart chartData={chartDataRevenue} />
                    <SingleReleasePageTable
                      columns={tableColumn}
                      data={tableData}
                    />
                  </>
                )}
                {dataNotFound === true && <NotFoundComponent />}
              </Tabs.Content>
            </Tabs.Root>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
}

export default SingleRelease;
