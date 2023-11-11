import React from 'react';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

function GenerateResume() {

    const cookieHandler = new Cookies();
    const uid = cookieHandler.get('uid');
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
        <div>
            <button onClick={generateNewResume}>Generate Resume</button>
            <textarea type="text" placeholder="Enter job description" onChange={(e) => setJobDescription(e.target.value)} />
        </div>
    );
}

export default GenerateResume;
