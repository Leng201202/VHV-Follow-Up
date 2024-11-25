import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Header from '../common/Header';
import SideMenu from '../common/SideMenu';
import { Footer } from 'antd/es/layout/layout';
import Listofpatient from './Listofpatient';
import Editpatient from './Editpatient';
import Recordedpatient from './Recordedpatient';
import ViewPatient from './ViewPatient';
import AdminDashboard from './AdminDashboard';
import AdminProfile from './AdminProfile';
const Admin = () => {
  return (
   <>
       <Header/>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideMenu />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
              {/* Notice how the paths are now relative */}
              <Route path='/' element={<AdminDashboard/>}></Route>
              <Route path='my-profile' element={<AdminProfile/>}></Route>
              <Route path="listofpatient" element={<Listofpatient />} />
              <Route path="listofpatient/:id" element={<Editpatient />} />
              <Route path="patientrecordeddata" element={<Recordedpatient />} />
              <Route path="patientrecordeddata/:id" element={<ViewPatient />} />
          </Routes>
        </div>
      </div>
      <Footer />
   </>
  );
};

export default Admin;
