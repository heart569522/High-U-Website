import React, { useState, useRef, useEffect } from 'react'
import { FaceTracker } from 'camera-fpv'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame } from '@react-three/fiber'

const ARWig = ({ faceTracker }) => {
  const [wig, setWig] = useState(null)
  const wigRef = useRef()

  useEffect(() => {
    const texture = new TextureLoader().load('../public/wig2.png')
    const geometry = new PlaneGeometry(1, 1)
    const material = new MeshBasicMaterial({ map: texture })
    const mesh = new Mesh(geometry, material)
    setWig(mesh)
  }, [])

  useFrame(({ camera }) => {
    if (faceTracker && wigRef.current) {
      const face = faceTracker.getFace()
      if (face) {
        const { position, quaternion } = face
        wigRef.current.position.copy(position)
        wigRef.current.quaternion.copy(quaternion)
        wigRef.current.translateY(-5) // adjust the position of the wig
      }
    }
  })

  return (
    <>
      {wig && (
        <group ref={wigRef}>
          {wig}
        </group>
      )}
    </>
  )
}

const ARWigTrial = () => {
  const [faceTracker, setFaceTracker] = useState(null)
  const [screenshot, setScreenshot] = useState(null)
  const canvasRef = useRef()

  useEffect(() => {
    const video = document.createElement('video')
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      video.srcObject = stream
      video.play()
      const tracker = new FaceTracker(video)
      tracker.start()
      setFaceTracker(tracker)
    })
  }, [])

  const handleTakeScreenshot = () => {
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL()
    setScreenshot(dataURL)
  }

  return (
    <>
      {faceTracker && (
        <div>
          <Canvas>
            <ARWig faceTracker={faceTracker} />
          </Canvas>
          <button onClick={handleTakeScreenshot}>Take Screenshot</button>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {screenshot && <img src={screenshot} />}
        </div>
      )}
    </>
  )
}

export default ARWigTrial
