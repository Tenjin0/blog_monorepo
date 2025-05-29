import React from 'react'
import { Post } from '../../../../lib/types/model.types'
import PostListRow from './PostListRow'
import Pagination from '../../../../components/pagination'

type Props = {
  posts: Post[]
  currentPage: number
  totalPages: number
}
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className='grid grid-cols-8 rounded-md shadow-md py-4 [&>div]:text-center font-bold'>
        <div className='col-span-3'></div>
        <div className='col-span-1'>Date</div>
        <div className='col-span-1'>Published</div>
        <div className='col-span-1'>Likes</div>
        <div className='col-span-1'>Comments</div>
        <div className='col-span-1'></div>
      </div>
      {posts.map((post) => <PostListRow key={`post-row-${post.id}`} post={post}/>)}
      <Pagination total={totalPages} current={currentPage} className={'my-4'} />
    </>
  )
}

export default PostList
