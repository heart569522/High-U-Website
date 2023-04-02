const _canvases = {
  face: null,
  overlay: null,
};
let _ctx = null,
  _earringImage = null;

const _earringSettings = {
  image: "images/wig.png",
  angleHide: 5,
  angleHysteresis: 0.5,
  scale: 1,
  pullUp: 0.9,
  k: 0.8,
};

const _earringsVisibility = {
  right: false,
  left: false,
};

function start() {
  WebARRocksFaceCanvas2DHelper.init({
    spec: {
      NNCPath: "./neuralNets/NN_EARS_4.json",
      canvas: _canvases.face,
    },

    callbackReady: function (err, spec) {
      if (err) {
        console.log("ERROR in demo.js: ", err);
        return;
      }

      console.log("Try AR ready!!");
    },

    callbackTrack: function (detectState) {
      clear_canvas();
      if (detectState.isDetected) {
        draw_faceCrop(detectState.faceCrop);
        draw_earrings(
          detectState.landmarks,
          detectState.faceWidth,
          detectState.ry
        );
      } else {
        _earringsVisibility.right = true;
        _earringsVisibility.left = true;
      }
    },
  });
}

function mix_landmarks(posA, posB, k) {
  return [
    posA[0] * (1 - k) + posB[0] * k, // X
    posA[1] * (1 - k) + posB[1] * k, // Y
  ];
}

function draw_faceCrop(faceCrop) {
  _ctx.strokeStyle = "lime";
  _ctx.beginPath();
  _ctx.moveTo(faceCrop[0][0], faceCrop[0][1]);
  _ctx.lineTo(faceCrop[1][0], faceCrop[1][1]);
  _ctx.lineTo(faceCrop[2][0], faceCrop[2][1]);
  _ctx.lineTo(faceCrop[3][0], faceCrop[3][1]);
  _ctx.closePath();
  _ctx.stroke();
}

function draw_earrings(landmarks, faceWidth, ry) {
  const scale = (_earringSettings.scale * faceWidth) / _earringImage.width;

  // right earring:
  const rightEarringAngleHide =
    -_earringSettings.angleHide -
    _earringSettings.angleHysteresis * (_earringsVisibility.right ? 1 : -1);
  if (ry > rightEarringAngleHide) {
    const pos = mix_landmarks(
      landmarks.rightEarBottom,
      landmarks.rightEarEarring,
      _earringSettings.k
    );
    draw_earring(pos, scale);
    _earringsVisibility.right = true;
  } else {
    _earringsVisibility.right = false;
  }

  // left earring:
  const leftEarringAngleHide =
    -_earringSettings.angleHide -
    _earringSettings.angleHysteresis * (_earringsVisibility.left ? 1 : -1);
  if (-ry > leftEarringAngleHide) {
    const pos = mix_landmarks(
      landmarks.leftEarBottom,
      landmarks.leftEarEarring,
      _earringSettings.k
    );
    draw_earring(pos, scale);
    _earringsVisibility.left = true;
  } else {
    _earringsVisibility.left = false;
  }
}

function draw_earring(pos, scale) {
  const dWidth = scale * _earringImage.width;
  const dHeight = scale * _earringImage.height;
  const dx = pos[0] - dWidth / 2.0;
  const dy = pos[1] - dHeight * _earringSettings.pullUp;
  _ctx.drawImage(_earringImage, dx, dy, dWidth, dHeight);
}

function clear_canvas() {
  _ctx.clearRect(0, 0, _canvases.overlay.width, _canvases.overlay.height);
}

function main() {
  _earringImage = new Image();
  _earringImage.src = _earringSettings.image;

  _canvases.face = document.getElementById("WebARRocksFaceCanvas");
  _canvases.overlay = document.getElementById("overlayCanvas");

  _ctx = _canvases.overlay.getContext("2d");

  WebARRocksResizer.size_canvas({
    isFullScreen: true,
    canvas: _canvases.face,
    overlayCanvas: [_canvases.overlay],
    callback: start,
  });
}

window.addEventListener("load", main);
