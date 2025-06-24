import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import TrackViewCollapsSection from "./TrackViewCollapsSection";
function ReleaseOverview({ step, setStep, steps, handleNext, handlePrev }) {

  const {releaseAlbumInfo, tracksInfo, releaseDate, trackFormat} = useSelector(state => state.releaseData);
  
  const location = useLocation();
  const supportMessage = location.state?.supportMessage;
  console.log(supportMessage)
  return (
    <div className={supportMessage && "main-content"}>
      {supportMessage ? (
        ""
      ) : (
        <h3 className="create-release-heading">Release Overview</h3>
      )}

      <div className="createRelease-content-div createRelease-overview-div">
        <div className="d-flex release-overview-img-div">
          <img
            src={releaseAlbumInfo.imgUrl}
            className="release-overview-img"
            alt=""
          />
          <div style={{ margin: "auto" }}>
            <h1>{releaseAlbumInfo?.releaseTitle}</h1>
            <h2>Ayuska Bhowmik</h2>
          </div>
        </div>
        <hr />
        <h3 className="release-album-title">Album Info</h3>
        <div className="release-album-info-row">
          <div className="d-flex">
            <p>Release Tittle:</p>
            <p>{releaseAlbumInfo?.releaseTitle}</p>
          </div>
          <div className="d-flex">
            <p>Primary Artist:</p>
            <p>{releaseAlbumInfo?.globalArtist.map(artist => artist.artistName).join(', ')}</p>
          </div>
          <div className="d-flex">
            <p>Featuring:</p>
            <p>{releaseAlbumInfo?.globalFeatureing.map(artist => artist.artistName).join(', ')}</p>
          </div>
          <div className="d-flex">
            <p>Genre:</p>
            <p>{releaseAlbumInfo?.globalGenre}</p>
          </div>
          <div className="d-flex">
            <p>Sub Genre:</p>
            <p>{releaseAlbumInfo?.globalSubGenre}</p>
          </div>
          <div className="d-flex">
            <p>Label Name:</p>
            <p>{releaseAlbumInfo?.globalLabel.map(label => label.labelName).join(', ')}</p>
          </div>
          <div className="d-flex">
            <p>Release Date:</p>
            <p>{releaseDate?.releaseDate ? releaseDate.releaseDate : releaseDate?.releaseOption}</p>
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
          <div className="d-flex">
            <p>Producer Catalog Number:</p>
            <p>1111111111</p>
          </div>
        </div>
        <hr />
        <h3 className="release-album-title">Tracks</h3>
        <br />
        <div>
          {
            tracksInfo &&
            tracksInfo.map((track, index) => 
              <div key={index}>
                <TrackViewCollapsSection track={track} index={index}/>
              </div>
            )
          }

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
          <button
            style={{
              margin: "auto",
              background: "none",
              border: "none",
            }}
          >
            cancel
          </button>
          {step < steps.length - 1 ? (
            <button className="theme-btn" onClick={handleNext}>
              Next &nbsp; <ArrowRight />
            </button>
          ) : (
            <button className="theme-btn" onClick={() => setStep(4)}>
              Submit &nbsp; <ArrowRight />
            </button>
          )}
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
