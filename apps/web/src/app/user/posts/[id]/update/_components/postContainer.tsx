"use client"

import React, { useActionState } from 'react'
import {  updatePost } from '../../../../../../lib/actions/post.save'
import PostForm from '../../../../_components/PostForm'
import { Post } from '../../../../../../lib/types/model.types'

type Props = {
  post : Post
}
const PostContainer = ({ post }: Props) => {
  const [state, action] = useActionState(updatePost, {
    data: {
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published ? "on": undefined,
      previousThumbnail: post.thumbnail ?? undefined,
      tags: post.tags ? post.tags?.map((tag) => tag.name).join(',') : ""
    }
  })
  return (
      <PostForm state={state} formAction={action}/>
  )
}

export default PostContainer
