import React from 'react'
import { Post } from '../lib/types/model.types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  post: Partial<Post>
}
const postCard = ({post}: Props) => {
  return (
    <div className='bg-white text-black rounded-lg shadow-md flex flex-col '>
      <div className='relative h-70'>
        <Image src={post.thumbnail ?? "/no-image.png"} alt={post.title ?? ""} fill></Image>
      </div>
      <div className='px-2 flex flex-col grow justify-between'>
      <h3 className='text-lg font-bold mt-4 break-all text-gray-800'>{post.title}</h3>
      </div>
      <p className='mx-3 pt-3 mb-3 h-20 overflow-hidden break-words'>{post.content?.slice(0, 100)}...</p>
      <div className='flex flex-row items-end justify-between py-2 px-3'>
      <Link className="text-indigo-600 hover:underline" href={`/blog/${post.slug}/${post.id}`}>Read more</Link>
      <p className=' text-gray-500 text-sm text-right'>
        { new Date(post.createdAt?? "").toLocaleDateString()}
      </p>

      </div>
    </div>
  )
}

export default postCard
