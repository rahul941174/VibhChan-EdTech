import React from 'react'
import { useState } from "react"
import {useNavigate } from 'react-router-dom';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import {toast} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../services/operations/authAPI';
import { setSignupData } from '../../../slices/authSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
//import Tab from '../../common/Tab';
const SignupForm = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""})

    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    const [accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT);

    const {firstName,lastName,email,password,confirmPassword}=formData;
    function handleOnChange(event){
        setFormData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value
            }))
    }

    function handleOnSubmit(event){
        event.preventDefault();
        if(password != confirmPassword){
            toast.error("Password do not match")
            return;
        }
        const signupData={...formData,accountType};
        // data which will be used after otp verification
        dispatch(setSignupData(signupData));
        //send otp forverification
        dispatch(sendOtp(formData.email,navigate));


        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
        });
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

  return (
    <div>
        <div className="flex bg-gradient-to-r from-blue-400 to-blue-700 p-1 gap-x-1 my-6 rounded-[0.5rem] max-w-max border-2 border-blue-100 shadow-lg">
            <button
                onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
                className={`${
                accountType === ACCOUNT_TYPE.STUDENT
                    ? "bg-white text-blue-700"
                    : "bg-transparent text-white hover:bg-blue-500/30"
                } py-[10px] px-6 rounded-full transition-all duration-200 font-semibold`}
            >
                Student
            </button>
            <button
                onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
                className={`${
                accountType === ACCOUNT_TYPE.INSTRUCTOR
                    ? "bg-white text-blue-700"
                    : "bg-transparent text-white hover:bg-blue-500/30"
                } py-[10px] px-6 rounded-full transition-all duration-200 font-semibold`}
            >
                Instructor
            </button>
        </div>

        <form onSubmit={handleOnSubmit} className=''>
            <div className='flex justify-between mx-0 mt-[10px]'>
                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        First Name<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="text"
                        value={formData.firstName}
                        onChange={handleOnChange}
                        placeholder='Enter first name'
                        name="firstName"
                        className='bg-gradient-to-r from-blue-400 to-blue-700 rounded-[0.5rem] placeholder-white border-blue-100 border-2  text-white   p-[12px] w-full'
                    />
                </label>
                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Last Name<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="text"
                        value={formData.lastName}
                        onChange={handleOnChange}
                        placeholder='Enter last name'
                        name="lastName"
                        className='bg-gradient-to-r from-blue-400 to-blue-700 placeholder-white border-blue-100 border-2 rounded-[0.5rem] text-richblack-5 p-[12px] w-full'
                    />
                </label>
            </div>

            <div className='mt-[10px]'>
                <label >
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Email Address<sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={handleOnChange}
                        placeholder='Enter email id'
                        name="email"
                        className='bg-gradient-to-r from-blue-400 to-blue-700 rounded-[0.5rem] placeholder-white border-blue-100 border-2 text-richblack-5 p-[12px] w-full'
                    />
                </label>
            </div>


            <div className='flex justify-between mx-0 mt-[10px]'>
                <label className='relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Create Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type={showPassword ?("text"):("password")}
                        value={formData.password}
                        onChange={handleOnChange}
                        placeholder='Enter Password'
                        name='password'
                        className='bg-gradient-to-r from-blue-400 to-blue-700 rounded-[0.5rem] placeholder-white border-blue-100 border-2 text-richblack-5 p-[12px] w-full'
                    />
                    <span onClick={()=>setShowPassword((prev)=>!prev)} 
                            className='absolute right-3 top-[38px] cursor-pointer'>
                        {showPassword?(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>)}
                    </span>

                </label>
                <label className='relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type={showConfirmPassword ?("text"):("password")}
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        className='bg-gradient-to-r from-blue-400 to-blue-700 placeholder-white rounded-[0.5rem] border-blue-100 border-2 text-richblack-5 p-[12px] w-full'
                    />
                    <span onClick={()=>setShowConfirmPassword((prev)=>!prev)}
                            className='absolute right-3 top-[38px] cursor-pointer'>
                        {showConfirmPassword?(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>)}
                    </span>

                </label>
            </div>
            <button className='bg-blue-100 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-full'>
                Create Account
            </button>

        </form>

    </div>
  )
}

export default SignupForm