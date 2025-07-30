import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { MdAddCircleOutline, MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import Iconbtn from '../../../../common/Iconbtn'
import NestedView from './NestedView'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course} = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)
  const [editSectionName,setEditSectionName]=useState(null)

  const onSubmit=async(data)=>{
      setLoading(true);
      let result;

      if(editSectionName){
        result=await updateSection(
          {
            sectionName:data.sectionName,
            sectionId:editSectionName,
            courseId:course._id,
          },token
        )
      }
      else{
        result=await createSection(
          {
            sectionName:data.sectionName,
            courseId:course._id,
          },token
        )
      }

      //update values
      if(result){
        dispatch(setCourse(result))
        setEditSectionName(null)
        setValue("sectionName","")
      }

      setLoading(false)
  }

  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","")
  }

  const goToNext=()=>{
      if(course.courseContent.length === 0){
        toast.error("Please add atleast one section")
        return;
      }
      if(course.courseContent.some((section)=>section.subSection.length===0)){
        toast.error("Please add atleast one subSection in each section")
        return;
      }
      dispatch(setStep(3))
  }

  const goBack=()=>{
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const handleChangeEditSectionName=(sectionId,sectionName)=>{
      if(editSectionName===sectionId){
        cancelEdit();
        return;
      }

      setEditSectionName(sectionId)
      setValue("sectionName",sectionName)
  }


  return (
    <div className='text-richblack-25 bg-richblack-900  bg-opacity-70 px-4 py-5 rounded-md'>
        <p className='mb-5 font-bold text-lg'>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor='sectionName'>Section Name</label>
              <input
                id='sectionName'
                placeholder='Add Section Name'
                {...register("sectionName",{required:true})}
                className='w-full rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
              />
              {
                errors.sectionName && (
                  <span>Section Name is Required</span>
                )
              }
            </div>

            <div className='flex gap-4 mt-3'>
              <Iconbtn
                type="submit"
                text={editSectionName ? "Edit Section Name":"Create Section"}

                customClasses={"bg-blue-300 text-white rounded-md px-2 py-1 flex items-center gap-1"}
              >
                <MdAddCircleOutline/>
              </Iconbtn>
              {
                editSectionName && (
                  <button
                    type='button'
                    onClick={cancelEdit}
                    className='text-md font-semibold text-blue-100 underline'
                  >
                    Cancel Edit
                  </button>
                )
              }
            </div>

        </form>
        {
            course.courseContent.length > 0 && (
              <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )
        }
        <div className='flex justify-end gap-x-3 mt-10'>
            <button onClick={goBack} className='bg-richblack-700 cursor-pointer text-white rounded-md px-3 py-1.5 '>
              Back
            </button>
            <Iconbtn
              text="Next"
              onclick={goToNext}
              customClasses={"bg-blue-300 text-white cursor-pointer rounded-md px-3 py-1.5 flex items-center gap-1"}
            >
                <AiOutlineArrowRight/>
            </Iconbtn>
        </div>

    </div>
  )
}

export default CourseBuilderForm