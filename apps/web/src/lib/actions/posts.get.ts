"use server"
import gql from "graphql-tag"
import { print } from 'graphql'

import { fetchGraphQL } from "../functions/fetchGraphQL"
import { Post } from "../types/model.types"
import { transformPage } from "../functions/transformpage"
import { IFetchOpt } from "../types/fetch.types"


const GET_POSTS = gql`
query posts($skip: Float, $take: Float) {
  posts(skip: $skip, take: $take) {
    id
    title
    thumbnail
    content
    slug
    createdAt
  }
  post_count
}`


export const fetchPosts = async (opt?: IFetchOpt) => {

  const { skip, take }= transformPage(opt)
  const data = await fetchGraphQL(print(GET_POSTS), {skip, take})
  return { posts: data.posts as Post[], count: data.post_count }
}
