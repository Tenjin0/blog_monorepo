import Link from "next/link"
import SignUpForm from "./_components/SignupForm"


const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-96 flex flex-col justify-center items-center gap-6">
      <h2 className="text-center text-2xl font-bold">Sign Up Page</h2>
      <SignUpForm/>
      <div className="flex flex-col gap-2">
        <p>Already have an account?</p>
        <Link className=" self-center underline" href={"/auth/signin"}>Sign In</Link>
      </div>
    </div>
  )
}
export default SignUpPage
