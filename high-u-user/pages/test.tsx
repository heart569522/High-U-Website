// import * as React from 'react'
// import { useReactAR } from 'ar.js'

// function MyComponent(): JSX.Element {
//   const [arRef, ar]: [React.RefObject<HTMLDivElement>, any] = useReactAR()

//   React.useEffect(() => {
//     if (ar) {
//       // Load the image to be displayed on the face
//       const image = new Image()
//       image.src = 'https://example.com/my-image.jpg'

//       // Listen for input events related to tracked faces
//       ar.input.addEventListener('input', (event: any) => {
//         // Check if the input is a tracked face
//         if (event.inputType === 'face') {
//           // Create an image that follows the face
//           const faceImage = ar.drawables.image({
//             input: event.input,
//             image: image,
//             scale: [0.2, 0.2],
//           })

//           // Add the face image to the scene
//           ar.scene.add(faceImage)
//         }
//       })
//     }
//   }, [ar])

//   return (
//     <div ref={arRef}>
//       {ar ? (
//         <>
//           {/* Add other AR content here */}
//         </>
//       ) : (
//         <p>Loading AR...</p>
//       )}
//     </div>
//   )
// }

// export default MyComponent

import * as THREE from 'three';

// Create a Three.js Scene
const scene = new THREE.Scene();

// Create a Three.js Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Create a Three.js renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Create a Three.js Object
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Set the position of the camera
camera.position.z = 5;

// Create a Three.js AR Utility
const arUtils = new THREE.ARUtils(renderer, camera, {
  trackingMethod: 'best',
  sourceType: 'webcam',
  debug: true,
});

// Start AR tracking
arUtils.start();

// Add an event listener for the 'markerFound' event
arUtils.addEventListener('markerFound', (event:any) => {
  const marker = event.detail;

  // Add the image to the scene as a child of the marker
  const img = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/path/to/image.jpg'),
    }),
  );
  marker.add(img);
});

// Animate the scene
function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();
