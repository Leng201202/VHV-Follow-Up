import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import { Login } from './components/auth/Login';
import Signup from './components/auth/Signup';
import Admin from './components/admin/Admin';
import User from './components/user/User';
import PageNotFound from './components/auth/PageNotFound';
function App() {

  return (
   
    <div>  
      <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/user/*" element={<User/>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>       
    </div>

  );
}

export default App;
