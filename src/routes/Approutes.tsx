import ContactUs from '../pages/ContactUs';
import AboutUs from '../pages/AboutUs';
import Home from '../pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Services from '../pages/Services';
import Project from '../pages/Project';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route
        path="/services"
        element={<Navigate to="/services/all" replace />}
      />
      <Route path="/services/:slug" element={<Services />} />
      <Route path="/project/:slug" element={<Project />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
