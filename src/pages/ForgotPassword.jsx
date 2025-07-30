import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("")
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className='text-white w-full h-screen flex justify-center items-center'>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1 className='text-3xl font-semibold mb-2'>
              {
                !emailSent ? "Reset Your Password" : "Check Your Email"
              }
            </h1>
            <p className=' mb-6 max-w-[400px]'>
              {
                !emailSent
                  ? "Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email we can try account recovery."
                  : `We have sent the reset email to ${email}`
              }
            </p>

            <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-6'>
              {
                !emailSent && (
                  <label className='flex flex-col gap-y-2'>
                    <p className=' text-sm'>Email Address</p>
                    <input
                      required
                      type='email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email address'
                      autoComplete="email"
                      className='bg-gradient-to-r from-blue-400 to-blue-700  placeholder-white border-blue-100 text-white border-2 rounded-[0.5rem]  p-[12px] w-full'
                    />
                  </label>
                )
              }

              <button
                type='submit'
                className='bg-blue-200 text-richblack-900 py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-95 hover:shadow-md'
              >
                {emailSent ? "Resend Email" : "Reset Password"}
              </button>
            </form>

            <div className='mt-4'>
              <Link to="/login">
                <p className='text-sm text-white underline hover:text-black hover:font-semibold transition-all'>
                  Back to login
                </p>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
