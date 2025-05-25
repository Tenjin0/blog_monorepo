import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../components/ui/avatar'
import { UserIcon } from '@heroicons/react/24/solid'
import { Comment } from '@/lib/types/model.types'
interface Props {
  comment: Comment
}
const CommentCard = ({ comment }: Props) => {
  return (
    <div className='p-2 shadow rounded-md'>
      <div className='flex gap-2 items-center text-slate-200 text-sm'>
        <Avatar>
          <AvatarImage src={comment.author.avatar}/>
          <AvatarFallback>
             <UserIcon className="w-10" />
          </AvatarFallback>
        </Avatar>
        <p> { comment.author.name} | </p>
        <p> {new Date( comment.createdAt ).toLocaleDateString()} </p>
      </div>
      <p className='mt-4'>{comment.content}</p>
    </div>
  )
}

export default CommentCard
