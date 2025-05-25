import React, { PropsWithChildren } from 'react'

const AuthLayout = ({ children}: PropsWithChildren) => {
  return (
    <div className='text-black min-h-screen flex items-center justify-center'>{children}</div>
  )
}

export default AuthLayout
