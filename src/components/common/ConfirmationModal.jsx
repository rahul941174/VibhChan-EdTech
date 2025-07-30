import { useEffect } from "react"
import Iconbtn from "./Iconbtn";

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-gradient-to-r from-slate-900 to-blue-300 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-50">
          {modalData?.text2}
        </p>
        <div className="flex items-center justify-between gap-x-4">
          <Iconbtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses={"border text-white border-richblack-700 bg-gradient-to-r from-blue-300 to-slate-900 px-[12px] py-[8px] rounded-md"}
          />
          <button
            className="cursor-pointer rounded-md bg-blue-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}