import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/Iconbtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {

    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitProfileForm=async(data)=>{
        try{
            console.log(data);
            dispatch(updateProfile(token,data))
        }
        catch(err){
            console.log("ERROR MESSAGE - ", err.message)
        }
    }

    
  return (
   <>
    <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className='text-richblack-50   bg-richblack-900 bg-opacity-70
                            px-4 py-6 mb-4 rounded-lg '>
            <p className='text-lg font-semibold mb-3'>Profile Information</p>
            <div className='grid grid-cols-2 grid-rows-3 w-full gap-5'>
                <div className='flex flex-col w-[80%]'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        placeholder="Enter your First Name"
                        id='firstName'
                        {...register("firstName", { required: true })}
                        defaultValue={user?.firstName}
                        className=' rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                    />
                    {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your first name.
                    </span>
                )}
                </div>
                <div className='flex flex-col w-[80%] '>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter first name"
                        
                        {...register("lastName", { required: true })}
                        defaultValue={user?.lastName}
                        className=' rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                    />
                    {errors.lastName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your last name.
                    </span>
                    )}
                </div>
                <div className='flex flex-col w-[80%] '>
                    <label htmlFor="dateOfBirth">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        {...register("dateOfBirth", {
                        required: {
                            value: true,
                            message: "Please enter your Date of Birth.",
                        },
                        max: {
                            value: new Date().toISOString().split("T")[0],
                            message: "Date of Birth cannot be in the future.",
                        },
                        })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                        className=' rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                    />
                    {errors.dateOfBirth && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.dateOfBirth.message}
                        </span>
                    )}
                
                </div>
                <div className='flex flex-col w-[80%]'>
                    <label htmlFor='gender'>Gender</label>
                    <select
                        type="text"
                        name="gender"
                        id="gender"
                        className=' rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                        {...register("gender", { required: true })}
                        defaultValue={user?.additionalDetails?.gender}
                    >
                        {genders.map((ele, i) => {
                        return (
                            <option key={i} value={ele} className='bg-blue-200 opacity-50'>
                            {ele}
                            </option>
                        )
                        })}
                    </select>
                    {errors.gender && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Date of Birth.
                        </span>
                    )}
                </div>
                <div className='flex flex-col w-[80%]'>
                    <label htmlFor='contactNumber'>Contact Number</label>
                    <input
                        className='rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                        type="tel"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Enter Contact Number"
                        {...register("contactNumber", {
                        required: {
                            value: true,
                            message: "Please enter your Contact Number.",
                        },
                        maxLength: { value: 12, message: "Invalid Contact Number" },
                        minLength: { value: 10, message: "Invalid Contact Number" },
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                    />
                    {errors.contactNumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.contactNumber.message}
                        </span>
                    )}
                </div>
                <div className='flex flex-col w-[80%]'>
                    <label htmlFor='about'>About</label>
                    <input
                        className=' rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                        type="text"
                        name="about"
                        id="about"
                        placeholder="Enter Bio Details"
                        {...register("about", { required: true })}
                        defaultValue={user?.additionalDetails?.about}
                    />
                    {errors.about && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your About.
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div className="flex justify-end gap-2">
            <button
                onClick={() => {
                navigate("/dashboard/my-profile")
                }}
                className="border text-white border-richblack-700 bg-gradient-to-r from-slate-900 to-blue-300 px-[12px] py-[8px] rounded-md"
            >
                Cancel
            </button>
            <IconBtn type="submit" text="Save" 
                customClasses={"flex items-center bg-blue-300 text-richblack-900 font-semibold rounded-md px-5 py-2"}
            />
        </div>
    </form>
   </>
  )
}

export default EditProfile