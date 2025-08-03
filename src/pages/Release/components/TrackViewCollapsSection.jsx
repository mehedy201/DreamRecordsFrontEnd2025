import { Tabs } from "radix-ui";
import { Collapsible } from "radix-ui";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import AudioPlayerForTracViewTab from "../../../components/AudioPlayerForTracViewTab";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { setTracksInfo } from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";
import axios from "axios";

const TrackViewCollapsSection = ({track, index}) => {

    // Get TrackInfo Data State form Redux 
    const {tracksInfo} = useSelector(state => state.releaseData);
    const dispatch = useDispatch()
    
    const [albumOverviewSong, setAlbumOverviewSong] = useState(false);
    const trackTittle = track.tittle;
    const trackAudioUrl = track.audioUrl;
    const dataForAudioPlayer = {tittle: trackTittle, audioUrl: trackAudioUrl}

    const deleteTrack = (indexNumber) => {
      const updatedTracks = tracksInfo.filter((item, index) => index !== indexNumber);
      dispatch(setTracksInfo(updatedTracks))
      axios.delete(`http://localhost:5000/api/v1/release/delete-file?key=${track.audioKey}`)
      .then( res => {
      if(res.status == 200){
          alert('Deleted')
      }
      })
      .catch(er => console.log(er));
    }
    

  return (
    <div>
      <Collapsible.Root
        open={albumOverviewSong}
        onOpenChange={setAlbumOverviewSong}
        style={{ background: "#F9F9F9", borderRadius: "4px" }}
      >

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{flexGrow: 1}}>
                <AudioPlayerForTracViewTab data={dataForAudioPlayer}/>
            </div>
            <div style={{flexShrink: 0, display: 'flex', alignItems: 'center', gap: '15px'}}>
                {/* {
                  index && 
                } */}
                <X size={18} onClick={() => deleteTrack(index)} style={{color: 'red', cursor: 'pointer'}}/>
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
                  <div className="d-flex">
                    <p>Track type:</p>
                    <p>Cover</p>
                  </div>
                  <div className="d-flex">
                    <p>Genre:</p>
                    <p>{track?.genre}</p>
                  </div>
                  <div className="d-flex">
                    <p>Tittle :</p>
                    <p>{track?.tittle}</p>
                  </div>
                  <div className="d-flex">
                    <p>Sub-genre:</p>
                    <p>{track?.subGenre}</p>
                  </div>
                  <div className="d-flex">
                    <p>Version/Subtittle:</p>
                    <p>{track?.versionSubtittle}</p>
                  </div>
                  <div className="d-flex">
                    <p>Parental Advisory:</p>
                    <p>{track?.parentalAdvisory}</p>
                  </div>
                  <div className="d-flex">
                    <p>℗ line:</p>
                    <p>{track?.pLine}</p>
                  </div>
                  <div className="d-flex">
                    <p>Track Tittle Language:</p>
                    <p>{track?.language}</p>
                  </div>
                  <div className="d-flex">
                    <p>Production Year:</p>
                    <p>{track?.productionYear}</p>
                  </div>
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
                    <p>{track?.language}</p>
                  </div>
                  <div className="d-flex">
                    <p>ISRC Code:</p>
                    <p>{track?.ISRC}</p>
                  </div>                  
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
  );
};

export default TrackViewCollapsSection;
