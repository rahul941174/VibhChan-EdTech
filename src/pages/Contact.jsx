import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactForm from "../components/core/ContactPage/ContactForm"

const Contact = () => {
  return (
    <div>
       <div className="relative isolate overflow-hidden bg-white py-10 border-b border-gray-200 shadow-sm">
        <div className="absolute left-0 top-0 -z-10 h-64 w-64 rounded-full bg-blue-100 opacity-30 blur-3xl lg:h-96 lg:w-96"></div>
        <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-yellow-100 opacity-30 blur-3xl lg:h-96 lg:w-96"></div>

        <div className="container mx-auto flex min-h-[200px] max-w-maxContentTab flex-col justify-center gap-4 px-4 lg:max-w-maxContent lg:px-0">
          <p className="text-base text-richblack-600">
            {`Home / Contact Us`}
          </p>
          <h1 className="text-5xl font-extrabold text-richblack-900 sm:text-6xl md:text-7xl leading-tight drop-shadow-md">
            Get in Touch
          </h1>
          <p className="max-w-[870px] text-lg text-richblack-700 leading-relaxed font-light">
            We'd love to hear from you. Whether you have a question about our courses,
            need assistance, or just want to say hello, feel free to reach out.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%] mb-12">
          <ContactForm />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Contact