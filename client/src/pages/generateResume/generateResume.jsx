import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import uid from '../../cookieHandler';
import Topbar from '../../components/topbar';
import './generateResume.css';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function GenerateResume() {

  const navigate = useNavigate();
    const [jobDescription, setJobDescription] = useState("");

    const generateNewResume = () => {
      console.log("Generating new resume");
      //Send job description to backend for processing
      axios.post('/generate', {
        jobDescription: jobDescription,
        uid: uid
      })
      .then(response => {
        console.log(response.data);
        navigate('/viewGeneratedResume'); //Send the user to the view generated resume page after successful resume generation
      })
      .catch(error => {
        console.error('Error generating resume', error);
      });
    }
     
    return (
      <div>
        <Topbar />
        <div class='generateResumeForm'>
            <Button variant="contained" color="success" onClick={generateNewResume}>Generate Resume</Button>
            <div>
              <textarea class='jobDesc' type="text" placeholder="Enter job description" onChange={(e) => setJobDescription(e.target.value)} />
            </div>
        </div>
      </div>
    );
}

export default GenerateResume;
