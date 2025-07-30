import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import Upload from '../CourseInformation/Upload'
import Iconbtn from '../../../../common/Iconbtn'

const SubSectionModal = ({modalData,setModalData,add=false,view=false,edit=false}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues
      } = useForm()

      const dispatch = useDispatch()
      const { token } = useSelector((state) => state.auth)
      const { course} = useSelector((state) => state.course)
    
      const [loading, setLoading] = useState(false)

      useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle",modalData.title);
            setValue("lectureDesc",modalData.description);
            setValue("lectureVideo",modalData.videoUrl);
        }
      },[])

      const isFormUpdated=()=>{
        const currentValues=getValues();
        if(currentValues.lectureTitle !==modalData.title ||
            currentValues.lectureDesc !== modalData.description||
            currentValues.lectureVideo !==modalData.videoUrl
        )
            return true;
        else{
            return false;
        }
      }

      const handleEditSubSection=async()=>{
        const currentValues=getValues();
         const formData=new FormData();

         formData.append("sectionId",modalData.sectionId);
         formData.append("subSectionId",modalData._id);

         if(currentValues.lectureTitle !==modalData.title ){
            formData.append("title",currentValues.lectureTitle)
         }
         if(currentValues.lectureDesc !== modalData.description){
            formData.append("description",currentValues.lectureDesc)
         }
         if(currentValues.lectureVideo !==modalData.videoUrl){
            formData.append("video",currentValues.video)
         }

         console.log("formdata",formData)
         setLoading(true);

         const result=await updateSubSection(formData,token);
         if(result){
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
              )
              const updatedCourse = { ...course, courseContent: updatedCourseContent }
              dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false);

      }

      const onSubmit=async(data)=>{
            if(view)
                return;
            if(edit){
                if(!isFormUpdated){
                    toast.error("No Change made to form");
                }
                else{
                    handleEditSubSection();
                }
                return;
            }

            const formData=new FormData();
            formData.append("sectionId",modalData);
            formData.append("title",data.lectureTitle);
            formData.append("description",data.lectureDesc);
            formData.append("video",data.lectureVideo);

            console.log("formdata",formData)
            setLoading(true);

            const result=await createSubSection(formData,token);
            if(result){
                const updatedCourseContent = course.courseContent.map((section) =>
                    section._id === modalData ? result : section
                  )
                  const updatedCourse = { ...course, courseContent: updatedCourseContent }
                  dispatch(setCourse(updatedCourse))
            }
            setModalData(null);
            setLoading(false);
      }

  return (
    <div  className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="w-11/12 max-w-[550px] rounded-lg border border-richblack-400 bg-richblack-800  bg-opacity-80 p-6">
            <div className='flex items-center justify-between mb-3'>
                <p className='text-lg font-semibold'>
                    {view && "Viewing"}{add && "Adding"}{edit && "Editing"} Lecture
                </p>
                <button onClick={()=>(!loading ? setModalData(null):{})}>
                    <RxCross2/>
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                />

                <div>
                    <label htmlFor='lectureTitle'>Section Name</label>
                    <input
                        id='lectureTitle'
                        placeholder='Add Lecture Title'
                        {...register("lectureTitle",{required:true})}
                        className='w-full rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                    />
                    {
                        errors.lectureTitle && (
                        <span>Lecture Title is Required</span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor='lectureDesc'>Section Name</label>
                    <textarea
                        id='lectureDesc'
                        placeholder='Add Lecture Description'
                        {...register("lectureDesc",{required:true})}
                        className='w-full min-h-[130px]  rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
                    />
                    {
                        errors.lectureDesc && (
                        <span>Lecture Description is Required</span>
                        )
                    }
                </div>

                {
                    !view && (
                        <div className='flex justify-end'>
                            <Iconbtn
                                type="submit"
                                text={loading ? "Loading..":edit?"Save Changes":"Save"}
                                customClasses={"bg-blue-300 text-white rounded-md px-3 py-1.5 flex items-center gap-1"}
                            />
                        </div>
                    )
                }
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal