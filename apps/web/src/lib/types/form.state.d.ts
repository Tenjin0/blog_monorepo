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


export interface IPostFormState {
   data?: {
    id?: number
    title?: string
    content?: string
    thumbnail?: File | null
    previousThumbnail?: string
    tags?: string
    published?: string
  }
  errors?: {
    title?: string[]
    content?: string[]
    thumbnail?: string[]
    tags?: string[]
    published?: string[]
  },
  message?: string
  ok?: boolean
  action?: 'UPDATE' | 'CREATE'
}
export type TPostFormState = IPostFormState | undefined
