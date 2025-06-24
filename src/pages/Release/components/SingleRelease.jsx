import * as Collapsible from "@radix-ui/react-collapsible";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dialog, Slider, Tabs } from "radix-ui";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router-dom";
import { RiDownloadLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Dropdown from "../../../components/Dropdown";

import Table from "../../../components/Table";
import Chart from "./Chart";
import Modal from "../../../components/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";
import threeDotImg from '../../../assets/icons/vertical-threeDots.png'
import TrackViewCollapsSection from "./TrackViewCollapsSection";

const singleColumns = [
  { label: "DSPs", key: "DSPs" },
  { label: "Streams", key: "Streams" },
  { label: "Album Downloads", key: "AlbumDownloads" },
  { label: "Track Downloads", key: "TrackDownloads" },
];
const singleRevenueColumns = [
  { label: "Total", key: "Total" },
  { label: "Revenue", key: "Revenue" },
];

function SingleRelease({
  releaseAlbumInfo,
  albumTrackList,
  singleReleaseATrackData,
  chartData,
  singleReleaseARevenueData,
  releaseTrackDetails,
  releaseCredits,
}) {

  const {id} = useParams();


  const [releaseData, setReleaseData] = useState()
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/release/single/${id}`)
    .then(res => {
      if(res.status === 200){
        setReleaseData(res.data.data[0])
        console.log(res.data.data)
      }
    })
  },[id])






  const location = useLocation();
  const [release, setRelease] = useState(null);
  const [albumSongList, setAlbumSongList] = useState({});
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [analyticsCollapse, setAnalyticsCollapse] = useState(false);
  const toggleAlbum = (index) => {
    setAlbumSongList((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle open/close for the specific album
    }));
  };

  
  useEffect(() => {
    const releaseFromState = location.state?.release;
    const releaseFromStorage = localStorage.getItem("release");
    const parsedRelease =
      releaseFromState ||
      (releaseFromStorage && JSON.parse(releaseFromStorage));

    if (parsedRelease) {
      setRelease(parsedRelease);
    }
  }, [location.state]);


  return (
    <div>
      <div
        className="main-content createRelease-content-div createRelease-overview-div"
        style={{ marginBottom: "20px" }}
      >
        {releaseData && releaseData ? (
          <>
            {release?.type === "Error" && (
              <>
                {" "}
                <div className="home-notice">
                  <FiAlertTriangle />
                  <p>
                    We are upgrading our platform to enhance your experience.
                    You may notice new user interfaces appearing periodically.
                    Thank you for your patience as we make these improvements.
                  </p>
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
                      release.type == "Takedown"
                        ? { background: "#FEEBEC", color: "#E5484D" }
                        : release.type == "Pending"
                        ? { background: "#FFEBD8", color: "#FFA552" }
                        : release.type == "Review"
                        ? { background: "#D5EFFF", color: "#0090FF" }
                        : release.type == "Error"
                        ? { background: "#E8E8E8", color: "#8D8D8D" }
                        : { background: "#E6F6EB", color: "#2B9A66" }
                    }
                  >
                    {release.type}
                  </span>
                  <br />
                  <h1>{releaseData?.releaseTitle}</h1>
                  <h2>{releaseData?.artist?.map(artist => artist.artistName).join(', ')}</h2>
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
                        to="/edit-artist"
                        style={{
                          cursor: "pointer",
                          color: "#202020",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img src="src/assets/icons/img-download.png" />
                        Download Artwork
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
                <p>Primary Artist:</p>
                <p>{releaseData?.artist?.map(artist => artist.artistName).join(', ')}</p>
              </div>
              <div className="d-flex">
                <p>Featuring:</p>
                <p>{releaseData?.featureing?.map(artist => artist.artistName).join(', ')}</p>
              </div>
              <div className="d-flex">
                <p>Genre:</p>
                <p>{releaseData?.genre}</p>
              </div>
              <div className="d-flex">
                <p>Sub Genre:</p>
                <p>{releaseData?.subGenre}</p>
              </div>
              <div className="d-flex">
                <p>Label Name:</p>
                <p>{releaseData?.label?.map(label => label.labelName).join(', ')}</p>
              </div>
              <div className="d-flex">
                <p>Release Date:</p>
                <p>{releaseData?.releaseDate ? releaseData.releaseDate : releaseData?.releaseOption}</p>
              </div>
              <div className="d-flex">
                <p>Version/Subtittle:</p>
                <p>{releaseData?.subTitle}</p>
              </div>
              <div className="d-flex">
                <p>Format:</p>
                <p>{releaseData?.format}</p>
              </div>
              <div className="d-flex">
                <p>℗ line:</p>
                <p>{releaseData?.pLine}</p>
              </div>
              <div className="d-flex">
                <p>© line:</p>
                <p>{releaseData?.cLine}</p>
              </div>
              <div className="d-flex">
                <p>Production Year:</p>
                <p>{releaseData?.productionYear}</p>
              </div>
              <div className="d-flex">
                <p>UPC/EAN</p>
                <p>{releaseData?.UPC}</p>
              </div>
              <div className="d-flex">
                <p>Producer Catalog Number:</p>
                <p>1111111111</p>
              </div>
            </div>
            <hr />
            <h3 className="release-album-title">Tracks</h3>
            <br />

            {
                releaseData?.tracks &&
                releaseData?.tracks?.map((track, index) => 
                  <div key={index}>
                    <TrackViewCollapsSection track={track} index=''/>
                  </div>
                )
              }
          </>
        ) : (
          <p>No release found! Try selecting an release first.</p>
        )}
      </div>
      <div className="release-analytics">
        <Collapsible.Root
          open={analyticsCollapse} // Use object state
          onOpenChange={() => setAnalyticsCollapse(!analyticsCollapse)}
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
                <h2>3435</h2>
              </div>
              <div className="analytics-card">
                <h6>Total Revenue</h6>
                <h2>€3435</h2>
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
                  <div className="d-flex" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      {" "}
                      <label htmlFor="">Period</label>
                      <Dropdown
                        label="Last Year"
                        options={["Option 1", "Option 2", "Option 3"]}
                        onSelect={setSelectedOption1}
                        select={selectedOption1}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <label htmlFor="">By</label>
                      <Dropdown
                        label="DSP"
                        options={["Option 1", "Option 2", "Option 3"]}
                        onSelect={setSelectedOption1}
                        select={selectedOption1}
                      />
                    </div>
                  </div>
                </div>
              </Tabs.List>

              <Tabs.Content className="tabs-content" value="TrackDetails">
                <Chart chartData={chartData} />
                <Table columns={singleColumns} data={singleReleaseATrackData} />
              </Tabs.Content>
              <Tabs.Content className="tabs-content" value="Credits">
                <Chart chartData={chartData} />
                <Table
                  columns={singleRevenueColumns}
                  data={singleReleaseARevenueData}
                />
              </Tabs.Content>
            </Tabs.Root>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
}
SingleRelease.propTypes = {
  releaseData: PropTypes.array.isRequired,
  albumTrackList: PropTypes.array.isRequired,
  singleReleaseATrackData: PropTypes.array.isRequired,
  chartData: PropTypes.array.isRequired,
  singleReleaseARevenueData: PropTypes.array.isRequired,
  releaseTrackDetails: PropTypes.array.isRequired,
  releaseCredits: PropTypes.array.isRequired,
};
export default SingleRelease;
