import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/174153-850740070_small.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div>
       <div className="min-h-screen bg-gradient-to-r from-slate-900 to-blue-300">
      
           

            {/* Hero Section */}
            <div className='relative z-10 mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent py-20'>
                

                {/* Main Hero Content */}
                <div className='text-center mb-1'>
                    <h1 className='text-6xl md:text-8xl font-black mb-4 leading-none tracking-tight'>
                        <span className="bg-gradient-to-r from-cyan-300 via-blue-100 to-purple-500 bg-clip-text text-transparent animate-gradient">
                        CODE
                        </span>
                        <br />
                        <span className="text-white text-5xl md:text-7xl">THE FUTURE</span>
                        <br />
                    </h1>
                    
                    {/* <p className='text-xl md:text-2xl font-light text-slate-300 max-w-4xl mx-auto leading-relaxed mt-8'>
                        Master cutting-edge technologies with our 
                        <span className="text-cyan-400 font-semibold"> AI-powered learning platform</span>. 
                        Build real projects, earn certifications, and land your dream job in tech.
                    </p> */}
                </div>

                <Link to="/signup">
                    <button className=" mb-4 px-6 py-3 rounded-full bg-blue-100 text-richblack-900 font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-300 hover:shadow-lg">
                        Join Now
                    </button>
                </Link>

                {/* Your Amazing Video Banner - Enhanced */}
                <div className='relative mb-20 group'>
                    <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className='relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] mx-3 rounded-3xl overflow-hidden border-2 border-cyan-500/20 transform group-hover:scale-105 transition-all duration-500'>
                        <video muted loop autoPlay className="rounded-3xl w-full max-w-5xl">
                        <source src={Banner} type='video/mp4'/>
                        </video>
                       
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 w-full max-w-4xl">
                    {[
                        { number: "10+", label: "Active Learners" },
                        { number: "2+", label: "Expert Instructors" },
                        { number: "20+", label: "Courses Available" },
                        { number: "95%", label: "Job Success Rate" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                            <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                            <div className="text-sm text-slate-300">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <ExploreMore/>
        </div>

        

        {/*section-2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>

            <div className='homepage_bg h-[333px]'>

                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto'>

                        <div className='h-[150px]'></div>
                        <div className='flex flex-row gap-7 text-white'>

                            <CTAButton active={true} linkto={"/catalog/python"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/about"}>
                                <div className='flex items-center gap-3'>
                                    Learn More
                                </div>
                            </CTAButton>

                        </div>
                    </div>
            </div>

            <div className='w-full px-5'>
                <ReviewSlider/>
            </div>


            <div className='mx-auto w-9/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                    <div className='flex flex-row gap-5 mb-10 mt-[90px]'>

                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the skills you need for a
                            <HighlightText text={"jobs that is in demand"}/>
                        </div>

                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, 
                                to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        </div>

                    </div>

                <TimelineSection/>
                <LearningLanguageSection/>

            </div>

            
        </div>

        {/*section-3 */}
        <div className='w-11/12 mx-auto mb-12 max-w-maxContent flex flex-col 
                        items-center justify-between gap-8 bg-gradient-to-r from-slate-900 to-blue-300 text-white'>
            <InstructorSection/>
            
        </div>



        {/*footer */}
        <Footer/>
    </div>
  )
}

export default Home