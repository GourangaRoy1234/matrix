import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// GSAP is assumed to be globally available.

// --- Configuration ---
const PARTICLE_COUNT = 150; 
const WARP_DURATION = 1.0; 

// --- Particle Component (Moved inside App.jsx for encapsulation) ---
const Particle = memo(() => {
  const particleRef = useRef(null);

  // Set initial random position and size for the particle
  const initialSetup = useCallback(() => {
    if (!particleRef.current || typeof gsap === 'undefined') return;
    
    // Calculate spread based on screen dimensions for better coverage
    const x = window.innerWidth * gsap.utils.random(-0.5, 0.5, 1);
    const y = window.innerHeight * gsap.utils.random(-0.5, 0.5, 1);
    const z = gsap.utils.random(0, 500, 1);
    const size = gsap.utils.random(1, 4);
    const color = gsap.utils.random(['#00ffc8', '#0099ff', '#ff00aa', '#ffff00']);

    gsap.set(particleRef.current, {
      x: x, 
      y: y, 
      z: z, 
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      opacity: 0,
      filter: 'blur(0.5px)',
      top: '50%', 
      left: '50%',
      transform: 'translate(-50%, -50%)',
    });
  }, []);

  // Animate the particle through the tunnel
  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    initialSetup();

    // The core warp animation: Move rapidly along Z axis and scale up
    const animation = gsap.to(particleRef.current, {
      z: -1000, 
      scale: 10, 
      opacity: 0.8,
      duration: WARP_DURATION,
      ease: 'power2.in',
      repeat: -1,
      delay: gsap.utils.random(0, WARP_DURATION * 0.9), 
      onRepeat: initialSetup, // Reset position for a seamless loop
    });

    return () => animation.kill();
  }, [initialSetup]);


  return <div ref={particleRef} className="absolute transition-colors duration-500 will-change-transform"></div>;
});
Particle.displayName = 'Particle';

