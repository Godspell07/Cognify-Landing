import { useEffect } from "react";
import gsap from "gsap";

const LoadingScreen = ({ loading, progress }) => {
  useEffect(() => {
    if (!loading) {
      gsap.to("#loading-screen", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          const el = document.getElementById("loading-screen");
          if (el) el.style.display = "none";
        },
      });
    }
  }, [loading]);

  return (
    <div
      id="loading-screen"
      className="
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center
        bg-[#f3ddc2] text-[#618A7F]
      "
    >
      {/* LOGO */}
      <h1
        className="
          text-5xl md:text-6xl
          font-bold tracking-tight
          animate-pulse
        "
      >
        Cognify.
      </h1>

      {/* PROGRESS BAR */}
      <div className="mt-10 w-56 h-2 rounded-full bg-[#618A7F]/20 overflow-hidden">
        <div
          className="h-full rounded-full bg-[#618A7F]
                     transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
