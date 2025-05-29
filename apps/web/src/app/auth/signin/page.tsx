import Link from 'next/link'
import React from 'react'

import SignInForm from './_components/SignInForm'

const SignInPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center gap-6">
      <h1 className='text-center text-2xl font-bold mb-4'>Sign In Page</h1>
      <SignInForm/>
      <Link className="underline" href={"/auth/forgot"}>Forgot your password ?</Link>
    </div>
  )
}

export default SignInPage
