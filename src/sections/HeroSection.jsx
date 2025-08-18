import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText, MorphSVGPlugin } from 'gsap/all'
import CircularText from '../components/CircularText'
import CurvedLoop from '../components/Loop'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin)

const HeroSection = () => {
  const ballRef = useRef(null);
  const cogRef = useRef(null);
  const heroBoxRef = useRef(null);
  const circularTextRef = useRef(null);
  const morphedHomeRef = useRef(null);  // where #morphed lives in the hero initially

  const moveCogToPortal = () => {
    const cog = document.getElementById('morphed');
    const portal = document.getElementById('morphed-portal');
    if (cog && portal && !portal.contains(cog)) {
      portal.appendChild(cog);
      // truly viewport-fixed & top-center
      gsap.set(cog, {
        position: 'fixed',
        top: '10px',
        left: '50%',
        xPercent: -50,
        y: 0,
        zIndex: 60,
      });
    }
  };

  const returnCogHome = () => {
    const cog = document.getElementById('morphed');
    const home = morphedHomeRef.current;
    if (cog && home && !home.contains(cog)) {
      home.appendChild(cog);
      // restore to hero's absolute center
      gsap.set(cog, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        y: 0,
        zIndex: 40,
      });
    }
  };

  const initializeMorphAnimation = () => {
    MorphSVGPlugin.convertToPath(ballRef.current);
    gsap.set(ballRef.current, { transformBox: 'fill-box', transformOrigin: '50% 50%' }); 
    gsap.to(ballRef.current, {
      scrollTrigger: {
        trigger: heroBoxRef.current,
        start: 'top center',
        end: '+=280',
        scrub: true,
      },
      morphSVG: { shape: cogRef.current },
      duration: 1.2,
      ease: 'power2.inOut',
    });
  };

  useGSAP(() => {
    const heroSplit = new SplitText(".title", {type: 'chars,words'})
    const paraSplit = new SplitText('.para', {type: 'lines'})

    heroSplit.chars.forEach((char) => char.classList.add('z-20'))

    gsap.from(heroSplit.chars, { yPercent: 150, duration: 1.8, ease: 'expo.out' })
    gsap.from('.border-animation', { borderBottomWidth: 0, duration: 0.5, delay: 0.4, ease: 'power1.out' })
    gsap.from('.hero-button', { opacity: 0, duration: 1, ease: 'power1.inOut' })

    gsap.from(paraSplit.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 2,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 0.5,
    })

    // secondary morph while scrolling down the page
    gsap.to(ballRef.current, {
      scrollTrigger: {
        trigger: '#border-animation',
        start: "top 20% ",
        endTrigger: ".feature-section",
        end: "top top",
        scrub: true,
        pin: false,
      },
      morphSVG: { shape: cogRef.current },
      duration: 1.2,
      ease: 'power2.inOut',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroBoxRef.current,
        start: "center top",
        endTrigger: ".feature-section",
        end: "top top",
        scrub: true,
        pin: false,
      }
    });

    MorphSVGPlugin.convertToPath(ballRef.current);
    gsap.set(ballRef.current, { transformBox: 'fill-box', transformOrigin: '50% 50%' });

    // Move hero content a bit, but DO NOT push the cog up with a 'y' on #morphed
    tl.to(heroBoxRef.current, { y: 150, duration: 3, ease: 'linear' }, 0)

    // scale the cog only (no y!)
    tl.to('#morphed', {
      scale: 8,
      y: -300,
      transformOrigin: "50% 50%",
      duration: 3,
      ease: "power2.inOut"
    }, 1);

    // fade out circular text
    tl.to(circularTextRef.current, {
      opacity: 0,
      duration: 2,
      ease: "power1.inOut"
    }, 1);

    // 🧠 The crucial handoff:
    // When FeatureSection hits top, portal the cog out of transformed ancestors,
    // so it stays truly at the top, independent of pin/transform.
    ScrollTrigger.create({
      trigger: ".feature-section",
      start: "top top",
      onEnter: moveCogToPortal,
      onEnterBack: moveCogToPortal,
      onLeaveBack: returnCogHome,   // scrolling back up past feature -> put it back
      // (optional) onLeave: returnCogHome if you want it to rejoin after feature ends
    });

  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          initializeMorphAnimation();
        }
      });
    });

    const themeRoot = document.querySelector('.theme-root');
    if (themeRoot) {
      observer.observe(themeRoot, { attributes: true });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const cogD = `M177.767 1.80409L167.072 3.78088L166.716 20.1766L166.359 36.5724L155.784 40.1772C149.961 42.154 144.733 43.7819 144.02 43.7819C143.426 43.7819 138.554 38.3167 133.206 31.5723C127.859 24.7116 123.106 19.3627 122.631 19.5952C117.283 21.8046 101.123 31.6886 101.123 32.7351C101.123 33.4328 103.262 39.9446 105.876 47.1541C108.49 54.2473 110.629 60.8754 110.629 61.6893C110.629 63.201 94.2307 76.3409 92.4483 76.3409C92.0918 76.3409 85.7939 72.6199 78.5454 68.2011C71.2969 63.6661 65.2366 60.0614 64.999 60.0614C64.7613 60.0614 60.7212 64.2475 55.968 69.364L47.4124 78.6665L52.0467 84.1318C54.6609 87.2714 59.2952 92.9692 62.3848 96.9228L67.9697 104.249L61.7906 113.202C58.3446 118.202 55.4927 122.505 55.2551 122.737C54.8986 123.086 30.1823 117.97 24.9539 116.342C23.4091 115.993 21.8644 118.435 18.0619 127.738C15.4477 134.249 13.6652 139.831 14.1405 140.18C14.7347 140.529 20.7949 144.482 27.8058 148.901C42.0652 157.855 41.1145 155.413 37.0744 171.692L35.1731 179.25L18.8937 180.878L2.61422 182.506L2.02008 187.274C1.66359 189.832 1.06945 195.53 0.712969 199.716L0 207.507L3.92133 208.67C6.06023 209.368 13.1899 211.344 19.7255 213.089C26.261 214.833 31.9648 216.577 32.3213 216.926C32.7966 217.275 33.3907 222.275 33.866 228.089L34.579 238.554L21.8644 244.252C14.7347 247.392 7.84266 250.648 6.53555 251.462L3.92133 252.973L7.24852 264.369L10.4569 275.765H16.2795C19.4878 275.648 27.2116 275.416 33.3907 275.183L44.6794 274.718L49.076 284.486L53.3538 294.37L40.8769 305.998L28.2811 317.742L35.1731 327.51C38.9756 332.975 42.3028 337.627 42.5405 337.859C42.7781 338.092 49.9078 335.417 58.5823 331.813L74.2676 325.184L77.1195 327.859C78.6642 329.254 82.1102 332.859 84.6056 335.882L89.3588 341.348L81.6349 356.464L73.7923 371.581L83.8927 379.256L93.993 387.047L107.064 375.302L120.016 363.674L129.523 368.907C134.87 371.93 139.148 374.721 139.148 375.418C139.148 376 138.078 383.674 136.652 392.279C135.345 401 134.632 408.442 135.226 408.908C135.702 409.373 141.168 411.349 147.228 413.21L158.16 416.698L164.22 406.117C167.666 400.303 171.588 393.442 173.133 390.768L175.866 386.116L186.323 387.861C192.026 388.791 196.898 389.605 197.136 389.721C197.255 389.954 198.918 397.512 200.82 406.698L204.147 423.443L216.743 423.792L229.219 424.141L230.527 417.978C231.24 414.605 232.784 406.931 233.973 400.884C236.349 388.326 235.874 388.791 250.727 387.395L258.57 386.581L266.65 401.233C271.166 409.256 275.206 416.117 275.681 416.35C276.157 416.698 281.741 415.071 288.039 412.745C298.259 409.14 299.447 408.326 298.972 406.117C298.734 404.838 297.664 398.442 296.595 392.047C295.644 385.651 294.575 379.023 294.218 377.279C293.624 373.674 293.981 373.442 305.032 367.511L313.469 363.092L324.638 372.86C330.818 378.209 336.997 383.674 338.423 384.837C340.918 387.047 341.037 386.93 350.305 379.837C355.415 375.767 359.693 372.162 359.93 371.697C360.049 371.348 356.484 364.139 351.85 355.999C347.216 347.743 343.651 340.65 343.77 340.185C344.007 339.836 347.453 335.999 351.494 331.696L358.861 323.789L371.694 329.371C378.705 332.394 386.31 335.534 388.33 336.348L392.252 337.976L398.787 328.44C402.352 323.091 405.323 318.208 405.323 317.394C405.323 316.696 403.54 314.719 401.52 312.975C399.381 311.231 393.44 305.882 388.449 301.23L379.299 292.742L384.053 282.742L388.924 272.625L406.986 273.439L425.167 274.369L428.138 262.625L431.108 250.997L414.948 244.02L398.787 237.159L399.144 226.228C399.381 220.182 399.738 215.182 399.975 214.949C400.213 214.717 407.818 212.391 417.087 209.6C426.236 206.926 434.079 204.484 434.436 204.135C435.03 203.437 433.01 182.041 432.178 181.227C431.94 180.995 423.979 180.064 414.71 179.018C405.323 178.088 397.48 177.041 397.242 176.925C397.005 176.692 395.698 171.808 394.153 165.994C391.063 153.552 389.637 155.878 407.937 143.901L420.652 135.645L418.75 131.342C413.76 119.482 409.957 113.435 407.937 114.016C406.868 114.365 400.094 115.993 392.846 117.621C385.716 119.249 378.943 120.877 377.992 121.109C376.804 121.458 374.19 118.551 369.912 111.807L363.614 102.039L373.714 88.5505C379.418 81.2247 383.934 74.8292 383.934 74.3641C383.934 73.899 380.131 69.7128 375.497 65.1778L367.06 56.8055L352.801 65.9918L338.423 75.0618L333.551 71.6896C330.936 69.7128 326.659 66.4569 324.044 64.3638L319.529 60.6428L324.401 45.4099C327.134 37.1538 329.273 29.8281 329.273 29.1304C329.273 27.5024 308.478 17.7347 306.933 18.665C306.22 19.0138 301.348 24.9442 296.001 31.5723L286.495 43.7819L275.087 39.712C268.789 37.5027 263.442 35.6422 263.204 35.6422C262.967 35.6422 262.61 28.2001 262.491 19.0138L262.135 2.50178L250.371 1.10639C243.835 0.292419 238.369 -0.17271 238.013 0.0598546C237.775 0.408701 235.28 7.03678 232.428 14.944L227.318 29.2466L215.079 29.5955L202.721 29.9443L197.255 15.0602C193.928 6.10652 191.076 0.0598546 190.125 0.0598546C189.174 -0.0564275 183.708 0.757547 177.767 1.80409ZM248.826 94.8297C269.383 100.062 287.208 109.946 303.487 125.063C308.597 129.831 313.35 134.714 313.825 135.761C314.776 137.389 311.33 139.715 291.604 150.761L268.314 163.901L261.065 160.064C257.144 157.855 249.539 153.668 244.311 150.761L234.804 145.412L234.448 119.016L234.21 92.6204H236.943C238.488 92.6204 243.835 93.6669 248.826 94.8297ZM201.889 119.482L201.533 145.18L185.015 154.366C175.984 159.483 167.904 163.552 167.072 163.32C163.626 162.506 122.512 138.435 122.512 137.273C122.512 134.598 139.148 118.551 148.06 112.505C163.626 101.923 184.54 94.0158 197.136 93.8995L202.127 93.7832L201.889 119.482ZM128.572 177.157L151.031 189.716V210.065V230.415L136.534 238.787C128.453 243.322 117.759 249.369 112.768 252.392L103.618 257.625L100.647 248.671C92.5671 223.554 92.8048 199.018 101.242 172.157C102.549 168.087 104.212 164.715 104.925 164.715C105.638 164.715 116.214 170.297 128.572 177.157ZM333.907 171.111C340.68 188.786 342.938 213.67 339.373 232.043C336.997 244.02 333.075 256.578 331.649 256.578C331.055 256.578 320.361 250.764 307.884 243.671L285.306 230.763V210.182V189.6L307.052 177.274C318.935 170.413 329.273 164.832 330.105 164.715C330.818 164.715 332.6 167.622 333.907 171.111ZM229.457 179.483C248.351 185.413 258.214 208.321 249.539 226.345C241.696 242.624 224.585 250.415 207.474 245.531C202.008 244.02 199.156 242.275 193.809 237.043C185.847 229.252 183.114 222.624 183.114 211.228C183.114 187.855 206.048 172.041 229.457 179.483ZM183.946 269.137L201.533 279.369L201.889 305.882L202.127 332.394L197.136 331.58C181.926 329.254 162.438 321.463 148.06 312.045C140.811 307.277 118.947 286.579 118.947 284.602C118.947 284.021 119.898 283.207 121.086 282.858C122.155 282.509 132.256 276.927 143.307 270.532C154.477 264.136 164.102 258.904 164.933 258.904C165.646 258.904 174.202 263.555 183.946 269.137ZM294.575 271.695C306.458 278.323 316.202 284.369 316.202 285.067C316.202 287.044 299.803 303.207 291.604 309.254C277.464 319.836 255.362 329.371 239.795 331.58L234.21 332.394V305.882V279.253L251.797 269.137C261.422 263.555 270.096 259.136 271.047 259.253C272.116 259.369 282.692 264.95 294.575 271.695Z`;

  const circleD = `M217.5 212.5 m -60 0 a 60 60 0 1 0 120 0 a 60 60 0 1 0 -120 0`; // circle path centered in 435x425 coords


  const MorphIcon = (className= '') => (
    <div className="absolute">
      <svg viewBox="0 0 435 425" width="120" height="120" style={{ color: 'var(--fg)', display:'absolute'}}>
        <defs>
          <path ref={cogRef} id="cogPath" d={cogD} />
        </defs>
        <path ref={ballRef} id="ball-shape" d={circleD} fill='var(--fg)' />
      </svg>
    </div>
      
  );


  return (
    <div className='hero-page h-screen w-screen'>
      <div id='border-animation' className="border-animation flex flex-col pt-24 md:pt-[8%] md:mx-[8%] pb-5 top-[15%] left-[10%] text-[var(--fg)] border-b-[2px] border-b-[var(--fg)]">
        <h1 className="text-4xl md:text-8xl font-bold pl-12 title">The First Brushstroke</h1>
        <h1 className="border-animation text-4xl md:text-7xl font-bold px-12 md:ml-[62%] title">
          of Every Big <br /> <span className="font-[Lobster]">Idea.</span>
        </h1>
        <div className="relative flex items-end ml-12 w-full">
          <button className="hero-button cursor-pointer border rounded-2xl hover:bg-[var(--fg)] text-[10px] h-8 w-20 md:h-10 md:w-32 md:text-[14px] font-medium hover:text-[var(--bg)] border-[var(--fg)] text-[var(--fg)] transition-colors duration-300">
            Start <span className="font-[Antonio]">MoodBoarding</span> 
          </button>
          <button className="hero-button cursor-pointer border rounded-2xl ml-2 hover:bg-[var(--fg)] text-[10px] h-8 w-20 md:h-10 md:w-32 md:text-[15px] font-medium hover:text-[var(--bg)] border-[var(--fg)] text-[var(--fg)] transition-colors duration-300">
            See it in Action
          </button>
          <div className="ml-4 h-8 hidden w-[34%] md:block hero-button">
            <CurvedLoop 
              marqueeText="Build ✦ for ✦ Chaos / Organized ✦ for ✦ Clarity /"
              speed={1}
              curveAmount={0}
              direction="right"
              interactive={true}
              className="text-[100px] flex-1 mt-1.5 ml-8 text-[var(--fg)] min-w-full"
            />
          </div>
        </div>
      </div>
      <div className='relative top-[4%] grid grid-cols-1 grid-rows-3 md:grid-cols-8 md:grid-rows-2 gap-4 text-[var(--fg)] md:mx-[8%]'>

        <div className="para relative col-span-1 row-span-1 md:col-span-3 md:row-span-2 w-full lg:w-full p-4 md:p-0">
          <p>Cogify is your AI-powered launchpad for visual thinking — combining curated references, generated concepts, and color palettes into one clean, editable board. You imagine it. We spark it. You run with it.</p>
        </div>
        <div id='hero-box' ref={heroBoxRef} className="hero-button z-40 relative col-span-1 row-span-1 row-start-2 md:col-span-2 md:row-span-2 w-full md:col-start-4 items-center rounded-full">
          <div className="relative w-[200px] h-[200px] mx-auto">
            <div ref={circularTextRef}>
              <CircularText
                text="The*Push*You*Need*"
                onHover="speedUp"
                spinDuration={20}
              />
            </div>
            
            <div id="morphed-home" ref={morphedHomeRef}>
              <div id="morphed" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <MorphIcon id='morph-icon' ref={{ ballRef, cogRef }} />
              </div>
            </div>
          </div>
        </div>
        <div className="para col-span-1 row-span-1 row-start-3 md:col-span-3 md:row-span-2 md:col-start-6 w-full p-4 md:p-0">
          <p>
            Cogify turns your vision into a living, breathing moodboard — in seconds. <br />
            No more hunting, screenshotting, and tab overload — just pure creative flow.
          </p>
        </div>
      </div>

      <div className="absolute top-[10%] left-[2.5%] text-[var(--fg)] hidden md:block">
        <p className="title text-4xl lg:text-[80px] flex flex-col leading-none">
          {"Cognify".split("").map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </p>
      </div>

      <div className="absolute top-[10%] right-[2.5%] text-[var(--fg)] hidden md:block">
        <p className="title text-4xl lg:text-[80px] flex flex-col leading-none">
          {"Cognify".split("").map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default HeroSection