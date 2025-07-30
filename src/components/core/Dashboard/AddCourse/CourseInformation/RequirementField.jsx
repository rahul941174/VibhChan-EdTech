import React, { useEffect, useState } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValue}) => {

    const [requirement,setRequirement]=useState("")
    const [requirementList,setRequirementList]=useState([])

    const handleAddRequirement=()=>{
        if(requirement){
            console.log(requirement);
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
            console.log(requirementList);
        }
    }

    const handleRemoveRequirement=(index)=>{
        const updatedRequirementList=[...requirementList]
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }

    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
    },[])

    useEffect(()=>{
       setValue(name,requirementList)
    },[requirementList])
    
  return (
    <div>
        <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
        <div>
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e)=>{setRequirement(e.target.value)}}
                className='w-full rounded-md bg-gradient-to-r from-blue-400 to-blue-700 font-sm placeholder-white border-blue-100 border-2 py-2 px-5  text-white'
            />
            <button
                onClick={handleAddRequirement}
                type='button'
                className='font-semibold text-blue-50'
            >
                Add
            </button>
        </div>
        {
            requirementList.length>0 && (
                <ul>
                    {
                        requirementList.map((requirement,index)=>(
                            <li key={index} className='flex items-center text-richblack-100'>
                                <span>{requirement}</span>
                                <button 
                                    onClick={()=>handleRemoveRequirement(index)}
                                    type='button'
                                    className='font-semibold text-red-50'
                                >
                                    Clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span>
                    {label} is required
                </span>

            )
        }
                             
    </div>
  )
}

export default RequirementField