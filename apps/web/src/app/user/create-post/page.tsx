"use client"

import React from 'react'
import PostContainer from './_components/postContainer'

const CreatePostPage = () => {
  return (
    <div className='p-6 max-w-2xl w-full flex flex-col'>
      <h2 className='p-6 shadow-lg rounded-md text-2xl text-center font-bold'>Create a new Post</h2>
      <PostContainer />
    </div>
  )
}

export default CreatePostPage
