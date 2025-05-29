import React from 'react'
import { fetchUserPosts } from '../../../lib/actions/post.get'
import { TSearchParams } from '../../../lib/types/fetch.types'
import { DEFAULT_PAGE_SIZE } from '../../../lib/constants'
import NoPost from './_components/NoPost'
import PostList from './_components/PostList'

type Props = {
  searchParams: TSearchParams
}

const UserPosts = async ({ searchParams}: Props) => {

  const { page } = await searchParams
  const { count, posts } = await fetchUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE
  })
  return (
    <div className='w-full'>
      {
        !posts || !posts.length ? <NoPost/> : <PostList posts={posts} currentPage={page ? +page : 1} totalPages={Math.ceil(count / DEFAULT_PAGE_SIZE)} />
      }
    </div>
  )
}

export default UserPosts
