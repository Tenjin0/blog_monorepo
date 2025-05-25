'use client'

import React from 'react'
import { useActionState } from "react"

import { Label } from "../../../../components/ui/label"
import { Input } from "../../../../components/ui/input"
import SubmitButton from "../../../../components/submitButton"
import { signIn } from '../../../../lib/actions/auth'

const SignInform = () => {
  const [state, action] = useActionState(signIn, undefined)
  return (
    <form action={action} className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
      {
        !!state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )
      }
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input id="email" name="email" type='email' placeholder='john@example.com'></Input>
      </div>
      {
        !!state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )
      }
      <div>
        <Label htmlFor='password'>password</Label>
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
      <SubmitButton>Sign In</SubmitButton>
    </form>
  )
}

export default SignInform