// --- Main Tunnel Component (Integrated into App) ---
const WarpTunnelBackground = () => {
  // Generate the particles
  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
    <Particle key={i} />
  ));

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ perspective: '800px', backgroundColor: '#05050f' }}
    >
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}> 
        {particles}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef(null);

  // --- GSAP Animation Control: Blur and fade the foreground content ---
  useEffect(() => {
    if (typeof gsap === 'undefined' || !contentRef.current) return;

    if (isLoading) {
      // Content fades out and blurs (tunnel appears strong)
      gsap.to(contentRef.current, { 
        opacity: 0.1, 
        filter: 'blur(5px) saturate(0.5)',
        duration: 1.5,
        ease: 'power2.inOut',
        pointerEvents: 'none' // Disable clicks when blurring
      });
    } else {
      // Content fades in (tunnel recedes)
      gsap.to(contentRef.current, { 
        opacity: 1, 
        filter: 'blur(0px) saturate(1)',
        duration: 0.8,
        ease: 'power2.inOut',
        pointerEvents: 'auto'
      });
    }
  }, [isLoading]);

  // --- Initial Load Effect: Automatically fade out the tunnel after 3 seconds ---
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(loadTimer);
  }, []);

  // --- Button Click Handler: Initiate Warp Transition ---
  const handlePageChange = (targetPage) => {
    console.log(`Initiating warp to: ${targetPage}`);
    setIsLoading(true);

    // Simulate page loading/routing time (e.g., 2 seconds of warp tunnel)
    setTimeout(() => {
      console.log(`Arrived at ${targetPage}.`);
      // In a real app, you would perform routing here before setting isLoading to false
      setIsLoading(false); 
    }, 2000); 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter relative overflow-hidden">
      
      {/* 1. WARP TUNNEL BACKGROUND LAYER */}
      <div 
        className={`transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      >
        <WarpTunnelBackground />
      </div>

      {/* 2. FOREGROUND CONTENT LAYER (This is what fades and blurs) */}
      <div ref={contentRef} className="relative z-10 p-4 min-h-screen flex flex-col justify-center items-center">
        
        {/* Navigation Bar */}
        <nav className="absolute top-0 w-full flex justify-between items-center py-6 px-10 text-green-400 z-30">
            <h1 className="text-3xl font-bold font-mono">THE NEXUS</h1>
            <div className="flex space-x-6">
                {['Agenda', 'Speakers', 'Register'].map(item => (
                    <button 
                        key={item}
                        onClick={() => handlePageChange(item)}
                        className="px-4 py-2 text-sm font-medium rounded-lg text-white hover:text-green-400 transition-colors duration-300 border border-green-700 hover:border-green-400 shadow-md"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </nav>

        {/* Hero Section with Glitch Text & Button */}
        <header className="text-center mt-[-10vh] flex flex-col items-center">
            <h1 className="glitch mb-10" data-text="ACCESS GRANTED">
                ACCESS GRANTED
            </h1>
            <button 
                className="glitch-button"
                onClick={() => handlePageChange('ENTER')}
            >
                ENTER THE GRID
            </button>
        </header>

      </div>
      
      {/* GLOBAL STYLES (Glitch & Fonts) */}
      <style jsx="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        .font-mono { font-family: 'Space Mono', monospace; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        /* --- GLITCH TEXT KEYFRAMES --- */
        @keyframes glitch1 {
            0% { clip: rect(24px, 9999px, 56px, 0); transform: translate(-2px, -2px); }
            20% { clip: rect(12px, 9999px, 40px, 0); transform: translate(2px, 2px); }
            40% { clip: rect(30px, 9999px, 60px, 0); transform: translate(-1px, 1px); }
            60% { clip: rect(15px, 9999px, 45px, 0); transform: translate(1px, -1px); }
            80% { clip: rect(0px, 9999px, 60px, 0); transform: translate(0px, 0px); }
            100% { clip: rect(24px, 9999px, 56px, 0); transform: translate(-2px, -2px); }
        }

        @keyframes glitch2 {
            0% { clip: rect(12px, 9999px, 40px, 0); transform: translate(1px, 1px); }
            20% { clip: rect(24px, 9999px, 56px, 0); transform: translate(-1px, -1px); }
            40% { clip: rect(0px, 9999px, 60px, 0); transform: translate(2px, 0px); }
            60% { clip: rect(15px, 9999px, 45px, 0); transform: translate(-2px, 1px); }
            80% { clip: rect(12px, 9999px, 40px, 0); transform: translate(1px, -1px); }
            100% { clip: rect(24px, 9999px, 56px, 0); transform: translate(0px, 0px); }
        }
        .glitch {
            position: relative; color: #0f0; font-size: 4em; text-transform: uppercase; font-family: monospace; cursor: default;
        }
        .glitch::before, .glitch::after {
            content: attr(data-text); position: absolute; left: 0; top: 0; width: 100%; overflow: hidden;
        }
        .glitch::before {
            text-shadow: 2px 0 #0ff; animation: glitch1 2s infinite linear alternate-reverse; 
        }
        .glitch::after {
            text-shadow: -2px 0 #f0f; animation: glitch2 3s infinite linear alternate-reverse;
        }

        /* --- GLITCH BUTTON STYLING --- */
        .glitch-button {
            background-color: #05050f; color: #0ff; border: 2px solid #0f0; padding: 12px 30px; font-size: 1.3em; text-transform: uppercase; font-family: 'Space Mono', monospace; cursor: pointer; position: relative; overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 0, 0.4);
            animation: border-flicker 1.5s infinite alternate-reverse, text-flicker 2s infinite alternate-reverse;
            transition: all 0.1s ease-out; 
        }
        @keyframes border-flicker {
            0% { border-color: #0f0; box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 0, 0.4); }
            25% { border-color: #f0f; box-shadow: 0 0 5px rgba(255, 0, 255, 0.7), 0 0 15px rgba(0, 255, 255, 0.6); }
            50% { border-color: #0ff; box-shadow: none; }
            75% { border-color: #0f0; transform: skewX(-1deg); }
            100% { border-color: #0ff; box-shadow: 0 0 12px rgba(0, 255, 255, 0.8), 0 0 25px rgba(0, 255, 0, 0.5); transform: skewX(1deg); }
        }
        @keyframes text-flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { color: #0ff; text-shadow: 0 0 5px #0ff; }
            20%, 24%, 55% { color: #f0f; text-shadow: 0 0 5px #f0f; }
        }
        .glitch-button:hover {
            color: #fff; border-color: #fff; background-color: rgba(0, 255, 255, 0.1); box-shadow: 0 0 15px #0ff, 0 0 30px #0f0, 0 0 45px #0ff; transform: scale(1.02); animation: none;
        }
      `}</style>
    </div>
  );
}
