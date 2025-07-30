const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const {paymentSuccessEmail}=require("../mail/templates/paymentSuccessEmail");
const crypto=require("crypto");
const CourseProgress = require("../models/CourseProgress");

//to initiate razorpay order when we will click on buy now
exports.capturePayment=async(req,res)=>{

    const {courses}=req.body;
    const userId=req.user.id;

    if(courses.length===0){
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })
    }

    let totalAmount=0;

    for(const course_id of courses){
        let course;
        try{
            course=await Course.findById(course_id);
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:'Could not find the course',
                })
            }

            const uid=new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:'Student is already enrolled',
                })
            }
            totalAmount+=course.price;
        }
        catch(err){
            console.log(err);
            return res.status(400).json({
                success:false,
                message:err.message,
            })
        }
    }

    const options={
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse=await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Could not initiate payment order",
        })
    }
}

//payment verification
exports.verifySignature=async(req,res)=>{
    const razorpay_order_id=req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses=req.body?.courses;
    const userId=req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(200).json({
            success:false,
            message:"Payment Failed",
        })
    }

    let body=razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");

    if(expectedSignature===razorpay_signature){
        try {
            // Enroll student - this function now returns success/error instead of sending response
            const enrollmentResult = await enrollStudents(courses, userId);
            
            if (enrollmentResult.success) {
                return res.status(200).json({
                    success: true,
                    message: "Payment Verified and Student Enrolled Successfully",
                });
            } else {
                return res.status(500).json({
                    success: false,
                    message: enrollmentResult.message || "Enrollment failed",
                });
            }
        } catch (error) {
            console.log("Error in enrollment process:", error);
            return res.status(500).json({
                success: false,
                message: "Payment verified but enrollment failed",
            });
        }
    } else {
        return res.status(200).json({
            success:false,
            message:"Payment Failed - Signature not matched",
        })
    }
}

// Modified enrollStudents function - now returns result instead of sending response
const enrollStudents=async(courses,userId)=>{
    
    if(!courses || !userId){
        return {
            success: false,
            message: "Please provide data for courses or userId"
        };
    }

    try {
        for(const courseId of courses){
            // Find the course and enroll the student
            const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseId},
                {
                    $push:{
                        studentsEnrolled:userId
                    }
                },
                {new:true},
            );
            
            if(!enrolledCourse){
                return {
                    success: false,
                    message: "Course not found"
                };
            }

            // Create course progress
            const courseProgress=await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos:[],
            })
            
            // Find the student and add course to enrolled Course
            const enrolledStudent=await User.findByIdAndUpdate(
                userId,
                {
                    $push:{
                        courses:courseId,
                        courseProgress:courseProgress._id,
                    }
                },
                {new:true},
            )

            // Send email to student
            try {
                const emailResponse=await mailSender(
                    enrolledStudent.email,
                    `Successfully enrolled in ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
                )
                console.log("Email Sent Successfully",emailResponse);
            } catch (emailError) {
                console.log("Email sending failed, but enrollment successful:", emailError);
                // Don't fail the entire process if email fails
            }
        }
        
        return {
            success: true,
            message: "All courses enrolled successfully"
        };
        
    } catch(err) {
        console.log("Error in enrollStudents:", err);
        return {
            success: false,
            message: err.message || "Enrollment process failed"
        };
    }
}

exports.sendPaymentSuccessEmail=async(req,res)=>{
    const {orderId,paymentId,amount}=req.body;
    const userId=req.user.id;
    
    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields",
        })
    }

    try{
        // Finding student
        const enrolledStudent=await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,paymentId)
        )
        
        return res.status(200).json({
            success: true,
            message: "Payment success email sent"
        });
        
    } catch(err){
        console.log("Error in sending mail:", err);
        return res.status(500).json({
            success:false,
            message:"Could not send email",
        })
    }
}


// //capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     //get courseId and UserID
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseID
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     //valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }
//     }
//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
    
//     //order create
//    const amount=course.price;
//    const currency="INR";

//    const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId
//         }
//    };

//    try{
//         //initiate the payment using razorpay
//         const paymentResponse=await instance.orders.create(options);
//         console.log("paymentResponse ",paymentResponse);
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//             message:"initiated razorpay order successfully",
//         });

//    }
//    catch(err){
//         console.error(err);
//         return res.status(500).json({
//             success:false,
//             message:"Could not initiate razorpay order",
//         });
//    }
    

// };

// //verify Signature of Razorpay and Server

// exports.verifySignature = async (req, res) => {

//     //our secret key
//     const webhookSecret="12345678";

//     //secret key coming from razorpay in request which is hashed
//     const signature=req.headers("x-razorpay-signature");

//     //Hmac=>hashed based messsage authentication code
//     const shasum=crypto.createHmac("sha256",webhookSecret);

//     //convert shasum to string
//     shasum.update(JSON.stringify(req.body));

//     const digest=shasum.digest("hex");

//     if(signature==digest){
//         console.log("Payment is authorised ");

//         const {courseId,userId}=req.body.payload.payment.entity.notes;

//         try{
//             //enroll the student in the course
//             const enrolledCourse=await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {
//                     $push:{
//                         studentsEnrolled:userId
//                     }
//                 },
//                 {new:true}
//             );


//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Could not find course for enrollment",
//                 });
//             }

//             console.log(enrolledCourse);

//             //find student and add course to courses
//             const enrolledStudent=await User.findOneAndUpdate(
//                 {_id:userId},
//                 {
//                     $push:{
//                         courses:courseId
//                     }
//                 },
//                 {new:true}
//             );
//             console.log(enrolledStudent);

//             //send confirmation mail to user
//             const emailResponse=await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from Rahul",
//                 "Congratulations,you are onboarded into your new course"
//             );

//             console.log(emailResponse);

//             return res.status(200).json({
//                 success:true,
//                 message:'Student is enrolled successfully and Course is added',
//             });
//         }
//         catch(err){
//             console.log(err);

//             return res.status(500).json({
//                 success:false,
//                 message:err.message,
//             });
//         }
//     }

//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid signature from razorpay",
//         });
//     }

// };