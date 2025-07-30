import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className=" w-[calc(100vw-600px)] mx-auto text-richblack-5 px-4 py-8 min-h-screen bg-richblack-900  bg-opacity-70">
      <h1 className="text-3xl font-semibold mb-2">Your Cart</h1>
      <p className="text-sm text-richblack-300 mb-6">{totalItems} item(s) in your cart</p>
      {
        total > 0 ? (
          <div className="flex flex-col gap-6">
            <div className="md:col-span-2">
              <RenderCartCourses />
            </div>
            <div>
              <RenderTotalAmount />
            </div>
          </div>
        ) : (
          <p className="text-lg text-richblack-300">Your cart is empty.</p>
        )
      }
    </div>
  )
}

export default Cart
