import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import background from '../assets/dashboard.jpg'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);

            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    })

    return (
        <div className="min-h-screen ">
            <div  className='relative flex min-h-[calc(100vh-3.5rem)] text-richblack-25 w-full overflow-x-hidden'
                  style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}>

                 {/* Main Content */}
                <div className="flex-1 bg-gray-50/5 backdrop-blur-sm bg-richblack-800  bg-opacity-50">
                    <div className="px-6 pb-6">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-150 h-full sticky top-0  border-r border-gray-700/50 bg-richblack-700  bg-opacity-50">
                    <VideoDetailsSidebar setReviewModal={setReviewModal} />
                </div>

               
            </div>
            
            {reviewModal && (
                <div className="fixed inset-0 z-50 bg-richblack-800 bg-opacity-10 backdrop-blur-sm">
                    <CourseReviewModal setReviewModal={setReviewModal} />
                </div>
            )}
        </div>
    )
}

export default ViewCourse