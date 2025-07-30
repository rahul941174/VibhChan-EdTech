import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Footer from '../components/common/Footer'
import Course_Card from "../components/core/Catalog/Course_Card"
import Course_Slider from "../components/core/Catalog/CourseSlider"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponentData"
import Error from "./Error"
import ReviewSlider from "../components/common/ReviewSlider"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  // Fetch All Categories
  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])

  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        try {
          const res = await getCatalogPageData(categoryId)
          console.log(res)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-100"> {/* Light background for loading */}
        <div className="spinner h-20 w-20 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div> {/* Blue spinner */}
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div className="bg-gray-50 text-richblack-900 bg-opacity-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white py-10 border-b border-gray-200 shadow-sm">
        <div className="absolute left-0 top-0 -z-10 h-64 w-64 rounded-full bg-blue-100 opacity-30 blur-3xl lg:h-96 lg:w-96"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-yellow-100 opacity-30 blur-3xl lg:h-96 lg:w-96"></div>

        <div className="container mx-auto flex min-h-[200px] max-w-maxContentTab flex-col justify-center gap-4 px-4 lg:max-w-maxContent lg:px-0">
          <p className="text-base text-richblack-600"> 
            {`Home / Catalog / `}
            <span className="font-semibold text-blue-100 drop-shadow-sm"> 
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <h1 className="text-5xl font-extrabold text-richblack-900 sm:text-6xl md:text-7xl leading-tight drop-shadow-md"> 
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="max-w-[870px] text-lg text-richblack-700 leading-relaxed font-light"> 
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 - Courses to get you started */}
      <div className="container mx-auto w-full max-w-maxContentTab px-4 py-10 lg:max-w-maxContent">
        <h2 className="mb-10 text-4xl font-bold text-blue-100 tracking-wide"> 
        </h2>
        <div className="my-8 flex flex-wrap border border-gray-200 bg-white rounded-xl overflow-hidden shadow-md"> 
          <p
            className={`flex-1 cursor-pointer border-r border-gray-200 last:border-r-0 px-8 py-4 text-center transition-all duration-300 ease-in-out ${
              active === 1
                ? "bg-blue-600 text-white font-bold shadow-inner shadow-blue-800/20" 
                : "text-richblack-700 hover:bg-gray-100" 
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`flex-1 cursor-pointer px-8 py-4 text-center transition-all duration-300 ease-in-out ${
              active === 2
                ? "bg-blue-600 text-white font-bold shadow-inner shadow-blue-800/20"
                : "text-richblack-700 hover:bg-gray-100"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="py-12 ">
          <Course_Slider
            Courses={active === 1 ? catalogPageData?.data?.selectedCategory?.courses : catalogPageData?.data?.mostSellingCourses} // Assuming 'New' might show most selling
          />
        </div>
      </div>

      {/* Section 2 - Top courses in different category */}
      <div className="relative isolate overflow-hidden bg-white py-10 border-b border-gray-200 shadow-sm"> 
        <div className="absolute left-0 top-0 -z-10 h-64 w-64 rounded-full bg-blue-100 opacity-30 blur-3xl lg:h-96 lg:w-96"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-yellow-100 opacity-30 blur-3xl lg:h-96 lg:w-96"></div>
        <div className="container mx-auto w-full max-w-maxContentTab px-4 lg:max-w-maxContent">
          <h2 className="mb-2 text-4xl font-bold text-blue-400 tracking-wide">
            Top courses in {catalogPageData?.data?.differentCategory?.name}
          </h2>
          <div className="py-12">
            <Course_Slider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>
      </div>

      {/* Section 3 - Frequently Bought */}
      <div className="container mx-auto w-full max-w-maxContentTab px-4 py-20 lg:max-w-maxContent">
        <h2 className="mb-2 text-4xl font-bold text-blue-100 tracking-wide">Frequently Bought</h2>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card
                  course={course}
                  key={i}
                  Height={"h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]"}
                  className="transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200 border border-gray-200 rounded-lg bg-white" // Lighter shadow, border for light theme
                />
              ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-5">
        <ReviewSlider/>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog