import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/all'
import React from 'react'

gsap.registerPlugin(ScrambleTextPlugin) 

const Navbar = () => {

  const OnHover = (e) => {
    const target = e.currentTarget
    // We strictly use currentTarget to ensure we don't accidentally grab a child span if one existed
    const originalText = target.getAttribute('data-text')
    
    gsap.to(target, {
      scrambleText: {
        text: originalText,
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        speed: 0.5,
        revealDelay: 0.3
      },
      duration: 1.5,
      ease: 'power1.inOut'
    })
  }

  return (
    <nav id='nav' className='fixed top-0 left-0 z-50 h-16 w-full border-none text-[var(--fg)]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center font-[Antonio] font-bold cursor-pointer md:text-4xl text-2xl px-4 py-3'>
          <a href="/">Cognify.</a>
        </div>
        
        <div className='flex items-center justify-center text-md md:text-xl'>
          {/* FIX: 
             1. Removed the wrapping <div> 
             2. Moved className, data-text, and onMouseEnter to the <a> tag
          */}
          <a 
            href="#features" 
            className='px-4 underline cursor-pointer block' // added 'block' or 'inline-block' for better hit area
            data-text='Discover' 
            onMouseEnter={OnHover}
          > 
            Discover
          </a>

          <a 
            href="#cta" 
            className='px-4 underline cursor-pointer block'
            data-text='Contact' 
            onMouseEnter={OnHover}
          > 
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar