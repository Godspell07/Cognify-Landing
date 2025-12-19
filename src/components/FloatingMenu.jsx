import { useRef, useEffect, useState } from "react";
import { AlignJustify, X } from "lucide-react";
import gsap from "gsap";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "cta", label: "Contact" },
  { id: "footer", label: "Footer" },
];

const FloatingMenu = () => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("Hero");

  /* Animate pill width */
  useEffect(() => {
    if (!menuRef.current) return;

    gsap.to(menuRef.current, {
      width: open ? 300 : 140,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [open]);

  /* Observe sections */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) setCurrent(match.label);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -30% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={menuRef}
      className="
        fixed bottom-6 right-6 z-50
        h-12
        bg-[var(--fg)] text-[var(--bg)]
        rounded-full shadow-lg
        overflow-hidden
        flex items-center
      "
    >
      {/* LEFT: current section */}
      <div
        className={`
          pl-4 pr-12 text-xs font-medium whitespace-nowrap select-none
          transition-opacity duration-200
          ${open ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        {current}
      </div>

      {/* RIGHT: toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="
          absolute right-0 top-0
          w-12 h-12
          flex items-center justify-center cursor-pointer hover:opacity-80 transition
        "
      >
        {open ? <X /> : <AlignJustify />}
      </button>

      {/* EXPANDED NAV */}
      {open && (
        <nav className="absolute left-0 flex items-center gap-6 pl-4 pr-14 text-sm font-semibold">
          {sections.slice(0, 3).map(({ id, label }) => {
            const isActive = current === label;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={`
                  cursor-pointer
                  transition
                  ${
                    isActive
                      ? "font-semibold underline"
                      : "opacity-70 hover:opacity-100"
                  }
                `}
              >
                {label}
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default FloatingMenu;
