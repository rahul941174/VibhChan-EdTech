import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
export const tabsName = [
    "Free Courses",
    "Beginner Friendly", 
    "Most Popular",
    "Skill Specializations",
    "Career Tracks"
]

const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>

        <div className='font-semibold text-4xl text-center'>
            <HighlightText text={"Unlock the "}/>
            Power of Code
        </div>

        <p className='text-center text-richblack-300 text-sm text-[16px] font-semibold mt-3'>
            Learn to build anything you can imagine
        </p>

        <div className='w-fit mx-auto flex rounded-full bg-richblack-800  mt-5 border-richblack-100 px-1 py-1'>
            {
                tabsName.map((element,index)=>{
                    return(
                        <div className={`text-[16px] flex flex-row items-center gap-2 
                                    rounded-full duration-200 cursor-pointer hover:bg-richblack-900
                                    hover:text-richblack-5 px-7 py-2
                                        ${currentTab===element ? 
                                                "bg-richbalck-900 text-richblack-5 font-medium"
                                                :"text-richblack-200"}`}
                            key={index}
                            onClick={()=>setMyCards(element)} >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        

        {/*Course cards */}
        <div className='flex w-full'>
            {
                courses.map((element,index)=>{
                    return(
                        <CourseCard
                            key={index}
                            cardData={element}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore;