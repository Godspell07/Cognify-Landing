// Rack.jsx
const Rack = ({ color = "var(--fg)" }) => {
  // Tweak these to match your gear's actual teeth
  const toothWidth = 40; 
  const toothHeight = 20;
  const width = 4000; // Make this wide enough to cover the whole scroll area

  return (
    <div 
      className="absolute top-0 left-0 w-full overflow-visible pointer-events-none"
      style={{ transform: `translateY(-${toothHeight - 1}px)` }} // Pulls it up to sit on top
    >
      <svg
        width="100%"
        height={toothHeight}
        preserveAspectRatio="none"
        className="block"
      >
        <defs>
          <pattern
            id="tooth-pattern"
            x="0"
            y="0"
            width={toothWidth * 2} // Space for tooth + gap
            height={toothHeight}
            patternUnits="userSpaceOnUse"
          >
            {/* The shape of one tooth */}
            <path
              d={`M0 ${toothHeight} L${toothWidth * 0.2} 0 H${toothWidth * 0.8} L${toothWidth} ${toothHeight} Z`}
              fill={color}
            />
          </pattern>
        </defs>
        <rect width="100%" height={toothHeight} fill="url(#tooth-pattern)" />
      </svg>
    </div>
  );
};

export default Rack;