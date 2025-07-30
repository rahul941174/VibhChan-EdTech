import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from "react-otp-input";
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {

    const [otp,setOtp]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {loading}=useSelector((state)=>state.auth);
    const {signupData}=useSelector((state)=>state.auth);

    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        };
    },[])

    const handleOnSubmit=(e)=>{
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }=signupData;

        dispatch(signUp( accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }

  return (
    <div className='min-h-screen text-white w-full flex justify-center items-center p-4'>
        {
            loading ? (
                <div className='flex flex-col items-center space-y-4'>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                    <p className="text-gray-300 text-lg font-medium">Processing your verification...</p>
                </div>
            ) : (
                <div className='w-full max-w-md mx-auto bg-richblack-900 bg-opacity-50 p-8 rounded-2xl shadow-2xl border border-gray-700'>
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className='text-3xl font-bold text-white mb-3 bg-blue-200 bg-clip-text text-transparent'>
                            Verify Email
                        </h1>
                        <p className='text-gray-300 text-sm leading-relaxed'>
                            A verification code has been sent to your email address. Enter the 6-digit code below to complete your registration.
                        </p>
                        {signupData?.email && (
                            <p className="text-red-200 text-sm mt-2 font-medium">
                                📩 {signupData.email}
                            </p>
                        )}
                    </div>

                    {/* OTP Form */}
                    <form onSubmit={handleOnSubmit} className='space-y-8'>
                        <div className="flex flex-col items-center space-y-4">
                            <label className="text-sm font-medium text-gray-200 text-center">
                                Enter Verification Code
                            </label>
                            <div className="w-full flex justify-center">
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) => (
                                        <input 
                                            {...props} 
                                            className="w-12 h-12 mx-1 bg-gray-700 border border-gray-600 rounded-xl text-black text-center text-lg font-semibold 
                                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                                     transition-all duration-300 hover:border-gray-500 hover:bg-gray-600"
                                            style={{}} // Override any inline styles
                                        />
                                    )}
                                    renderSeparator={<span className="text-gray-500 mx-1">-</span>}
                                />
                            </div>
                        </div>

                        <button 
                            type='submit'
                            className='w-full bg-blue-200 hover:bg-blue-300 
                                     text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 
                                     transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-md
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
                                     relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={otp.length !== 6}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Verify Email
                            </span>
                            
                        </button>
                    </form>

                    {/* Footer Actions */}
                    <div className='flex justify-between items-center mt-8 pt-6 border-t border-gray-700'>
                        <div>
                            <Link to="/login" className="group">
                                <p className='text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1 relative'>
                                    ← Back to login
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                                </p>
                            </Link>                        
                        </div>
                        <button 
                            onClick={() => {dispatch(sendOtp(signupData.email,navigate))}}
                            className="text-sm text-white  transition-colors duration-200 
                                     bg-blue-200 bg-opacity-60 px-3 py-2 rounded-lg hover:bg-opacity-50 
                                     border border-blue-700 hover:border-blue-100 flex items-center gap-1"
                        >
                            🔄 Resend Code
                        </button>
                    </div>

                   
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail