import { Dialog, Slider, Tabs } from "radix-ui";
import { Collapsible } from "radix-ui";
import { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiDownloadLine } from "react-icons/ri";
import AudioPlayerForTracViewTab from "../../../components/AudioPlayerForTracViewTab";

const TrackViewCollapsSection = ({track}) => {
    const [albumOverviewSong, setAlbumOverviewSong] = useState(false);
    const trackTittle = track.tittle;
    const trackAudioUrl = track.audioUrl;
    const dataForAudioPlayer = {tittle: trackTittle, audioUrl: trackAudioUrl}
    

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
            <div style={{flexShrink: 0}}>
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
                  <p>Track Details</p>
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
