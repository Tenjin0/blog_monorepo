"use client"
import gql from "graphql-tag"
import { print } from 'graphql'
import { fetchGraphQL } from "../functions/fetchGraphQL"


export const DELETE_POST = gql`
mutation removePost($id: Int!) {
  removePost(id: $id )
}
`

export const deletePost = async (postId: number) => {
  try {
    const data = await fetchGraphQL(print(DELETE_POST), {id: postId}, { auth: true})

  } catch(err) {
    console.error(err)
  }

}
