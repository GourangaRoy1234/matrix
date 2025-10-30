import React from "react";
import "./MatrixWelcome.css";

export default function MatrixWelcome({ message, buttonText, onClick }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Glitching Semi-Transparent Welcome */}
      <h1
        className="glitch text-5xl sm:text-6xl md:text-7xl font-mono font-bold mb-10 text-center text-green-400/80"
        data-text={message}
      >
        {message}
      </h1>

      {/* Glitching Button */}
      <button
        onClick={onClick}
        className="relative px-8 py-4 font-mono text-green-400/80 border-2 border-green-400 overflow-hidden group glitch"
        data-text={buttonText}
      >
        {buttonText}
      </button>
    </div>
  );
}
