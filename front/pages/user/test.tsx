import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-wasm';
import * as facemesh from '@tensorflow-models/facemesh';
import React, { useEffect, useRef, useState } from 'react';

const Webcam: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let model: facemesh.FaceMesh;
  const [faceTracked, setFaceTracked] = useState(false);

  const detectFace = () => {
    model.estimateFaces(videoRef.current as HTMLVideoElement).then(predictions => {
      setFaceTracked(predictions.length > 0);
      predictions.forEach(prediction => {
        if (!videoRef.current || !prediction.scaledMesh) return;
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          canvas.width = videoRef.current.width;
          canvas.height = videoRef.current.height;
          ctx.drawImage(videoRef.current, 0, 0);
          const img = new Image();
          img.src = 'https://www.pngall.com/wp-content/uploads/5/Wig-PNG-Pic.png';
          let x: number[] = [];
          let y: number[] = [];
          if (Array.isArray(prediction.scaledMesh)) {
            x = prediction.scaledMesh.map(coord => coord[0]);
            y = prediction.scaledMesh.map(coord => coord[1]);
          } else {
            x = prediction.scaledMesh.arraySync()[0];
            y = prediction.scaledMesh.arraySync()[1];
          }
          ctx.drawImage(img, x[0] - img.width / 2, y[0] - img.height / 2);
        }
      });
      requestAnimationFrame(detectFace);
    });
  };

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadedmetadata', function() {
          if (canvasRef.current) {
            canvasRef.current.width = this.videoWidth;
            canvasRef.current.height = this.videoHeight;
          }
        });
      }
    }
    startVideo();
  }, []);

  useEffect(() => {
    const startTracking = async () => {
      tf.setBackend('webgl');
      model = await facemesh.load();
      if (videoRef.current) {
        detectFace();
      }
    }
    startTracking();
  }, [videoRef]);

  

  return (
    <div>
      <video ref={videoRef} autoPlay={true} className="mirror-cam"/>
      <canvas ref={canvasRef} />
      {faceTracked ? <p className='text-green-500 text-lg font-bold'>Face is being tracked</p> : <p className='text-red-500 text-lg font-bold'>No face detected</p>}
    </div>
  );
};

export default Webcam;

