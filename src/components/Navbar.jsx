import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/all'
import React from 'react'

gsap.registerPlugin(ScrambleTextPlugin) 

const Navbar = () => {

  const OnHover = (e) => {
    const target = e.currentTarget
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
        <div href='/' className='flex items-center font-[Antonio] font-bold cursor-pointer md:text-4xl text-2xl px-4 py-3'>
          <a href="/">Cognify.</a>
        </div>
        <div className='flex items-center justify-center text-md md:text-xl'>

          <div className='px-4 underline cursor-pointer' data-text='Discover' onMouseEnter={OnHover}> 
            <a href="/Discover">Discover</a>
          </div>
          <div className='px-4 underline cursor-pointer' data-text='Contact' onMouseEnter={OnHover}> 
            <a href="/Contact">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar