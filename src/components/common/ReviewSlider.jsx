import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay,FreeMode, Navigation,Pagination } from 'swiper/modules';
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';
import { FaStar } from 'react-icons/fa';

const ReviewSlider = () => {

    const [reviews,setReviews]=useState([]);
    const truncateWords=15;

    useEffect(()=>{
        const fetchAllReviews=async()=>{
            const {data} =await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);

            if(data?.success){
                setReviews(data?.data);
            }
           
        }
        fetchAllReviews();
    },[])


  return (
    <div >
        <div>
            <Swiper
                slidesPerView={1}
                slidesPerGroup={3}
                loop={true}
                spaceBetween={50}
                freeMode={true}
                autoPlay={{
                    delay:2500,
                }}
                modules={[FreeMode, Pagination]}
                pagination={{ clickable: true }}
                breakpoints={{
                    1024: { slidesPerView: 3 },
                }}
                className="mySwiper max-h-[30rem] w-full"
            >
            {
                reviews.map((review,index)=>(
                    <SwiperSlide
                        key={index}
                        className="bg-gradient-to-r from-slate-900 to-blue-300 bg-opacity-50 border-2 border-blue-200 text-richblack-5 rounded-xl p-6 shadow-lg h-full flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
                        >
                        <div className="flex items-center gap-3">
                            <img
                            src={
                                review?.user?.image
                                ? review?.user?.image
                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                            }
                            alt="profile-pic"
                            className="w-12 h-12 object-cover rounded-full border-2 border-blue-400"
                            />
                            <div>
                            <h3 className="font-semibold text-lg">{review?.user?.firstName} {review?.user?.lastName}</h3>
                            <p className="text-white text-sm">{review?.course?.courseName}</p>
                            </div>
                        </div>

                        <div className="text-white text-sm line-clamp-4">
                            {review?.review}
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <ReactStars
                            count={5}
                            value={review.rating}
                            size={20}
                            edit={false}
                            activeColor="#FFD700"
                            emptyIcon={<FaStar />}
                            fullIcon={<FaStar />}
                            />
                            <p className="text-yellow-200 font-bold">{review?.rating.toFixed(1)}</p>
                        </div>
                    </SwiperSlide>

                ))
            }
            </Swiper>
        </div>
        
    </div>
  )
}

export default ReviewSlider
