import React, { useRef, useEffect, useState } from "react";
import { AlignJustify, X } from "lucide-react";
import gsap from "gsap";

const FloatingMenu = ({ toggleLight }) => {
  // 1. state to show X or menu icon (you can change when to flip it)
  const [isOpen, setIsOpen] = useState(false);

  // 2. refs: one for the menu container, one array for each link
  const menuRef = useRef(null);
  const linksRef = useRef([]); // linksRef.current = [el0, el1, el2...]

  // 3. timeline reference so we can play() and reverse()
  const tl = useRef(null);

  // Build the timeline once on mount
  useEffect(() => {
    // init timeline, paused so it doesn't run immediately
    tl.current = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

    // 3.a expand the menu container (from small circle -> panel)
    tl.current.to(menuRef.current, {
      width: "320px",
      height: "100vh",         // full viewport height
      borderRadius: "0px",     // make square/rect
      duration: 0.45
    });

    // 3.b stagger in the link buttons (they come up a little and fade in)
    tl.current.from(
      linksRef.current,
      {
        y: 24,
        opacity: 0,
        stagger: 0.07,
        duration: 0.35
      },
      "-=0.28" // overlap links animation with the end of the expand animation
    );

    // CLEANUP on unmount
    return () => tl.current?.kill();
  }, []);

  // helper to attach refs for each link in a map
  const setLinkRef = (el, i) => {
    linksRef.current[i] = el;
  };

  // Toggle function: play or reverse timeline, flip isOpen
  const toggleMenu = () => {
    if (!tl.current) return;
    if (!isOpen) tl.current.play();    // open
    else tl.current.reverse();         // close (reverse uses exact reverse of timeline)
    setIsOpen(!isOpen);
  };

  // Simple menu labels — you can add icons, routes, etc.
  const menuLabels = ["HOME", "ABOUT", "WORK", "SERVICES", "CONTACT"];

  return (
    <div
      ref={menuRef}
      // initial small circle styles (Tailwind). overflow-hidden hides menu items until expand.
      className={`menu fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full overflow-hidden shadow-xl z-50`}
      style={{ willChange: "width, height, borderRadius" }} // hint for performance
    >
      {/* ====== the menu contents (hidden until the container grows) ====== */}
      <div className="px-6 pt-8">
        <nav className="flex flex-col gap-4">
          {menuLabels.map((label, i) => (
            <button
              key={label}
              ref={(el) => setLinkRef(el, i)}
              className="menu-item text-left text-lg font-semibold opacity-100 bg-transparent"
              onClick={() => {
                // example action — replace with your routing/navigation
                console.log("clicked", label);
                // optionally close menu after click:
                // tl.current.reverse(); setIsOpen(false)
              }}
            >
              {label}
            </button>
          ))}

          {/* Theme toggle as a link (last item) */}
          <button
            ref={(el) => setLinkRef(el, menuLabels.length)}
            className="menu-item text-left text-lg font-semibold bg-transparent"
            onClick={() => {
              toggleLight?.();
            }}
          >
            Toggle Theme
          </button>
        </nav>
      </div>

      {/* bottom social/icons area (optional) */}
      <div className="absolute bottom-6 left-6 flex gap-3">
        <div className="social opacity-100">🐦</div>
        <div className="social opacity-100">📸</div>
      </div>

      {/* Floating control button (stays bottom-right inside the menu container) */}
      <div className="absolute bottom-3 right-3">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md bg-white text-black shadow-md"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <AlignJustify className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default FloatingMenu;
