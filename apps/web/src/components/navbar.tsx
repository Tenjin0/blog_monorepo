import Link from 'next/link'
import React from 'react'

import styles from './navbar.module.scss';
import { cn } from '../lib/utils'
import SignPanel from './signPanel'

const Navbar = () => {
  return (
    <div id="blog-navbar" className={cn(styles.navbar, 'flex flex-col md:flex-row')}>
      <h1 className="text-2xl font-bold p-2">My Modern Blog</h1>
      <div className='flex flex-col md:flex-row items-start md:items-center md:justify-center gap-2 md:ml-auto [&>a:hover]:text-sky-100  [&>a:hover]:bg-sky-900 [&>a]:rounded-md'>
        <Link href="/">Blog</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
        <SignPanel/>
      </div>
    </div>
  )
}




export default Navbar
