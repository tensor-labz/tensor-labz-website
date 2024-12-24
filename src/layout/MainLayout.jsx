import React from 'react'
import Header from './Header'
import GoToTop from '../components/layout/Comp_GoToTop'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
     <Header/>
  <main className='scroll-smooth transition-all duration-700'>
 <GoToTop/>
<Outlet/>
  </main>
   <Footer/> 
    </>
  )
}
