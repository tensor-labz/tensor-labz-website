import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import Home from "../pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Services from "../pages/Services";
import { AnimatePresence } from "motion/react";
import Project from "../pages/Project";


export default function AppRoutes() {
    const location=useLocation();
  return (

    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/services/:slug" element={<Services/>} />
        <Route path="/project/:slug" element={<Project/>} />
    </Routes>
    </AnimatePresence>

  )
}
