import './App.css'
import VideoJS from './VideoJs'
import { useRef } from 'react'


function App() {
  const playerRef = useRef(null);
  const videoLink = "http://localhost:3000/uploads/courses/3a49ceaa-ddd8-4a33-a32e-00c90bfae6c4/index.m3u8";

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL"
      }
    ]
  }
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
          <div>
        <h1>Video player</h1>
      </div>
       <VideoJS
           options={videoPlayerOptions}
           onReady={handlePlayerReady}
       />
      
    </>
  )
}

export default App
