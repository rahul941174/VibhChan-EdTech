import React from 'react'
import HighlightText from './HighlightText';
import { FaArrowRight, FaUsers, FaDollarSign, FaClock, FaStar } from 'react-icons/fa';
import CTAButton from '../HomePage/Button';
import Instructor from "../../../assets/instructor.jpg"

const InstructorSection = () => {
  return (
    <div className="relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className='relative z-10 flex flex-col lg:flex-row gap-16 items-center mt-16 px-6 lg:px-0'>

        {/* Image Section - Enhanced */}
        <div className='w-full lg:w-[50%] relative group'>
          
          {/* Floating Stats Cards */}
          {/* <div className="absolute -top-4 -left-4 z-10 bg-gradient-to-br from-green-500/90 to-emerald-500/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-green-400/30 transform rotate-[-5deg] group-hover:rotate-[-8deg] transition-transform duration-300">
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-white text-sm" />
              <span className="text-white font-bold text-sm">$1+/month</span>
            </div>
            <p className="text-green-100 text-xs">Top Earnings</p>
          </div>

          <div className="absolute -top-2 -right-6 z-10 bg-gradient-to-br from-blue-500/90 to-cyan-500/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-blue-400/30 transform rotate-[8deg] group-hover:rotate-[12deg] transition-transform duration-300">
            <div className="flex items-center gap-2">
              <FaUsers className="text-white text-sm" />
              <span className="text-white font-bold text-sm">20+</span>
            </div>
            <p className="text-blue-100 text-xs">Students Taught</p>
          </div>

          <div className="absolute -bottom-6 left-8 z-10 bg-gradient-to-br from-purple-500/90 to-pink-500/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-purple-400/30 transform rotate-[-3deg] group-hover:rotate-[-6deg] transition-transform duration-300">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-300 text-sm" />
              <span className="text-white font-bold text-sm">4.9/5</span>
            </div>
            <p className="text-purple-100 text-xs">Avg Rating</p>
          </div> */}

          {/* Main Image with Enhanced Effects */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/30 via-red-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative overflow-hidden rounded-3xl border-2 border-gradient-to-r from-orange-400/50 to-pink-400/50">
              <img 
                src={Instructor} 
                alt="Become an Instructor" 
                className='w-full h-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-500'
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Content Section - Enhanced */}
        <div className='w-full lg:w-[50%] flex flex-col gap-8'>
          
          {/* Main Heading */}
          <div className='text-5xl md:text-6xl font-bold leading-tight'>
            <span className=" text-black">
              Become an Elite
            </span>
            <br />
            <HighlightText text={"Instructor"}/>
            <div className="text-2xl md:text-3xl text-gray-300 mt-4 font-normal">
              & Transform Lives Globally 🌍
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="space-y-6">
            <p className='text-lg leading-relaxed text-gray-300'>
              Join our exclusive network of <span className="text-orange-400 font-semibold">world-class educators</span> who are 
              earning substantial income while making a global impact. Our top instructors teach millions of students 
              and build thriving educational businesses.
            </p>
            
            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <FaDollarSign className="text-white text-xs" />
                </div>
                <div>
                  <div className="text-white font-semibold">Passive Income</div>
                  <div className="text-gray-400 text-sm">Earn while you sleep</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <FaClock className="text-white text-xs" />
                </div>
                <div>
                  <div className="text-white font-semibold">Flexible Schedule</div>
                  <div className="text-gray-400 text-sm">Work on your terms</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <FaUsers className="text-white text-xs" />
                </div>
                <div>
                  <div className="text-white font-semibold">Global Reach</div>
                  <div className="text-gray-400 text-sm">Millions of students</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <FaStar className="text-white text-xs" />
                </div>
                <div>
                  <div className="text-white font-semibold">Expert Support</div>
                  <div className="text-gray-400 text-sm">24/7 creator tools</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 py-6 border-t border-b border-gray-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$5+</div>
              <div className="text-sm text-gray-400">Avg Annual Income</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">20+</div>
              <div className="text-sm text-gray-400">Students Reached</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2+</div>
              <div className="text-sm text-gray-400">Active Instructors</div>
            </div>
          </div>

          {/* Enhanced CTA */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className="group relative flex-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='relative flex gap-3 items-center justify-center font-bold text-lg w-full'>
                   Start Teaching Today
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </CTAButton>
            </div>
            
            <div className="group">
              <CTAButton active={false} linkto={"/about"}>
                <span className="font-semibold">Learn More</span>
              </CTAButton>
            </div>
          </div>

          
         
        </div>

      </div>
    </div>
  )
}

export default InstructorSection