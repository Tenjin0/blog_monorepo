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
