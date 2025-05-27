"use server"

import gql from "graphql-tag"
import { fetchGraphQL } from "../functions/fetchGraphQL"
import { SignUpFormSchema } from "../schema/signup.schema"
import { SignInFormSchema } from "../schema/signin.schema"
import { TSignUpFormState } from "../types/form.state"
import { print } from 'graphql'
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createSession } from "../session"


const CREATE_USER = gql`
mutation createUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
  }
}`


export async function signUp(state: TSignUpFormState, formData: FormData): Promise<TSignUpFormState> {
  const validateFields = SignUpFormSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!validateFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validation failed"
    }
    const data = await fetchGraphQL(print(CREATE_USER), {
      input: {
        ...validateFields.data
      }
    })

    if (data.errors) {
      return {
        data: Object.fromEntries(formData.entries()),
        message: data.errors.length === 1 && data.errors[0].message ? data.errors[0].message :"Something went wrong"}
    }
    redirect('/auth/signin')
}

const SIGN_IN = gql`
mutation signIn ($input: SignInInput!) {
  signIn(signInput: $input) {
    id
    name
    avatar
    access_token
  }
}
`

export async function signIn(state: TSignUpFormState, formData: FormData): Promise<TSignUpFormState> {
  const validateFields = SignInFormSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!validateFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validateFields.error.flatten().fieldErrors,
    }
    const data = await fetchGraphQL(print(SIGN_IN), {
      input: {
        ...validateFields.data
      }
    })

    console.log(data)
    if (data.errors) {
      return {
        data: Object.fromEntries(formData.entries()),
        message: data.errors.length === 1 && data.errors[0].message ? data.errors[0].message :"Invalid creditentials"}
    }

    await createSession({
    user: {
        id: data.signIn.id,
        name: data.signIn.name,
        avatar: data.signIn.avatar
      },
      accessToken: data.signIn.access_token
    })
    revalidatePath("/")
    redirect('/')
}
