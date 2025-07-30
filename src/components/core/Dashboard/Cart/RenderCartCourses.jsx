import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GiNinjaStar } from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice'
import ReactStars from "react-rating-stars-component"

const RenderCartCourses = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.cart)

  return (
    <div className="space-y-4">
      {
        cart.map((course) => (
          <div key={course._id} className="bg-richblack-800  bg-opacity-50 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center gap-4">
            <img src={course?.thumbnail} alt="course thumbnail" className="w-full md:w-[180px] h-auto rounded-md object-cover" />
            
            <div className="flex-1">
              <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
              <p className="text-sm text-richblack-300 mb-2">{course?.category?.name}</p>
              
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <span>4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  value={4.8}
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />
                <span>({course?.ratingAndReviews?.length})</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-1 text-pink-300 hover:text-pink-400 transition text-sm"
              >
                <RiDeleteBin6Line className="text-lg" />
                <span>Remove</span>
              </button>
              <p className="text-lg text-richblack-5">₹ {course?.price}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses
