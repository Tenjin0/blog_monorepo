"use server"

import gql from "graphql-tag"
import { print } from 'graphql'

import { fetchGraphQL } from "../functions/fetchGraphQL"

const POST_LIKE = gql`
query postLike($postId: Int!)  {
  postLikeCount(postId: $postId)
  userLikedPost(postId: $postId)
}
`

export async function getPostLikeData(postId: number) {
  const data = await fetchGraphQL(print(POST_LIKE), {postId}, { auth: true})

  return {
    likeCount: data.postLikeCount as number,
    hasUserLikedPost: data.userLikedPost as boolean
  }
}

const CREATE_LIKE = gql`
mutation createLike($postId: Int!)  {
  createLike(postId: $postId)
}
`
export async function createLikePost(postId: number) {
    const data = await fetchGraphQL(print(CREATE_LIKE), {postId}, { auth: true})

}

const REMOVE_LIKE = gql`
mutation remove($postId: Int!)  {
  removeLike(postId: $postId)
}
`
export async function removeLikePost(postId: number) {
    const data = await fetchGraphQL(print(REMOVE_LIKE), {postId}, { auth: true})

}
