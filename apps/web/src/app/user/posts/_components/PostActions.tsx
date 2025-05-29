import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../components/ui/tooltip'
import AddComment from '../../../blog/[slug]/[id]/_components/addComment'
import DeletePost from './DeletePost'
import { Post } from '../../../../lib/types/model.types'

type Props = {
  post: Post
}
const PostActions = ({ post }: Props) => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className="border bg-white p-2 w-9 h-9 border-yellow-600 rounded-md text-yellow-600 hover:border-yellow-800  hover:text-yellow-800 transition-colors"
              href={`/user/posts/${post.id}/update`}
            >
              <PencilIcon className="w-4 bg-white" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit this post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
              <DeletePost post={post}/>
          </TooltipTrigger>
          <TooltipContent className='text-red-500 bg-white'>
            <p>Delete this post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>


    </div>
  )
}

export default PostActions
