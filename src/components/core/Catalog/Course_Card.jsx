import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({course,Height}) => {

    const [avgReviewCount,setAvgReviewCount]=useState(0);

    useEffect(()=>{
        const count=GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])

  return (
    // Added a background color (e.g., bg-blue-700) and adjusted text color to a darker richblack variant (e.g., text-richblack-5)
    <div className='bg-blue-300 bg-opacity-70 text-richblack-5 rounded-lg p-4'> {/* Added background and padding for better visual */}
        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img
                        src={course?.thumbnail}
                        alt='course'
                        className={`${Height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div className='mt-3'> {/* Added margin-top for spacing */}
                    <p className='text-xl font-semibold'>{course?.courseName}</p> {/* Increased font size and weight */}
                    <p className='text-richblack-200 text-sm'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p> {/* Slightly lighter richblack for instructor name */}
                    <div className='flex gap-x-2 items-center mt-2'> {/* Centered items vertically and added margin-top */}
                        <span className='text-yellow-100 font-bold'>{avgReviewCount}</span> {/* Highlighted review count */}
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className='text-richblack-200'>({course?.ratingAndReviews?.length} Ratings)</span> {/* Parentheses for clarity */}
                    </div>
                    <p className='text-xl font-bold mt-2'>Rs. {course?.price}</p> {/* Added currency and bolded price */}
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card