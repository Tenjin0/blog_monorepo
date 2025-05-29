import React, { useActionState } from 'react'
import PostForm from '../../_components/PostForm'
import { saveNewPost } from '../../../../lib/actions/post.save'

const PostContainer = () => {
  const [state, action] = useActionState(saveNewPost, undefined)
  return (
      <PostForm state={state} formAction={action}/>
  )
}

export default PostContainer
