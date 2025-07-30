import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import Iconbtn from '../../common/Iconbtn';
import CourseTable from './InstructorCourses/CourseTable';

const MyCourses = () => {

    const navigate=useNavigate();
    const {token}=useSelector((state)=>state.auth);

    const [courses,setCourses]=useState([]);

    useEffect(()=>{
        const fetchCourses=async()=>{
            const result =await fetchInstructorCourses(token);
            if(result){
                console.log("result",result)
                setCourses(result);
            }
        }
        fetchCourses();
    },[])

  return (
    <div className='w-[calc(100vw-450px)] max-w-maxContent bg-richblack-900  bg-opacity-70 p-8 rounded-lg'>
        <div className='flex justify-between'>
            <h1 className='text-3xl font-bold'>My Courses</h1>
            <Iconbtn
                text="Add Courses"
                onclick={()=>navigate("/dashboard/add-course")}
                customClasses={"bg-blue-200 text-white cursor-pointer rounded-md px-3 py-1.5 flex items-center gap-1"}
            />
        </div>
        {
            courses && <CourseTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default MyCourses