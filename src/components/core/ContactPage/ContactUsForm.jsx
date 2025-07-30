import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoint } from '../../../services/apis';
import CountryCode from "../../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    const submitContactForm=async(data)=>{
        console.log("data : ",data );
        try{
            setLoading(true);
            const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
            console.log("Response ",response);
            setLoading(false);
        }
        catch(error){
            console.log("Error : ",error.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""
            })
        }
    },[reset,isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='text-white'>

       <div className='flex flex-col gap-5'>
        <div className='flex gap-5'>
                {/* firstname */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input 
                        className='bg-gradient-to-r from-blue-400 to-blue-700  placeholder-white border-blue-100 border-2  py-3 px-2 rounded-md'
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter your first name'
                        {...register("firstname",{required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>Please enter your name</span>
                        )
                    }
                </div>

                {/* lastname */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input 
                        className='bg-gradient-to-r from-blue-400 to-blue-700  placeholder-white border-blue-100 border-2  py-3 px-2 rounded-md'
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter your last name'
                        {...register("lastname")}
                    />
                </div>
            </div>

            {/* email */}
            <div className='flex flex-col'>
                    <label htmlFor='email'>Email Address</label>
                    <input 
                        className='bg-gradient-to-r from-blue-400 to-blue-700 placeholder-white border-blue-100 border-2  py-3 px-2 rounded-md'
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter your email address'
                        {...register("email",{required:true})}
                    />
                    {
                        errors.email && (
                            <span>Please enter your email address</span>
                        )
                    }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col gap-3'>
                    <label htmlFor='phonenumber'>Phone Number</label>
                    <div className='flex gap-2'>

                        {/* dropdown */}
                            <select 
                                name='dropdown'
                                id='dropdown'
                                {...register("countrycode",{required:true})}
                                className='bg-gradient-to-r from-blue-400 to-blue-700  placeholder-white border-blue-100 border-2  w-[80px] py-3 px-2 rounded-md'
                            >
                                {
                                    CountryCode.map((element,index)=>{
                                        return(
                                            <option key={index} value={element.code} className='bg-gradient-to-r from-blue-400 to-blue-700 rounded-[0.5rem] placeholder-white border-blue-100 border-2 '>
                                                {element.code} - {element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        
                        {/* phoneNumber */}
                            <input 
                                className='bg-gradient-to-r from-blue-400 to-blue-700 placeholder-white border-blue-100 border-2  w-[calc(100%-90px)] py-3 px-2 rounded-md'
                                type='number'
                                name='phonenumber'
                                id='phonenumber'
                                placeholder='Enter your phone number'
                                {...register("phoneNo",
                                    {
                                        required:{value:true,message:"Please enter Phone number"},
                                        maxLength:{value:10,message:"Invalid Phone number"},
                                        minLength:{value:8,message:"Invalid Phone number"},
                                    })
                                }
                            />


                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }
            </div>

            {/* message */}
            <div className='flex flex-col'>
                    <label htmlFor='message'>Message</label>
                    <textarea 
                        className='bg-gradient-to-r from-blue-400 to-blue-700  placeholder-white border-blue-100 border-2  py-3 px-2 rounded-md'
                        name='message'
                        id='message'
                        cols="30"
                        rows="7"
                        placeholder='Enter your message'
                        {...register("message",{required:true})}
                    />
                    {
                        errors.message && (
                            <span>Please enter your message</span>
                        )
                    }
            </div>

            {/* button */}
            <button type='submit'
                    className='rounded-md bg-blue-200 text-center px-6  py-2 text-[16px] font-bold text-richblack-25'>
                Send Message
            </button>


       </div>

    </form>
  )
}

export default ContactUsForm