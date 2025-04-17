import React from 'react';

function VideoBackground() {
  return (
    <div className="video-background">
      <video autoPlay muted loop id="death-note-video">
        <source src="https://assets.codepen.io/7773162/death-note-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
    </div>
  );
}

export default VideoBackground;
