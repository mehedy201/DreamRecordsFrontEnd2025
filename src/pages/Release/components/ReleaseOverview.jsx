import PropTypes from "prop-types";
import { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Dialog, Slider, Tabs } from "radix-ui";
import { RiDownloadLine } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Modal from "../../../components/Modal";
import { Collapsible } from "radix-ui";
import { useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
function ReleaseOverview({ releaseAlbumInfo, releaseTrackDetails, step, setStep, steps, handleNext, handlePrev }) {
  const [albumOverviewSong, setAlbumOverviewSong] = useState(false);
  const location = useLocation();
  const supportMessage = location.state?.supportMessage;
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
            src="src/assets/release-create.png"
            className="release-overview-img"
            alt=""
          />
          <div style={{ margin: "auto" }}>
            <h1>Ami Dur Hote Tomarei Dekhechi</h1>
            <h2>Ayuska Bhowmik</h2>
          </div>
        </div>
        <hr />
        <h3 className="release-album-title">Album Info</h3>
        <div className="release-album-info-row">
          {releaseAlbumInfo.map((item, index) => (
            <div key={index} className="d-flex">
              <p>{item.title}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <hr />
        <h3 className="release-album-title">Tracks</h3>
        <br />
        <div>
          <Collapsible.Root
            open={albumOverviewSong}
            onOpenChange={setAlbumOverviewSong}
            style={{ background: "#F9F9F9", borderRadius: "4px" }}
          >
            <Collapsible.Trigger asChild>
              <div className="release-album-list">
                <IoPlayCircleOutline className="release-album-playIcon" />
                <div>
                  <p>Tere Bin</p>
                  <small>Ayuska Bhowmik</small>
                </div>
                <div className="d-flex release-album-RangeDiv">
                  <p>04:23</p>
                  <Slider.Root
                    className="rangeSliderRoot"
                    defaultValue={[50]}
                    max={100}
                    step={1}
                  >
                    <Slider.Track className="SliderTrack">
                      <Slider.Range className="SliderRange" />
                    </Slider.Track>
                    <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                  </Slider.Root>
                  <button className="release-track-download-btn">
                    <RiDownloadLine /> Download
                  </button>
                  {albumOverviewSong ? (
                    <MdKeyboardArrowUp className="release-album-arrowIcon" />
                  ) : (
                    <MdKeyboardArrowDown className="release-album-arrowIcon" />
                  )}
                </div>
              </div>
            </Collapsible.Trigger>

            <Collapsible.Content>
              <div className="album-details">
                <Tabs.Root className="tabs-root" defaultValue="TrackDetails">
                  <Tabs.List className="tabs-list">
                    <Tabs.Trigger
                      className="tabs-trigger release-track-tabs-trigger"
                      value="TrackDetails"
                    >
                      Track Details
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="tabs-trigger release-track-tabs-trigger"
                      value="Credits"
                    >
                      Credits
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content className="tabs-content" value="TrackDetails">
                    <div className="release-track-details">
                      {releaseTrackDetails.map((item, index) => (
                        <div key={index} className="d-flex">
                          <p>{item.title}</p>
                          <p>
                            {item.title === "Lyrics:"
                              ? item.value.length > 35 && (
                                  <>
                                    {item.value.slice(0, 35) + "..."}
                                    <br />
                                    <Dialog.Root>
                                      <Dialog.Trigger>Read More</Dialog.Trigger>
                                      <Modal title="Payment Rejection Details">
                                        <p className="modal-description">
                                          Tere Bin Main Yun Kaise JiyaKaise
                                        </p>
                                        <p className="modal-description">
                                          Jiya Tere BinTere Bin Main Yun
                                        </p>
                                        <p className="modal-description">
                                          Kaise JiyaKaise Jiya Tere BinLekar
                                        </p>
                                        <p className="modal-description">
                                          Yaad Teri Raaten Meri KatiLekar
                                        </p>
                                        <p className="modal-description">
                                          Yaad Teri Raaten Meri Katihjk
                                        </p>
                                      </Modal>
                                    </Dialog.Root>
                                  </>
                                )
                              : item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Tabs.Content>
                  <Tabs.Content className="tabs-content" value="Credits">
                    <p>Access and update your documents.</p>
                  </Tabs.Content>
                </Tabs.Root>
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
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
