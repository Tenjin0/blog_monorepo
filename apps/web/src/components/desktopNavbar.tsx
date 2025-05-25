"use client"

import React, { PropsWithChildren, useEffect, useState } from 'react'
import { cn } from '../lib/utils'

type Props = PropsWithChildren
const DesktopNavBar = (props: Props) => {
  const [scrollPosition, setscrollPosition] = useState(0)
  useEffect(() => {
    window.addEventListener('scroll', handScroll)

    return () => {
      window.removeEventListener("scroll", handScroll)
    }
  }, [])

  const handScroll = () => {
    setscrollPosition(window.scrollY)
  }
  const isScrollDown = scrollPosition > 10

  return (
    <nav className={cn("hidden md:block fixed w-full z-40 text-white top-0", { "bg-white text-gray-700 shadow-md": isScrollDown})}>
      <div className='flex items-center px-4 py-4 w-full'>
        { props.children }
      </div>
    </nav>
  )
}


export default DesktopNavBar
