import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import uid from '../../cookieHandler';
<<<<<<< HEAD
import Topbar from '../../components/topbar';
=======
import './generateResume.css';
import Button from '@mui/material/Button';
>>>>>>> 8335906fb8880814b05e5955070da33c07dd6b6f

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
<<<<<<< HEAD
        <div>
            <Topbar />
            <button onClick={generateNewResume}>Generate Resume</button>
            <textarea type="text" placeholder="Enter job description" onChange={(e) => setJobDescription(e.target.value)} />
=======
        <div class='generateResumeForm'>
            <Button variant="contained" color="success" onClick={generateNewResume}>Generate Resume</Button>
            <div>
              <textarea class='jobDesc' type="text" placeholder="Enter job description" onChange={(e) => setJobDescription(e.target.value)} />
            </div>
>>>>>>> 8335906fb8880814b05e5955070da33c07dd6b6f
        </div>
    );
}

export default GenerateResume;
