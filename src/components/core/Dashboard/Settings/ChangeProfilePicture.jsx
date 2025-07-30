import React, { useRef, useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/Iconbtn"


const ChangeProfilePicture = () => {

    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);

    const dispatch=useDispatch();

    const [loading,setLoading]=useState(false);
    const [imageFile,setImageFile]=useState(null);
    const [previewSource,setPreviewSource]=useState(null);

    const fileInputRef=useRef();

    const handleClick=()=>{
        fileInputRef.current.click();
    }


    const handleFileChange=(e)=>{
        const file=e.target.files[0];
        console.log(file);
        if(file){
            setImageFile(file);
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
      }

    const handleFileUpload=()=>{
        try{
            console.log("uploading...")
            setLoading(true);
            const formData=new FormData();
            formData.append("displayPicture",imageFile);
            console.log("formdata",formData);
            dispatch(updateDisplayPicture(token,formData)).then(()=>{
                setLoading(false);
            })
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
      }, [imageFile])

    
  return (
    <div className='w-[calc(100vw-222px)] mb-8'>
        <div className='text-richblack-50 flex gap-5 bg-richblack-900 bg-opacity-70 w-[80%] rounded-md px-4 py-5'>

                <div>
                    <img src={previewSource || user?.image} alt={`profile-${user?.firstName}`} className=' aspect-square w-[90px] rounded-full object-cover'/>
                </div>
                <div className='flex flex-col mt-2 gap-2'>
                    <div>
                        <p>Change Profile Picture</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <input
                            type='file'
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className='hidden '
                            accept="image/png, image/gif, image/jpeg"
                        />
                        <button
                            onClick={handleClick}
                            disabled={loading}
                            className="border text-white border-richblack-700 bg-gradient-to-r from-slate-900 to-blue-300 px-[12px] py-[8px] rounded-md"
                        >
                            Select
                        </button>
                        <IconBtn
                            text={loading ? "Uploading..." : "Upload"}
                            onclick={handleFileUpload}
                            customClasses={"flex items-center bg-blue-300 text-richblack-900 font-sm rounded-md px-3 py-2 w-[6rem] h-[2.5rem]"}
                        >
                            {!loading && (
                            <FiUpload className="text-md font-semibold text-richblack-900" />
                            )}
                        </IconBtn>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture