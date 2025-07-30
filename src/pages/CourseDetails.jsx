import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import background from '../assets/dashboard.jpg'
import Error from "./Error"

function CourseDetails() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    // Getting courseId from url parameter
    const { courseId } = useParams()
  
    // Declare a state to save the course details
    const [response, setResponse] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)
    
    useEffect(() => {
      // Calling fetchCourseDetails function to fetch the details
      ;(async () => {
        try {
          const res = await fetchCourseDetails(courseId)
          console.log("course details res: ", res)
          setResponse(res)
        } catch (error) {
          console.log("Could not fetch Course Details")
        }
      })()
    }, [courseId])
  
    // Calculating Avg Review count
    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
      // Updated to handle the new response structure
      const courseDetails = response?.data?.courseDetails
      if (courseDetails && courseDetails.ratingAndReviews) {
        const count = GetAvgRating(courseDetails.ratingAndReviews)
        console.log("Count", count)
        setAvgReviewCount(count)
        console.log("avgReviewCount: ", avgReviewCount)
      }
    }, [response])
  
    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
      setIsActive(
        !isActive.includes(id)
          ? isActive.concat([id])
          : isActive.filter((e) => e != id)
      )
    }
  
    // Total number of lectures
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    useEffect(() => {
      let lectures = 0
      const courseDetails = response?.data?.courseDetails
      courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0
      })
      setTotalNoOfLectures(lectures)
    }, [response])
  
    if (loading || !response) {
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }
    
    if (!response.success) {
      return <Error />
    }

    // Extract courseDetails from the response
    const courseDetails = response.data?.courseDetails
    const totalDuration = response.data?.totalDuration

    if (!courseDetails) {
      return <Error />
    }

    const {
      _id: course_id,
      courseName,
      courseDescription,
      thumbnail,
      price,
      whatYouWillLearn,
      courseContent,
      ratingAndReviews,
      instructor,
      studentsEnrolled,
      createdAt,
    } = courseDetails

    console.log("Course ID: ", course_id);
    console.log("Course Name: ", courseName);
    console.log("Course Description: ", courseDescription);
    console.log("Thumbnail: ", thumbnail);
    console.log("Price: ", price);
    console.log("What You Will Learn: ", whatYouWillLearn);
    console.log("Course Content: ", courseContent);
    console.log("Rating and Reviews: ", ratingAndReviews);
    console.log("Instructor: ", instructor);
    console.log("Students Enrolled: ", studentsEnrolled);
    console.log("Created At: ", createdAt);

  
    const handleBuyCourse = () => {
      console.log("Hello buy course")
      if (token) {
        BuyCourse(token, [courseId], user, navigate, dispatch)
        return
      }
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
    }
  
    if (paymentLoading) {
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }
  
    return (
      <>
        <div className='relative flex flex-col min-h-[calc(100vh-3.5rem)] text-richblack-25 w-full overflow-x-hidden'
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
          <div>
                {/* Hero Section */}
                <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                  <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                    <div className="relative block max-h-[30rem] lg:hidden">
                      <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                      <img
                        src={thumbnail}
                        alt="course thumbnail"
                        className="aspect-auto w-full"
                      />
                    </div>
                    <div
                      className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                    >
                      <div>
                        <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                          {courseName}
                        </p>
                      </div>
                      <p className={`text-richblack-200`}>{courseDescription}</p>
                      <div className="text-md flex flex-wrap items-center gap-2">
                        <span className="text-yellow-25">{avgReviewCount}</span>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                        <span>{`(${ratingAndReviews.length} reviews)`}</span>
                        <span>{`${studentsEnrolled.length} students enrolled`}</span>
                      </div>
                      <div>
                        <p className="">
                          Created By {`${instructor.firstName} ${instructor.lastName}`}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-5 text-lg">
                        <p className="flex items-center gap-2">
                          {" "}
                          <BiInfoCircle /> Created at {formatDate(createdAt)}
                        </p>
                        <p className="flex items-center gap-2">
                          {" "}
                          <HiOutlineGlobeAlt /> English
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500  py-4 lg:hidden">
                      <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                        Rs. {price}
                      </p>
                      <button className="yellowButton" onClick={handleBuyCourse}>
                        Buy Now
                      </button>
                      <button className="blackButton">Add to Cart</button>
                    </div>
                  </div>
                  {/* Courses Card */}
                  <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                    <CourseDetailsCard
                      course={courseDetails}
                      setConfirmationModal={setConfirmationModal}
                      handleBuyCourse={handleBuyCourse}
                    />
                  </div>
                </div>
              </div>
              <div className="ml-6 mb-10 box-content px-4 text-start text-richblack-5 lg:w-[800px] bg-richblack-900 bg-opacity-50">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                  {/* What will you learn section */}
                  <div className="my-8 border border-richblack-600 p-8">
                    <p className="text-3xl font-semibold">What you'll learn</p>
                    <div className="mt-5">
                      <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
                    </div>
                  </div>
        
                  {/* Course Content Section */}
                  <div className="max-w-[830px]  ">
                    <div className="flex flex-col gap-3">
                      <p className="text-[28px] font-semibold">Course Content</p>
                      <div className="flex flex-wrap justify-between gap-2">
                        <div className="flex gap-2">
                          <span>
                            {courseContent.length} {`section(s)`}
                          </span>
                          <span>
                            {totalNoOfLectures} {`lecture(s)`}
                          </span>
                          <span>{totalDuration} total length</span>
                        </div>
                        <div>
                          <button
                            className="text-white"
                            onClick={() => setIsActive([])}
                          >
                            Collapse all sections
                          </button>
                        </div>
                      </div>
                    </div>
        
                    {/* Course Details Accordion */}
                    <div className="py-4">
                      {courseContent?.map((course, index) => (
                        <CourseAccordionBar
                          course={course}
                          key={index}
                          isActive={isActive}
                          handleActive={handleActive}
                        />
                      ))}
                    </div>
        
                    {/* Author Details */}
                  <div className="mb-12 py-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-600 shadow-xl">
                      <h2 className="text-3xl font-semibold text-white mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        Author
                      </h2>
                      <div className="flex items-center gap-6 py-6">
                        <div className="relative">
                          <img
                            src={
                              instructor.image
                                ? instructor.image
                                : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                            }
                            alt="Author"
                            className="h-20 w-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">{`${instructor.firstName} ${instructor.lastName}`}</p>
                          <p className="text-blue-400 font-medium">Course Instructor</p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {instructor?.additionalDetails?.about}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
        </div>
        <Footer />
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </>
    )
  }
  
  export default CourseDetails