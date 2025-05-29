import React, { PropsWithChildren } from 'react'
import DeletePost from './posts/_components/DeletePost'

const UserPostLayout = ({ children}: PropsWithChildren) => {
  return (
    <div className='pt-20 flex flex-col items-center'>{children}</div>
  )
}

export default UserPostLayout
