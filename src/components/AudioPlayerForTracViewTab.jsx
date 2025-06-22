// import React from 'react';

// const AudioPlayerForTracViewTab = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default AudioPlayerForTracViewTab;

import { useRef, useState, useEffect } from 'react';
import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';
import {  Slider } from "radix-ui";
import { RiDownloadLine } from 'react-icons/ri';
import { CirclePause, CirclePlay } from 'lucide-react';

const formatTime = (time) => {
  if (isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const AudioPlayerForTracViewTab = ({data}) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const animationRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current);
      setProgress(100);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const updateProgress = () => {
    const audio = audioRef.current;
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent || 0);
    setCurrentTime(audio.currentTime);
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      if (audio.ended) audio.currentTime = 0;
      audio.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }

    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
  const bar = progressBarRef.current;
  const rect = bar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;

  const newTime = (clickX / width) * audioRef.current.duration;
  audioRef.current.currentTime = newTime;
  setCurrentTime(newTime);

  // 👉 manually update progress if paused
  if (!isPlaying) {
    const percent = (newTime / audioRef.current.duration) * 100;
    setProgress(percent || 0);
  }
};


const handleDownload = (url) => {
    // const fullFilename = url.split('/').pop(); 
    // const prefixRemoved = fullFilename.split('-').slice(2).join('-');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.setAttribute('target', '_blank'); 
    anchor.setAttribute('download', '');
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>

        <div className="release-album-list">
            <div>
                <audio ref={audioRef} src={data?.audioUrl} preload="metadata" />
                <button
                    onClick={togglePlay}
                    style={{
                    fontSize: '24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px',
                    margin: '0px'
                    }}
                >
                    {isPlaying ? <IoPauseCircleOutline className="release-album-playIcon" /> : <IoPlayCircleOutline className="release-album-playIcon" />}
                </button>
            </div>
            <div>
                <p>{data?.tittle}</p>
                <small>Ayuska Bhowmik</small>
            </div>
            <div className="d-flex release-album-RangeDiv">
                {/* Duration _______________________________________ */}
                <div className='audioDuration' style={{ fontSize: '14px', minWidth: '60px', marginRight: '24px' }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* Progress Bar */}
                <div
                    ref={progressBarRef}
                    onClick={handleProgressClick}
                    style={{
                    flex: 1,
                    height: '3px',
                    backgroundColor: '#ddd',
                    borderRadius: '5px',
                    position: 'relative',
                    cursor: 'pointer',
                    width: '200px',
                    marginRight: '47px'
                    }}
                    className='progressBarResponsive'
                >
                    {/* Filled Bar */}
                    <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#EA3958',
                        borderRadius: '5px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transition: 'none', // no transition to ensure frame-based update
                    }}
                    ></div>

                    {/* Dot */}
                    <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: `calc(${progress}% - 7.5px)`,
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#EA3958',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        border: '1px solid white',
                    }}
                    ></div>
                </div>

                <button onClick={() => handleDownload(data?.audioUrl)} className="release-track-download-btn">
                    <RiDownloadLine /> Download
                </button>
            </div>
        </div>
    </>
  );
};

export default AudioPlayerForTracViewTab;
