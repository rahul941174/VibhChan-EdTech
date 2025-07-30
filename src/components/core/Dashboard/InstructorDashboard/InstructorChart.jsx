import React, { useState } from 'react'
import {Chart,registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const[currChart,setCurrChart]=useState("students");

    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0;i<numColors;i++){
            const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //data for students
    const chartDataForStudents={
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalStudentsEnrolled),
                backgroundColor:[
                    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
                    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
                ].slice(0, courses.length),
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#FFFFFF'
            }
        ]
    }

    //data for income
    const chartDataForIncome={
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totalAmountGenerated),
                backgroundColor:[
                    '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444',
                    '#84CC16', '#06B6D4', '#F97316', '#EC4899', '#6366F1'
                ].slice(0, courses.length),
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#FFFFFF'
            }
        ]
    }

    //options
   const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#D1D5DB',
                    font: {
                        size: 12,
                        family: 'Inter, sans-serif'
                    },
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: '#1F2937',
                titleColor: '#F9FAFB',
                bodyColor: '#D1D5DB',
                borderColor: '#374151',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const suffix = currChart === 'students' ? ' Students' : ' ₹';
                        return label + ': ' + value + suffix;
                    }
                }
            }
        },
        elements: {
            arc: {
                borderWidth: 0
            }
        }
    }

    if (!courses || courses.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-16 h-16 bg-richblack-900 bg-opacity-60  text-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <p className="">No data available for visualization</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full text-white">
            {/* Header Section */}
            <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Analytics Dashboard</h3>
                <p className="text-richblack-50">Visualize your course performance and growth</p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex items-center justify-center mb-4">
                <div className="bg-richblack-900 bg-opacity-60 p-1 rounded-full border-2 border-blue-200">
                    <button 
                        onClick={() => setCurrChart("students")}
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                            currChart === "students" 
                                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg transform scale-105" 
                                : "text-richblack-200 hover:text-richblack-5 hover:bg-blue-100"
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <span>Students</span>
                        </div>
                    </button>
                    <button 
                        onClick={() => setCurrChart("income")}
                        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                            currChart === "income" 
                                ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg transform scale-105" 
                                : "text-richblack-200 hover:text-richblack-5 hover:bg-blue-100"
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span>Income</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Chart Container */}
            <div className="relative">
                {/* Chart Background */}
                <div className="absolute inset-0 bg-richblack-900 bg-opacity-60 rounded-xl blur-sm"></div>
                
                {/* Chart Content */}
                <div className="relative backdrop-blur-sm rounded-xl px-6 pt-4 border ">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-richblack-5">
                            {currChart === "students" ? "Student Enrollment Distribution" : "Revenue Distribution"}
                        </h4>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            currChart === "students" 
                                ? "bg-blue-900/50 text-blue-200 border border-blue-700" 
                                : "bg-green-900/50 text-green-200 border border-green-700"
                        }`}>
                            {courses.length} Courses
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                    <div className="w-full max-w-md h-[450px]">
                        <Pie
                        data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                        options={{
                            ...options,
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        />
                    </div>
                    </div>

                </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-richblack-900 bg-opacity-60 rounded-lg p-4 border ">
                    <div className="text-center">
                        <p className=" text-md font-semibold mb-1">Total {currChart === "students" ? "Students" : "Revenue"}</p>
                        <p className="text-2xl font-bold text-richblack-5">
                            {currChart === "students" 
                                ? courses.reduce((acc, course) => acc + course.totalStudentsEnrolled, 0)
                                : `₹${courses.reduce((acc, course) => acc + course.totalAmountGenerated, 0).toLocaleString()}`
                            }
                        </p>
                    </div>
                </div>
                <div className="bg-richblack-900 bg-opacity-60 rounded-lg p-4 border ">
                    <div className="text-center">
                        <p className="text-md font-semibold mb-1">Average per Course</p>
                        <p className="text-2xl font-bold text-richblack-5">
                            {currChart === "students" 
                                ? Math.round(courses.reduce((acc, course) => acc + course.totalStudentsEnrolled, 0) / courses.length)
                                : `₹${Math.round(courses.reduce((acc, course) => acc + course.totalAmountGenerated, 0) / courses.length).toLocaleString()}`
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorChart