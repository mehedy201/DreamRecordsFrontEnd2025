// import Sidebar from "../../components/Sidebar";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import ArtistCard from "../../components/ArtistCard";
import ReleaseCard from "../../components/ReleaseCard";
import "./Home.css";
import { Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Home = ({ artistsItems, releaseItems }) => {
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
  return (
    <div className="main-content">
      <div className="home-notice">
        <InfoCircledIcon />
        <p>
          We are upgrading our platform to enhance your experience. You may
          notice new user interfaces appearing periodically. Thank you for your
          patience as we make these improvements.
        </p>
      </div>
      <section className="hero">
        <div>
          <h1>Hi, Subhamay</h1>
          <p>Welcome to Dream Records</p>
        </div>
      </section>
      <Flex as="span" className="artists-flex">
        <p>Artists</p>
        <Link href="#">See All</Link>
      </Flex>
      <br />
      <ArtistCard artistsItems={artistsItems.slice(0, artistVisibleCount)} />
      <Flex as="span" className="artists-flex">
        <p>Latest Releases</p>
        <Link href="#">See All</Link>
      </Flex>

      <ReleaseCard releaseItems={releaseItems.slice(0, releaseVisibleCount)} />
      <br />
    </div>
  );
};
Home.propTypes = {
  artistsItems: PropTypes.array.isRequired, // Ensure artistsItems is an array
  releaseItems: PropTypes.array.isRequired,
};
export default Home;
