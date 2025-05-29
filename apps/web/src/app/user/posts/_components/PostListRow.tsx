import Image from "next/image"
import React from 'react'
import { Post } from '../../../../lib/types/model.types'
import { CheckIcon } from "@heroicons/react/24/solid"
import PostActions from "./PostActions"
type Props = {
  post: Post
}
const PostListRow = ({ post }: Props) => {
  return (
    <div
      className='grid grid-cols-8 m-3 rounded-md overflow-hidden border shadow hover:scale-[101%] transition text-center bg-gradient-to-tl to-gray-200 from-white text-black'>
      <div className="relative h-32 col-span-1">
        <Image src={post.thumbnail ?? '/no-image.png'} alt={post.title} fill />
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-lg px-2">{post.title}</p>
        <p className="text-sm px-1">{post.content}</p>
      </div>
      <div className="flex justify-center items-center col-span-1">
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex justify-center items-center col-span-1">
        {post.published && <CheckIcon className="w-5" />}
      </div>
      <div className="flex justify-center items-center col-span-1">
        {post._count.likes}
      </div>
      <div className="flex justify-center items-center col-span-1">
        {post._count.comments}
      </div>
      <PostActions post={post}/>
    </div>
  )
}

export default PostListRow
