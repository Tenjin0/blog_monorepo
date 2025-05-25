'use client'

import React, { PropsWithChildren } from 'react'

import { store } from '../../lib/store/store'
import { Provider } from 'react-redux'
type Props = PropsWithChildren
const StoreProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      { children}
    </Provider>
  )
}




export default StoreProvider
