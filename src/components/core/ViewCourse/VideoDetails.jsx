import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { AiFillPlayCircle } from 'react-icons/ai';
import Iconbtn from '../../common/Iconbtn';

const VideoDetails = () => {

    const {courseId,sectionId,subSectionId}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const playerRef=useRef();
    const {token}=useSelector((state)=>(state.auth));
    const {courseSectionData,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse);

    const [videoData,setVideoData]=useState([]);
    const [videoEnded,setVideoEnded]=useState(false);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        const setVideoSpecificDetails=async()=>{
            if(!courseSectionData)
                return;

            if(!courseId && !sectionId && !subSectionId)
            {
                navigate("/dashboard/enrolled-courses");
            }

            else{
                //to filter out or get te section we want
                const filteredData=courseSectionData?.filter(
                    (course)=>(course._id)===sectionId
                )

                //to filter or get subsection(video) we want
                const filteredVideoData=filteredData?.[0].subSection.filter(
                    (data)=>data._id===subSectionId
                )

                setVideoData(filteredVideoData[0])
                setVideoEnded(false);

            }
            

        }
        setVideoSpecificDetails();
    },[courseSectionData, courseEntireData, location.pathname])

    useEffect(()=>{
        if(videoData){
            console.log("Video URL:", videoData?.videoUrl);
        }
    },[videoData])

    const isFirstVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )
        const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data)=>data._id===subSectionId
        )

        if(currentSectionIndex===0 && currentSubSectionIndex===0)
            return true;
        else
            return false;
    }
    const isLastVideo=()=>{
         const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )
        const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data)=>data._id===subSectionId
        )

        const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;

        if(currentSectionIndex===courseSectionData.length-1 && currentSubSectionIndex===noOfSubSections-1)
            return true;
        else
            return false;
    }

    const goToNextVideo=()=>{
         const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )
        const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data)=>data._id===subSectionId
        )

         const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;

         if(currentSubSectionIndex!==noOfSubSections-1){
            //same section next video
            const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
         }
         else{
            //next section first video
            const nextSectionId=courseSectionData[currentSectionIndex+1]._id;
            const firstSubSectionId=courseSectionData[currentSectionIndex+1].subSection[0]._id;

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`);
         }

    }

    const goToPrevVideo=()=>{
        const currentSectionIndex=courseSectionData.findIndex(
            (data)=>data._id===sectionId
        )
        const currentSubSectionIndex=courseSectionData[currentSectionIndex]?.subSection.findIndex(
            (data)=>data._id===subSectionId
        )

         //const noOfSubSections=courseSectionData[currentSectionIndex].subSection.length;

         if(currentSubSectionIndex!==0){
            //same section previous video
            const nextSubSectionId=courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
         }
         else{
            //last section last video
            const lastSectionId=courseSectionData[currentSectionIndex-1]._id;
            const previousSubSectionLength=courseSectionData[currentSectionIndex-1].subSection.length;
            const lastSubSectionId=courseSectionData[currentSectionIndex-1].subSection[previousSubSectionLength-1]._id;

            navigate(`/view-course/${courseId}/section/${lastSectionId}/sub-section/${lastSubSectionId}`);
         }
    }

    const handleLectureCompletion=async()=>{
        setLoading(true);
        
        const res=await markLectureAsComplete({courseId:courseId,subsectionId:subSectionId},token);

        if(res){
            dispatch(updateCompletedLectures(subSectionId));
        }

        setLoading(false);
    }

  return (
    <div>
        {
            !videoData ?(<div>
                No Data Found
            </div>)
            :(
                <div className="w-full max-w-[1000px] mx-auto mt-4 aspect-video rounded-lg overflow-hidden border border-richblack-600 shadow-lg">
                  <Player
                    ref={playerRef}
                    aspectRatio="16:9"
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}
                    >
                    <AiFillPlayCircle position="center" />
                    {/* Render When Video Ends */}
                    {videoEnded && (
                        <div
                        style={{
                            backgroundImage:
                            "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                        }}
                        className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                        >
                        {!completedLectures.includes(subSectionId) && (
                            <Iconbtn
                            disabled={loading}
                            onclick={() => handleLectureCompletion()}
                            text={!loading ? "Mark As Completed" : "Loading..."}
                            customClasses="text-xl max-w-max px-4 mx-auto"
                            />
                        )}
                        <Iconbtn
                            disabled={loading}
                            onclick={() => {
                            if (playerRef?.current) {
                                // set the current time of the video to 0
                                playerRef?.current?.seek(0)
                                setVideoEnded(false)
                            }
                            }}
                            text="Rewatch"
                            customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                        />
                        <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                            {!isFirstVideo() && (
                            <button
                                disabled={loading}
                                onClick={goToPrevVideo}
                                className="blackButton"
                            >
                                Prev
                            </button>
                            )}
                            {!isLastVideo() && (
                            <button
                                disabled={loading}
                                onClick={goToNextVideo}
                                className="blackButton"
                            >
                                Next
                            </button>
                            )}
                        </div>
                        </div>
                    )}
                </Player>
                </div>
            )

        }

     <div className="bg-richblack-400  bg-opacity-50 rounded-xl mt-6 p-6 shadow-lg border border-richblack-300">
        <h1 className="text-3xl font-extrabold text-white mb-2">{videoData?.title}</h1>
        <p className="text-white text-lg leading-relaxed font-medium">{videoData?.description}</p>
    </div>

    </div>
  )
}

export default VideoDetails