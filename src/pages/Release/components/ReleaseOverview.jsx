import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import TrackViewCollapsSection from "./TrackViewCollapsSection";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  setReleaseAlbumInfo,
  setReleaseDate,
  setTrackFormat,
  setTracksInfo,
} from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";
import axios from "axios";
function ReleaseOverview({ step, setStep, handlePrev }) {

  const pathname = window.location.pathname;
  const { userNameIdRoll } = useSelector((state) => state.userData);
  const { releaseAlbumInfo, tracksInfo, releaseDate, trackFormat } = useSelector((state) => state.releaseData);

  const dispatch = useDispatch();

  const errorRef = useRef(null);
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  const isEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length === 0;
  };

  const [error, setError] = useState();
  const releaseUpload = () => {
    setError("");
    if (!userNameIdRoll) {
      setError("Please click submit button again");
      return;
    }
    if (isEmptyObject(releaseAlbumInfo)) {
      setError(
        "Something went wrong. Please Fill Release Album Information Again"
      );
      return;
    }
    if (isEmptyArray(tracksInfo)) {
      setError("Something went wrong. Please Fill Track Information Again");
      return;
    }
    if (isEmptyObject(releaseDate)) {
      setError("Something went wrong. Please Fill Release Date Again");
      return;
    }

    const payload = {
      ...releaseAlbumInfo,
      tracks: tracksInfo,
      ...releaseDate,
      format: trackFormat,
      date: new Date().toISOString(),
      userName: userNameIdRoll[0],
      masterUserId: userNameIdRoll[1],
      status: "QC Approval",
    };
    
    if(pathname.includes("edit-release")) {
      axios
        .put(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/update-release/${pathname.split("/").pop()}`,
          payload
        )
        .then((res) => {
          if (res.status === 200) {
            dispatch(setReleaseAlbumInfo({}));
            dispatch(setTracksInfo([]));
            dispatch(setTrackFormat("Single"));
            dispatch(setReleaseDate({}));
            setStep(4);
          }
        });
    }
    else {
      axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/create-release`,
        payload
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(setReleaseAlbumInfo({}));
          dispatch(setTracksInfo([]));
          dispatch(setTrackFormat("Single"));
          dispatch(setReleaseDate({}));
          setStep(4);
        }
      });
    }
  };

  // This useEffect will run after the error message renders
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  return (
    <div>
      {error && (
        <div ref={errorRef} className="home-notice">
          <InfoCircledIcon />
          <p>{error}</p>
        </div>
      )}
      <h3 className="create-release-heading">Release Overview</h3>
      <div className="createRelease-content-div createRelease-overview-div">
        <div className="d-flex release-overview-img-div">
          <img
            src={releaseAlbumInfo?.imgUrl}
            className="release-overview-img"
            alt=""
          />
          <div style={{ margin: "auto 10px" }}>
            <h1>{releaseAlbumInfo?.releaseTitle}</h1>
            <h2>
              {
                [...new Set(
                  tracksInfo?.flatMap(track =>
                    track?.artist?.map(a => a.artistName)
                  )
                )].join(', ')
              }
              {
                [...new Set(
                  tracksInfo?.flatMap(track =>
                    track?.primaryArtist?.map(a => a.artistName)
                  )
                )].join(', ')
              }
            </h2>
          </div>
        </div>
        <hr />
        <h3 className="release-album-title">Album Info</h3>
        <div className="release-album-info-row">
          <div className="d-flex">
            <p>Release Tittle:</p>
            <p>{releaseAlbumInfo?.releaseTitle}</p>
          </div>
          {/* <div className="d-flex">
            <p>Primary Artist:</p>
            <p>
              {releaseAlbumInfo?.artist
                ?.map((artist) => artist.artistName)
                .join(", ")}
            </p>
          </div>
          <div className="d-flex">
            <p>Featuring:</p>
            <p>
              {releaseAlbumInfo?.featuring
                ?.map((artist) => artist.artistName)
                .join(", ")}
            </p>
          </div> */}
          <div className="d-flex">
            <p>Genre:</p>
            <p>{releaseAlbumInfo?.genre}</p>
          </div>
          <div className="d-flex">
            <p>Sub Genre:</p>
            <p>{releaseAlbumInfo?.subGenre}</p>
          </div>
          <div className="d-flex">
            <p>Label Name:</p>
            <p>
              {releaseAlbumInfo?.labels
                ?.map((label) => label.labelName)
                .join(", ")}
            </p>
          </div>
          <div className="d-flex">
            <p>Release Date:</p>
            <p>
              {releaseDate?.releaseDate
                ? releaseDate.releaseDate
                : releaseDate?.releaseOption}
            </p>
          </div>
          <div className="d-flex">
            <p>Version/Subtittle:</p>
            <p>{releaseAlbumInfo?.subTitle}</p>
          </div>
          <div className="d-flex">
            <p>Format:</p>
            <p>{trackFormat}</p>
          </div>
          <div className="d-flex">
            <p>℗ line:</p>
            <p>{releaseAlbumInfo?.pLine}</p>
          </div>
          <div className="d-flex">
            <p>© line:</p>
            <p>{releaseAlbumInfo?.cLine}</p>
          </div>
          <div className="d-flex">
            <p>Production Year:</p>
            <p>{releaseAlbumInfo?.productionYear}</p>
          </div>
          <div className="d-flex">
            <p>UPC/EAN</p>
            <p>{releaseAlbumInfo?.UPC}</p>
          </div>
          {/* <div className="d-flex">
            <p>Producer Catalog Number:</p>
            <p>1111111111</p>
          </div> */}
        </div>
        <hr />
        <h3 className="release-album-title">Tracks</h3>
        <br />
        <div>
          {tracksInfo &&
            tracksInfo.map((track, index) => (
              <div key={index}>
                <TrackViewCollapsSection track={track} index={index} />
              </div>
            ))}
        </div>
      </div>
      {step === 4 || (
        <div className="createRelease-btns">
          {step > 0 && (
            <button
              className="theme-btn2"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={handlePrev}
            >
              <ArrowLeft />
              &nbsp; Back
            </button>
          )}
          <button className="theme-btn" onClick={releaseUpload}>
            Submit &nbsp; <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
ReleaseOverview.propTypes = {
  releaseAlbumInfo: PropTypes.array.isRequired,
  releaseTrackDetails: PropTypes.array.isRequired,
};
export default ReleaseOverview;
