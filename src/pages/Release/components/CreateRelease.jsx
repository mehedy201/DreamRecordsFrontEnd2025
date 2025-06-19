import { useState } from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AlbumInformation from "./AlbumInformation";
import TracksInformation from "./TracksInformation";
import ReleaseDate from "./ReleaseDate";
import ReleaseOverview from "./ReleaseOverview";
const steps = [
  "Album Information",
  "Tracks Information",
  "Release Date",
  "Overview",
];

function CreateRelease({
  artistsItems,
  LablesItems,
  releaseAlbumInfo,
  releaseTrackDetails,
  albumTrackList,
}) {
  const [step, setStep] = useState(0);
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div
      className="main-content"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {step === 4 ? (
        <div className="release-track-create-successful">
          <img src="src/assets/icons/circle-tick.png" alt="" />
          <h5>Track Created Successfully</h5>
          <p>
            Your track has been successfully created. You can now review the
            details, make edits, or proceed with distribution.
          </p>
          <br />
          <div className="d-flex">
            <button className="release-backDash-btn">Back to Dashboard</button>
            <button className="theme-btn" style={{ width: "100%" }}>
              View Track
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`d-flex release-step ${
                step == index ? "step-active" : ""
              } ${step > index ? "release-step-before" : ""}${
                index === steps.length - 1 ? "release-last-step" : ""
              }`}
            >
              <div className="release-step-number"> {index + 1}</div>
              <p>{item}</p>
              {index !== steps.length - 1 && (
                <div className="release-step-line"></div>
              )}
            </div>
          ))}
        </div>
      )}

      {step === 0 && (
        <AlbumInformation
          artistsItems={artistsItems}
          LablesItems={LablesItems}
          step={step}
          steps={steps}
          setStep={setStep}
          handlePrev={handlePrev}
        />
      )}
      {step === 1 && (
        <TracksInformation
          artistsItems={artistsItems}
          albumTrackList={albumTrackList}
          step={step}
          steps={steps}
          setStep={setStep}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
      {step === 2 && 
      <ReleaseDate
          step={step}
          steps={steps}
          setStep={setStep}
          handleNext={handleNext}
          handlePrev={handlePrev}/>}
      {step === 3 && (
        <ReleaseOverview
          releaseAlbumInfo={releaseAlbumInfo}
          releaseTrackDetails={releaseTrackDetails}
          step={step}
          steps={steps}
          setStep={setStep}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}

      <br />
      <br />
      {/* {step === 4 || (
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
      )} */}
    </div>
  );
}
CreateRelease.propTypes = {
  artistsItems: PropTypes.array.isRequired,
  LablesItems: PropTypes.array.isRequired,
  releaseAlbumInfo: PropTypes.array.isRequired,
  releaseTrackDetails: PropTypes.array.isRequired,
  albumTrackList: PropTypes.array.isRequired,
};
export default CreateRelease;
