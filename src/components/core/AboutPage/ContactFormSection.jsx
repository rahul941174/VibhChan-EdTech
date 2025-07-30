import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'
const ContactFormSection = () => {
  return (
    <div className='mx-auto text-white'>
        <h1 className='text-3xl font-bold text-center mb-2'>Get In Touch</h1>
        <p className='text-md text-center'>We’d love to here for you, Please fill out this form.</p>

        <div className='mt-4'>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactFormSection