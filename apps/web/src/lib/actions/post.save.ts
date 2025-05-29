"use server"

import fs from "node:fs/promises"
import gql from "graphql-tag"
import { print } from 'graphql'

import { PostFormSchema } from "../schema/postForm.schema"
import { TPostFormState } from "../types/form.state"
import { fetchGraphQL } from "../functions/fetchGraphQL"


const CREATE_POST = gql`
mutation createPost($input: CreatePostInput!) {
  createPost(createPostInput: $input) {
    id
  }
}
`
export async function saveNewPost(state: TPostFormState, formData: FormData): Promise<TPostFormState> {

  const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()))


  if(!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  // for development store in public. In production use a cloud service
  const thumbnailFile = formData.get("thumbnail") as File
  // const thumbnailName = formData.get("thumbnail-name")
  const arrayBuffer = await thumbnailFile.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  await fs.writeFile(`./public/images/${thumbnailFile.name}`, buffer)
  const thumbnailUrl = `/images/${thumbnailFile.name}`
  const data = await fetchGraphQL(print(CREATE_POST), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl
    }
  }, { auth: true})
  if (data?.errors) {
      await fs.unlink(`./public/images/${thumbnailFile.name}`)

    return {
      data: Object.fromEntries(formData.entries()),
      message: data.errors.length === 1 && data.errors[0].message ? data.errors[0].message : "Something went wrong"
    }
  }
  if (data.createPost) {
    return { ok: true, message: 'Your post has been saved' }
  }
}

const UPDATE_POST = gql`
mutation updatePost($input: UpdatePostInput!) {
  updatePost(updatePostInput: $input) {
    id
  }
}
`

export async function updatePost(state: TPostFormState, formData: FormData): Promise<TPostFormState> {

  const thumbnailFile = formData.get("thumbnail") as File

  const validatedFields = PostFormSchema.safeParse(Object.fromEntries(formData.entries()))
  if(!validatedFields.success) {
    return {
      ok: false,
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors
    }
  }
  if (thumbnailFile.name !== 'undefined') {
    const arrayBuffer = await thumbnailFile.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFile(`./public/images/${thumbnailFile.name}`, buffer)

  }
  const thumbnailUrl = thumbnailFile.name !== 'undefined' ? `/images/${thumbnailFile.name}` : undefined

  const data = await fetchGraphQL(print(UPDATE_POST), {
    input: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl
    }
  }, { auth: true})

  if (data?.errors) {
      // await fs.unlink(`./public/images/${thumbnailFile.name}`)
    return {
      ok: false,
      data: Object.fromEntries(formData.entries()),
      message: data.errors.length === 1 && data.errors[0].message ? data.errors[0].message : "Something went wrong"
    }
  }
  if (data.updatePost) {
    return { ok: true, action: 'UPDATE', message: 'Your post has been updated' }
  }

  // Todo: check if thumbnail has been changed
}
