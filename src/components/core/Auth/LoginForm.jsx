import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import {toast} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {login} from "../../../services/operations/authAPI"
const LoginForm = ({setIsLoggedIn}) => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({email:"",password:""})
    const [showPassword,setShowPassword]=useState(false)
    const {email,password}=formData;

    function changeHandler(event){
        setFormData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value
            }))
    }

    function handleOnSubmit(event){
            event.preventDefault();
            dispatch(login(email,password,navigate))
    }

  return (
    <form onSubmit={handleOnSubmit}
            className='flex flex-col w-full gap-y-4 mt-6'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter email id'
                name="email"
                className='bg-gradient-to-r from-blue-400 to-blue-700 rounded-[0.5rem] placeholder-white border-blue-100 border-2  text-white p-[12px] w-full'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input
                required
                type={showPassword ?("text"):("password")}
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter Password'
                name='password'
                className='bg-gradient-to-r from-blue-400 to-blue-700  placeholder-white border-blue-100 text-white border-2 rounded-[0.5rem]  p-[12px] w-full'
            />
            <span onClick={()=>setShowPassword((prev)=>!prev)} 
                    className='absolute right-3 top-[38px] cursor-pointer'>
                {showPassword?(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>)}
            </span>


            <Link to="/forgot-password">
                <p className='text-xs mt-1 text-blue-100  max-w-max ml-auto'>Forgot Password</p>
            </Link>
        </label>
        <button className='bg-blue-100 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'
                type='submit'>
            Sign In
        </button>
    </form>
  )
}

export default LoginForm