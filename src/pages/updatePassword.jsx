import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiFillEyeInvisible,AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const dispatch=useDispatch();
    const location=useLocation();
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const {loading}=useSelector((state)=>state.auth)
    const {password,confirmPassword}=formData;

    const handleOnChange=(e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]:e.target.value
            }
        ))
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        //will be sent in the url sent in email
        const token=location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token))
    }

  return (
    <div className='text-richblack-25 w-full  h-screen flex justify-center items-center'>
    {
        loading ? (
            <div>Loading....</div>
        ):(
            <div>
                <h1>Choose new password</h1>
                <p>Almost done.Enter your new password and you are all set</p>
                <form onSubmit={handleOnSubmit} className='flex flex-col '>
                    <label>
                        <p>New Password</p>
                        <div className='relative'>
                            <input
                                required
                                type={showPassword ? "text":"password"}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder='New password'
                                className='w-full p-5 bg-richblack-600 text-richblack-5'
                            />
                            <span onClick={()=>{setShowPassword((prev)=>!prev)}}
                                    className='absolute  right-3 top-[25px] cursor-pointer '>
                                {
                                    showPassword ? 
                                    <AiFillEyeInvisible fontSize={24}/> 
                                    :<AiFillEye fontSize={24}/>
                                }
                            </span>
                        </div>
                    </label>
                    <label >
                        <p>Confirm New Password</p>
                        <div className='relative'>
                            <input
                                required
                                type={showConfirmPassword ? "text":"password"}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm password'
                                className='w-full p-5 bg-richblack-600 text-richblack-5'
                            />
                            <span onClick={()=>{setShowConfirmPassword((prev)=>!prev)}} 
                                     className='absolute  right-3 top-[25px] cursor-pointer ' >
                                {
                                    showConfirmPassword ? 
                                    <AiFillEyeInvisible fontSize={24}/> 
                                    :<AiFillEye fontSize={24}/>
                                }
                            </span>
                        </div>
                    </label>

                    <button type='submit'>Reset Password</button>

                </form>

                <div>
                            <Link to="/login">
                                <p>Back to login</p>
                            </Link>                        
                </div>
            </div>
        )
    }
    </div>
  )
}

export default UpdatePassword;