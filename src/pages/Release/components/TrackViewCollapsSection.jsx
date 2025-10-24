import { Tabs } from "radix-ui";
import { Collapsible } from "radix-ui";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import AudioPlayerForTracViewTab from "../../../components/AudioPlayerForTracViewTab";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { setTracksInfo } from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";
import axios from "axios";
import artistDemoImg from "../../../assets/artists/artist4.png";
import { cdnLink } from "../../../hooks/cdnLink";
const TrackViewCollapsSection = ({ track, index }) => {
  // Get TrackInfo Data State form Redux
  const { tracksInfo } = useSelector((state) => state.releaseData);
  const dispatch = useDispatch();

  const [albumOverviewSong, setAlbumOverviewSong] = useState(false);

  const pathname = window.location.pathname;

  const deleteTrack = (indexNumber) => {
    const updatedTracks = tracksInfo.filter(
      (item, index) => index !== indexNumber
    );
    dispatch(setTracksInfo(updatedTracks));
    axios
      .delete(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/delete-file?key=${track.audioKey}`
      )
      .then((res) => {
        if (res.status == 200) {
          alert("Deleted");
        }
      })
      .catch((er) => console.log(er));
  };

  return (
    <div>
      <Collapsible.Root
        open={albumOverviewSong}
        onOpenChange={setAlbumOverviewSong}
        style={{ background: "#F9F9F9", borderRadius: "4px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <AudioPlayerForTracViewTab data={track} />
          </div>
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {/* {
                  index && 
                } */}
            {(pathname == "/create-release" || pathname.includes("edit-release")) && (
              <X
                size={18}
                onClick={() => deleteTrack(index)}
                style={{ color: "red", cursor: "pointer" }}
              />
            )}
            <Collapsible.Trigger asChild>
              {albumOverviewSong ? (
                <MdKeyboardArrowUp className="release-album-arrowIcon" />
              ) : (
                <MdKeyboardArrowDown className="release-album-arrowIcon" />
              )}
            </Collapsible.Trigger>
          </div>
        </div>

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
                  {/* <div className="d-flex">
                    <p>Track type:</p>
                    <p>Cover</p>
                  </div> */}
                  {/* <div className="d-flex">
                    <p>Genre:</p>
                    <p>{track?.genre}</p>
                  </div> */}
                  <div className="d-flex">
                    <p>Tittle :</p>
                    <p>{track?.tittle}</p>
                  </div>
                  {/* <div className="d-flex">
                    <p>Sub-genre:</p>
                    <p>{track?.subGenre}</p>
                  </div> */}
                  <div className="d-flex">
                    <p>Version/Subtittle:</p>
                    <p>{track?.versionSubtittle}</p>
                  </div>
                  <div className="d-flex">
                    <p>Parental Advisory:</p>
                    <p>{track?.parentalAdvisory}</p>
                  </div>
                  {/* <div className="d-flex">
                    <p>℗ line:</p>
                    <p>{track?.pLine}</p>
                  </div> */}
                  {/* <div className="d-flex">
                    <p>Track Tittle Language:</p>
                    <p>{track?.language}</p>
                  </div> */}
                  {/* <div className="d-flex">
                    <p>Production Year:</p>
                    <p>{track?.productionYear}</p>
                  </div> */}
                  <div className="d-flex">
                    <p>Lyrics Language:</p>
                    <p>{track?.language}</p>
                  </div>
                  <div className="d-flex">
                    <p>Publisher:</p>
                    <p>{track?.publisher}</p>
                  </div>
                  <div className="d-flex">
                    <p>Lyrics:</p>
                    <p>{track?.lyrics}</p>
                  </div>
                  <div className="d-flex">
                    <p>ISRC Code:</p>
                    <p>{track?.ISRC}</p>
                  </div>
                </div>
              </Tabs.Content>
              <Tabs.Content className="tabs-content" value="Credits">
                <div className="form-grid releaseCredit-formGrid">
                  <div className="d-flex releaseCredit-items">
                    <p className="releaseCredit-items-title">Primary Atrist</p>
                    <div>
                      {track?.artist?.map((data, index) => (
                        <div key={index} className="d-flex">
                          <img
                            src={data?.key ? cdnLink(data?.key) : artistDemoImg}
                            alt=""
                          />
                          <p>{data?.artistName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="d-flex releaseCredit-items"
                  >
                    <p className="releaseCredit-items-title">Lyricist</p>
                    {Array.isArray(track?.lyricist) &&
                      track.lyricist.length > 0 &&
                      (typeof track.lyricist[0] === "object"
                        ? track.lyricist.map((data, index) => (
                            <div key={index} className="d-flex">
                              <img
                                src={
                                  data?.key ? cdnLink(data?.key) : artistDemoImg
                                }
                                alt=""
                              />
                              <p>{data?.artistName}</p>
                            </div>
                          ))
                        : track.lyricist.join(", "))}

                    {track?.authors &&
                      track.authors.map((author, index) => (
                        <span key={index} style={{ paddingRight: "5px" }}>
                          {author}
                        </span>
                      ))}
                  </div>
                  <div className="d-flex releaseCredit-items">
                    <p className="releaseCredit-items-title">Featuring</p>
                    <div>
                      {track?.featuring?.map((data, index) => (
                        <div key={index} className="d-flex">
                          <img
                            src={data?.key ? cdnLink(data?.key) : artistDemoImg}
                            alt=""
                          />
                          <p>{data?.artistName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="d-flex releaseCredit-items"
                  >
                    <p className="releaseCredit-items-title">Composer</p>
                    {/* {   
                            track?.composer?.map((data, index) => 
                                <div key={index} className="d-flex">
                                    <img
                                        src={data?.imgUrl ? data?.imgUrl : artistDemoImg}
                                        alt=""
                                    />
                                    <p>{data?.artistName}</p>
                                </div>
                            )
                        } */}
                    {Array.isArray(track?.composer) &&
                      track.composer.length > 0 &&
                      (typeof track.composer[0] === "object"
                        ? track.composer.map((data, index) => (
                            <div key={index} className="d-flex">
                              <img
                                src={
                                  data?.key ? cdnLink(data?.key) : artistDemoImg
                                }
                                alt=""
                              />
                              <p>{data?.artistName}</p>
                            </div>
                          ))
                        : track.composer.join(", "))}
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="d-flex releaseCredit-items"
                  >
                    <p className="releaseCredit-items-title">Producer</p>
                    <p>{track?.producer}</p>
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="d-flex releaseCredit-items"
                  >
                    <p className="releaseCredit-items-title">Arranger</p>
                    <p>{track?.arranger}</p>
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};

export default TrackViewCollapsSection;
