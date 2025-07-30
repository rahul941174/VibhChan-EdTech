import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import Course_Card from './Course_Card';

const CourseSlider = ({Courses}) => {
  return (
    <div className=' text-richblack-25'>
      {
        Courses?.length ? 
        (
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={50}
            modules={[FreeMode, Pagination]}
            pagination={{ clickable: true }}
            breakpoints={{
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper max-h-[30rem] w-full"
          >
            {
              Courses?.map((course,index)=>(
                <SwiperSlide key={index}>
                    <Course_Card course={course} Height={"h-[250px]"}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
        )
        :(<p>No Course Found</p>)
      }
    </div>
  )
}

export default CourseSlider