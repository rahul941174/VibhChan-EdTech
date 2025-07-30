import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Iconbtn from '../../../../common/Iconbtn'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'

const PublishCourse = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
      } = useForm()
    
      const dispatch = useDispatch()
      const navigate=useNavigate()
      const { token } = useSelector((state) => state.auth)
      const { course } = useSelector((state) => state.course)
      const [loading, setLoading] = useState(false)

      useEffect(()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED){
            setValue("public",true);
        }
      },[])

      const goToCourses=()=>{
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
      }

      const handleCoursePublish=async()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true
           || course?.status===COURSE_STATUS.DRAFT && getValues("public")===false
        ){
            //form is not updated no need to make api call
            goToCourses();
            return;
        }

        //if form is updated
        const formData=new FormData();
        formData.append("courseId",course._id);
        const courseStatus=getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",courseStatus);

        setLoading(true);

        const result=await editCourseDetails(formData,token);

        if(result){
            goToCourses();
        }
        setLoading(false);

      }

      const onSubmit=()=>{
            handleCoursePublish();
      }
      
      const goBack=()=>{
            dispatch(setStep(2));
      }

  return (
    <div className='rounded-md bg-richblack-900 bg-opacity-70 text-richblack-5 p-6'>
        <p className='font-semibold text-lg mb-4'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div >
                <label htmlFor='public'>
                    <input
                        type='checkbox'
                        id='public'
                        {...register("public")}
                        className='rounded h-4 w-4 m-3 bg-richblack-100'
                    />
                    <span className=''>Make this course as public</span>
                </label>
            </div>

            <div className='flex justify-end gap-x-3 mt-2'>
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='bg-richblack-700 cursor-pointer text-white rounded-md px-3 py-1.5 '
                >
                    Back
                </button>
                <Iconbtn disabled={loading}  text="Save Changes" type="submit"
                     customClasses={"bg-blue-300 text-white cursor-pointer rounded-md px-3 py-1.5 flex items-center gap-1"}
                />
            </div>
        </form>
    </div>
  )
}

export default PublishCourse