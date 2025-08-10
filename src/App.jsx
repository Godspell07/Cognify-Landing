import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import DummyHero from './sections/dummyhero'
import FloatingMenu from './components/FloatingMenu'
import { AlignJustify, X } from 'lucide-react'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import FeatureSection from './sections/FeatureSection'

gsap.registerPlugin(SplitText, ScrollTrigger)


const App = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)

    gsap.to('.menu', {
      width: '300px',
      height: '500px',
      duration: 0.5,
      ease: 'power1.inOut',
      border: '1px solid black',
    })
  }

  const toggleLight = () => {
    document.querySelector('.theme-root').classList.toggle('light');
  }

  return (
    <main className='theme-root bg-white text-black light:bg-black light:text-white select-none'>
      <Navbar />
      <HeroSection />
      {/* <DummyHero /> */}
      <FeatureSection />
      {/* FloatingMenu */}
      <div className="flex z-50 items-center justify-between">
        <div className=" fixed bottom-6 left-3 ">
          <button 
            className='theme-root bg-black p-2 rounded-full light:bg-white'
            onClick= {toggleLight}
          >
          </button>
        </div>

        <div className='menu bottom-6 right-3'>
          <button 
            className="p-2 bottom-6 right-3 fixed"
            onClick={() => {
              handleMenuClick(); 
            }} 
          >
            {isMenuOpen ? 
              (<X className='w-6 h-6' />) 
              : 
              (<AlignJustify className='w-6 h-6' />)}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App