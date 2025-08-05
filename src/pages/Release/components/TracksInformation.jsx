import PropTypes from "prop-types";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TrackInformationUploadForm from "./TrackInformationUploadForm";
import { useDispatch, useSelector } from "react-redux";
import TrackViewCollapsSection from "./TrackViewCollapsSection";
import { setTrackFormat } from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";
function TracksInformation({ step, setStep, steps, handlePrev}) {

  

  const {tracksInfo, trackFormat} = useSelector(state => state.releaseData);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const handleAddTrackClick = () => {
    setShowForm(true);
  };


  const [error,setError] = useState('')
  const handleNext = () => {
    setError('')
    console.log(tracksInfo.length)
    if (tracksInfo.length === 0) {
      setError("Please Add Track"); 
    } else {
      if (step < steps.length - 1) {
      setStep(step + 1);
    }
    }
    
  };


  return (
    <>
      <h3 className="create-release-heading">Fill Tracks Meta Data</h3>
      <div className="createRelease-content-div">
        <label htmlFor="">Format</label>
        <RadioGroup.Root
          className="radio-group"
          defaultValue={trackFormat}
          onValueChange={(value) => dispatch(setTrackFormat(value))}
        >
          <label className="radio-label">
            <span><RadioGroup.Item className="radio-item" value="Single" />&nbsp; Single</span>
          </label>
          <label className="radio-label">
            <span><RadioGroup.Item className="radio-item" value="Album" />&nbsp; Album</span>
          </label>
        </RadioGroup.Root>

        {
          trackFormat === "Single" &&
          <>
            {
              tracksInfo.length > 1 && 
              <>
                <p style={{color: '#ea3958', border: '1px solid #ea3958', padding: '5px', borderRadius: '8px', margin: '10px'}}>We are noticing that you have previously added multiple tracks by selecting the track status album. Now you have changed the track status to single from the album. Please remove your extra tracks, otherwise only the first track will be uploaded.</p>
                {
                tracksInfo &&
                tracksInfo.map((track, index) => 
                  <div key={index}>
                    <TrackViewCollapsSection track={track} index={index}/>
                  </div>
                )
              }
              </>
            }
            <TrackInformationUploadForm
              step={step}
              steps={steps}
              setStep={setStep}
              handlePrev={handlePrev}
              setShowForm={setShowForm}
              />
          </>
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
                    <TrackViewCollapsSection track={track} index={index}/>
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
        error && <p style={{color: 'red', textAlign:'right', paddingBottom: '15px'}}>{error}</p>
      }
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
            {
              trackFormat === 'Album' && !showForm &&
              <button className="theme-btn" onClick={handleNext}>
                Next &nbsp; <ArrowRight />
              </button>
            }
            {
              trackFormat === 'Album' && showForm &&
              <button style={{backgroundColor: 'gray'}} className="theme-btn">
                Please Add Track + First &nbsp; <ArrowRight />
              </button>
            }
           
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
