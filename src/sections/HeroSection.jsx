import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import CircularText from '../components/CircularText'
import CurvedLoop from '../components/Loop'

gsap.registerPlugin(ScrollTrigger, SplitText)

const HeroSection = () => {
  useGSAP(() =>{
    const heroSplit = new SplitText(".title", {type: 'chars,words'})
    const paraSplit = new SplitText('.para', {type: 'lines'})

    heroSplit.chars.forEach((char) => char.classList.add('z-20'))

    gsap.from(heroSplit.chars, {
      yPercent: 150,
      duration: 1.8,
      ease: 'expo.out',
    })

    gsap.from('.border-animation', {
      borderBottomWidth: 0,
      duration: 0.5,
      delay: 0.4,
      ease: 'power1.out',
    })

    gsap.from('.hero-button', {
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut'
    })

    // gsap.from('#sub-head', {
    //   marginLeft: '0%',
    //   opacity: 0,
    //   delay: 1,
    //   duration: 1,
    //   ease: 'power1.inOut',

    // })


    gsap.from(paraSplit.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 2,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 0.5,
    })


  },[]);

  return (

    <div className='h-screen w-screen'>
      <div id='border-animation' className="border-animation flex flex-col pt-24 md:pt-[8%] md:mx-[8%] pb-5 top-[15%] left-[10%] text-black light:text-white border-b-[2px] border-b-black light:border-b-white">
        <h1 className="text-4xl md:text-8xl font-bold pl-12 title">The First Brushstroke</h1>
        <h1 className="border-animation text-4xl md:text-7xl font-bold px-12 md:ml-[62%] title">
          of Every Big <br /> <span className="font-[Lobster]">Idea.</span>
        </h1>
        <div className="relative flex items-end ml-12 w-full">
          <button className="hero-button border rounded-2xl hover:bg-black text-[10px] h-8 w-20 md:h-10 md:w-32 md:text-[15px] font-medium hover:text-white border-black text-black light:border-white light:text-white light:hover:text-black light:hover:bg-white">
            Start <span className="font-[Antonio]">MoodBoarding</span> 
          </button>
          <button className="hero-button border rounded-2xl ml-2 hover:bg-black text-[10px] h-8 w-20 md:h-10 md:w-32 md:text-[15px] font-medium hover:text-white border-black text-black light:hover:text-black light:hover:bg-white light:border-white light:text-white">
            See it in Action
          </button>
          <div className="ml-4 h-8 hidden w-[34%] md:block hero-button">
            <CurvedLoop 
              marqueeText="Build ✦ for ✦ Chaos / Organized ✦ for ✦ Clarity /"
              speed={1}
              curveAmount={0}
              direction="right"
              interactive={true}
              className="text-[100px] flex-1 mt-1.5 ml-8 text-white light:text-black min-w-full"
            />
          </div>
        </div>
      </div>
      <div className='relative top-[4%] grid grid-cols-1 grid-rows-3 md:grid-cols-8 md:grid-rows-2 gap-4 text-black light:text-white md:mx-[8%]'>
        <div className="para relative col-span-1 row-span-1 md:col-span-3 md:row-span-2 w-full lg:w-full p-4 md:p-0">
          <p>Cogify is your AI-powered launchpad for visual thinking — combining curated references, generated concepts, and color palettes into one clean, editable board. You imagine it. We spark it. You run with it.</p>
        </div>
        <div className="hero-button relative col-span-1 row-span-1 row-start-2 md:col-span-2 md:row-span-2 md:col-start-4 items-center">
          <CircularText
            text="The*Push*You*Need*"
            onHover="speedUp"
            spinDuration={20}
          />
        </div>
        <div className="para col-span-1 row-span-1 row-start-3 md:col-span-3 md:row-span-2 md:col-start-6 w-full items-center p-4 md:p-0">
          <p>
            Cogify turns your vision into a living, breathing moodboard — in seconds. <br />
            No more hunting, screenshotting, and tab overload — just pure creative flow.
          </p>
        </div>
      </div>

      <div className="absolute top-[10%] left-[2.5%] text-black light:text-white hidden md:block">
        <p className="title text-4xl lg:text-[80px] flex flex-col leading-none">
          {"Cognify".split("").map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </p>
      </div>

      <div className="absolute top-[10%] right-[2.5%] text-black light:text-white hidden md:block">
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