import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Iconbtn from '../../../common/Iconbtn'
import { useNavigate } from 'react-router-dom'
import { BuyCourse } from '../../../../services/operations/studentFeaturesAPI'

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart)
  const {token}=useSelector((state)=>state.auth)
  const {user}=useSelector((state)=>state.profile)
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Hello buying from cart");
    BuyCourse(token,courses,user,navigate,dispatch);
  }

  return (
    <div className="bg-richblack-800  bg-opacity-50 p-6 rounded-lg shadow-md sticky top-20">
      <p className="text-lg text-richblack-5 mb-2">Total</p>
      <p className="text-2xl font-semibold text-white mb-4">₹ {total}</p>
      <button
        onClick={handleBuyCourse}
        className="bg-blue-300 text-black font-semibold w-full py-2 rounded-md hover:bg-blue-400 transition"
      >Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount
