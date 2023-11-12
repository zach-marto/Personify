import React from 'react';
import './App.css';
import Login from './pages/login/login.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GenerateResume from './pages/generateResume/generateResume.jsx';
import ViewGeneratedResume from './pages/viewGeneratedResume/ViewGeneratedResume.jsx';
import EditProfile from './pages/profile/EditProfile.jsx';
import Profile from './pages/profile/Profile.jsx';
import uid from './cookieHandler.js';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={uid ? <Navigate to="/generateResume" /> : <Login />} />
          <Route path="/generateResume" element={uid ? <GenerateResume /> : <Navigate to="/" />} />
          <Route path="/viewGeneratedResume" element={uid ? <ViewGeneratedResume /> : <Navigate to="/" />} />
          <Route path="/editProfile" element={uid ? <EditProfile /> : <Navigate to="/" />} />
          <Route path="/profile" element={uid ? <Profile /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
