import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Authpage';
import Adduniversity from './pages/Adduniversity';
import Manageuniversity from './pages/ManageUniversity';
import Addcourse from './pages/Addcourse';
import Managecourses from './pages/Managecourses';
import Createuser from './pages/Createuser';
import Createspoc from './pages/Createspoc';
import Managespoc from './pages/Managespoc';
import AssessmentCreation from './pages/AssessmentCreation';
import ManageAssessments from './pages/ManageAssesments';
import AssessmentResults from './pages/AssessmentResults';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); 

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add_university" element={<Adduniversity />} />
        <Route path="/manage_university" element={<Manageuniversity />} />
        <Route path="/add_course" element={<Addcourse />} />
        <Route path="/manage_course" element={<Managecourses />} />
        <Route path="/create_user" element={<Createuser />} />
        <Route path="/create_spoc" element={<Createspoc />} />
        <Route path="/manage_spoc" element={<Managespoc />} />
        <Route path="/create-assessment" element={<AssessmentCreation />} />
        <Route path="/manage-assessments" element={<ManageAssessments />} />
        <Route path="/assessment-results" element={<AssessmentResults/>} />
      </Routes>
    </>
  );
}

export default App;
