import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiSolidDownArrow } from 'react-icons/bi'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RxDropdownMenu } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import SubsectionModal from "./SubSectionModal"
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'

const NestedView = ({handleChangeEditSectionName}) => {

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { course} = useSelector((state) => state.course)
  
    const [loading, setLoading] = useState(false)
    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)

    const [confirmationModal,setConfirmationModal]=useState(null);

    const handleDeleteSection=async(sectionId)=>{
        console.log(sectionId)
        const result=await deleteSection({
            sectionId,
            courseId:course._id,
        },token)
        console.log(result)
        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }
    const handleDeleteSubSection=async(subSectionId,sectionId)=>{
        console.log(subSectionId,sectionId);
        const result=await deleteSubSection({
            subSectionId,
            sectionId,
        },token)
        console.log(result)
        if(result){
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
              )
              const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }

  return (
    <div>
        <div className='text-richblack-25 mt-10 rounded-lg bg-richblack-900  bg-opacity-70 p-6 px-8'>
            {
                course?.courseContent?.map((section)=>(
                    <details key={section._id} open>
                        <summary className=' flex items-center justify-between gap-x-3 border-b-2'>
                            <div className='flex items-center gap-x-3 text-md'>
                                <RxDropdownMenu className=''/>
                                <p>{section.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                    <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                        <MdEdit />
                                    </button>

                                <button
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Delete this Section",
                                            text2:"All the lectures in this section will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:()=>handleDeleteSection(section._id),
                                            btn2Handler:()=>setConfirmationModal(null)
                                        })
                                    }}
                                >
                                    <RiDeleteBin6Line />
                                </button>
                                <span>|</span>
                                <BiSolidDownArrow className={'text-md'}/>
                            </div>
                        </summary>
                        <div>
                            {
                                section.subSection.map((data)=>(
                                    <div key={data?._id}
                                         onClick={()=>setViewSubSection(data)}
                                        className='flex items-center justify-between gap-x-3 border-b-2'
                                    >
                                            <div className='flex items-center gap-x-3 text-md cursor-pointer' >
                                                <RxDropdownMenu className=''/>
                                                <p>{data.title}</p>
                                            </div>
                                            <div className='flex items-center gap-x-3'
                                                onClick={(e)=>e.stopPropagation()}
                                            >

                                                <button onClick={()=>{setEditSubSection({...data,sectionId:section._id})}}>
                                                    <MdEdit />
                                                </button>
                                                <button
                                                    onClick={()=>{
                                                        setConfirmationModal({
                                                            text1:"Delete this SubSection",
                                                            text2:"All the lectures in this subsection will be deleted",
                                                            btn1Text:"Delete",
                                                            btn2Text:"Cancel",
                                                            btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                                            btn2Handler:()=>setConfirmationModal(null)
                                                        })
                                                    }}
                                                >
                                                     <RiDeleteBin6Line />
                                                </button>

                                            </div>
                                    </div>

                                ))
                            }
                            <button onClick={()=>setAddSubSection(section._id)}
                                    className='mt-3 mb-4 flex items-center gap-x-2 font-semibold text-blue-100'
                            >
                                <AiOutlinePlus className={'font-bold'}/>
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>
        {
            addSubSection ? (<SubsectionModal 
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            />)
            :viewSubSection ? (<SubsectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            />)
            : editSubSection ? (<SubsectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
            />):(<div></div>)

            
        }
        {
            confirmationModal  ? 
                (
                    <ConfirmationModal modalData={confirmationModal}/>
                ):(<div></div>)
        }
    </div>
  )
}

export default NestedView