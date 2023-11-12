import React from 'react';
import Button from '@mui/material/Button';
import './topbar.css';
import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/editProfile');
  }

  const navigateToGenerateResume = () => {
    navigate('/generateResume');
  }

  return (
    <div className="topbar" style={{display:"flex",  justifyContent:"stretch"}}>
     <div className='topbar-left'>
      <h1 onClick={navigateToGenerateResume}>Personify</h1>
     </div>
     <div className='topbar-right'>
      <Button variant="contained" onClick={navigateToGenerateResume}>Generate Resume</Button>
      <Button variant="contained" onClick={navigateToProfile}>My Profile</Button>
      </div>
    </div>
  )
}

export default Topbar