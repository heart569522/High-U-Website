import React, { useState } from 'react';
import { Button, Icon, Modal } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import Webcam from 'react-webcam';

const CameraView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);

  const capture = () => {
    const image = webcamRef.current?.getScreenshot();
    setImage(image as string | null);
    setModalOpen(true);
  };

  return (
    <div className="w-full h-full">
      <Webcam
        className="border-2 border-gray-400"
        height={400}
        width={600}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <Button onClick={capture}>
        <Icon>
          <CameraIcon />
        </Icon>
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="w-full h-full p-4 rounded-lg shadow-lg">
          <img src={image as string | undefined} alt="Captured image" />
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CameraView;
