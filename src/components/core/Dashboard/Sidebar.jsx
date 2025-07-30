import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import Sidebarlink from './Sidebarlink';
import {VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';

const Sidebar = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user,loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);

    const [confirmationModale,setConfirmationModale]=useState(null);

    if(profileLoading || authLoading){
        return(
            <div className='mt-10 text-richblack-5 flex justify-center items-center'>Loading...</div>
        )
    }
  return (
    <div>
        <div className='flex min-w-[222px] flex-col border-r-[1px]  border-r-richblack-700 
            h-full  py-10 text-richblack-5'>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link,id)=>{
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <Sidebarlink key={link.id} link={link} iconName={link.icon}/>
                        )
                    })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'></div>

            <div className=' flex flex-col gap-2'>
                <Sidebarlink 
                    link={{name:"Settings", path:'dashboard/settings'}}
                    iconName={"VscSettingsGear"}
                />

                <button
                    onClick={()=>{
                        setConfirmationModale({
                            text1:"Are you Sure ?",
                            text2:"You will be logged out of your account",
                            btn1Text:"Logout",
                            btn2Text:"Cancel",
                            btn1Handler:()=>{dispatch(logout(navigate))},
                            btn2Handler:()=>{setConfirmationModale(null)}
                        })
                    }}
                    className='text-sm font-medium text-richblack-200'>
                    <div className='flex items-center gap-x-2 ml-8 '>
                        <VscSignOut className='text-lg'/>
                        <span>Log out</span>
                    </div>
                </button>

            </div>

        </div>
        {
            confirmationModale && <ConfirmationModal modalData={confirmationModale}/>
        }
    </div>
  )
}

export default Sidebar