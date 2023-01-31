declare module '@tensorflow-models/face-detection';

import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemodel from '@tensorflow-models/face-detection';

const Home = async () => {
  
  const model = await facemodel.load();
  const predictions = await model.detect(SVGImageElement) as any;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function loadModel() {
      const m = await facemodel.load();
      setModel(m);
    }
    loadModel();
  }, []);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(e.target.files[0]);
    image.onload = async () => {
      const predictions = await model?.detect(image);
      predictions(predictions || []);
      setImageUrl(image.src);
    };
  };

  const handleWebcam = async () => {
    if (navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current?.srcObject = stream;
      videoRef.current?.onloadedmetadata = async () => {
        videoRef.current?.play();

        const canvas = canvasRef.current;
        if (!canvas) {
          return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return;
        }

        const intervalId = setInterval(async () => {
          ctx.drawImage(videoRef.current!, 0, 0, 300, 300);
          const predictions = await model?.detect(canvas);
          predictions(predictions || []);
        }, 100);

        return () => {
          clearInterval(intervalId);
        };
      };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImage} />
      <button onClick={handleWebcam}>Open Webcam</button>
      <br />
      {imageUrl ? (
        <img src={imageUrl} width={300} height={300} />
      ) : (
        <video ref={videoRef} width={300} height={300} />
      )}
      <canvas ref={canvasRef} width={300} height={300} />
      {predictions.map((prediction: { box: any }) => (
        <div
          key={prediction.box}
          style={{
            position: 'absolute',
            border: '2px solid red',
            left: prediction.box[0],
            top: prediction.box[1],
            width: prediction.box[2] - prediction.box[0],
            height: prediction.box[3] - prediction.box[1],
          }}
        />
      ))}
    </div>
  );
};

export default Home;
