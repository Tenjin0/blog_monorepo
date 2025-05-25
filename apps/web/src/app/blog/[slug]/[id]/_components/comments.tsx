"use client"

import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

import { fetchComments } from '../../../../../lib/actions/comments.get'
import { DEFAULT_PAGE_SIZE } from '../../../../../lib/constants'
import CommentCard from './comment.card'
import Pagination from '../../../../../components/pagination'
import CommentCardSkeleton from './comment.card.skeleton'

type Props = {
  postID: number
}
const Comments = ({ postID }: Props) => {

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const {data , isLoading, refetch} = useQuery({
    queryKey: ['GET_COMMENTS_BY_POST', postID, page],
    queryFn: () => { return fetchComments(postID, {pageSize: DEFAULT_PAGE_SIZE, page}).then((data) => { setTotal(Math.ceil(data.count / DEFAULT_PAGE_SIZE));return {comments: data.comments}})}
  })

  console.log(data?.comments)
  const onClickPage = (page: number) => {
    setPage(page)
    refetch()
  }
  return (
    <div className='p-2 rounded-md shadow-md'>
      <h6 className='text-lg'>Comments</h6>
      <div className='flex flex-col gap-4'>
        { isLoading ?
          Array.from({length: DEFAULT_PAGE_SIZE}).map((_, index) => <CommentCardSkeleton key={`comment-card-skeleton-${index}`}/>) :
          data?.comments.map((comment) => <CommentCard key={`comment-card-${comment.id}`} comment={comment}/>)
        }
      </div>
      <Pagination className='p-2' current={page} total={total} onClick={onClickPage}/>
    </div>
  )
}

export default Comments
