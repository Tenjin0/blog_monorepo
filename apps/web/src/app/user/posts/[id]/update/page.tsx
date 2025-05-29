import React from 'react'
import { fetchPost } from '../../../../../lib/actions/post.get'
import PostContainer from './_components/postContainer'

type Props = {
  params: {
    id: string
  }
}
const UpdatePostPage = async (props: Props) => {

  const params = await props.params
  const { post } = await fetchPost(parseInt(params.id))

  return (
      <div className='p-6 max-w-2xl w-full flex flex-col'>
      <h2 className='p-6 shadow-lg rounded-md text-2xl text-center font-bold'>Update your Post</h2>
      <PostContainer post={post}/>
    </div>
  )
}

export default UpdatePostPage
