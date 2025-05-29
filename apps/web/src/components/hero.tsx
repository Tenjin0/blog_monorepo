import React from 'react'

export default function Hero() {
  return (
    <div className="">
      <div className="container flex items-center justify-self-center">
        <div className='flex flex-col md:flex-row gap-10'>
          <div className='flex flex-col w-auto justify-center items-stretch md:w-1/2 text-center md:text-left'>
            <p className='capitalize tracking-wide w-full'>
              Explore insight, tutorials and stories for curios minds like yours
            </p>
            <h2 className='my-5 text-5xl font-bold leading-tight text-center'>
              Welcome to Tenji Dev blog
            </h2>

            <p className='capitalize leading-normal text-2xl text-right'>
              Join my community
            </p>
          </div>
          <div className='w-full text-center py-7 md:w-1/2 '>
            <img className="w-full z-30" src="/louvre-pyramide.jpg" alt="hero section" />
          </div>

        </div>
      </div>
    </div>
  )
}
