import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Iconbtn from '../../common/Iconbtn';
import { useSelector } from 'react-redux';

const VideoDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const { sectionId, subSectionId } = useParams();
    const location = useLocation();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        const setActiveFlags = () => {
            if (!courseSectionData.length)
                return;

            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <div className="h-full flex flex-col">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
                {/* Navigation and Actions */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate("/dashboard/enrolled-courses")}
                        className="mr-2 flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group bg-blue-300 text-white cursor-pointer rounded-md px-3 py-1.5  justify-center transform hover:scale-105"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                        <span className="font-medium">
                            Back to Courses
                        </span>
                    </button>
                    
                    <Iconbtn
                        text="⭐ Add Review"
                        onclick={() => setReviewModal(true)}
                        customClasses="bg-yellow-500 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                    />
                </div>

                {/* Course Info */}
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent line-clamp-2">
                        {courseEntireData?.courseName}
                    </h2>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="bg-blue-200  text-white px-3 py-1 rounded-full font-medium">
                            {completedLectures?.length}/{totalNoOfLectures} Completed
                        </div>
                        <div className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
                            {Math.round((completedLectures?.length / totalNoOfLectures) * 100)}% Progress
                        </div>
                    </div>
                </div>
            </div>

            {/* Sections and Subsections */}
            <div className="flex-1 overflow-y-auto custom-scrollbar  ">
                <div className="p-4 space-y-2">
                    {courseSectionData.map((section, index) => (
                        <div key={index} className="bg-gray-800/40 bg-richblack-900 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700/30">
                            {/* Section Header */}
                            <div
                                onClick={() => setActiveStatus(activeStatus === section?._id ? "" : section?._id)}
                                className="p-4 cursor-pointer hover:bg-gray-700/30 transition-all duration-300 rounded-xl flex items-center justify-between group"
                            >
                                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                                    📁 {section?.sectionName}
                                </h3>
                                <div className={`transform transition-transform duration-300 text-gray-400 ${
                                    activeStatus === section?._id ? 'rotate-180' : ''
                                }`}>
                                    ▼
                                </div>
                            </div>

                            {/* Subsections */}
                            {activeStatus === section?._id && (
                                <div className="px-2 pb-2 space-y-1">
                                    {section?.subSection.map((topic, topicIndex) => (
                                        <div
                                            key={topicIndex}
                                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 border ${
                                                videoBarActive === topic._id
                                                    ? "bg-gradient-to-r from-blue-300 to-slate-900 border-blue border-2 text-white shadow-lg"
                                                    : "bg-gray-800/30 border-gray-700/30 text-gray-300 hover:bg-gray-700/30 hover:text-white"
                                            }`}
                                            onClick={() => {
                                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                setVideoBarActive(topic?._id);
                                            }}
                                        >
                                            <div className="relative">
                                                <input
                                                    type='checkbox'
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={() => {}}
                                                    className="w-4 h-4 rounded border-2 border-gray-600 checked:bg-green-500 checked:border-green-500 focus:ring-2 focus:ring-green-500/50"
                                                />
                                                {completedLectures.includes(topic?._id) && (
                                                    <div className="absolute -top-1 -right-1 text-green-400 text-xs">
                                                        ✓
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    
                                                    <span className="font-medium truncate text-sm">
                                                        {topic?.title}
                                                    </span>
                                                </div>
                                            </div>
                                            {videoBarActive === topic._id && (
                                                <div className="text-blue-400 animate-pulse">
                                                    ▶️
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VideoDetailsSidebar