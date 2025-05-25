import React, { use, useState } from 'react'
import { fetchPost } from '../../../../lib/actions/post.get'
import Image from 'next/image'
import Content from './_components/content'
import Comments from './_components/comments'
type Props = {
  params:Promise< {
    id: string
  }>
}


const PostPage = (props: Props) => {
  const id = use(props.params).id
  const { post } = use(fetchPost(parseInt(id)))
  return (
    <main className='container mx-auto px-4 py-8 mt-32'>
      <h1 className='text-4xl font-bold mb-4 text-white'>{post.title}</h1>
      <p className="text-slate-200 text-sm mb-4">
        By {post.author.name} | {new Date(post.createdAt ?? "").toLocaleDateString()}
      </p>
      <div className='relative w-80 h-60'>
        <Image
          className='rounded-md object-cover'
          src={post.thumbnail ?? '/no-image.png'} alt={post.title} fill></Image>
      </div>
      <Content content={post.content}/>

      <Comments postID={ post.id }></Comments>
    </main>
  )
}

export default PostPage
