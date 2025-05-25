interface ISignUpFormState {
  data: {
    name?: string
    email?: string
    password?: string
  }
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]

  },
  message?: string
}

export type TSignUpFormState = ISignUpFormState | undefined


interface ICreateCommentFormState {
  data?: {
    content?: string
  }
  errors?: {
    content?: string[]
  },
  message?: string
  ok?: boolean
  open?: boolean
}

export type TCreateCommentFormState = ICreateCommentFormState | undefined
