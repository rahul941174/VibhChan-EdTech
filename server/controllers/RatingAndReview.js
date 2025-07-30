const RatingAndReview=require("../models/RatingAndRaview");
const Course=require("../models/Course");

//create rating and review
exports.createRating=async(req,res)=>{
    try{
        //get user id and fetc data from req body
        const userId=req.user.id;
        const {rating,review,courseId}=req.body;

        //check if user is enrolled or not
        const courseDetails=await Course.findOne(
            {_id:courseId,
            studentsEnrolled :{$elemMatch:{$eq:userId}},
            });

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }

        //check  if user has already reviewed or not
        const alreadyReviwed=await RatingAndReview.findOne(
            {
                user:userId,
                course:courseId
            }
        );
        if(alreadyReviwed){
            return res.status(404).json({
                success: false,
                message: "User have already reviewed once",
            });
        }

        //create review
        const ratingReview=await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId
        });

        //add review to course
        const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview._id
                }
            },
            {new:true});

        console.log("updatedCourseDetails ",updatedCourseDetails);

            return res.status(200).json({
                success: true,
                message: "Rated and reviewed successfully",
                ratingReview
            });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error in rating and review",
        });
    }
}

//get average rating
exports.getAverageRating=async(req,res)=>{
    try{
        //get course id
        const courseId=req.body.courseId;

        //calclate average rating
        const result=await RatingAndReview.aggregate(
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                }, 
            },
            {
                $group:{
                    //all entries grouped in single group
                    _id:null,
                    averageRating:{
                        $avg:"$rating"
                    }
                }
            }
        );

        //return rating
        if(result.length>0){
            return res.status(200).json({
                success: true,
                averageRating:result[0].averageRating
            });
        }
        
        //if no rating review
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no rating given till now",
            averageRating:0
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error in finding average rating and review",
        });
    }
}

//getAllRating and reviews
exports.getAllRating=async(req,res)=>{
    try{
        const allReviews=await RatingAndReview.find({})
                                               .sort({rating:"desc"})
                                               .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image"
                                               })
                                               .populate({
                                                    path:"course",
                                                    select:"courseName"
                                               }).exec();

       
        return res.status(200).json({
            success: true,
            data:allReviews,
            message: "All reviews fetched successfully",
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error in fetcing all reviews successfull",
        });
    }
}

//get rating and review for course