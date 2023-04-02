const _canvases = {
  face: null, 
  overlay:null
};
let _ctx = null, _wigImage = null;

const _wigSettings = {
  image: 'images/wig.png',
  angleHide: 5, // head rotation angle in degrees from which we should hide the wig
  angleHysteresis: 0.5, // add hysteresis to angleHide value, in degrees
  scale: 0.1,    // width of the wig compared to the face width (1 -> 100% of the face width)
  pullUp: 0.8,   // 0 -> wig is displayed at the bottom of the spotted position
                  // 1 -> wig is displayed above the spotted position 
  k: 0.7,  // position is interpolated between 2 keypoints. this is the interpolation coefficient
           // 0-> wig is at the bottom of the head, 1-> wig is further back
}

function start(){
  WebARRocksFaceCanvas2DHelper.init({
    spec: {
      NNCPath: './neuralNets/NN_EARS_4.json', // neural network model file
      canvas: _canvases.face
    },

    callbackReady: function(err, spec){ // called when everything is ready
      if (err) {
        console.log('ERROR in demo.js: ', err);
        return;
      }

      // console.log('INFO in demo.js: WebAR.rocks.face is ready :)');
      console.log('Try AR is ready!!');
    },

    callbackTrack: function(detectState){
      clear_canvas();
      if (detectState.isDetected){
        draw_faceCrop(detectState.faceCrop);
        draw_earrings(detectState.landmarks, detectState.faceWidth, detectState.ry);
      } else {
        _earringsVisibility.right = true;
        _earringsVisibility.left = true;
      }
    }
  });
}


function mix_landmarks(posA, posB, k){
  return [
    posA[0] * (1-k) + posB[0] * k, // X
    posA[1] * (1-k) + posB[1] * k  // Y
  ];
}


function draw_faceCrop(faceCrop){
  _ctx.strokeStyle = 'lime';
  _ctx.beginPath();
  _ctx.moveTo(faceCrop[0][0], faceCrop[0][1]);
  _ctx.lineTo(faceCrop[1][0], faceCrop[1][1]);
  _ctx.lineTo(faceCrop[2][0], faceCrop[2][1]);
  _ctx.lineTo(faceCrop[3][0], faceCrop[3][1]);
  _ctx.closePath();
  _ctx.stroke();
}


function draw_earrings(landmarks, faceWidth, ry){
  const scale = _wigSettings.scale * faceWidth / _wigImage.width
  
  // right earring:
  const rightEarringAngleHide = -_wigSettings.angleHide - _wigSettings.angleHysteresis * ((_earringsVisibility.right) ? 1 : -1);
  if (ry > rightEarringAngleHide){
    const pos = mix_landmarks(landmarks.rightEarBottom, landmarks.rightEarEarring, _wigSettings.k);
    draw_earring(pos, scale);
    _earringsVisibility.right = true;
  } else {
    _earringsVisibility.right = false;
  }

  // left earring:
  const leftEarringAngleHide = -_wigSettings.angleHide - _wigSettings.angleHysteresis * ((_earringsVisibility.left) ? 1 : -1);
  if (-ry > leftEarringAngleHide){
    const pos = mix_landmarks(landmarks.leftEarBottom, landmarks.leftEarEarring, _wigSettings.k);
    draw_earring(pos, scale); 
    _earringsVisibility.left = true;
  } else {
    _earringsVisibility.left = false;
  }
}


function draw_earring(pos, scale){
  const dWidth = scale * _wigImage.width;
  const dHeight = scale * _wigImage.height;
  const dx = pos[0] - dWidth/2.0; //earring are centered horizontally
  const dy = pos[1] - dHeight * _wigSettings.pullUp;
  _ctx.drawImage(_wigImage, dx, dy, dWidth, dHeight);
}


function clear_canvas(){
  _ctx.clearRect(0, 0, _canvases.overlay.width, _canvases.overlay.height);
}


function main(){
  // Create earring image:
  _wigImage = new Image();
  _wigImage.src = _wigSettings.image;

  // Get canvas from the DOM:
  _canvases.face = document.getElementById('WebARRocksFaceCanvas');
  _canvases.overlay = document.getElementById('overlayCanvas');

  // Create 2D context for the overlay canvas (where the earring are drawn):
  _ctx = _canvases.overlay.getContext('2d'); 

  // Set the canvas to fullscreen
  // and add an event handler to capture window resize:
  WebARRocksResizer.size_canvas({
    isFullScreen: true,
    canvas: _canvases.face,     // WebARRocksFace main canvas
    overlayCanvas: [_canvases.overlay], // other canvas which should be resized at the same size of the main canvas
    callback: start
  })
}


window.addEventListener('load', main);