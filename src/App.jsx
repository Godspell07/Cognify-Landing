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
import Footer from './sections/Footer'
import LoadingScreen from './components/LoadingScreen'
import { useThreeLoading } from '../hooks/useThreeLoading'

gsap.registerPlugin(SplitText, ScrollTrigger)

const App = () => {
  const [baseTheme, setBaseTheme] = useState("default") 
  const [flipped, setFlipped] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { loading, progress } = useThreeLoading();


  
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

  useEffect(() => {
    if (!loading) {
      // Force a "theme change" cycle ONCE to wake up GSAP
      requestAnimationFrame(() => {
        setFlipped(prev => !prev);

        requestAnimationFrame(() => {
          setFlipped(prev => !prev);
        });
      });
    }
  }, [loading]);




  const toggleLight = () => {
    setBaseTheme(prev => (prev === 'light' ? 'default' : 'light'))
  }

  return (
    <>
      <LoadingScreen loading={loading} progress={progress} />
      <main className="theme-root min-h-screen select-none bg-[var(--bg)] text-[var(--fg)]" style={{
        opacity: loading ? 0 : 1,
        transition: "opacity 0.8s ease",
      }}>
        {/* <div
          id="cog-root"
          className="fixed top-[10px] left-1/2 -translate-x-1/2 z-[60] pointer-events-none"
        /> */}
        <Navbar />
        <HeroSection />
        <FeatureSection />
        <CTA />
        <Footer />
        
        {/* FloatingMenu */}
        <div className="flex z-50 items-center justify-between">
          <div className="fixed bottom-6 left-3">
            <button
              className="p-2 rounded-full border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
              onClick={toggleLight}
              aria-label="Toggle theme"
            />
          </div>
          <FloatingMenu className="fixed bottom-6 right-6" />
        </div>
      </main>
    </>
  )
}

export default App