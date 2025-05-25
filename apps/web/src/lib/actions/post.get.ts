"use server"
import gql from "graphql-tag"
import { print } from 'graphql'

import { fetchGraphQL } from "../functions/fetchGraphQL"
import { Post } from "../types/model.types"


const GET_POST = gql`
query post($id: Int!) {
  post(id: $id) {
    id
    title
    thumbnail
    content
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
  const data = await fetchGraphQL(print(GET_POST), {id})
  return { post: data.post as Post }
}
