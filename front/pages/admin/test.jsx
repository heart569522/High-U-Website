import { useEffect, useRef } from 'react';
import * as tracking from 'tracking';

const Webcam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      tracking.track(video, tracker);
      tracker.on('track', function (event) {
        event.data.forEach(function (rect) {
          // rect.x, rect.y, rect.height, rect.width contain the position and size of the tracked face
          // you can use this information to display the picture on top of the face
        });
      });
    }
  }, [videoRef]);

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />
    </div>
  );
};

export default Webcam;
