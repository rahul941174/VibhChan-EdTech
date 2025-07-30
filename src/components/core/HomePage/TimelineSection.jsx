import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/19362653.jpg"
const timeline=[
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"
    }
]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex gap-15 items-center'>

            <div className='w-[45%] flex flex-col gap-9'>
                {
                    timeline.map((element,index)=>{
                        return(
                            <div className='flex gap-6' key={index}>

                                <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                    <img src={element.Logo} alt="logo"/>
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>
                                        {element.heading}
                                    </h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className='relative shadow-blue-200 w-[50%]'>
                <img src={timelineImage} alt="timelineImage" 
                    className='object-cover h-fit shadow-[12px_15px_21px_-9px_#1753a2]'
                />

                <div className='absolute bg-blue-700 flex text-white uppercase py-7
                                left-[50%] translate-x-[-50%] translate-y-[-40%]'>
                    
                    <div className='flex gap-5 items-center border-r border-blue-300 px-7'>
                        <p className='text-3xl font-bold '>10</p>
                        <p className='text-blue-300 text-sm'>Years of Experience</p>
                    </div>

                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold '>250</p>
                        <p className='text-blue-300 text-sm'>Type of Courses</p>
                    </div>


                </div>

            </div>

        </div>
    </div>

  )
}

export default TimelineSection;