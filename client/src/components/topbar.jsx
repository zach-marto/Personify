import React from 'react';
import Button from '@mui/material/Button';
import './topbar.css';
import { useNavigate } from "react-router-dom";


function Topbar() {

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate('/profile');
  }

  const navigateToGenerateResume = () => {
    navigate('/generateResume');
  }

  return (
    <div className="topbar" style={{display:"flex",  justifyContent:"stretch"}}>
      <div className='topbar-left'>
        <h1 onClick={navigateToGenerateResume}>Personify</h1>
        <img className='logo' src="https://lh3.googleusercontent.com/pw/ADCreHcN_0M67MKEj2Iot9acHVVLIMgvYtW4scJvDxFe81R6hJCmUctgHC8aiGBjQCUZ5FTr8nAHcyTvghcnOIIk7WOdd6_QFpV7z3LizJMkfhH5qeUFYykD6p8oFLy6EnnJRQM5LiSSmAP0IdvtZvgAuVyg=w345-h372-s-no"></img>
      </div>
      <div className='topbar-right'>
        <Button variant="contained" onClick={navigateToGenerateResume}>Generate Resume</Button>
        <Button variant="contained" onClick={navigateToProfile}>My Profile</Button>
      </div>
    </div>
  )
}

export default Topbar