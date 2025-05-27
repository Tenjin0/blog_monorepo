"use client"

import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon  as FilledHeartIcon} from "@heroicons/react/24/solid"

import { createLikePost, getPostLikeData, removeLikePost } from '../../../../../lib/actions/like'


type Props = {
  postId: number
}
const Like = ({postId}: Props) => {
  const { data, refetch: refetchData } = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", postId],
    queryFn:  () => { return getPostLikeData(postId) }
  })

  const createLikeMutation = useMutation({
    mutationFn: () => createLikePost(postId),
    onSuccess: () => refetchData()
  })

   const removeLikeMutation = useMutation({
    mutationFn: () => removeLikePost(postId),
    onSuccess: () => refetchData()
  })

  return (
    <div className='mt-4 flex items-center justify-start gap-2'>
      {
        data?.hasUserLikedPost ?
          <button onClick={ () => removeLikeMutation.mutate() }><FilledHeartIcon className='w-6 text-rose-500' /></button> :
          <button onClick={ () => createLikeMutation.mutate() }><HeartIcon className='w-6' /></button>

      }
      <p className='text-slate-500'>{data?.likeCount}</p>
    </div>
  )
}

export default Like
