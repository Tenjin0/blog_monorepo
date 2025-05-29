"use server"
import gql from "graphql-tag"
import { print } from 'graphql'

import { fetchGraphQL } from "../functions/fetchGraphQL"
import { Post } from "../types/model.types"
import { IFetchOpt } from "../types/fetch.types"
import { transformPage } from "../functions/transformpage"


const GET_POST = gql`
query post($id: Int!) {
  post(id: $id) {
    id
    title
    thumbnail
    content
    published
    slug
    createdAt
    author {
      name
    }
    tags {
      id
      name
    }
  }
}`


export const fetchPost = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST), { id })
  return { post: data.post as Post }
}


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


const GET_USER_POSTS = gql`
query posts($skip: Float, $take: Float) {
  user_posts(skip: $skip, take: $take) {
    id
    title
    thumbnail
    published
    content
    slug
    createdAt
    _count {
      likes
      comments
    }
  }
  user_posts_count
}`

export const fetchPosts = async (opt?: IFetchOpt) => {

  const { skip, take } = transformPage(opt)
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take })
  return { posts: data.posts as Post[], count: data.post_count }
}


export const fetchUserPosts = async (opt?: IFetchOpt) => {

  const { skip, take } = transformPage(opt)
  const data = await fetchGraphQL(print(GET_USER_POSTS), { skip, take }, { auth: true })
  return { posts: data.user_posts as Post[], count: data.user_posts_count }
}
