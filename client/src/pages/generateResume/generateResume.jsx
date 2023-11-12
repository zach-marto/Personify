import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import uid from '../../cookieHandler';
import Topbar from '../../components/topbar';
import './generateResume.css';
import Button from '@mui/material/Button';

function GenerateResume() {

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
      })
      .catch(error => {
        console.error('Error generating resume', error);
      });
    }
     
    return (
        <div class='generateResumeForm'>
            <Button variant="contained" color="success" onClick={generateNewResume}>Generate Resume</Button>
            <div>
              <textarea class='jobDesc' type="text" placeholder="Enter job description" onChange={(e) => setJobDescription(e.target.value)} />
            </div>
        </div>
    );
}

export default GenerateResume;
