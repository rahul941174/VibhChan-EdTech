import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Td, Th, Tr, Tbody } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constants";
import { MdOutlineDelete, MdVerified } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { fetchInstructorCourses, deleteCourse } from "../../../../services/operations/courseDetailsAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";

const CourseTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
  };

  return (
    <div className="mt-5">
      <Table className="w-full">
        <Thead>
          <Tr className="border-b border-b-richblack-800  bg-opacity-50">
            <Th className="text-left text-sm font-medium uppercase text-richblack-100" style={{ width: "70%" }}>
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100" style={{ width: "10%" }}>
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100" style={{ width: "10%" }}>
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100" style={{ width: "10%" }}>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td>No Courses Found</Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr key={course._id} className="border-b border-richblack-800  bg-opacity-50">
                <Td className="text-richblack-100" style={{ width: "70%", display: "flex", gap: "1rem" }}>
                  <img
                    src={course?.thumbnail}
                    className="h-[200px] w-[60%] rounded-lg object-cover py-4 px-2"
                  />
                  <div className="flex flex-col gap-y-2 w-[40%] py-4 px-2">
                    <p className="font-semibold text-lg text-richblack-5">{course.courseName}</p>
                    <p className="text-sm">
                      {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                        ? course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px]">Created : {formatDate(course.createdAt)} </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <div className="flex items-center gap-x-1 text-red-100 bg-richblack-500 w-fit rounded-md px-1">
                        <FaClock />
                        <p>Drafted</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-x-1 font-md text-green-200 bg-richblack-500 w-fit rounded-md px-1">
                        <MdVerified />
                        <p>Published</p>
                      </div>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100" style={{ width: "10%" }}>
                  2h 30min
                </Td>
                <Td className="text-sm font-medium text-richblack-100" style={{ width: "10%" }}>
                  ₹{course?.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100" style={{ width: "10%" }}>
                  <button
                    className="mr-2 font-bold text-xl transition-all duration-200 hover:scale-110"
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    className="font-bold text-xl transition-all duration-200 hover:scale-110"
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to Delete this Course ?",
                        text2: "All the data related to this course will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                      });
                    }}
                  >
                    <MdOutlineDelete size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
