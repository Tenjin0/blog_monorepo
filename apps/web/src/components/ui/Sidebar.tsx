"use client"

import React, { PropsWithChildren, ReactNode, RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from "usehooks-ts";

import { cn } from '../../lib/utils'

type Props = PropsWithChildren<{
  triggerIcon: ReactNode
  triggerClassName: string
}>
const Sidebar = (props: Props) => {

  const [show, setshow] = useState(false)

  const ref = useRef(null)
  useOnClickOutside(ref as unknown as RefObject<HTMLElement>, () => setshow(false))
  return (
    <>
      <button className={props.triggerClassName} onClick={() => setshow((prev) => !prev)}>
        {props.triggerIcon}
      </button>
      <div ref={ref} className={cn('w-60 absolute top-0 z-10 duration-300 transition-all bg-white rounded-r-md min-h-screen', {
        "-left-full": !show,
        "left-0": show
      })}>{props.children}</div>
    </>
  )
}

export default Sidebar
