import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom';
import logo from "../../assets/newlogoblue-removebg-preview.png";
import {NavbarLinks} from '../../data/navbar-links.js'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from "../core/Auth/ProfileDropDown.jsx";
import { apiConnector } from '../../services/apiconnector.js';
import { categories } from '../../services/apis.js';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

// const subLinks=[
//     {
//         title:"Python",
//         link:"/catalog/python"
//     },
//     {
//         title:"Web Dev",
//         link:"/catalog/webdev"
//     }
// ]

const Navbar = () => {

    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    

    const [subLinks,setSubLinks]=useState([]);
    const [loading, setLoading] = useState(false)

    const fetchSubLinks=async()=>{
        try{
            const result=await apiConnector("GET",categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        }
        catch(error){
            console.log("Could not fetch catalog list ");
        }
    }

    useEffect(()=>{
        fetchSubLinks();
    },[])

    const location=useLocation();
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }



  return (
    <div className='w-full flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-blue-500'>

        <div className='flex w-9/12 max-w-maxContent items-center justify-between '>
            <Link to="/">
                <img src={logo} width={160} height={32} loading='lazy' alt=''/>
            </Link>

            {/* Nav Links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25 items-center'>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                <>
                                    <div
                                    className={`group relative flex cursor-pointer items-center gap-1 ${
                                        matchRoute("/catalog/:catalogName")
                                        ? "text-richblack-900"
                                        : "text-richblack-25"
                                    }`}
                                    >
                                    <p>{link.title}</p>
                                    <IoIosArrowDropdownCircle />
                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                        {loading ? (
                                        <p className="text-center">Loading...</p>
                                        ) : subLinks.length ? (
                                        <>
                                            {subLinks
                                                ?.filter(
                                                    (subLink) => subLink?.courses?.length > 0
                                                )?.map((subLink, i) => (
                                                <Link
                                                to={`/catalog/${subLink.name
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}`}
                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                key={i}
                                                >
                                                <p>{subLink.name}</p>
                                                </Link>
                                            ))}
                                        </>
                                        ) : (
                                        <p className="text-center">No Courses Found</p>
                                        )}
                                    </div>
                                    </div>
                                </>
                                ) : (
                                <Link to={link?.path}>
                                    <p
                                    className={`${
                                        matchRoute(link?.path)
                                        ? "text-blue-800 font-semibold"
                                        : "text-richblack-25"
                                    }`}
                                    >
                                    {link.title}
                                    </p>
                                </Link>
                                )}
                            </li>

                        ))
                    }
                </ul>
            </nav>

            {/* login/signup */}
            <div className='flex gap-x-4 items-center text-richblack-5'>
                
                {user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className="relative text-2xl">
                        <AiOutlineShoppingCart />
                        {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                        )}
                    </Link>
                    )
                }

                {
                    token===null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-gradient-to-r from-slate-900 to-blue-300 px-[12px] py-[8px] rounded-md'>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to="/signup">
                            <button  className='border border-richblack-700 bg-gradient-to-r from-slate-900 to-blue-300 px-[12px] py-[8px] rounded-md'>
                                Sign up
                            </button>
                        </Link>
                    )
                }
                {
                    token!==null && <ProfileDropDown/>
                }
            </div>
        </div>


    </div>
  )
}

export default Navbar;