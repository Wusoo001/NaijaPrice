import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import FeaturesSection from './components/FeaturesSection'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Login from './components/Login';
import SignUp from './components/SignUp';
import HeroSection from './components/HeroSection';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import AddProduct from './pages/AddProduct';
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from './pages/AdminSignup';


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route
          path='/'
          element={
            <>
            <HeroSection/>
            <FeaturesSection/>
            <HowItWorks/>
            <CTA/>
            </>
          }
        
        />
        
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path ="/dashboard"
               element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
               }
        />
        
        <Route path="/admin-login" element={<PrivateRoute><AdminLogin/></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard/></PrivateRoute>} />
        <Route path="/admin/add-product" element={<PrivateRoute><AddProduct/></PrivateRoute>} />
        <Route path='/admin-signup' element={<PrivateRoute><AdminSignup/></PrivateRoute>}/>

      </Routes>
      <Footer/>
    </Router>
  )
}

export default App

