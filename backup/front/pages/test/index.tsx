import { useRef } from "react";
import anime from "animejs";

import { Box } from "@mui/material";

const Home: React.FC = () => {
  const logoRef = useRef<SVGSVGElement>(null);

  const restartAnimation = () => {
    anime.remove(logoRef.current);

    const logoAnimation = anime.timeline({
      autoplay: true,
      delay: 200,
      loop: true
    });

    logoAnimation
      .add({
        targets: "#logo",
        translateY: [-100, 0],
        opacity: [0, 1],
        elasticity: 600,
        duration: 1600,
      })
      .add({
        targets: "#logo-hexagon",
        rotate: [-90, 0],
        duration: 1200,
        elasticity: 600,
        offset: 100,
      })
      .add({
        targets: "#logo-circle",
        scale: [0, 1],
        duration: 1200,
        elasticity: 600,
        offset: 500,
      })
      .add({
        targets: "#logo-mask",
        scale: [0, 1],
        duration: 1000,
        elasticity: 600,
        offset: 550,
      })
      .add({
        targets: "#logo-text",
        translateX: ["-100%", 0],
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutExpo",
        offset: 1000,
      });
  };

  return (
    <Box className="bg-black h-screen w-screen">
      <Box className="siteLogo flex items-center justify-center">
        <Box id="logo" ref={logoRef}>
          <svg width="100%" height="100%" viewBox="0 0 148 128">
            <defs>
              <mask id="circle-mask">
                <rect fill="white" width="100%" height="100%" />
                <circle id="logo-mask" fill="black" cx="120" cy="96" r="28" />
              </mask>
            </defs>
            <polygon
              id="logo-hexagon"
              fill="#00B4FF"
              points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96"
              mask="url(#circle-mask)"
            />
            <circle
              id="logo-circle"
              fill="#3F3C3C"
              cx="120"
              cy="96"
              r="20"
            />
          </svg>
        </Box>
        <Box className="siteTitle">
          <Box id="logo-text" className="siteTitleText" sx={{ fontFamily: "Dosis" }}>
            hexagon<span>circle</span>
          </Box>
        </Box>
      </Box>
      <button className="buttonRestart" onClick={restartAnimation}>
        restart
      </button>
    </Box>
  );
};

export default Home;
