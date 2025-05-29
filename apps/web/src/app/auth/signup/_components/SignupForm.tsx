'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"
import { signUp } from "../../../../lib/actions/auth"
import SubmitButton from "../../../../components/submitButton"

const SignUpForm = () => {
  console.log("SignUpForm")
  const [state, action] = useActionState(signUp, undefined)
  return (
    <form action={action} className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">

      {
        !!state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )
      }
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="John Doe"></Input>
      </div>
      {
        !!state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )
      }
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" placeholder="John Doe"></Input>
      </div>
      {
        !!state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )
      }
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password"></Input>
      </div>
      {
        !!state?.errors?.password && (
          <div className="text-red-500 text-sm">
            <p>Password must:</p>
            <ul>
              {
                state.errors.password.map(err => (<li key={err}>- {err}</li>))
              }
            </ul>
          </div>
        )
      }
      <SubmitButton>Sign Up</SubmitButton>
    </form>
  )
}

export default SignUpForm
