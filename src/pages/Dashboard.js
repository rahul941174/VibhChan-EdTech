import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import background from '../assets/dashboard.jpg'
const Dashboard = () => {

    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);

    if(profileLoading || authLoading){
        return(
            <div className='mt-10 text-richblack-5 flex justify-center items-center'>Loading...</div>
        )
    }

  return (
    <div 
      className='relative flex min-h-[calc(100vh-3.5rem)] text-richblack-25 w-full overflow-x-hidden'
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="sticky top-0 h-screen bg-richblack-800 bg-opacity-50">
        <Sidebar />
      </div>
      <div className='h-screen w-full'>
        <div className='w-[80%] mx-auto py-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard