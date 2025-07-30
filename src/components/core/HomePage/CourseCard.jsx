// CourseCard.jsx
import React from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { DiCode } from "react-icons/di";
import { FaCrown, FaStar, FaRocket } from "react-icons/fa";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = cardData.heading === currentCard;
  
  return (
    <div className={`group w-[26%] flex flex-col justify-between gap-4 mx-auto px-6 py-6 
                    transform transition-all duration-500 cursor-pointer hover:scale-105
                    ${isActive 
                      ? "bg-gradient-to-br from-white to-slate-50 text-gray-800 shadow-[0_25px_50px_-12px_rgba(59,130,246,0.5)] border-2 border-blue-400/30 translate-y-[10px] z-10" 
                      : "bg-gradient-to-br from-slate-800 to-slate-900 text-white hover:from-slate-700 hover:to-slate-800 translate-y-[50px] hover:translate-y-[20px]"
                    } 
                    backdrop-blur-sm rounded-2xl border ${isActive ? 'border-blue-200' : 'border-slate-700 hover:border-slate-600'}`}
            onClick={() => { setCurrentCard(cardData.heading) }}> 
        
        {/* Header with Icon */}
        <div className='flex flex-col gap-4'>
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive 
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
              : 'bg-gradient-to-br from-slate-600 to-slate-700 group-hover:from-blue-500 group-hover:to-cyan-500'
            } transition-all duration-300`}>
              {cardData.heading.includes('Free') && <FaCrown className="text-white text-lg" />}
              {cardData.heading.includes('Popular') && <FaStar className="text-white text-lg" />}
              {!cardData.heading.includes('Free') && !cardData.heading.includes('Popular') && <FaRocket className="text-white text-lg" />}
            </div>
            
            {isActive && (
              <div className="px-3 py-1 bg-green-500  text-white text-xs font-bold rounded-full">
                SELECTED
              </div>
            )}
          </div>

          <div>
            <h2 className={`text-xl font-bold leading-tight mb-3 ${isActive ? 'text-gray-800' : 'text-white'}`}>
              {cardData.heading}
            </h2>

            <p className={`text-sm leading-relaxed ${isActive 
              ? "text-gray-600 font-medium" 
              : 'text-slate-300 font-normal group-hover:text-slate-200'
            } transition-colors duration-300`}>
              {cardData.description}
            </p>
          </div>
        </div>

        {/* Footer Stats */}
        <div className={`flex justify-between items-center pt-4 mt-4 border-t ${isActive 
          ? 'border-gray-200' 
          : 'border-slate-600 group-hover:border-slate-500'
        } transition-colors duration-300`}>
          <div className='flex items-center gap-2'>
            <MdPeopleAlt className={`text-lg ${isActive 
              ? "text-blue-500" 
              : "text-slate-400 group-hover:text-blue-400"
            } transition-colors duration-300`}/>
            <span className={`text-sm font-medium ${isActive ? 'text-gray-700' : 'text-slate-200'}`}>
              {cardData.level}
            </span>
          </div>
          
          <div className='flex items-center gap-2'>
            <DiCode className={`text-lg ${isActive 
              ? "text-blue-500" 
              : "text-slate-400 group-hover:text-blue-400"
            } transition-colors duration-300`}/>
            <span className={`text-sm font-medium ${isActive ? 'text-gray-700' : 'text-slate-200'}`}>
              {cardData.lessionNumber} Modules
            </span>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        {!isActive && (
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
        )}
    </div>
  )
}


export default CourseCard;