import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const FeatureSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    const scrollLength = container.scrollWidth - section.offsetWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollLength}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        id: "feature-horizontal-scroll",
        // markers: true,
      }
    });

    // horizontal slide
    tl.to(container, { x: -scrollLength, ease: "none" }, 0);

    // spin the same #morphed while scrolling horizontally
    tl.to("#morphed", { 
      rotation: 720, 
      ease: "none" 
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(tr => tr.kill());
    };
  }, []);

  return (
    <>
      {/* Viewport-fixed portal that will host #morphed during FeatureSection */}
      <div
        id="morphed-portal"
        className="pointer-events-none fixed top-[-300px] left-1/2 -translate-x-1/2 z-50"
      />

      <section
        ref={sectionRef}
        className="feature-section h-screen overflow-hidden bg-[var(--bg)]"
      >
        <div ref={containerRef} className="flex h-full">
          <div className="min-w-[100vw] flex-center">Item 1</div>
          <div className="min-w-[100vw] flex-center">Item 2</div>
          <div className="min-w-[100vw] flex-center">Item 3</div>
          <div className="min-w-[100vw] flex-center">Item 4</div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
