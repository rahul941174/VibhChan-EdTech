import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Iconbtn from '../../common/Iconbtn';

const MyProfile = () => {

    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();

  return (
    <div className='text-richblack-50 w-[calc(100vw-222px)] max-w-maxContent gap-3'>
        <h1 className='text-4xl font-bold mb-4 text-richblack-25'>
            My Profile
        </h1>

        {/* section 1 */}
        <div className='text-richblack-50 w-8/12 flex items-center  justify-between  bg-richblack-900 bg-opacity-60
                         px-4 py-5 mb-4 rounded-lg'>
            <div className='w-[50%] flex justify-between mx-5'>
                <img src={user?.image} alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div className='flex flex-col mt-3'>
                    <p>{user?.firstName+" "+user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <Iconbtn text="Edit" customClasses={"bg-blue-300 text-white rounded-md px-3 py-2 w-[4rem] h-[2.5rem]"} onclick={()=>{
                navigate("/dashboard/settings");
            }}/>
        </div>

        {/* section-2 */}
        <div className='text-richblack-50 w-8/12 flex  flex-col items-start   bg-richblack-900 bg-opacity-60
                         px-4 py-5 mb-4 rounded-lg'>
           <div className='w-full flex justify-between'>
                <p className='font-semibold text-lg text-richblack-25'>About</p>
                <Iconbtn
                    text="Edit"
                    customClasses={"bg-blue-300 text-white rounded-md px-3 py-2 w-[4rem] h-[2.5rem]"}
                    onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                />
           </div>
           <p className=''>{user?.additionalDetails?.about ?? "Write Something about yourself"}</p>
        </div>

        {/* section-3 */}
        <div className='text-richblack-50 w-8/12 flex  flex-col items-start   bg-richblack-900 bg-opacity-60
                         px-4 py-5 mb-4 rounded-lg'>
            <div className='flex w-full justify-between'>
                <p className='font-semibold text-lg text-richblack-25'>Personal Details</p>
                <Iconbtn
                    text="Edit"
                    customClasses={"bg-blue-300 text-white rounded-md px-3 py-2 w-[4rem] h-[2.5rem]"}
                    onclick={()=>{
                        navigate("/dashboard/settings")
                    }}
                />
            </div>
            <div className="w-full grid grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                        <p className="font-semibold">First Name</p>
                        <p>{user?.firstName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Last Name</p>
                        <p>{user?.lastName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Phone Number</p>
                        <p>{user?.additionalDetails?.contactNumber ?? "Add Contact number"}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Gender</p>
                        <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Date of Birth</p>
                        <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
            </div>
        </div>

    </div>
  )
}

export default MyProfile