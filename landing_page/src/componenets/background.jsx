import React, { useEffect, useRef } from "react";

export default function MatrixCodeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fix: make canvas cover full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.position = "fixed"; // stays behind everything
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "0";

    let width = canvas.width;
    let height = canvas.height;

    const characters =
      "アァカサタナハマヤラワガザダバパヰヱギジヂビピウヴルグズブヅプエケセテネヘメレゲゼデベペオォコソトノホモヨロヲゴゾドボポッン0123456789";
    const fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -100)
    );

    let animationFrameId;

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text =
          characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, y * fontSize);

        drops[i] =
          y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1;
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -100)
      );
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
