import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link, useNavigate } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {

    const {token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const [loading,setLoading]=useState(false);
    const [instructorData,setInsctructorData]=useState(null)
    const [courses,setCourses]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{

        const getCourseData=async()=>{
            setLoading(true);

            const instructorApiData=await getInstructorData(token);
            const result=await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if(instructorApiData.length){
                setInsctructorData(instructorApiData);
            }
            if(result){
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseData();

    },[])

    const totalAmount=instructorData?.reduce((acc,curr)=>acc+curr.totalAmountGenerated,0);
    const totalStudents=instructorData?.reduce((acc,curr)=>acc+curr.totalStudentsEnrolled,0);

  return (
    <div className="min-h-screen p-6 space-y-4">
        {/* Header Section */}
        <div className="bg-richblack-900 bg-opacity-60 rounded-2xl p-8  text-white border-2 border-blue-200  shadow-xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-richblack-5 mb-2">
                        Hello {user?.firstName} 👋
                    </h1>
                    <p className=" text-md">View Your Progress</p>
                </div>
                <div className="w-16 h-16  rounded-full flex items-center justify-center">
                    <img src={user?.image} alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[78px] rounded-full object-cover'
                    />
                </div>
            </div>
        </div>

        {loading ? (
            <div className="flex items-center justify-center py-20">
                <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-200"></div>
                    <p className="text-richblack-900  bg-opacity-60 text-lg">Loading your dashboard...</p>
                </div>
            </div>
        ) : (
            courses.length > 0 ? (
                <div className="space-y-8">
                    {/* Stats and Chart Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-richblack-900 bg-opacity-60 rounded-2xl p-6 border-2 border-blue-200  shadow-xl">
                                <InstructorChart courses={instructorData}/>
                            </div>
                        </div>
                        
                        {/* Stats Cards */}
                        <div className="space-y-4">
                            <div className="bg-richblack-900 bg-opacity-60 rounded-xl p-6 border-2 border-blue-200  shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-200 text-md font-semibold uppercase tracking-wide">Total Courses</p>
                                        <p className="text-3xl font-bold text-white mt-2">{courses.length}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-richblack-900 bg-opacity-60  rounded-xl p-6 border-2 border-blue-200  shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-200 text-md font-semibold uppercase tracking-wide">Total Students</p>
                                        <p className="text-3xl font-bold text-white mt-2">{totalStudents}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-richblack-900 bg-opacity-60  rounded-xl p-6 border-2 border-blue-200 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-200 text-md font-semibold uppercase tracking-wide">Total Income</p>
                                        <p className="text-3xl font-bold text-white mt-2">₹{totalAmount?.toLocaleString()}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Courses Section */}
                    <div className="bg-richblack-900 bg-opacity-60 rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-richblack-5">Your Courses</h2>
                            <Link to="/dashboard/my-courses" className="group">
                                <div className="flex items-center space-x-2 bg-blue-300 hover:bg-blue-400 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                                    <p className="text-white font-medium">View All</p>
                                    <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.slice(0,3).map((course,index)=>(
                                <div key={index} className="group bg-richblack-900 bg-opacity-60 rounded-xl overflow-hidden border  hover:bg-richblack-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.courseName}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-richblack-5 font-semibold text-lg mb-3 line-clamp-2">
                                            {course.courseName}
                                        </h3>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-2 text-richblack-200">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                </svg>
                                                <span>{course.studentsEnrolled.length} Enrolled</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-green-400 font-semibold">
                                                <span>₹{course.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center bg-richblack-800 rounded-2xl p-12 border border-richblack-700 shadow-xl max-w-md">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <p className="text-richblack-200 text-lg mb-6">You have not created any course yet.</p>
                        <button 
                            onClick={() => navigate("/dashboard/add-course")}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Create Your First Course
                        </button>
                    </div>
                </div>
            )
        )}
    </div>
  )
}

export default Instructor