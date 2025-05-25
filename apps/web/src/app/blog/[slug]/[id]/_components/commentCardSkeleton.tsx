
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const CommentCardSkeleton = () => {
  return (
    <div className='flex shadow rounded-md flex-col gap-4 mt-4'>
      <div className=' flex gap-3 items-center'>
        <Skeleton className='rounded-full w-8 h-8' />
        <Skeleton className='h-4 w-48'/>
      </div>
      <Skeleton className='h-6 w-96'/>
    </div>
  )
}

export default CommentCardSkeleton
