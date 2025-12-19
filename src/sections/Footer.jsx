import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="w-full bg-[var(--bg)] text-[var(--fg)] px-6 sm:px-8 md:px-16 py-12 md:py-16"
    >
      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-b border-[var(--fg)]/10 pb-10 md:pb-12">

        {/* BRAND */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Cognify
          </h2>
          <p className="text-sm leading-relaxed text-[var(--fg)]/70 max-w-sm mx-auto md:mx-0">
            A visual thinking engine for ideas that don’t start blank.
            Build clarity from the first spark, not the first pixel.
          </p>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <span className="text-xs uppercase tracking-wider text-[var(--fg)]">
            Explore
          </span>
          <a href="#hero" className="hover:underline text-[var(--fg)]/90">
            Home
          </a>
          <a href="#features" className="hover:underline text-[var(--fg)]/90">
            Features
          </a>
          <span className="text-[var(--fg)]/30 cursor-not-allowed">
            See it in Action
          </span>
        </div>

        {/* CONTACT / SOCIAL */}
        <div className="flex flex-col gap-3 text-center md:text-left">
          <span className="text-xs uppercase tracking-wider text-[var(--fg)]">
            Connect
          </span>
          <a
            href="mailto:cognify@gmail.com"
            className="hover:underline text-[var(--fg)]/90"
          >
            Mail
          </a>
          <a
            href="https://github.com/Godspell07"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[var(--fg)]/90"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rayan-sadique-918979228/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[var(--fg)]/90"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* CTA STRIP */}
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 pt-8 md:pt-10 text-center md:text-left">
        <p className="text-base sm:text-lg text-[var(--fg)]/80 max-w-xl mx-auto md:mx-0">
          Want early access?
          <br />
          <span className="italic text-[var(--fg)]/60">
            Drop a message above and help shape Cognify from day one.
          </span>
        </p>

        <a
          href="#cta"
          className="inline-flex items-center justify-center gap-2 text-base font-medium group"
        >
          Go to CTA
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>

      {/* FOOTER BASE */}
      <div className="mt-10 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[var(--fg)]/50 text-center md:text-left">
        <span>© {new Date().getFullYear()} Cognify. Built in public.</span>
        <span>Designed for clarity, not noise.</span>
      </div>
    </footer>
  );
};

export default Footer;
