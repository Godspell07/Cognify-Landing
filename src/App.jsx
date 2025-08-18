import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import FeatureSection from './sections/FeatureSection'
import FloatingMenu from './components/FloatingMenu'
import { AlignJustify, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText, ScrollTrigger } from 'gsap/all'
import CTA from './sections/CTA'

gsap.registerPlugin(SplitText, ScrollTrigger)

const App = () => {
  const [baseTheme, setBaseTheme] = useState("default") 
  const [flipped, setFlipped] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)



  
  useEffect(() => {
    const root = document.querySelector('.theme-root')
    const effectiveIsLight = (baseTheme === 'light') !== flipped // boolean XOR
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      root.classList.toggle('light', effectiveIsLight)
      

      gsap.delayedCall(0.1, () => {
        ScrollTrigger.refresh()
      })
    })
  }, [baseTheme, flipped])

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
    setBaseTheme(prev => (prev === 'light' ? 'default' : 'light'))
  }

  return (
    <main className="theme-root min-h-screen select-none bg-[var(--bg)] text-[var(--fg)]" style={{ transition: 'background-color 0.5s ease, color 0.5s ease',}}>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      {/* <CTA /> */}
      
      {/* FloatingMenu */}
      <div className="flex z-50 items-center justify-between">
        <div className="fixed bottom-6 left-3">
          <button
            className="p-2 rounded-full border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
            onClick={toggleLight}
            aria-label="Toggle theme"
          />
        </div>
        <div className="menu">
          <button
            className="p-2 fixed bottom-6 right-3"
            onClick={handleMenuClick}
            aria-label="Open menu"
          >
            {isMenuOpen ? (<X className="w-6 h-6" />) : (<AlignJustify className="w-6 h-6" />)}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App