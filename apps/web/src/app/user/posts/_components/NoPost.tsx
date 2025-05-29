import React from 'react'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'
import { PencilSquareIcon } from '@heroicons/react/24/solid'

const NoPost = () => {
  return (
    <div className='flex flex-col items-center gap-5'>
      <p className='text-center p-4 text-5xl text-slate-400'>No Post Yet!</p>
      <Button asChild>
        <Link className='flex items-center justify-center' href={"/user/create-post"}>
          <span>
            <PencilSquareIcon className="w-4"></PencilSquareIcon>
          </span>
          <span>Write your first Post</span>
        </Link>
      </Button>
    </div>
  )
}

export default NoPost
