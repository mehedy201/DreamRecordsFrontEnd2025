// import Sidebar from "../../components/Sidebar";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import ArtistCard from "../../components/ArtistCard";
import ReleaseCard from "../../components/ReleaseCard";
import "./Home.css";
import { Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NotFoundComponent from "../../components/NotFoundComponent";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import { homeCardContent } from "../../data";
import PieChartComponent from "../../components/PieChartComponent";
const Home = () => {
  const { userData, userNameIdRoll } = useSelector((state) => state.userData);

  const [artistVisibleCount, setArtistVisibleCount] = useState(
    getInitialCount()
  );
  const [releaseVisibleCount, setReleaseVisibleCount] = useState(
    getReleaseInitialCount()
  );

  function getInitialCount() {
    const width = window.innerWidth;
    if (width <= 690) {
      return 3;
    } else if (width <= 830) {
      return 4;
    } else if (width <= 874) {
      return 3;
    } else if (width <= 1216) {
      return 4;
    } else {
      return 5;
    }
  }
  function getReleaseInitialCount() {
    const width = window.innerWidth;
    if (width <= 540) {
      return 2;
    } else if (width <= 740) {
      return 3;
    } else if (width <= 830) {
      return 4;
    } else if (width <= 991) {
      return 3;
    } else if (width <= 1216) {
      return 4;
    } else {
      return 5;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setArtistVisibleCount(getInitialCount());
      setReleaseVisibleCount(getReleaseInitialCount());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [artistData, setArtistData] = useState();
  const [releaseData, setReleaseData] = useState();
  const [artistNotFound, setArtistNotFound] = useState(false);
  const [releaseNotFound, setReleaseNotFound] = useState(false);
  const [userSummary, setUserSummary] = useState();
  const [releaseSummary, setReleaseSummary] = useState();
  useEffect(() => {
    setArtistNotFound(false);
    setReleaseNotFound(false);
    if (userNameIdRoll) {

      // User Summary Get From API ___________
      axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/user/sammary/${userData?._id}`
      )
      .then((res) => {
        if (res.status === 200) {
          setReleaseSummary(res?.data?.data?.releaseByStatus.slice(0,3));
          setUserSummary(res.data.data);
        }
      });
      // Artist Data Get From API _____________
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/${userNameIdRoll[1]}?page=1&limit=${artistVisibleCount}`
        )
        .then((res) => {
          if (res.status == 200) {
            setArtistData(res.data.data);
            if (isEmptyArray(res.data.data)) setArtistNotFound(true);
          }
        })
        .catch((er) => console.log(er));

      // Release Data Get From API ___________
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/${userNameIdRoll[1]}?page=1&limit=5&status=Live&search=&years=`
        )
        .then((res) => {
          if (res.status == 200) {
            setReleaseData(res.data.data);
            if (isEmptyArray(res.data.data)) setReleaseNotFound(true);
          }
        })
        .catch((er) => console.log(er));
    }
  }, [userNameIdRoll]);

  // Home Page Notice
  const [homePageNotices, setHomePageNotices] = useState();
  useEffect(() => {
    axios
      .get(
        "https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/home-page-notice"
      )
      .then((res) => {
        setHomePageNotices(res.data.data);
      });
  }, []);


  


  return (
    <div className="main-content">
      {homePageNotices &&
        homePageNotices?.map((notice) => (
          <div key={notice._id} className="home-notice">
            <InfoCircledIcon />
            <p
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
              dangerouslySetInnerHTML={{ __html: notice?.notice }}
            ></p>
          </div>
        ))}
      <section className="hero">
        <div>
          <h1>Hi, {userData?.first_name}</h1>
          <p>Welcome to Dream Records</p>
        </div>
      </section>
      <div className="home-card-grid">
        {releaseSummary &&
          releaseSummary?.map((item, index) => (
            <div key={index} className="home-card">
              <div className="d-flex" style={{ alignItems: "center" }}>
                <div>
                  <div
                    className="card-circle"
                    style={
                    item.name === "QC Approval"
                      ? { background: "#FFA552 " }
                      : item.name === "In Review"
                      ? { background: "#0090FF" }
                      : item.name === "To Live"
                      ? { background: "#2B9A66" }
                      : { background: "#838383" }
                  }
                  ></div>
                </div>
                <p
                  style={
                    item.name === "QC Approval"
                      ? { color: "#FFA552" }
                      : item.name === "In Review"
                      ? { color: "#0090FF" }
                      : item.name === "To Live"
                      ? { color: "#2B9A66" }
                      : { color: "#838383" }
                  }
                >
                  {item.name}
                </p>
              </div>
              <h1>{item.count}</h1>
            </div>
          ))}
      </div>
      <div className="home-pie-div">
        {userSummary && <PieChartComponent releaseSummary={userSummary} />}
      </div>


      <Flex as="span" className="artists-flex">
        <p>Artists</p>
        <Link to={"/artist/1/10"}>See All</Link>
      </Flex>
      <br />
      <ArtistCard artistsItems={artistData} />
      {artistNotFound === true && <NotFoundComponent />}
      <Flex as="span" className="artists-flex">
        <p>Latest Releases</p>
        <Link to="/releases/1/10/All">See All</Link>
      </Flex>

      <ReleaseCard releaseData={releaseData} />
      {releaseNotFound === true && <NotFoundComponent />}
      <br />
    </div>
  );
};
Home.propTypes = {
  artistsItems: PropTypes.array.isRequired, // Ensure artistsItems is an array
  releaseItems: PropTypes.array.isRequired,
};
export default Home;
