"use server"
import gql from "graphql-tag"
import { print } from 'graphql'

import { fetchGraphQL } from "../functions/fetchGraphQL"
import { Comment } from "../types/model.types"
import { IFetchOpt } from "../types/fetch.types"
import { transformPage } from "../functions/transformpage"


const GET_COMMENTS_BY_POST = gql`
query comments($id: Int!, $take: Int, $skip: Int) {
  comments(postId: $id, take: $take, skip: $skip) {
    id
    content
    createdAt
    author{
    	id
      name
    	avatar
  	}
  }
  comments_count(postId: $id)
}`


export const fetchComments = async (id: number, opt?: IFetchOpt) => {
  const { skip, take } = transformPage(opt)
  const data = await fetchGraphQL(print(GET_COMMENTS_BY_POST), { id, skip, take })
  return { comments: data.comments as Comment[], count: data.comments_count }
}
