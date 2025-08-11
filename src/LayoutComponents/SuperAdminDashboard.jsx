// LayoutComponents/SuperAdminDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/SuperAdminpagesComponents/dashboardComponents/Dashboard';
import Employerprofile from '../components/SuperAdminpagesComponents/EmployerDetailsComponents/Employerprofile'
import EmployesProfile from '../components/SuperAdminpagesComponents/UserProfile/EmployesProfile'
import Employers from '../components/SuperAdminpagesComponents/EmployersComponents/Employers'
import Employersview from '../components/SuperAdminpagesComponents/EmployersComponents/Employersview'
import NoCaller from '../components/SuperAdminpagesComponents/EmployersComponents/NoCaller'
import Activecaller from '../components/SuperAdminpagesComponents/EmployersComponents/Activecaller'
import Callers from '../components/SuperAdminpagesComponents/CallersComponents/Callers'
import TeamCaller from '../components/SuperAdminpagesComponents/CallersComponents/TeamCaller'
import Supportingtools from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Supportingtools'
import Createstatus from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Createstatus/Createstatus'
import Verticals from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Createverticals/Verticals'
import Industry from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Createindustry/Industry'
import Createproduct from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Product/Createproduct'
import Subproduct from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Subproduct/Subproduct'
import Customwhatsappmessage from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Customwhatsappmessage/Customwhatsappmessage'
import MessageCards from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Customwhatsappmessage/MessageCards';
import Employersentmsg from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Customwhatsappmessage/Employersentmsg';
import Customtextmessage from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Customtextmessage/Customtextmessage'
import Document from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Document/Document'
import Trainingvideo from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/TrainingVideo/Trainingvideo'
import Source from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Source/Source'
import Pitch from '../components/SuperAdminpagesComponents/SupportingtoolsComponents/Pitch/Pitch'
import PermissionCard from '../components/SuperAdminpagesComponents/PermissionComponents/PermissionCard'

const SuperAdminDashboard = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path='EmployesProfile' element={<EmployesProfile />} />
      <Route path='Employerprofile' element={<Employerprofile />}/>
      <Route path='Employers' element={<Employers />} />
      <Route path='Employersview' element={<Employersview />} />
      <Route path='NoCaller' element={<NoCaller />} />
      <Route path="Activecaller" element={<Activecaller />} />
      <Route path="Callers" element={<Callers />} />
      <Route path='TeamCaller' element={<TeamCaller />} />
      <Route path='Supportingtools' element={<Supportingtools />} />
      <Route path='Createstatus' element={<Createstatus />} />
      <Route path='Verticals' element={<Verticals />} />
      <Route path='Industry' element={<Industry />} />
      <Route path='Createproduct' element={<Createproduct />} />
      <Route path='Subproduct' element={<Subproduct />} />
      <Route path='Customwhatsappmessage' element={<Customwhatsappmessage />} />
      <Route path="/MessageCards" element={<MessageCards />} />
      <Route path="/Employersentmsg" element={<Employersentmsg />} />
      <Route path='Customtextmessage' element={<Customtextmessage />} />
      <Route path='Document' element={<Document />} />
      <Route path='Trainingvideo' element={<Trainingvideo />} />
      <Route path='Source' element={<Source />} />
      <Route path='Pitch' element={<Pitch />} />
      <Route path='PermissionCard' element={<PermissionCard />} />


    </Routes>
  );
};

export default SuperAdminDashboard;
