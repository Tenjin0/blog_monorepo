'use client'

import React, { PropsWithChildren, useEffect } from 'react'

import DesktopNavBar from './desktopNavbar'
import MobileNavBar from './mobileNavbar'
import { IUserSession } from '../lib/types/user.types'
import { useDispatch } from 'react-redux'
import { reset, set } from '../lib/store/features/user.slice'

type Props = PropsWithChildren & { user?: IUserSession }
const NavbarContainer = ({ children, user }: Props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(set(user))
    } else {
      dispatch(reset(user))
    }
  }, [user])

  return (
    <div className='relative'>
      <DesktopNavBar>{children}</DesktopNavBar>
      <MobileNavBar>{children}</MobileNavBar>
    </div>
  )
}




export default NavbarContainer
