import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/AdminpagesComponents/dashboardComponents/Dashboard'
import Employerprofile from '../components/AdminpagesComponents/EmployerDetailsComponents/Employerprofile'
import CallLog from '../components/AdminpagesComponents/CallComponents/CallLog'
import CallLogemployee from '../components/AdminpagesComponents/CallComponents/CallLogemployee'
import Team from '../components/AdminpagesComponents/TeamComponents/Team'
import Employeeteam from '../components/AdminpagesComponents/TeamComponents/Employeeteam'
import Businesssetting from '../components/AdminpagesComponents/BusinessettingComponents/Businesssetting'
import CreateStatus from '../components/AdminpagesComponents/BusinessettingComponents/CreateStatus/CreateStatus'
import TodayAssigndata from '../components/AdminpagesComponents/CallComponents/TodayAssigndata';
import CallReporting from '../components/AdminpagesComponents/CallComponents/CallReporting';
import Createproduct from '../components/AdminpagesComponents/BusinessettingComponents/Product/Createproduct';
import Subproduct from '../components/AdminpagesComponents/BusinessettingComponents/Subproduct/Subproduct';
import Trainingvideo from '../components/AdminpagesComponents/BusinessettingComponents/TrainingVideo/Trainingvideo';
import Document from '../components/AdminpagesComponents/BusinessettingComponents/Document/Document';
import Pitch from '../components/AdminpagesComponents/BusinessettingComponents/Pitch/Pitch';
import MessageCards from '../components/AdminpagesComponents/BusinessettingComponents/CustomwhatsappMessage/MessageCards';
import Source from '../components/AdminpagesComponents/BusinessettingComponents/Source/Source';
import Callfrequency from '../components/AdminpagesComponents/BusinessettingComponents/Callfrequency/Callfrequency';
import Designation from '../components/AdminpagesComponents/BusinessettingComponents/Designation/Designation';
import UploadBanner from '../components/AdminpagesComponents/BusinessettingComponents/Uploadbanner/UploadBanner';
import Employersentmsg from '../components/AdminpagesComponents/BusinessettingComponents/CustomwhatsappMessage/Employersentmsg';
import CustomwhatsappMessage from '../components/AdminpagesComponents/BusinessettingComponents/CustomwhatsappMessage/CustomwhatsappMessage';

import Security from '../components/AdminpagesComponents/SecurityComponents/Security';
import Assigndata from '../components/AdminpagesComponents/SecurityComponents/Assigndata/Assigndata';
import ImportData from '../components/AdminpagesComponents/SecurityComponents/ImportData/ImportData';
import Scheduleddata from '../components/AdminpagesComponents/SecurityComponents/ImportData/Scheduleddata';
import ImportdataView from '../components/AdminpagesComponents/SecurityComponents/ImportData/ImportdataView';

import PermissionCard from '../components/AdminpagesComponents/PermissionComponents/PermissionCard';
import Setting from '../components/AdminpagesComponents/SettingComponents/Setting';
import Privacypolicy from '../components/AdminpagesComponents/SettingComponents/policy/Privacypolicy';
import Termsconditions from '../components/AdminpagesComponents/SettingComponents/Termsconditions/Termsconditions';
import Contactsupports from '../components/AdminpagesComponents/SettingComponents/Contactsupports/Contactsupports';
import Deleteaccount from '../components/AdminpagesComponents/SettingComponents/Deleteaccount/Deleteaccount'



const AdminDashboard = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path='Employerprofile' element={<Employerprofile />} />

      <Route path="Team" element={<Team />} />
      <Route path='Employeeteam' element={<Employeeteam/>}/>
      <Route path="CallLog" element={<CallLog />} />
      <Route path="CallLogemployee" element={<CallLogemployee />} />
      <Route path="Businesssetting" element={<Businesssetting />} />
      <Route path="CreateStatus" element={<CreateStatus />} />

      {/* Call Routes */}
      <Route path="/call-log" element={<CallLog />} />
      <Route path="/TodayAssigndata" element={<TodayAssigndata />} />
      <Route path="/CallLogemployee" element={<CallLogemployee />} />
      <Route path="/call-reporting" element={<CallReporting />} />

      {/* Business Setting Routes */}
      <Route path="/Businesssetting" element={<Businesssetting />} />
      <Route path="/CreateStatus" element={<CreateStatus />} />
      <Route path="/Createproduct" element={<Createproduct />} />
      <Route path="/Subproduct" element={<Subproduct />} />
      <Route path="/Trainingvideo" element={<Trainingvideo />} />
      <Route path="/Document" element={<Document />} />
      <Route path="/Pitch" element={<Pitch />} />
      <Route path="/CustomwhatsappMessage" element={<CustomwhatsappMessage />} />
      <Route path="/MessageCards" element={<MessageCards />} />
      <Route path="/Employersentmsg" element={<Employersentmsg />} />
      <Route path="/Source" element={<Source />} />
      <Route path="Callfrequency" element={<Callfrequency />} />
      <Route path="/Designation" element={<Designation />} />
      <Route path="/UploadBanner" element={<UploadBanner />} />

      {/* Security Routes */}
      <Route path="/Security" element={<Security />} />
      <Route path="/Assigndata" element={<Assigndata />} />
      <Route path="/ImportData" element={<ImportData />} />
      <Route path="/Scheduleddata" element={<Scheduleddata />} />
      <Route path="/ImportdataView" element={<ImportdataView />} />

      {/* Permission / Settings */}
      <Route path="/PermissionCard" element={<PermissionCard />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/Privacypolicy" element={<Privacypolicy />} />
      <Route path="/Termsconditions" element={<Termsconditions />} />
      <Route path="/Contactsupports" element={<Contactsupports />} />
      <Route path="/Deleteaccount" element={<Deleteaccount />} />
    </Routes>
  );
};

export default AdminDashboard;
