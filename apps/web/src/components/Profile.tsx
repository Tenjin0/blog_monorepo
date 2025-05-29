import React from 'react'
import { redirect } from 'next/navigation'

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UserIcon } from '@heroicons/react/24/solid'
import { IUserSession } from '../lib/types/user.types'
import { useDispatch } from 'react-redux'
import { reset } from '../lib/store/features/user.slice'
import Link from 'next/link'

type Props = {
  user: IUserSession
}

const Profile = ({ user }: Props) => {
  const dispatch = useDispatch()
  const onClick = () => {
    redirect("/")
    dispatch(reset(null))
  }
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user.avatar}/>
          <AvatarFallback>
            <UserIcon className='w-8 text-slate-500'/>
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='text-white bg-gradient-to-tl from-gray-800 to-cyan-900 border-gray-500 shadow-2xs'>
        <ul className='[&>li]:p-2'>
          <li>
            <Link href='/user/create-post'>Create a new Post</Link>
          </li>
          <li>
            <Link href='/user/posts'>Your posts</Link>
          </li>
          <li>
            <Link href='/api/auth/signout' onClick={onClick}>Sign out</Link>
          </li>

        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default Profile
