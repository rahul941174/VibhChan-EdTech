import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import Iconbtn from '../../common/Iconbtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {

    const {user}=useSelector((state)=>(state.profile));
    const {token}=useSelector((state)=>(state.auth));
    const {courseEntireData}=useSelector((state)=>(state.viewCourse));

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    }=useForm();

    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[])

    const ratingChanged=(newRating)=>{
        setValue("courseRating",newRating);
    }

    const onSubmit=async(data)=>{
        await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience,
            },
            token
        )
        setReviewModal(false);
    }

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        {/* Modal Container */}
        <div className="my-10 w-11/12 max-w-[500px] rounded-lg border border-richblack-400 bg-gradient-to-r from-slate-900 to-blue-300  bg-opacity-50 p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg  p-4">
                <p className="text-xl font-semibold text-richblack-5">Add Review</p>
                <button
                    onClick={()=>setReviewModal(false)}
                    className="text-richblack-5 transition-all duration-200 hover:scale-110"
                >
                    {/* Using a simple 'X' icon for close */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
                {/* User Info */}
                <div className="flex items-center justify-center gap-x-4">
                    <img
                        src={user?.image}
                        alt='user Image'
                        className='aspect-square w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p className="font-semibold text-richblack-5">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-richblack-50">Posting Publicly</p>
                    </div>
                </div>

                {/* Review Form */}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center'>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        emptyIcon={<i className="far fa-star"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                    />

                    <div className="flex w-full flex-col gap-2 mt-4">
                        <label htmlFor='courseExperience' className="text-sm text-richblack-5">Add your experience <sup className="text-pink-200">*</sup></label>
                        <textarea
                            id='courseExperience'
                            placeholder='Add your Experience'
                            {...register("courseExperience",{required:true})}
                            className='form-style min-h-[130px] w-full rounded-md bg-gradient-to-r from-blue-400 to-blue-700  placeholder-white border-blue-100 text-white border-2'
                        />
                        {
                            errors.courseExperience &&(
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex w-full justify-end gap-x-4">
                        <button
                            onClick={()=>setReviewModal(false)}
                            className="border text-white border-richblack-700 bg-gradient-to-r from-slate-900 to-blue-300 px-[12px] py-[8px] rounded-md"
                        >
                            Cancel
                        </button>
                        <Iconbtn
                            text="Save"
                            customClasses={'flex items-center gap-x-2 rounded-md bg-blue-700 text-white font-sm py-2 px-5  text-richblack-900 transition-all duration-200 hover:bg-blue-600'}
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal
