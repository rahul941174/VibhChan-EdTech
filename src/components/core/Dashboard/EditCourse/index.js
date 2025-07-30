import React, { useEffect, useState } from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
const EditCourse = () => {
    const dispatch = useDispatch();
    const {courseId}=useParams();
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const populateCourseDetails=async()=>{
            setLoading(true);
            const result=await getFullDetailsOfCourse(courseId,token);
            console.log("result",result);
            if(result?.courseDetails){
                
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails));
            }
        }
        populateCourseDetails();
    },[])

    // if(loading){
    //     return(
    //         <div>
    //             Loading....
    //         </div>
    //     )
    // }

  return (
    <div className='flex flex-col items-start w-[calc(100vw-400px)] mx-auto text-richblack-700'>
        
        <div className='flex flex-col w-[60%] text-richblack-25 mb-7'>
            <h1 className='font-bold text-2xl'>Edit Course</h1>
        </div>
        <div  className="flex-1 w-[60%]">
            {
                course ? (<RenderSteps/>):(<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse