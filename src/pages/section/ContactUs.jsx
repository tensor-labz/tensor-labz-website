import React from 'react'
import PageLayout from '../../layout/PageLayout'
import { contactusData } from '../../data/Data_Page'
import Contact from '../../components/pages/Contact'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function ContactUs() {
  return (
    <PageLayout id='contact-us' title={contactusData?.title}>
     
 <div className="max-w-screen-xl mx-auto px-6 text-center">
        <p className="text-gray-600 mb-12">
         {contactusData?.content}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-8">
       
          {contactusData?.contactDetails?.map((contact,index)=>(<Contact {...contact} key={index}/>))}
        </div>
        
      </div>
    </PageLayout>
  )
}
