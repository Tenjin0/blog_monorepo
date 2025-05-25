'use client'

import React, { PropsWithChildren } from 'react'

import { IUserSession } from '../lib/types/user.types'
import { store } from '../lib/store/store'
import { Provider } from 'react-redux'
import NavbarContainer from './navbarContainer'
import Navbar from './navbar'

type Props = PropsWithChildren
const NavbarProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      { children}
    </Provider>
  )
}




export default NavbarProvider
