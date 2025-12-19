import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import FeatureCanvas from "../components/FeatureCanvas";

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

        // ✅ SHOW cog when horizontal pin starts
        onEnter: () => {
          gsap.set("#morphed", { autoAlpha: 1 });
        },

        // ✅ HIDE cog ONLY when horizontal pin ends (after 4th slide)
        onLeave: () => {
          gsap.set("#morphed", { autoAlpha: 0 });
        },

        // ✅ SHOW again when scrolling back into features
        onEnterBack: () => {
          gsap.set("#morphed", { autoAlpha: 1 });
        },

      },
    });

    tl.to(container, { x: -scrollLength, ease: "none" }, 0);

    tl.to(
      "#morphed",
      {
        rotation: 720,
        ease: "none",
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((tr) => tr.kill());
    };
  }, []);

  return (
    <>
      <div
        id="morphed-portal"
        className="pointer-events-none fixed top-[-300px] left-1/2 -translate-x-1/2 z-50"
      />

      <section
        ref={sectionRef}
        id="features"
        className="feature-section h-screen overflow-hidden bg-[var(--bg)]"
      >
        <div ref={containerRef} className="flex h-full">
          {/* -------- SLIDE 1 -------- */}
          <div className="min-w-[100vw] flex items-center justify-center">
            <div className="w-[90%] h-[60%] p-[1rem] flex flex-col bg-[var(--fg)] rounded-[30px] relative top-[10%]">
              <div className="flex px-[1rem]">
                <h1 className="text-[1rem] md:text-[3rem] font-bold text-[var(--bg)] underline">
                  Start from the middle up
                </h1>
              </div>

              <div className="flex flex-col md:flex-row h-full gap-6 p-[1rem]">
                <div className="flex md:w-[50%] text-[var(--bg)] ">
                  <div className="w-full text-md md:text-2xl leading-relaxed break-words">
                    <p>
                      Forget blank pages. Cognify anchors your flow in a living core,
                      a starting point informed by context, patterns, and your own intent.
                      <br />
                      Every idea radiates outward with clarity, not confusion.
                      This isn’t just a canvas.
                      <br />
                      <span className="font-bold italic">
                        It’s your creative center of gravity.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex md:w-[50%] h-full">
                  <FeatureCanvas modelPath="/models/Key.glb" scale={2.5} />
                </div>
              </div>
            </div>
          </div>

          {/* -------- SLIDE 2 -------- */}
          <div className="min-w-[100vw] flex items-center justify-center">
            <div className="w-[90%] h-[60%] p-[1rem] flex flex-col bg-[var(--fg)] rounded-[30px] relative top-[10%]">
              <div className="flex px-[1rem]">
                <h1 className="text-[1rem] md:text-[3rem] font-bold text-[var(--bg)] underline">
                  Collaborate in Real Time
                </h1>
              </div>

              <div className="flex flex-col md:flex-row h-full gap-6 p-[1rem]">
                <div className="flex md:w-[50%] text-[var(--bg)] ">
                  <div className="w-full text-md md:text-2xl leading-relaxed break-words">
                    With Cognify, development isn’t solo. Invite others to sketch,
                    comment, tweak, and explore.
                    <br />
                    Watch ideas evolve live, layering insights and perspectives fluidly.
                    Whether remote or in-person,
                    <br />
                    <span className="font-bold italic">
                      design flow stays uninterrupted.
                    </span>
                  </div>
                </div>

                <div className="flex md:w-[50%] h-full">
                  <FeatureCanvas
                    modelPath="/models/Collab.glb"
                    scale={0.5}
                    position={[0.5, -0.5, 0]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* -------- SLIDE 3 -------- */}
          <div className="min-w-[100vw] flex items-center justify-center">
            <div className="w-[90%] h-[60%] p-[1rem] flex flex-col bg-[var(--fg)] rounded-[30px] relative top-[10%]">
              <div className="flex px-[1rem]">
                <h1 className="text-[1rem] md:text-[3rem] font-bold text-[var(--bg)] underline">
                  Source, Don’t Fake
                </h1>
              </div>

              <div className="flex flex-col md:flex-row h-full gap-6 p-[1rem]">
                <div className="flex md:w-[50%] text-[var(--bg)] ">
                  <div className="w-full text-md md:text-2xl leading-relaxed break-words">
                    Cognify taps open-source libraries, trusted resources, and verified
                    assets, weaving real elements into your canvas.
                    <br />
                    What you see is grounded, practical, and ready to build upon. No
                    hallucinations. No guesswork.
                    <br />
                    <span className="font-bold italic">
                      Just ideas backed by substance.
                    </span>
                  </div>
                </div>

                <div className="flex md:w-[50%] h-full relative lg:top-[4rem]">
                  <FeatureCanvas
                    modelPath="/models/Door.glb"
                    scale={0.5}
                    position={[0.5, -0.5, -1]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* -------- SLIDE 4 -------- */}
          <div className="min-w-[100vw] flex items-center justify-center">
            <div className="w-[90%] h-[60%] p-[1rem] flex flex-col bg-[var(--fg)] rounded-[30px] relative top-[10%]">
              <div className="flex px-[1rem]">
                <h1 className="text-[1rem] md:text-[3rem] font-bold text-[var(--bg)] underline">
                  Imagine Full Interaction
                </h1>
              </div>

              <div className="flex flex-col md:flex-row h-full gap-6 p-[1rem]">
                <div className="flex md:w-[50%] text-[var(--bg)] ">
                  <div className="w-full text-md md:text-2xl leading-relaxed break-words">
                    Sketch freehand. Drop shapes. Export prototypes.
                    <br />
                    Whether you’re mapping flows, building UI mockups, or charting
                    product strategy,
                    <br />
                    <span className="font-bold italic">
                      Cognify reacts to your tools and gestures like an extension of
                      thought, not a hindrance.
                    </span>
                  </div>
                </div>

                <div className="flex md:w-[50%] h-full">
                  <FeatureCanvas modelPath="/models/item04.glb" scale={2.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
