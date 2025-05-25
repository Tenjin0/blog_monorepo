"use server"
import gql from "graphql-tag"
import { print } from 'graphql'

import { fetchGraphQL } from "../functions/fetchGraphQL"
import { TCreateCommentFormState } from "../types/form.state"
import { CreateCommentSchema } from "../schema/createComment.schema"

const ADD_COMMENT = gql`
mutation createComment($input: CreateCommentInput!) {
  	createComment(createCommentInput: $input ) {
      id
      content
      author {
        id
        name
        avatar
      }
      createdAt
  }
}`


export const createComment = async (state: TCreateCommentFormState, formData: FormData): Promise<TCreateCommentFormState> => {
  const validateFields = CreateCommentSchema.safeParse(Object.fromEntries(formData.entries()))
  console.log("createComment", validateFields)
  if (!validateFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error.flatten().fieldErrors,
    }
  // const data = await fetchGraphQL(print(SIGN_IN), {
  //   input: {
  //     ...validateFields.data
  //   }
  // })
  const data = await fetchGraphQL(print(ADD_COMMENT), {
    input: {
      ...validateFields.data
    }
  }, { auth: true})
  console.log(data)
  if (data?.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: data.errors.length === 1 && data.errors[0].message ? data.errors[0].message : "Something went wrong"
    }
  }
  if (data.createComment) {
    return { ok: true, message: 'Your comment has been saved', open: false }
  }
}
