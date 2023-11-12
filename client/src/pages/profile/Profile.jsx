import React from 'react'
import Topbar from '../../components/topbar'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import uid  from '../../cookieHandler';
import { useState, useEffect } from 'react';



export default function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null); // State to store profile data

    const handleEdit = () => {
        navigate('/editprofile');
    }



    useEffect(() => {
        // Fetch profile data when the component mounts
        axios.get(`http://localhost:3001/getProfile?`,
        {
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({uid: uid}),
            method: 'GET',
            
          }
        )
          .then((response) => {
            console.log('uid', uid);
            console.log(response.data);
            setProfileData(response.data);
          })
          .catch((error) => {
            console.error(error.message);
          });
      }, [uid]);
      
      
      

  return (
      <div >
        <Topbar />
        <div class="profile-container" style={{ display: "flex", gap: "1rem",alignItems: "center", textAlign: "auto"}}>
    <div style={{flexDirection: "row"}}>
        <h2>Contact Information</h2>
        <ul style={{ listStyleType: "none", justifyContent:"stretch" }}>
            <li><strong>Name:</strong> </li>
            <li><strong>Phone:</strong>  </li>
            <li><strong>Email:</strong> </li>
            <li><strong>LinkedIn:</strong> </li>
            <li><strong>GitHub:</strong> </li>
        </ul>
    </div>
    <div class="education">
        <h2>Education</h2>
        <ul style={{ listStyleType: "none" }}>
            <li><strong>School Name:</strong> </li>
            <li><strong>Major:</strong> </li>
            <li><strong>School Location:</strong> </li>
            <li><strong>Graduation Date:</strong> </li>
            <li><strong>GPA:</strong> </li>
            <li><strong>Relevant Coursework:</strong> </li>
        </ul>
    </div>
    <div class="experience">
        <h2>Experience</h2>
        <ul style={{ listStyleType: "none" }}>
            <li><strong>Position Name:</strong> </li>
            <li><strong>Company Name:</strong> </li>
            <li><strong>Start Date:</strong> </li>
            <li><strong>End Date:</strong> </li>
            <li><strong>Company Location:</strong> </li>
            <li><strong>Description Bullets:</strong> </li>
            <li><strong>Description Paragraph:</strong> </li>
        </ul>
    </div>
    <div class="projects">
        <h2>Projects</h2>
        <ul style={{ listStyleType: "none" }}>
            <li><strong>Name:</strong> </li>
            <li><strong>Start Date:</strong> </li>
            <li><strong>End Date:</strong> </li>
            <li><strong>Languages and Frameworks:</strong> </li>
            <li><strong>Description Bullets:</strong> </li>
            <li><strong>Description Paragraph:</strong> </li>
        </ul>
    </div>
    <div class="skills">
        <h2>Skills</h2>
        <ul style={{ listStyleType: "none" }}>
            <li><strong>Languages:</strong> </li>
            <li><strong>Frameworks:</strong> </li>
            <li><strong>Tools:</strong> </li>
            <li><strong>Libraries:</strong> </li>
        </ul>
    </div>
    <div class="obj-info">
        <h2>Objective Information</h2>
        <ul style={{ listStyleType: "none" }}>
            <li><strong>User ID:</strong> </li>
            <li><strong>Date:</strong> </li>
        </ul>
    </div>
</div>
<Button  size='large' variant="contained" onClick={handleEdit}>Edit Profile</Button>
</div>
  )
}
