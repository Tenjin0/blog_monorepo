'use client'

import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '../lib/types/store.state'
import { IUserSession } from '../lib/types/user.types'
import { reset } from '../lib/store/features/user.slice'
import Profile from './Profile'

const SignPanel = () => {
  const user: IUserSession = useSelector<IStoreState, IUserSession>((state) => state.user)

  return (
    <>
      {
        user && user.id &&
        <>
          <Profile user={user}/>
        </>
      }
      {
        !user || !user.id &&
        <>
          <Link href='/auth/signin'>SignIn</Link>
          <Link href='/auth/signup'>SignUp</Link>
        </>
      }
    </>
  )
}

export default SignPanel
