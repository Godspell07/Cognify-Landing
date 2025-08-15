import React from 'react'

const DummyHero = () => {
  return (
    <>
      <div className='h-screen w-screen'>
        <div className="absolute top-[15%] left-[3%] z-20">
          <h1 className="text-9xl font-bold title">The Push You <br /> Need to Get Started</h1>
        </div>
        <div className="absolute left-[5%] -rotate-12">
          <img src="/images/white1.svg" alt="white" className='block light:hidden'/>
          <img src="/images/black1.svg" alt="black" className='hidden light:block'/>
        </div>
        {/* <div className='absolute top-[5%] left-[50%] z-10 -translate-x-1/2 text-black light:text-white'>
          <CircularText
            text="The*Push*You*Need*"
            onHover="slowDown"
            spinDuration={12}
          />
        </div> */}
      </div>




      {/* // <div className="h-dvh w-dvw grid grid-cols-12 grid-rows-7 gap-1">
      //       <div className="row-span-7 text-black light:text-white hidden md:block pl-10 pt-16">
      //         <p className="title text-4xl lg:text-[80px] flex flex-col leading-none">
      //           {"Cognify".split("").map((letter, i) => (
      //             <span key={i}>{letter}</span>
      //           ))}
      //         </p>
      //       </div>

      //       <div className="row-span-7 col-start-12 row-start-1 pt-16 text-black light:text-white hidden md:block">
      //         <p className="title text-4xl lg:text-[80px] align-bottom items-center flex flex-col leading-none">
      //           {"Cognify".split("").map((letter, i) => (
      //             <span key={i}>{letter}</span>
      //           ))}
      //         </p>
      //       </div>

      //       <div className="col-span-10 row-span-2 col-start-2 row-start-1 text-black light:text-white flex items-end border-animation">
      //         <h1 className="text-8xl font-bold align-bottom title pl-4">The First Brushstroke</h1>
      //       </div>

      //       <div className="col-span-4 row-span-3 col-start-8 row-start-5">4</div>
      //       <div className="col-span-4 row-span-3 col-start-2 row-start-5">5</div>
      //       <div className="col-span-2 row-span-3 col-start-6 row-start-5 flex items-center">
      //         <CircularText
      //           text="The*Push*You*Need*"
      //           onHover="slowDown"
      //           spinDuration={12}
      //         />
      //       </div>

      //       <div className="col-span-10 row-span-2 col-start-2 row-start-3 text-black light:text-white border-b-[2px] border-b-black light:border-b-white border-animation flex items-center">
      //         <h1 className="border-animation text-7xl font-bold px-12 md:ml-[62%] title">
      //           of Every Big <br /> <span className="font-[Lobster]">Idea.</span>
      //         </h1>
      //       </div>
      //   </div> */}

    </>
  )}
export default DummyHero