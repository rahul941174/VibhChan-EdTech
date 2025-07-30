import React, { useState } from 'react'
import { AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Iconbtn from '../../../common/Iconbtn'
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {changePassword} from "../../../../services/operations/SettingsAPI"



const UpdatePassword = () => {

  const {token}=useSelector((state)=>state.auth)
  const navigate=useNavigate();

  const [showPassword,setShowPassword]=useState(false);
  const [showNewPassword,setShowNewPassword]=useState(false);

  const{
    register,
    handleSubmit,
    formState:{errors},
  }=useForm()

  const handleOnSubmit=async(data)=>{
      try{
        await changePassword(token,data)
      }
      catch(err){
        console.log("Error ",err.message);
      }
  }

  return (
    <div className='w-[calc(100vw-222px)] text-richblack-50 mt-4'>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className='flex flex-col w-[80%] bg-richblack-900  bg-opacity-70 my-2 mx-2 rounded-md gap-3'>
            <div className='text-lg font-semibold mt-4 mx-3'>
              <p>Password</p>
            </div>

            <div className='mb-4 w-full'>
              <div className='grid grid-cols-2 grid-rows-1'>
                <div className='relative flex flex-col   mx-4 my-2 gap-2 '>
                  <label htmlFor='oldPassword'>Current Password</label>
                  <input
                      type={showPassword ? 'text' :'password'}
                      name='oldPassword'
                      id='oldPassword'
                      placeholder='Enter Current Password'
                      className='cursor-pointer rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                      {...register("oldPassword",{required:true})}
                  />
                  <span onClick={()=>{setShowPassword((prev)=>!prev)}}
                    className='absolute right-3 top-[38px] cursor-pointer'>
                    {
                      showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                      ):(
                        <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                      )
                    }
                  </span>
                  {errors.oldPassword && (
                    <span className="-mt-1 text-[12px] text-red-100">
                      Please enter your Current Password.
                    </span>
                  )}
                    
                </div>
                <div className='relative flex flex-col  mx-4 my-2 gap-2'>
                  <label htmlFor='newPassword'>New Password</label>
                  <input
                    type={showNewPassword ? 'text' :'password'}
                    name='newPassword'
                    id='newPassword'
                    placeholder='Enter New Password'
                    className='cursor-pointer rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                  
                    {...register("newPassword",{required:true})}
                  />
                  <span
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] cursor-pointer"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                  {errors.oldPassword && (
                    <span className="-mt-1 text-[12px] text-red-100">
                      Please enter your New Password.
                    </span>
                  )}
                </div>
              </div>
            </div>

          </div>
          <div className='w-[80%] flex justify-end gap-2 text-richblack-25'>
            <button onClick={()=>{
                navigate("/dashboard/my-profile")
              }}
              className='border text-white border-richblack-700 bg-gradient-to-r from-slate-900 to-blue-300 px-[12px] py-[8px] rounded-md'
            >
              Cancel
            </button>
            <Iconbtn type="submit" text="Update"
                customClasses={"flex items-center text-center bg-blue-300 text-richblack-900 font-semibold rounded-md px-3 py-2 w-[5rem] h-[2.5rem]"}
            />
          </div>
        </form>
    </div>
  )
}

export default UpdatePassword