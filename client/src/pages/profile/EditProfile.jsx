import React from 'react'
import { useState } from 'react'
import uid from '../../cookieHandler';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditProfile() {
    const [contactInfo, setContactInfo] = useState({
      name: '',
      phone: '',
      email: '',
      linkedin: '',
      github: '',
    });
    const educationForm = {
      school_name: '',
      major: '',
      school_location: '',
      graduation_date: '',
      GPA: '',
      relevant_courses: '',
    }
    const experienceForm = {
      company_name: '',
      position_name: '',
      start_date: '',
      end_date: '',
      company_location: '',
      description_paragraph: '',
      description_bullets: '',
    }
    const skillsForm = {
      "languages": '',
      "frameworks": '',
      "tools": '',
      "libraries": ''
    }
    
    const [educationInfo, setEducationInfo] = useState([educationForm]);

    const [experienceInfo, setExperienceInfo] = useState([experienceForm]); 

    const [skillsInfo, setSkillsInfo] = useState([skillsForm]);
    
    const addEducation = () => {
      setEducationInfo([...educationInfo, educationForm]);
    };
    
    const removeEducation = (i) => {
      const values = [...educationInfo];
      values.splice(i, 1);
      setEducationInfo(values);
    };

    const addExperience = () => {
      setExperienceInfo([...experienceInfo, experienceForm]);
    };

    const removeExperience = (i) => {
      const values = [...experienceInfo];
      values.splice(i, 1);
      setExperienceInfo(values);
    };

    const addSkills = () => {
      setSkillsInfo([...skillsInfo, skillsForm]);
    };
      
    const handleContactChange = (e) => {
      const { name, value } = e.target;
      setContactInfo({
        ...contactInfo,
        [name]: value,
      });
    };

    //handle education change
    const handleEducationChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...educationInfo];
      list[index][name] = value;
      setEducationInfo(list);
    }

    //handle experience change
    const handleExperienceChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...experienceInfo];
      list[index][name] = value;
      setExperienceInfo(list);
    }

    //handle submit form data
    const handleSubmit = () => {  
      
        const data = {
          contactInfo,
          educationInfo,
          experienceInfo,
          skillsInfo,
          uid: uid
        }
        axios.post('/saveProfile', data, {
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          method: 'POST',
          
        }).then((res) => {
          console.log(res.data);
        }
        ).catch((err) => {
          console.log(err);
        })

        console.log(data);
      };



  
  return (
  <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
      <h1>Edit Profile</h1>
      <section>
      <h2>Personal Information</h2>
      <form style={{ display: "flex", gap: "1rem" }}>
              <div>
                <label style={{marginRight: "1rem"}}>Name:</label>
                <TextField 
                  type="text"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactChange}
                />
              </div>
              <div >
                <label style={{marginRight: "1rem"}}>Phone:</label>
                <TextField
                  type="text"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactChange}
                />
              </div>
              <div >
                <label style={{marginRight: "1rem"}}>Email:</label>
                <TextField
                  type="text"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactChange}
                  required
                />
              </div>
        <div>
          <label>LinkedIn:</label>
          <TextField
            type="text"
            name="linkedin"
            value={contactInfo.linkedin}
            onChange={handleContactChange}
          />
        </div>
        <div>
          <label>GitHub:</label>
          <TextField
            type="text"
            name="github"
            value={contactInfo.github}
            onChange={handleContactChange}
          />
        </div>
      </form>
      </section>

  <section>
  <h2>Education</h2>
  {educationInfo.map((education, index) => (
    <form style={{ display: "flex", gap: "1rem" }} key={index}>
      <div>
        <label>School Name:</label>
        <TextField
          type="text"
          name="school_name"
          value={education.school_name}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>Major:</label>
        <TextField
          type="text"
          name="major"
          value={education.major}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>School Location:</label>
        <TextField
          type="text"
          name="school_location"
          value={education.school_location}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>Graduation Date:</label>
        <TextField
          type="text"
          name="graduation_date"
          value={education.graduation_date}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>GPA:</label>
        <TextField
          type="text"
          name="GPA"
          value={education.GPA}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
      <div>
        <label>Relevant Courses:</label>
        <TextField
          type="text"
          name="relevant_courses"
          value={education.relevant_courses}
          onChange={(e) => handleEducationChange(e, index)}
        />
      </div>
    </form>
  ))}
  <Button variant="outlined" onClick={addEducation}>Add Education</Button>
  <Button variant="outlined" onClick={removeEducation}>Remove Education</Button>
</section>


  <section>
  <h2>Experience</h2>
  {experienceInfo.map((experience, index) => (
    <form style={{ display: "flex", gap: "1rem" }} key={index}>
      <div>
        <label>Company Name:</label>
        <TextField
          type="text"
          name="company_name"
          value={experience.company_name}
          onChange={(e) => handleExperienceChange(e, index)}
        />
      </div>
      <div>
        <label>Position Name:</label>
        <TextField
          type="text"
          name="position_name"
          value={experience.position_name}
          onChange={(e) => handleExperienceChange(e, index)}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <TextField
          type="text"
          name="start_date"
          value={experience.start_date}
          onChange={(e) => handleExperienceChange(e, index)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <TextField
          type="text"
          name="end_date"
          value={experience.end_date}
          onChange={(e) => handleExperienceChange(e, index)}
        />
      </div>
      <div>
        <label>Company Location:</label>
        <TextField
          type="text"
          name="company_location"
          value={experience.company_location}
          onChange={(e) => handleExperienceChange(e, index)}
        />
      </div>
      <div>
        <label>Description Paragraph:</label>
        <TextField
          type="text"
          name="description_paragraph"
          value={experience.description_paragraph}
          onChange={(e) => handleExperienceChange(e, index)}
        />
      </div>
    </form>
  ))}
  <Button size='small' variant="outlined" onClick={addExperience} style={{fontSize: "0.8rem"}}>Add Experience</Button>
  <Button size='small' variant="outlined" onClick={removeExperience} style={{fontSize: "0.8rem"}}>Remove Experience</Button>
</section>

<section>
<h2>Skills</h2>
  <form style={{ display: "flex", gap: "1rem" }}>
        <div>
          <label>Languages:</label>
          <TextField
            type="text"
            name="languages"
            value={skillsInfo.languages}
          />
        </div>
        <div>
          <label>Frameworks:</label>
          <TextField
            type="text"
            name="frameworks"
            value={skillsInfo.frameworks}
          />
        </div>
        <div>
          <label>Tools:</label>
          <TextField
            type="text"
            name="tools"
            value={skillsInfo.tools}
          />
        </div>
        <div>
          <label>Libraries:</label>
          <TextField
            type="text"
            name="libraries"
            value={skillsInfo.libraries}
          />
        </div>
  </form>
</section>

    <Button size='large' variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default EditProfile