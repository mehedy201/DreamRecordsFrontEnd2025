import PropTypes from "prop-types";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TrackInformationUploadForm from "./TrackInformationUploadForm";
import { useSelector } from "react-redux";
import TrackViewCollapsSection from "./TrackViewCollapsSection";
function TracksInformation({ artistsItems, step, setStep, steps, handleNext, handlePrev, lablesItems}) {

  const [trackFormat, setTrackFormat] = useState("Singles");
  const {tracksInfo} = useSelector(state => state.releaseData)

  const [showForm, setShowForm] = useState(false);
  const handleAddTrackClick = () => {
    setShowForm(true);
  };


  return (
    <>
      <h3 className="create-release-heading">Fill Tracks Meta Data</h3>
      <div className="createRelease-content-div">
        <label htmlFor="">Format</label>
        <RadioGroup.Root
          className="radio-group"
          value={trackFormat}
          onValueChange={setTrackFormat}
        >
          <label className="radio-label">
            <span><RadioGroup.Item className="radio-item" value="Singles" />&nbsp; Singles</span>
          </label>
          <label className="radio-label">
            <span><RadioGroup.Item className="radio-item" value="Album" />&nbsp; Album</span>
          </label>
        </RadioGroup.Root>

        {
          trackFormat === "Singles" &&
          <TrackInformationUploadForm
            trackFormat={trackFormat}
            step={step}
            steps={steps}
            setStep={setStep}
            handlePrev={handlePrev}
            setShowForm={setShowForm}
            />
        }
        {
          trackFormat === "Album" &&
          <>
          <div id="formOpenDiv">
            <div>
              {
                tracksInfo &&
                tracksInfo.map((track, index) => 
                  <div key={index}>
                    <TrackViewCollapsSection track={track}/>
                  </div>
                )
              }
            </div>
          {
            showForm &&
            <TrackInformationUploadForm
              step={step}
              steps={steps}
              setStep={setStep}
              handlePrev={handlePrev}
              setShowForm={setShowForm}
            />
          }
          </div>
          <br /><br />
          {
            !showForm &&
            <button onClick={handleAddTrackClick} className="theme-btn" style={{ width: "100%", margin: "0" }}>
              Add Track +
            </button>
          }
          </>
        }
        
      </div>

      {/* This Next And Pre Button Will active if release type Album _____________ */}
      {
        trackFormat === 'Album' &&
        <>
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
                <ArrowLeft /> &nbsp; Back
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
        </>
      }
    </>
  );
}
TracksInformation.propTypes = {
  artistsItems: PropTypes.array.isRequired,
  LablesItems: PropTypes.array.isRequired,
  albumTrackList: PropTypes.array.isRequired,
};
export default TracksInformation;
