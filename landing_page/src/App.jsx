import React from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import Navbar from "./components/Navbar.jsx";
import MatrixCodeBackground from "./componenets/background.jsx"; // Make sure filename matches exactly
import MatrixWelcome from "./componenets/MatrixWelcome.jsx"; // Make sure filename matches exactly

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Matrix background */}
      <MatrixCodeBackground />

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Welcome glitching content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4 text-center">
        <MatrixWelcome
          message="Welcome Agents to the Grand Event of Sristi"
          buttonText="Enter the Matrix"
          onClick={() => console.log("Button Clicked")}
        />
      </div>

    </div>
  );
};

export default App;
