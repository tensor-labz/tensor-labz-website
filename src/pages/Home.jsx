import React from 'react'
import Services from './section/Services'
import HomeSection from './section/Home'
import AboutUs from './section/AboutUs'
import ContactUs from './section/ContactUs'
import ScrollProgress from '../components/core/ScrollProgress'

export default function Home() {
  return (
    <>
    <ScrollProgress/>
     <HomeSection/>
 <Services/>
 <AboutUs/>
 <ContactUs/>
    </>
  )
}
